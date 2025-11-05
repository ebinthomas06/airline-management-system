// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout
import AppLayout from './components/layout/AppLayout';

// Pages
import DashboardPage from './pages/DashboardPage';
import FlightsPage from './pages/FlightsPage';
import NewBookingPage from './pages/NewBookingPage';
import EmployeesPage from './pages/EmployeesPage';
import NewEmployeePage from './pages/NewEmployeePage';
import EmployeeDetailPage from './pages/EmployeeDetailPage';
import TestComponentsPage from './pages/TestComponentsPage'; // Your test page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All pages inside AppLayout will have the sidebar */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="flights" element={<FlightsPage />} />
          <Route path="bookings/new" element={<NewBookingPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="employees/new" element={<NewEmployeePage />} />
          <Route path="employees/:emp_id" element={<EmployeeDetailPage />} />
          <Route path="test" element={<TestComponentsPage />} /> {/* Test route */}
        </Route>

        {/* You could have other routes here that *don't* use the layout,
            like a login page, for example. */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;