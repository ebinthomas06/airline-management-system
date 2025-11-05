import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

// API
import { getFlights } from '../api/flightApi';

// Components
import FlightTable from '../components/flight/FlightTable';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AlertMessage from '../components/ui/AlertMessage';

const FlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function inside useEffect
    const loadFlights = async () => {
      try {
        setIsLoading(true);
        const data = await getFlights();
        setFlights(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadFlights();
  }, []); // Empty dependency array means this runs once on mount

  // Helper function to render content based on state
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    
    if (error) {
      return <AlertMessage message={error} />;
    }
    
    if (flights.length === 0) {
      return <AlertMessage variant="info" message="No flights found." />;
    }

    // We pass the onRowClick prop as null (or undefined)
    // because we don't need to do anything when clicking
    // a row on this page.
    return <FlightTable flights={flights} />;
  };

  return (
    <Container fluid>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-1">Flights</h1>
        <p className="text-muted mb-4">View all available flights</p>
      </motion.div>
      
      {renderContent()}
    </Container>
  );
};

export default FlightsPage;