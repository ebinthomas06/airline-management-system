# Query to get all flight details for the search page
GET_FLIGHTS_QUERY = """
SELECT 
    f.Flight_ID, 
    at.Company, 
    r.Take_Off_point, 
    r.Destination,
    f.Departure,
    f.Arrival
FROM Flight AS f
JOIN Airplane_type AS at ON f.A_ID = at.A_ID
JOIN Travels_on AS t ON f.Flight_ID = t.Flight_ID
JOIN Route AS r ON t.Route_ID = r.Route_ID
"""

# Query to insert a new passenger
INSERT_PASSENGER_QUERY = """
INSERT INTO Passengers 
    (Ps_Name, Address, Age, Sex, Contacts, Flight_ID)
VALUES 
    (%s, %s, %s, %s, %s, %s)
"""

# Query to insert a new transaction
INSERT_TRANSACTION_QUERY = """
INSERT INTO Transactions
    (TS_ID, Booking_Date, Departure_Date, TS_Type, Emp_ID, Ps_ID, Flight_ID, Charge_Amount)
VALUES
    (%s, CURDATE(), (SELECT Flight_date FROM Flight WHERE Flight_ID = %s), %s, %s, %s, %s, %s)
"""