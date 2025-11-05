import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const PassengerForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    ps_name: '',
    address: '',
    age: '',
    sex: 'M',
    contacts: ''
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // Pass the data up to the wizard
      onSubmit({
        ...formData,
        age: parseInt(formData.age) // Ensure age is an integer
      });
    }
    
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="formPsName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="ps_name"
            value={formData.ps_name}
            onChange={handleChange}
            placeholder="Aadi S"
          />
          <Form.Control.Feedback type="invalid">Please provide a name.</Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group as={Col} md="3" controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            required
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="20"
          />
          <Form.Control.Feedback type="invalid">Please provide an age.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="formSex">
          <Form.Label>Sex</Form.Label>
          <Form.Select name="sex" value={formData.sex} onChange={handleChange}>
            <option value="M">M</option>
            <option value="F">F</option>
            <option value="O">Other</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="8" controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main St, Kottayam"
          />
          <Form.Control.Feedback type="invalid">Please provide an address.</Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group as={Col} md="4" controlId="formContacts">
          <Form.Label>Contact Number</Form.Label>
          <Form.Coo
            required
            type="text"
            name="contacts"
            value={formData.contacts}
            onChange={handleChange}
            placeholder="9876543210"
          />
          <Form.Control.Feedback type="invalid">Please provide a contact number.</Form.Control.Feedback>
        </Form.Group>
      </Row>
      
      <Button type="submit" className="mt-3">
        Continue to Review
      </Button>
    </Form>
  );
};

export default PassengerForm;