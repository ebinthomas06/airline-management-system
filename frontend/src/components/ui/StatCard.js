import React from 'react';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

// Simple animation for the card
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const StatCard = ({ title, value, subtitle, icon }) => {
  return (
    <motion.div
      variants={cardVariants}
    >
      <Card className="shadow-sm border-0">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Card.Subtitle 
                as="h6" 
                className="text-muted mb-2" 
                style={{ fontWeight: '500' }}
              >
                {title}
              </Card.Subtitle>
              <Card.Title as="h2" className="mb-1">{value}</Card.Title>
              <span className="text-muted" style={{ fontSize: '0.9rem' }}>
                {subtitle}
              </span>
            </div>
            <div style={{ fontSize: '2rem', color: '#6c757d' }}>
              {icon}
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default StatCard;