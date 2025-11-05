from pydantic import BaseModel
from typing import Optional, Union
from datetime import date # Import date

# --- FLIGHT & BOOKING MODELS (Unchanged) ---
class FlightOut(BaseModel):
    flight_id: str
    company: str
    take_off_point: str
    destination: str
    departure: str
    arrival: str

class PassengerIn(BaseModel):
    ps_name: str
    address: str
    age: int
    sex: str
    contacts: str

class BookingIn(BaseModel):
    flight_id: str
    passenger: PassengerIn
    emp_id: int = 1234
    charge_amount: int

class BookingOut(BaseModel):
    status: str
    booking_id: int
    passenger_id: int


# --- NEW EMPLOYEE MODELS ---

# Base model with common employee data
class EmployeeBase(BaseModel):
    emp_id: int
    e_name: str
    address: str
    age: int
    email_id: str
    contact: str
    air_code: str # The airport they are based at

# --- IN models (for creating new employees) ---

class PilotIn(EmployeeBase):
    license_number: str
    medical_expiry_date: date
    flight_hours: int = 0

class CabinCrewIn(EmployeeBase):
    certification_id: str
    service_training_level: str # e.g., 'First', 'Business'

class GroundCrewIn(EmployeeBase):
    role: str # e.g., 'Baggage', 'Gate Agent'
    security_clearance_level: int

# --- OUT models (for retrieving employee data) ---

class PilotOut(EmployeeBase):
    employee_type: str
    license_number: str
    medical_expiry_date: date
    flight_hours: int

class CabinCrewOut(EmployeeBase):
    employee_type: str
    certification_id: str
    service_training_level: str

class GroundCrewOut(EmployeeBase):
    employee_type: str
    role: str
    security_clearance_level: int