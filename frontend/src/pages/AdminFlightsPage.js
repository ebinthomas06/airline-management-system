// src/pages/AdminFlightsPage.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { createFlight, getAirplaneTypes } from '../api/adminApi';

const AdminFlightsPage = () => {
  const [formData, setFormData] = useState({ flight_id: '', departure: '', arrival: '', flight_date: '', a_id: '' });
  const [airplaneTypes, setAirplaneTypes] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const types = await getAirplaneTypes();
        setAirplaneTypes(types);
        if (types.length > 0) {
          setFormData(prev => ({ ...prev, a_id: types[0].A_ID }));
        }
      } catch (err) {
        setError("Failed to load airplane types. Please create one first.");
      }
    };
    loadData();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation(); setValidated(true); return;
    }
    setError(null); setSuccess(null);
    try {
      const data = { ...formData, a_id: parseInt(formData.a_id) };
      const response = await createFlight(data);
      setSuccess(`Flight "${response.flight_id}" created!`);
      form.reset();
      setFormData(prev => ({ ...prev, a_id: airplaneTypes[0]?.A_ID || '' }));
      setValidated(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container fluid>
      <h1>Admin: Create Flight</h1>
      <Card className="shadow-sm border-0 mt-4">
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="formFlightId">
                <Form.Label>Flight ID</Form.Label>
                <Form.Control required type="text" name="flight_id" onChange={handleChange} placeholder="e.g., AI-101" />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="formFlightDate">
                <Form.Label>Flight Date</Form.Label>
                <Form.Control required type="date" name="flight_date" onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="formAIdSelect">
                <Form.Label>Airplane Type</Form.Label>
                <Form.Select required name="a_id" value={formData.a_id} onChange={handleChange}>
                  {airplaneTypes.map(t => (
                    <option key={t.A_ID} value={t.A_ID}>
                      {t.Company} (ID: {t.A_ID}, Cap: {t.Capacity})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="formDeparture">
                <Form.Label>Departure (DateTime)</Form.Label>
                <Form.Control required type="text" name="departure" onChange={handleChange} placeholder="e.g., 2025-11-10 14:30:00" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="formArrival">
                <Form.Label>Arrival (DateTime)</Form.Label>
                <Form.Control required type="text" name="arrival" onChange={handleChange} placeholder="e.g., 2025-11-10 16:30:00" />
              </Form.Group>
            </Row>
            <Button type="submit" className="mt-3">Create Flight</Button>
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default AdminFlightsPage;