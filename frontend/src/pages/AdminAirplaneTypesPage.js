// src/pages/AdminAirplaneTypesPage.js
import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { createAirplaneType } from '../api/adminApi';

const AdminAirplaneTypesPage = () => {
  const [formData, setFormData] = useState({ a_id: '', capacity: '', a_weight: '', company: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation(); setValidated(true); return;
    }
    setError(null); setSuccess(null);
    try {
      const data = {
        ...formData,
        a_id: parseInt(formData.a_id),
        capacity: parseInt(formData.capacity),
        a_weight: parseInt(formData.a_weight),
      };
      const response = await createAirplaneType(data);
      setSuccess(`Airplane Type "${response.a_id}" created!`);
      form.reset(); setValidated(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container fluid>
      <h1>Admin: Create Airplane Type</h1>
      <Card className="shadow-sm border-0 mt-4">
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="formAId">
                <Form.Label>Airplane ID</Form.Label>
                <Form.Control required type="number" name="a_id" onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="formCompany">
                <Form.Label>Company</Form.Label>
                <Form.Control required type="text" name="company" onChange={handleChange} placeholder="e.g., Boeing" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="formCapacity">
                <Form.Label>Capacity</Form.Label>
                <Form.Control required type="number" name="capacity" onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="formWeight">
                <Form.Label>Weight</Form.Label>
                <Form.Control required type="number" name="a_weight" onChange={handleChange} />
              </Form.Group>
            </Row>
            <Button type="submit" className="mt-3">Create Airplane Type</Button>
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default AdminAirplaneTypesPage;