// src/pages/EmployeesPage.js
import React, { useState, useEffect } from 'react'; // Import hooks
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import new components
import EmployeeSearch from '../components/employee/EmployeeSearch';
import EmployeeTable from '../components/employee/EmployeeTable';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AlertMessage from '../components/ui/AlertMessage';

// Import new API function
import { getAllEmployees } from '../api/employeeApi';

const EmployeesPage = () => {
  // Add state to hold the employee list
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employees when the page loads
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        setIsLoading(true);
        const data = await getAllEmployees();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadEmployees();
  }, []); // Empty array runs this once

  // Helper function to render the table or a message
  const renderEmployeeList = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return <AlertMessage message={error} />;
    }
    if (employees.length === 0) {
      return <AlertMessage variant="info" message="No employees found." />;
    }
    return <EmployeeTable employees={employees} />;
  };

  return (
    <Container fluid>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-1">Employees</h1>
        <p className="text-muted mb-4">Manage airline employees</p>
      </motion.div>

      {/* This is the existing section */}
      <Row>
        <Col md={6} className="mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title as="h5">Add New Employee</Card.Title>
                <Card.Text>
                  Add a new pilot, cabin crew, or ground crew member.
                </Card.Text>
                <Button as={Link} to="/employees/new" variant="outline-primary">
                  Add Employee
                </Button>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        <Col md={6} className="mb-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <EmployeeSearch />
          </motion.div>
        </Col>
      </Row>

      {/* --- ADD THIS NEW SECTION --- */}
      <Row>
        <Col>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {renderEmployeeList()}
          </motion.div>
        </Col>
      </Row>
      
    </Container>
  );
};

export default EmployeesPage;