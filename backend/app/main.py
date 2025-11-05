from fastapi import FastAPI, HTTPException
from app.database import get_db_connection
# Import all our new models
from app.models import (
    FlightOut, BookingIn, BookingOut, AirFareOut, 
    PilotIn, CabinCrewIn, GroundCrewIn,
    PilotOut, CabinCrewOut, GroundCrewOut, EmployeeBase
)
# Import all our new queries
from app.queries import (
    GET_FLIGHTS_QUERY, INSERT_PASSENGER_QUERY, INSERT_TRANSACTION_QUERY,
    INSERT_EMPLOYEE_BASE, INSERT_PILOT, INSERT_CABINCREW, INSERT_GROUNDCREW,
    GET_FARES_FOR_FLIGHT_QUERY
)

from fastapi.middleware.cors import CORSMiddleware

import mysql.connector
import random
from typing import Union, Any # To handle multiple response types

app = FastAPI(title="Airline Management API")

origins = [
    "http://localhost:3000",
]

# --- 3. Add the middleware to your app ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from http://localhost:3000
    allow_credentials=True, # Allows cookies (if you use them)
    allow_methods=["*"],    # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],    # Allows all headers
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Airline Management API, bro."}

# --- BOOKING & FLIGHT ENDPOINTS (Unchanged) ---
@app.get("/flights/{flight_id}/fares/", response_model=list[AirFareOut])
def get_flight_fares(flight_id: str):
    """
    Gets all available fare options (e.g., Economy, Business)
    for a specific flight.
    """
    cnx = None
    cursor = None
    try:
        cnx = get_db_connection()
        if cnx is None:
            raise HTTPException(status_code=503, detail="Database connection unavailable.")
        
        cursor = cnx.cursor(dictionary=True)
        cursor.execute(GET_FARES_FOR_FLIGHT_QUERY, (flight_id,))
        fares = cursor.fetchall()

        if not fares:
            raise HTTPException(status_code=404, detail="No fares found for this flight.")
        
        # Re-map keys to match Pydantic model
        return [
            {
                "fare_id": f["Fare_ID"],
                "charge_amount": f["Charge_Amount"],
                "description": f["Description"],
                "flight_id": f["Flight_ID"]
            }
            for f in fares
        ]
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        if cursor: cursor.close()
        if cnx and cnx.is_connected(): cnx.close()
        
@app.get("/flights/", response_model=list[FlightOut])
def get_flights():
    # ... (This code is unchanged from before)
    try:
        cnx = get_db_connection()
        if cnx is None:
            raise HTTPException(status_code=503, detail="Database connection unavailable.")
        cursor = cnx.cursor(dictionary=True)
        cursor.execute(GET_FLIGHTS_QUERY)
        flights = cursor.fetchall()
        formatted_flights = [
            {
                "flight_id": f["Flight_ID"], "company": f["Company"],
                "take_off_point": f["Take_Off_point"], "destination": f["Destination"],
                "departure": f["Departure"], "arrival": f["Arrival"]
            }
            for f in flights
        ]
        return formatted_flights
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'cnx' in locals() and cnx.is_connected():
            cnx.close()

@app.post("/bookings/", response_model=BookingOut)
def create_booking(booking: BookingIn):
    # ... (This code is unchanged from before)
    cnx = None
    cursor = None
    try:
        cnx = get_db_connection()
        if cnx is None:
            raise HTTPException(status_code=503, detail="Database connection unavailable.")
        cursor = cnx.cursor()
        cnx.start_transaction()

        # 1. Insert Passenger
        p = booking.passenger
        passenger_data = (p.ps_name, p.address, p.age, p.sex, p.contacts, booking.flight_id)
        cursor.execute(INSERT_PASSENGER_QUERY, passenger_data)
        new_passenger_id = cursor.lastrowid

        # 2. Insert Transaction
        new_ts_id = random.randint(10000000, 99999999)
        payment_type = "Credit Card"
        transaction_data = (
            new_ts_id, booking.flight_id, payment_type, booking.emp_id,
            new_passenger_id, booking.flight_id, booking.fare_id
        )
        cursor.execute(INSERT_TRANSACTION_QUERY, transaction_data)
        
        cnx.commit()
        return {
            "status": "Booking successful",
            "booking_id": new_ts_id,
            "passenger_id": new_passenger_id
        }
    except mysql.connector.Error as err:
        if cnx: cnx.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    except Exception as e:
        if cnx: cnx.rollback()
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
    finally:
        if cursor: cursor.close()
        if cnx and cnx.is_connected(): cnx.close()

# --- NEW EMPLOYEE ENDPOINTS ---

