// src/pages/AdminCountriesPage.js
import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { createCountry } from '../api/adminApi';

const AdminCountriesPage = () => {
  const [formData, setFormData] = useState({ country_code: '', country_name: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validated, setValidated] = useState(false);

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
      const response = await createCountry(data);
      setSuccess(`Country "${response.country_code}" created successfully!`);
      form.reset();
      setValidated(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container fluid>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Admin: Create Country
      </motion.h1>
      
      <Card className="shadow-sm border-0 mt-4">
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} md="4" controlId="formCountryCode">
                <Form.Label>Country Code</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="country_code"
                  onChange={handleChange}
                  placeholder="e.g., 91"
                />
                <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="8" controlId="formCountryName">
                <Form.Label>Country Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="country_name"
                  onChange={handleChange}
                  placeholder="e.g., India"
                />
                <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit" className="mt-3">Create Country</Button>
            
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminCountriesPage;