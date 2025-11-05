# --- FLIGHT & BOOKING QUERIES (Unchanged) ---

GET_FLIGHTS_QUERY = """
SELECT 
    f.Flight_ID, at.Company, r.Take_Off_point, r.Destination,
    f.Departure, f.Arrival
FROM Flight AS f
JOIN Airplane_type AS at ON f.A_ID = at.A_ID
JOIN Travels_on AS t ON f.Flight_ID = t.Flight_ID
JOIN Route AS r ON t.Route_ID = r.Route_ID
"""

INSERT_PASSENGER_QUERY = """
INSERT INTO Passengers 
    (Ps_Name, Address, Age, Sex, Contacts, Flight_ID)
VALUES 
    (%s, %s, %s, %s, %s, %s)
"""

INSERT_TRANSACTION_QUERY = """
INSERT INTO Transactions
    (TS_ID, Booking_Date, Departure_Date, TS_Type, Emp_ID, Ps_ID, Flight_ID, Fare_ID)
VALUES
    (%s, CURDATE(), (SELECT Flight_date FROM Flight WHERE Flight_ID = %s), %s, %s, %s, %s, %s)
"""
# Note: The last column is now Fare_ID, matching the SQL in Step 1.

# --- NEW QUERY ---
GET_FARES_FOR_FLIGHT_QUERY = """
SELECT Fare_ID, Charge_Amount, Description, Flight_ID
FROM AirFare
WHERE Flight_ID = %s
"""
# --- NEW EMPLOYEE QUERIES ---

# 1. Insert into the base Employees table
INSERT_EMPLOYEE_BASE = """
INSERT INTO Employees
    (Emp_ID, E_Name, Address, Age, Email_ID, Contact, Air_code, Employee_Type)
VALUES
    (%s, %s, %s, %s, %s, %s, %s, %s)
"""

# 2. Insert into the Pilots sub-table
INSERT_PILOT = """
INSERT INTO Pilots
    (Emp_ID, License_Number, Medical_Expiry_Date, Flight_Hours)
VALUES
    (%s, %s, %s, %s)
"""

# 3. Insert into the CabinCrew sub-table
INSERT_CABINCREW = """
INSERT INTO CabinCrew
    (Emp_ID, Certification_ID, Service_Training_Level)
VALUES
    (%s, %s, %s)
"""

# 4. Insert into the GroundCrew sub-table
INSERT_GROUNDCREW = """
INSERT INTO GroundCrew
    (Emp_ID, Role, Security_Clearance_Level)
VALUES
    (%s, %s, %s)
"""

GET_FLIGHTS_TODAY_COUNT = "SELECT COUNT(*) AS count FROM Flight WHERE DATE(Flight_date) = CURDATE()"

GET_EMPLOYEES_COUNT = "SELECT COUNT(*) AS count FROM Employees"

GET_BOOKINGS_MONTH_COUNT = """
SELECT COUNT(*) AS count FROM Transactions 
WHERE MONTH(Booking_Date) = MONTH(CURDATE()) 
AND YEAR(Booking_Date) = YEAR(CURDATE())
"""

GET_AIRPORTS_COUNT = "SELECT COUNT(*) AS count FROM Airport"

GET_COUNTRIES = "SELECT Country_code, Country_Name FROM Countries"

INSERT_COUNTRY = """
INSERT INTO Countries (Country_code, Country_Name)
VALUES (%s, %s)
"""

INSERT_AIRPORT = """
INSERT INTO Airport (Air_code, Air_Name, City, State, Country_code)
VALUES (%s, %s, %s, %s, %s)
"""
GET_AIRPLANE_TYPES = "SELECT A_ID, Company, Capacity, A_weight FROM Airplane_type"
INSERT_AIRPLANE_TYPE = """
INSERT INTO Airplane_type (A_ID, Capacity, A_weight, Company)
VALUES (%s, %s, %s, %s)
"""

# --- Route ---
GET_ROUTES = "SELECT Route_ID, Take_Off_point, Destination FROM Route"
INSERT_ROUTE = """
INSERT INTO Route (Route_ID, Take_Off_point, Destination, R_type)
VALUES (%s, %s, %s, %s)
"""

# --- Flight ---
GET_FLIGHT_IDS = "SELECT Flight_ID FROM Flight" # For AirFare form
INSERT_FLIGHT = """
INSERT INTO Flight (Flight_ID, Departure, Arrival, Flight_date, A_ID)
VALUES (%s, %s, %s, %s, %s)
"""

# --- AirFare ---
INSERT_AIRFARE = """
INSERT INTO AirFare (Fare_ID, Charge_Amount, Description, Flight_ID)
VALUES (%s, %s, %s, %s)
"""

# --- Junction Tables (We'll need these too) ---
INSERT_CAN_LAND = "INSERT INTO Can_Land (Air_code, Flight_ID) VALUES (%s, %s)"
INSERT_TRAVELS_ON = "INSERT INTO Travels_on (Route_ID, Flight_ID) VALUES (%s, %s)"

GET_ALL_EMPLOYEES = """
SELECT Emp_ID, E_Name, Employee_Type, Air_code, Contact 
FROM Employees
ORDER BY E_Name
"""