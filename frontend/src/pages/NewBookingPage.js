import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import BookingWizard from '../components/booking/BookingWizard';

const NewBookingPage = () => {
  return (
    <Container fluid>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-1">New Booking</h1>
        <p className="text-muted mb-4">Create a new flight booking</p>
      </motion.div>
      
      <BookingWizard />
    </Container>
  );
};

export default NewBookingPage;