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