import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import EmployeeSearch from '../components/employee/EmployeeSearch';

const EmployeesPage = () => {
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

      <Row>
        {/* --- Add New Employee Card --- */}
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
                  Add a new pilot, cabin crew, or ground crew member to the system.
                </Card.Text>
                <Button 
                  as={Link} 
                  to="/employees/new" 
                  variant="outline-primary"
                >
                  Add Employee
                </Button>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        {/* --- Find Employee Card --- */}
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
    </Container>
  );
};

export default EmployeesPage;