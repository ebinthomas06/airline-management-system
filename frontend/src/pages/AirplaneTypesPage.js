import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';

// Import components
import AirplaneTypeTable from '../components/airplane/AirplaneTypeTable';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AlertMessage from '../components/ui/AlertMessage';

// Import API function from the adminApi file
import { getAirplaneTypes } from '../api/adminApi';

const AirplaneTypesPage = () => {
  const [airplanes, setAirplanes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch airplanes when the page loads
  useEffect(() => {
    const loadAirplanes = async () => {
      try {
        setIsLoading(true);
        const data = await getAirplaneTypes();
        setAirplanes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadAirplanes();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return <AlertMessage message={error} />;
    }
    if (airplanes.length === 0) {
      return <AlertMessage variant="info" message="No airplane types found." />;
    }
    return <AirplaneTypeTable airplanes={airplanes} />;
  };

  return (
    <Container fluid>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-1">Airplanes</h1>
        <p className="text-muted mb-4">View all available airplane types in the fleet</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {renderContent()}
      </motion.div>
    </Container>
  );
};

export default AirplaneTypesPage;