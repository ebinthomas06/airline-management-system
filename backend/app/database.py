import mysql.connector
from mysql.connector import pooling
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Create a connection pool
try:
    db_pool = pooling.MySQLConnectionPool(
        pool_name="airline_pool",
        pool_size=5,  # Number of connections to keep open
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )
    print("Database connection pool created successfully.")

except mysql.connector.Error as err:
    print(f"Error creating database connection pool: {err}")
    exit(1) # Exit if pool creation fails

def get_db_connection():
    """Gets a connection from the pool."""
    try:
        return db_pool.get_connection()
    except mysql.connector.Error as err:
        print(f"Error getting connection from pool: {err}")
        return None