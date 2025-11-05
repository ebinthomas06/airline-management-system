import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

// API
import { createPilot, createCabinCrew, createGroundCrew } from '../../api/employeeApi';
import LoadingSpinner from '../ui/LoadingSpinner';

// Animation for the form fields
const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const EmployeeForm = () => {
  const [employeeType, setEmployeeType] = useState('pilot'); // Default to pilot
  const [formData, setFormData] = useState({
    // Base fields
    emp_id: '',
    e_name: '',
    address: '',
    age: '',
    email_id: '',
    contact: '',
    air_code: '',
    // Pilot fields
    license_number: '',
    medical_expiry_date: '',
    flight_hours: 0,
    // Cabin Crew fields
    certification_id: '',
    service_training_level: 'Economy',
    // Ground Crew fields
    role: '',
    security_clearance_level: 1
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validated, setValidated] = useState(false);

  // Handle changes for ALL form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    // Stop if form is invalid
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setValidated(true);
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // 1. Prepare base data
    const baseData = {
      emp_id: parseInt(formData.emp_id),
      e_name: formData.e_name,
      address: formData.address,
      age: parseInt(formData.age),
      email_id: formData.email_id,
      contact: formData.contact,
      air_code: formData.air_code,
    };

    try {
      let response;
      // 2. Call the correct API based on type
      if (employeeType === 'pilot') {
        const pilotData = {
          ...baseData,
          license_number: formData.license_number,
          medical_expiry_date: formData.medical_expiry_date,
          flight_hours: parseInt(formData.flight_hours)
        };
        response = await createPilot(pilotData);
        
      } else if (employeeType === 'cabin_crew') {
        const crewData = {
          ...baseData,
          certification_id: formData.certification_id,
          service_training_level: formData.service_training_level
        };
        response = await createCabinCrew(crewData);

      } else if (employeeType === 'ground_crew') {
        const crewData = {
          ...baseData,
          role: formData.role,
          security_clearance_level: parseInt(formData.security_clearance_level)
        };
        response = await createGroundCrew(crewData);
      }
      
      setSuccess(`Success! ${response.status} with ID: ${response.emp_id}`);
      form.reset(); // Clear the form
      setValidated(false); // Reset validation
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Dynamic Form Sections ---

  const renderPilotFields = () => (
    <motion.div variants={fieldVariants} initial="hidden" animate="visible">
      <h5 className="mt-4">Pilot Details</h5>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="formLicense">
          <Form.Label>License Number</Form.Label>
          <Form.Control required type="text" name="license_number" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="formMedical">
          <Form.Label>Medical Expiry</Form.Label>
          <Form.Control required type="date" name="medical_expiry_date" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="formFlightHours">
          <Form.Label>Flight Hours</Form.Label>
          <Form.Control required type="number" name="flight_hours" onChange={handleChange} defaultValue={0} />
        </Form.Group>
      </Row>
    </motion.div>
  );

  const renderCabinCrewFields = () => (
    <motion.div variants={fieldVariants} initial="hidden" animate="visible">
      <h5 className="mt-4">Cabin Crew Details</h5>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="formCertId">
          <Form.Label>Certification ID</Form.Label>
          <Form.Control required type="text" name="certification_id" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="formServiceLevel">
          <Form.Label>Service Training Level</Form.Label>
          <Form.Select name="service_training_level" onChange={handleChange}>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First">First</option>
          </Form.Select>
        </Form.Group>
      </Row>
    </motion.div>
  );

  const renderGroundCrewFields = () => (
    <motion.div variants={fieldVariants} initial="hidden" animate="visible">
      <h5 className="mt-4">Ground Crew Details</h5>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control required type="text" name="role" placeholder="e.g., Baggage, Gate Agent" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="formSecurity">
          <Form.Label>Security Clearance (1-5)</Form.Label>
          <Form.Control required type="number" name="security_clearance_level" min="1" max="5" defaultValue={1} onChange={handleChange} />
        </Form.Group>
      </Row>
    </motion.div>
  );

  return (
    <Card className="shadow-sm border-0">
      <Card.Body style={{ padding: '2rem' }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {/* --- Type Selector --- */}
          <Form.Group as={Row} className="mb-3" controlId="formEmployeeType">
            <Form.Label column sm="3"><strong>Employee Type</strong></Form.Label>
            <Col sm="9">
              <Form.Select name="employeeType" onChange={(e) => setEmployeeType(e.target.value)}>
                <option value="pilot">Pilot</option>
                <option value="cabin_crew">Cabin Crew</option>
                <option value="ground_crew">Ground Crew</option>
              </Form.Select>
            </Col>
          </Form.Group>
          
          <hr />
          
          {/* --- Base Fields --- */}
          <h5>Base Details</h5>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="formEmpId">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control required type="number" name="emp_id" onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please provide an ID.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="8" controlId="formName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control required type="text" name="e_name" onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please provide a name.</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" name="email_id" onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="formContact">
              <Form.Label>Contact</Form.Label>
              <Form.Control required type="text" name="contact" onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control required type="number" name="age" onChange={handleChange} />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="8" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control required type="text" name="address" onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="formAirCode">
              <Form.Label>Base Airport Code</Form.Label>
              <Form.Control required type="text" name="air_code" placeholder="e.g., JFK, DEL" onChange={handleChange} />
            </Form.Group>
          </Row>

          {/* --- Specialized Fields --- */}
          <AnimatePresence mode="wait">
            {employeeType === 'pilot' && renderPilotFields()}
            {employeeType === 'cabin_crew' && renderCabinCrewFields()}
            {employeeType === 'ground_crew' && renderGroundCrewFields()}
          </AnimatePresence>

          {/* --- Submit & Status --- */}
          <div className="mt-4">
            {isLoading ? <LoadingSpinner /> : (
              <Button type="submit" variant="primary">Create Employee</Button>
            )}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
          </div>
          
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EmployeeForm;