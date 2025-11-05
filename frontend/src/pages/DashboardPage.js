import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StatCard from '../components/ui/StatCard';
import { motion } from 'framer-motion';

// Animation for the container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // Staggers the animation of children
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const DashboardPage = () => {
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Airline Management Portal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted"
          >
            Welcome back! Here's your airline overview.
          </motion.p>
        </Col>
      </Row>

      <motion.div
        as={Row} // Use motion.div and tell it to render as a Row
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          as={Col} // Render as Col
          md={6} lg={3} className="mb-3" 
          variants={itemVariants} // Apply the item animation
        >
          <StatCard 
            title="Today's Flights" 
            value="24" 
            subtitle="Active departures" 
            icon="✈️" 
          />
        </motion.div>

        <motion.div 
          as={Col} 
          md={6} lg={3} className="mb-3" 
          variants={itemVariants}
        >
          <StatCard 
            title="Total Employees" 
            value="342" 
            subtitle="Across all departments" 
            icon="👥" 
          />
        </motion.div>

        <motion.div 
          as={Col} 
          md={6} lg={3} className="mb-3" 
          variants={itemVariants}
        >
          <StatCard 
            title="Bookings" 
            value="1,829" 
            subtitle="This month" 
            icon="🎫" 
          />
        </motion.div>

        <motion.div 
          as={Col} 
          md={6} lg={3} className="mb-3" 
          variants={itemVariants}
        >
          <StatCard 
            title="Airports" 
            value="47" 
            subtitle="Destinations served" 
            icon="📍" 
          />
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default DashboardPage;