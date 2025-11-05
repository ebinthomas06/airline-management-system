// src/pages/AdminRoutesPage.js
import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { createRoute } from '../api/adminApi';

const AdminRoutesPage = () => {
  const [formData, setFormData] = useState({ route_id: '', take_off_point: '', destination: '', r_type: 'Domestic' });
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
      const data = { ...formData, route_id: parseInt(formData.route_id) };
      const response = await createRoute(data);
      setSuccess(`Route "${response.route_id}" created!`);
      form.reset(); setValidated(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container fluid>
      <h1>Admin: Create Route</h1>
      <Card className="shadow-sm border-0 mt-4">
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="formRouteId">
                <Form.Label>Route ID</Form.Label>
                <Form.Control required type="number" name="route_id" onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="formRType">
                <Form.Label>Route Type</Form.Label>
                <Form.Select name="r_type" onChange={handleChange}>
                  <option value="Domestic">Domestic</option>
                  <option value="International">International</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="formTakeOff">
                <Form.Label>Take Off Point (Airport Code)</Form.Label>
                <Form.Control required type="text" name="take_off_point" onChange={handleChange} placeholder="e.g., COK" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="formDestination">
                <Form.Label>Destination (Airport Code)</Form.Label>
                <Form.Control required type="text" name="destination" onChange={handleChange} placeholder="e.g., DEL" />
              </Form.Group>
            </Row>
            <Button type="submit" className="mt-3">Create Route</Button>
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default AdminRoutesPage;