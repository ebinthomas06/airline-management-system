// src/api/flightApi.js

// We'll use a base URL, but for now, we'll hardcode it.
// Make sure your FastAPI backend is running on port 8000.
const API_BASE_URL = "http://127.0.0.1:8000";

export const getFlights = async () => {
  const response = await fetch(`${API_BASE_URL}/flights/`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch flights. Network response was not ok.');
  }
  
  return await response.json();
};
export const getFaresForFlight = async (flightId) => {
  const response = await fetch(`${API_BASE_URL}/flights/${flightId}/fares/`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch fares.');
  }
  
  return await response.json();
};

export const createBooking = async (bookingData) => {
  // bookingData will be: { flight_id, fare_id, passenger: { ... } }
  
  const response = await fetch(`${API_BASE_URL}/bookings/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    // Try to get a specific error message from the API
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to create booking.');
  }

  return await response.json();
};