// src/components/layout/AppLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const SIDEBAR_WIDTH = '250px'; // Same width from Sidebar.js

const AppLayout = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ 
          marginLeft: SIDEBAR_WIDTH, // <-- THIS IS THE FIX
          padding: '2rem', 
          backgroundColor: '#f8f9fa' 
      }}>
        <Outlet /> 
      </main>
    </div>
  );
};

export default AppLayout;