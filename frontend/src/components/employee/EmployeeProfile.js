// src/components/employee/EmployeeProfile.js
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
    // --- FIX: Read 'Employee_Type' (PascalCase) ---
    switch (employee.Employee_Type) {
      case 'pilot':
        return (
          <Card className="mt-4 shadow-sm border-0">
            <Card.Header as="h5">Pilot Details</Card.Header>
            <ListGroup variant="flush">
              {/* --- FIX: Read PascalCase keys --- */}
              <DetailItem label="License #" value={employee.License_Number} />
              <DetailItem label="Flight Hours" value={employee.Flight_Hours} />
              <DetailItem label="Medical Expiry" value={new Date(employee.Medical_Expiry_Date).toLocaleDateString()} />
            </ListGroup>
          </Card>
        );
      case 'cabin_crew':
        return (
          <Card className="mt-4 shadow-sm border-0">
            <Card.Header as="h5">Cabin Crew Details</Card.Header>
            <ListGroup variant="flush">
              {/* --- FIX: Read PascalCase keys --- */}
              <DetailItem label="Certification ID" value={employee.Certification_ID} />
              <DetailItem label="Service Level" value={employee.Service_Training_Level} />
            </ListGroup>
          </Card>
        );
      case 'ground_crew':
        return (
          <Card className="mt-4 shadow-sm border-0">
            <Card.Header as="h5">Ground Crew Details</Card.Header>
            <ListGroup variant="flush">
              {/* --- FIX: Read PascalCase keys --- */}
              <DetailItem label="Role" value={employee.Role} />
              <DetailItem label="Security Clearance" value={employee.Security_Clearance_Level} />
            </ListGroup>
          </Card>
        );
      default:
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
          {/* --- FIX: Read PascalCase keys --- */}
          <Card.Title as="h3">{employee.E_Name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Employee ID: {employee.Emp_ID} | Type: {employee.Employee_Type || 'N/A'}
          </Card.Subtitle>
          
          <ListGroup variant="flush" className="mt-4">
            {/* --- FIX: Read PascalCase keys --- */}
            <DetailItem label="Email" value={employee.Email_ID} />
            <DetailItem label="Contact" value={employee.Contact} />
            <DetailItem label="Age" value={employee.Age} />
            <DetailItem label="Address" value={employee.Address} />
            <DetailItem label="Base Airport" value={employee.Air_code} />
          </ListGroup>
        </Card.Body>
      </Card>

      {/* --- Specialized Details Card --- */}
      {renderSpecializedDetails()}
    </>
  );
};

export default EmployeeProfile;