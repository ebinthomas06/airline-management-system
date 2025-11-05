import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import EmployeeForm from '../components/employee/EmployeeForm'; // Import the new form

const NewEmployeePage = () => {
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
        <h1 className="mb-1">Add New Employee</h1>
        <p className="text-muted mb-4">Select an employee type and fill in the details.</p>
      </motion.div>
      
      {/* Render the smart form component */}
      <EmployeeForm />
    </Container>
  );
};

export default NewEmployeePage;