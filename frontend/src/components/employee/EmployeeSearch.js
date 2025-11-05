import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EmployeeSearch = () => {
  const [empId, setEmpId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (empId) {
      // Navigate to the details page for this employee
      navigate(`/employees/${empId}`);
    }
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <Card.Title as="h5">Find Employee</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formEmpId">
            <Form.Label column sm="4">
              Employee ID
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                placeholder="Enter employee ID"
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            View Employee
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EmployeeSearch;