from pydantic import BaseModel
from typing import Optional

# Model for the data you send *out* for a flight
class FlightOut(BaseModel):
    flight_id: str
    company: str
    take_off_point: str
    destination: str
    departure: str
    arrival: str

# Model for the data you receive *in* for a new passenger
class PassengerIn(BaseModel):
    ps_name: str
    address: str
    age: int
    sex: str
    contacts: str

# Model for the data you receive *in* for a new booking
class BookingIn(BaseModel):
    flight_id: str
    passenger: PassengerIn
    # You would also add payment info here
    # For now, we'll auto-assign other IDs
    emp_id: int = 1234 # Hardcoding for this example
    charge_amount: int # This should match a Fare_ID from AirFare

# Model for the data you send *out* after a successful booking
class BookingOut(BaseModel):
    status: str
    booking_id: int
    passenger_id: int