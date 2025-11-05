// src/api/adminApi.js
const API_BASE_URL = "http://127.0.0.1:8000";

// Helper for POST requests
const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to create item.');
  }
  return await response.json();
};

export const getCountries = async () => {
  const response = await fetch(`${API_BASE_URL}/countries/`);
  if (!response.ok) {
    throw new Error('Failed to fetch countries.');
  }
  return await response.json();
};

export const createCountry = async (countryData) => {
  return postData(`${API_BASE_URL}/countries/`, countryData);
};

export const createAirport = async (airportData) => {
  return postData(`${API_BASE_URL}/airports/`, airportData);
};

export const getAirplaneTypes = async () => {
  const response = await fetch(`${API_BASE_URL}/airplane-types/`);
  if (!response.ok) throw new Error('Failed to fetch airplane types.');
  return await response.json();
};

export const createAirplaneType = async (data) => {
  return postData(`${API_BASE_URL}/airplane-types/`, data);
};

export const getRoutes = async () => {
  const response = await fetch(`${API_BASE_URL}/routes/`);
  if (!response.ok) throw new Error('Failed to fetch routes.');
  return await response.json();
};

export const createRoute = async (data) => {
  return postData(`${API_BASE_URL}/routes/`, data);
};

export const getFlightIDs = async () => {
  const response = await fetch(`${API_BASE_URL}/flight-ids/`);
  if (!response.ok) throw new Error('Failed to fetch flight IDs.');
  return await response.json();
};

export const createFlight = async (data) => {
  return postData(`${API_BASE_URL}/flights/`, data);
};

export const createAirFare = async (data) => {
  return postData(`${API_BASE_URL}/airfares/`, data);
};