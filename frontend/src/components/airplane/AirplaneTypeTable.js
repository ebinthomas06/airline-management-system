import React from 'react';
import { Table, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const AirplaneTypeTable = ({ airplanes }) => {
  const rowVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Header as="h5">All Available Airplane Types</Card.Header>
      <Card.Body>
        <Table responsive hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th>Airplane ID</th>
              <th>Company</th>
              <th>Capacity (Seats)</th>
              <th>Weight (kg)</th>
            </tr>
          </thead>
          <tbody>
            {airplanes.map((plane, index) => (
              <motion.tr 
                key={plane.A_ID}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
              >
                {/* Use the PascalCase/snake_case from your DB */}
                <td><strong>{plane.A_ID}</strong></td>
                <td>{plane.Company}</td>
                <td>{plane.Capacity}</td>
                <td>{plane.A_weight}</td>
              </motion.tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default AirplaneTypeTable;