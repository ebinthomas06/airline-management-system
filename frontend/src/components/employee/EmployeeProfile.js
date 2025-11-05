import React from 'react';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';

// Helper component for displaying a single detail
const DetailItem = ({ label, value }) => (
  <ListGroup.Item>
    <Row>
      <Col sm={4}>
        <strong className="text-muted">{label}</strong>
      </Col>
      <Col sm={8}>
        {value}
      </Col>
    </Row>
  </ListGroup.Item>
);

const EmployeeProfile = ({ employee }) => {

  // Conditionally render the specialized details
  const renderSpecializedDetails = () => {
    switch (employee.employee_type) {
      case 'pilot':
        return (
          <Card className="mt-4 shadow-sm border-0">
            <Card.Header as="h5">Pilot Details</Card.Header>
            <ListGroup variant="flush">
              <DetailItem label="License #" value={employee.license_number} />
              <DetailItem label="Flight Hours" value={employee.flight_hours} />
              <DetailItem label="Medical Expiry" value={new Date(employee.medical_expiry_date).toLocaleDateString()} />
            </ListGroup>
          </Card>
        );
      case 'cabin_crew':
        return (
          <Card className="mt-4 shadow-sm border-0">
            <Card.Header as="h5">Cabin Crew Details</Card.Header>
            <ListGroup variant="flush">
              <DetailItem label="Certification ID" value={employee.certification_id} />
              <DetailItem label="Service Level" value={employee.service_training_level} />
            </ListGroup>
          </Card>
        );
      case 'ground_crew':
        return (
          <Card className="mt-4 shadow-sm border-0">
            <Card.Header as="h5">Ground Crew Details</Card.Header>
            <ListGroup variant="flush">
              <DetailItem label="Role" value={employee.role} />
              <DetailItem label="Security Clearance" value={employee.security_clearance_level} />
            </ListGroup>
          </Card>
        );
      default:
        // For employees with no type or just base details
        return null; 
    }
  };

  return (
    <>
      {/* --- Base Profile Card --- */}
      <Card className="shadow-sm border-0">
        <Card.Header as="h5" className="bg-primary text-white">
          Employee Profile
        </Card.Header>
        <Card.Body>
          <Card.Title as="h3">{employee.e_name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Employee ID: {employee.emp_id} | Type: {employee.employee_type || 'N/A'}
          </Card.Subtitle>
          
          <ListGroup variant="flush" className="mt-4">
            <DetailItem label="Email" value={employee.email_id} />
            <DetailItem label="Contact" value={employee.contact} />
            <DetailItem label="Age" value={employee.age} />
            <DetailItem label="Address" value={employee.address} />
            <DetailItem label="Base Airport" value={employee.air_code} />
          </ListGroup>
        </Card.Body>
      </Card>

      {/* --- Specialized Details Card --- */}
      {renderSpecializedDetails()}
    </>
  );
};

export default EmployeeProfile;