import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { motion } from 'framer-motion';

const FareSelector = ({ fares, onFareSelect }) => {
  return (
    <ListGroup>
      {fares.map((fare, index) => (
        <motion.div
          key={fare.fare_id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ListGroup.Item 
            action 
            onClick={() => onFareSelect(fare)}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <h5 className="mb-1">{fare.description}</h5>
              <small>Fare ID: {fare.fare_id}</small>
            </div>
            <h4>${fare.charge_amount}</h4>
          </ListGroup.Item>
        </motion.div>
      ))}
    </ListGroup>
  );
};

export default FareSelector;