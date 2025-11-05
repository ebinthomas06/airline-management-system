// src/components/layout/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

// Basic styles to match your design
const sidebarStyle = {
  width: '250px',
  backgroundColor: '#0f172a', // Dark blue/slate color
  padding: '1rem',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
};

const linkStyle = {
  color: '#e2e8f0', // Light text color
  textDecoration: 'none',
  padding: '0.75rem 1rem',
  display: 'block',
  borderRadius: '0.375rem',
  marginBottom: '0.5rem',
};

const activeLinkStyle = {
  backgroundColor: '#1e293b', // Slightly lighter active state
  color: '#ffffff',
  fontWeight: '600',
};

const Sidebar = () => {
  return (
    <Nav style={sidebarStyle} className="flex-column">
      <h3 style={{ color: 'white', padding: '0 1rem 1rem 1rem' }}>
        ✈️ Airline Portal
      </h3>
      
      <NavLink 
        to="/" 
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
      >
        Dashboard
      </NavLink>
      
      <NavLink 
        to="/flights" 
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
      >
        Flights
      </NavLink>

      <NavLink 
        to="/bookings/new" 
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
      >
        New Booking
      </NavLink>

      <NavLink 
        to="/employees" 
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
      >
        Employees
      </NavLink>
      
      <hr style={{ borderColor: '#e2e8f0' }} />
      <NavLink 
        to="/admin/countries" 
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
      >
        Admin: Countries
      </NavLink>
      <NavLink 
        to="/admin/airports" 
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
      >
        Admin: Airports
      </NavLink>
      <NavLink 
        to="/admin/airplane-types" 
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
      >
        Admin: Airplane Types
      </NavLink>
      <NavLink 
        to="/admin/routes" 
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
      >
        Admin: Routes
      </NavLink>
      <NavLink 
        to="/admin/flights" 
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
      >
        Admin: Flights
      </NavLink>
      <NavLink 
        to="/admin/airfares" 
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
      >
        Admin: AirFares
      </NavLink>
    </Nav>
  );
};

export default Sidebar;