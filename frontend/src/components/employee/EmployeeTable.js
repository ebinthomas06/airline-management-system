// src/components/employee/EmployeeTable.js
import React from 'react';
import { Table, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const EmployeeTable = ({ employees }) => {
  const navigate = useNavigate();

  const handleRowClick = (empId) => {
    // Navigate to the detail page for the clicked employee
    navigate(`/employees/${empId}`);
  };

  const rowVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Header as="h5">All Employees</Card.Header>
      <Card.Body>
        <Table responsive hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Base Airport</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <motion.tr 
                key={emp.Emp_ID} 
                onClick={() => handleRowClick(emp.Emp_ID)} 
                style={{ cursor: 'pointer' }}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
              >
                {/* Use the PascalCase/snake_case from your DB */}
                <td><strong>{emp.Emp_ID}</strong></td>
                <td>{emp.E_Name}</td>
                <td>{emp.Employee_Type}</td>
                <td>{emp.Air_code}</td>
                <td>{emp.Contact}</td>
              </motion.tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default EmployeeTable;