from fastapi import FastAPI, HTTPException
from app.database import get_db_connection
from app.models import FlightOut, BookingIn, BookingOut
from app.queries import GET_FLIGHTS_QUERY, INSERT_PASSENGER_QUERY, INSERT_TRANSACTION_QUERY
import mysql.connector
import random # To generate a dummy TS_ID

app = FastAPI(title="Airline Management API")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Airline Management API, bro."}

@app.get("/flights/", response_model=list[FlightOut])
def get_flights():
    """
    Fetches all available flights with route and airline info.
    """
    try:
        cnx = get_db_connection()
        if cnx is None:
            raise HTTPException(status_code=503, detail="Database connection unavailable.")
            
        cursor = cnx.cursor(dictionary=True) # dictionary=True returns rows as dicts
        cursor.execute(GET_FLIGHTS_QUERY)
        flights = cursor.fetchall()
        
        # Format the result to match the Pydantic model keys
        formatted_flights = [
            {
                "flight_id": f["Flight_ID"],
                "company": f["Company"],
                "take_off_point": f["Take_Off_point"],
                "destination": f["Destination"],
                "departure": f["Departure"],
                "arrival": f["Arrival"]
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
            cnx.close() # Returns the connection to the pool

@app.post("/bookings/", response_model=BookingOut)
def create_booking(booking: BookingIn):
    """
    Creates a new booking by adding a passenger and a transaction.
    """
    cnx = None
    cursor = None
    try:
        cnx = get_db_connection()
        if cnx is None:
            raise HTTPException(status_code=503, detail="Database connection unavailable.")
        
        cursor = cnx.cursor()
        
        # Start a transaction
        cnx.start_transaction()

        # 1. Insert the Passenger
        p = booking.passenger
        passenger_data = (p.ps_name, p.address, p.age, p.sex, p.contacts, booking.flight_id)
        cursor.execute(INSERT_PASSENGER_QUERY, passenger_data)
        
        # Get the new Passenger ID
        new_passenger_id = cursor.lastrowid

        # 2. Insert the Transaction
        # We'll use a random TS_ID and dummy payment type for this example
        new_ts_id = random.randint(10000000, 99999999)
        payment_type = "Credit Card" # Dummy data
        
        transaction_data = (
            new_ts_id,
            booking.flight_id, # For the subquery
            payment_type,
            booking.emp_id,
            new_passenger_id,
            booking.flight_id,
            booking.charge_amount # This is the Fare_ID
        )
        cursor.execute(INSERT_TRANSACTION_QUERY, transaction_data)

        # Commit the transaction
        cnx.commit()
        
        return {
            "status": "Booking successful",
            "booking_id": new_ts_id,
            "passenger_id": new_passenger_id
        }

    except mysql.connector.Error as err:
        # If anything goes wrong, roll back
        if cnx:
            cnx.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    except Exception as e:
        if cnx:
            cnx.rollback()
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
    finally:
        if cursor:
            cursor.close()
        if cnx and cnx.is_connected():
            cnx.close()