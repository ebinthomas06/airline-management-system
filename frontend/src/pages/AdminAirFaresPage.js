// src/pages/AdminAirFaresPage.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { createAirFare, getFlightIDs } from '../api/adminApi';

const AdminAirFaresPage = () => {
  const [formData, setFormData] = useState({ fare_id: '', charge_amount: '', description: 'Economy', flight_id: '' });
  const [flightIDs, setFlightIDs] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const ids = await getFlightIDs();
        setFlightIDs(ids);
        if (ids.length > 0) {
          setFormData(prev => ({ ...prev, flight_id: ids[0].Flight_ID }));
        }
      } catch (err) {
        setError("Failed to load flights. Please create one first.");
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
      const data = {
        ...formData,
        fare_id: parseInt(formData.fare_id),
        charge_amount: parseInt(formData.charge_amount),
      };
      const response = await createAirFare(data);
      setSuccess(`Fare "${response.fare_id}" created!`);
      form.reset();
      setFormData(prev => ({ ...prev, flight_id: flightIDs[0]?.Flight_ID || '', description: 'Economy' }));
      setValidated(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container fluid>
      {/* This is the correct title, the stray text is gone */}
      <h1>Admin: Create AirFare</h1> 
      <Card className="shadow-sm border-0 mt-4">
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="formFareId">
                <Form.Label>Fare ID</Form.Label>
                <Form.Control required type="number" name="fare_id" onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="formCharge">
                <Form.Label>Charge Amount</Form.Label>
                <Form.Control required type="number" name="charge_amount" onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="formDesc">
                <Form.Label>Description</Form.Label>
                <Form.Select name="description" value={formData.description} onChange={handleChange}>
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                  <option value="First">First</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="formFlightIdSelect">
                <Form.Label>For Flight</Form.Label>
                <Form.Select required name="flight_id" value={formData.flight_id} onChange={handleChange}>
                  {flightIDs.map(f => <option key={f.Flight_ID} value={f.Flight_ID}>{f.Flight_ID}</option>)}
                </Form.Select>
              </Form.Group>
            </Row>
            <Button type="submit" className="mt-3">Create AirFare</Button>
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default AdminAirFaresPage;