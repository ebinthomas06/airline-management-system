// src/pages/EmployeeDetailPage.js
import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// API
import { getEmployeeDetails } from '../api/employeeApi';

// Components
import EmployeeProfile from '../components/employee/EmployeeProfile';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AlertMessage from '../components/ui/AlertMessage';

const EmployeeDetailPage = () => {
  const { emp_id } = useParams(); 
  
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setEmployee(null); // Reset employee state on new search
        const data = await getEmployeeDetails(emp_id);
        setEmployee(data);
      } catch (err) {
        setError(err.message); // This will be "Employee not found"
      } finally {
        setIsLoading(false);
      }
    };
    
    if (emp_id) {
      loadEmployee();
    }
  }, [emp_id]);

  // --- THIS IS THE CRITICAL LOGIC ---
  // This function checks the state *before* rendering the profile
  const renderContent = () => {
    // 1. Show spinner while loading
    if (isLoading) {
      return <LoadingSpinner />;
    }
    
    // 2. Show error if API failed (e.g., 404 Not Found)
    if (error) {
      return <AlertMessage message={error} />;
    }
    
    // 3. Show message if no employee (and no error)
    if (!employee) {
      return <AlertMessage variant="info" message="No employee data found." />;
    }

    // 4. Only if all checks pass, render the profile
    return <EmployeeProfile employee={employee} />;
  };

  return (
    <Container fluid>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button as={Link} to="/employees" variant="link" className="p-0 mb-2">
          ← Back to Employees
        </Button>
        <h1 className="mb-4">Employee Details</h1>
      </motion.div>
      
      {/* This calls the safe render function */}
      {renderContent()}
    </Container>
  );
};

export default EmployeeDetailPage;