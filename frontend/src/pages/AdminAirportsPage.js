// src/pages/AdminAirportsPage.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { createAirport, getCountries } from '../api/adminApi';

const AdminAirportsPage = () => {
  const [formData, setFormData] = useState({
    air_code: '',
    air_name: '',
    city: '',
    state: '',
    country_code: ''
  });
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validated, setValidated] = useState(false);

  // Fetch countries on component load
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
        if (data.length > 0) {
          // Set default country code in form
          setFormData(prev => ({ ...prev, country_code: data[0].Country_code }));
        }
      } catch (err) {
        setError("Failed to load countries list. Please create a country first.");
      }
    };
    loadCountries();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      const data = {
        ...formData,
        country_code: parseInt(formData.country_code)
      };
      const response = await createAirport(data);
      setSuccess(`Airport "${response.air_code}" created successfully!`);
      form.reset();
      // Reset country code to default after reset
      setFormData(prev => ({ ...prev, country_code: countries[0]?.Country_code || '' }));
      setValidated(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container fluid>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Admin: Create Airport
      </motion.h1>
      
      <Card className="shadow-sm border-0 mt-4">
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="formAirCode">
                <Form.Label>Airport Code</Form.Label>
                <Form.Control required type="text" name="air_code" onChange={handleChange} placeholder="e.g., COK" />
                <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="9" controlId="formAirName">
                <Form.Label>Airport Name</Form.Label>
                <Form.Control required type="text" name="air_name" onChange={handleChange} placeholder="e.g., Cochin International Airport" />
                <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control required type="text" name="city" onChange={handleChange} placeholder="e.g., Kochi" />
                <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control required type="text" name="state" onChange={handleChange} placeholder="e.g., Kerala" />
                <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="formCountryCodeSelect">
                <Form.Label>Country</Form.Label>
                <Form.Select required name="country_code" value={formData.country_code} onChange={handleChange}>
                  {countries.length === 0 && <option disabled>Loading or no countries...</option>}
                  {countries.map(c => (
                    <option key={c.Country_code} value={c.Country_code}>
                      {c.Country_Name} ({c.Country_code})
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
              </Form.Group>
            </Row>
            
            <Button type="submit" className="mt-3">Create Airport</Button>
            
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminAirportsPage;