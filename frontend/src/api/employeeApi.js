const API_BASE_URL = "http://127.0.0.1:8000";

// Helper for POST requests
const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to create employee.');
  }
  return await response.json();
};

// --- GET Employee ---
export const getEmployeeDetails = async (empId) => {
  const response = await fetch(`${API_BASE_URL}/employees/${empId}`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to fetch employee.');
  }
  
  return await response.json();
};

// --- CREATE Employees ---
export const createPilot = async (pilotData) => {
  return postData(`${API_BASE_URL}/employees/pilot/`, pilotData);
};

export const createCabinCrew = async (crewData) => {
  return postData(`${API_BASE_URL}/employees/cabincrew/`, crewData);
};

export const createGroundCrew = async (crewData) => {
  return postData(`${API_BASE_URL}/employees/groundcrew/`, crewData);
};

export const getAllEmployees = async () => {
  const response = await fetch(`${API_BASE_URL}/employees/`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch all employees.');
  }
  
  return await response.json();
};