import React from 'react';
import { Table, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

// Animation for each row
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const FlightTable = ({ flights, onRowClick }) => {
  
  const handleRowClick = (flight) => {
    // Only call the prop function if it was provided
    if (onRowClick) {
      onRowClick(flight);
    }
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <Table responsive hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th>Flight ID</th>
              <th>Company</th>
              <th>Take Off</th>
              <th>Destination</th>
              <th>Departure</th>
              <th>Arrival</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, index) => (
              <motion.tr
                key={flight.flight_id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
                onClick={() => handleRowClick(flight)}
                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                <td><strong>{flight.flight_id}</strong></td>
                <td>{flight.company}</td>
                <td>{flight.take_off_point}</td>
                <td>{flight.destination}</td>
                <td>{flight.departure}</td>
                <td>{flight.arrival}</td>
              </motion.tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default FlightTable;