@app.post("/employees/pilot/", status_code=201)
def create_pilot(pilot: PilotIn):
    """
    Creates a new pilot. This is a transaction that inserts
    into both Employees and Pilots tables.
    """
    cnx = None
    cursor = None
    try:
        cnx = get_db_connection()
        if cnx is None:
            raise HTTPException(status_code=503, detail="Database connection unavailable.")
        cursor = cnx.cursor()
        cnx.start_transaction()

        # 1. Insert into base Employees table
        base_data = (
            pilot.emp_id, pilot.e_name, pilot.address, pilot.age,
            pilot.email_id, pilot.contact, pilot.air_code, 'pilot' # Set type
        )
        cursor.execute(INSERT_EMPLOYEE_BASE, base_data)
        
        # 2. Insert into Pilots table
        pilot_data = (
            pilot.emp_id, pilot.license_number,
            pilot.medical_expiry_date, pilot.flight_hours
        )
        cursor.execute(INSERT_PILOT, pilot_data)

        cnx.commit()
        return {"status": "Pilot created successfully", "emp_id": pilot.emp_id}

    except mysql.connector.Error as err:
        if cnx: cnx.rollback()
        # Check for duplicate key error
        if err.errno == 1062:
            raise HTTPException(status_code=409, detail="Employee ID already exists.")
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        if cursor: cursor.close()
        if cnx and cnx.is_connected(): cnx.close()

@app.post("/employees/cabincrew/", status_code=201)
def create_cabin_crew(crew: CabinCrewIn):
    """
    Creates a new cabin crew member. This is a transaction.
    """
    cnx = None
    cursor = None
    try:
        cnx = get_db_connection()
        if cnx is None:
            raise HTTPException(status_code=503, detail="Database connection unavailable.")
        cursor = cnx.cursor()
        cnx.start_transaction()

        # 1. Insert into base Employees table
        base_data = (
            crew.emp_id, crew.e_name, crew.address, crew.age,
            crew.email_id, crew.contact, crew.air_code, 'cabin_crew' # Set type
        )
        cursor.execute(INSERT_EMPLOYEE_BASE, base_data)
        
        # 2. Insert into CabinCrew table
        crew_data = (
            crew.emp_id, crew.certification_id, crew.service_training_level
        )
        cursor.execute(INSERT_CABINCREW, crew_data)

        cnx.commit()
        return {"status": "Cabin crew created successfully", "emp_id": crew.emp_id}
    
    except mysql.connector.Error as err:
        if cnx: cnx.rollback()
        if err.errno == 1062:
            raise HTTPException(status_code=409, detail="Employee ID already exists.")
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        if cursor: cursor.close()
        if cnx and cnx.is_connected(): cnx.close()

# You can add a similar endpoint for GroundCrew

@app.get("/employees/{emp_id}", 
         response_model=Union[PilotOut, CabinCrewOut, GroundCrewOut, EmployeeBase])
def get_employee_details(emp_id: int):
    """
    Gets the full details for a specific employee.
    It checks the employee's type and pulls data
    from the correct sub-table.
    """
    cnx = None
    cursor = None
    try:
        cnx = get_db_connection()
        if cnx is None:
            raise HTTPException(status_code=503, detail="Database connection unavailable.")
        
        cursor = cnx.cursor(dictionary=True)
        
        # 1. Get base employee info (and their type)
        cursor.execute("SELECT * FROM Employees WHERE Emp_ID = %s", (emp_id,))
        base_employee = cursor.fetchone()
        
        if not base_employee:
            raise HTTPException(status_code=404, detail="Employee not found")

        emp_type = base_employee.get("Employee_Type")

        # 2. Get specialized info based on type
        if emp_type == 'pilot':
            cursor.execute("SELECT * FROM Pilots WHERE Emp_ID = %s", (emp_id,))
            pilot_data = cursor.fetchone()
            if pilot_data:
                base_employee.update(pilot_data) # Combine the dictionaries
            return base_employee
        
        elif emp_type == 'cabin_crew':
            cursor.execute("SELECT * FROM CabinCrew WHERE Emp_ID = %s", (emp_id,))
            crew_data = cursor.fetchone()
            if crew_data:
                base_employee.update(crew_data)
            return base_employee
            
        elif emp_type == 'ground_crew':
            cursor.execute("SELECT * FROM GroundCrew WHERE Emp_ID = %s", (emp_id,))
            ground_data = cursor.fetchone()
            if ground_data:
                base_employee.update(ground_data)
            return base_employee

        # If type is NULL or not one of the above
        return base_employee

    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        if cursor: cursor.close()
        if cnx and cnx.is_connected(): cnx.close()