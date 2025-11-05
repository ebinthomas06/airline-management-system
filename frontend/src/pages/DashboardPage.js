import React, { useState, useEffect } from 'react'; // Import useState, useEffect
import { Container, Row, Col } from 'react-bootstrap';
import StatCard from '../components/ui/StatCard';
import { motion } from 'framer-motion';

// --- (Import API) ---
import { getDashboardStats } from '../api/dashboardApi';

// (Animation variants are unchanged)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const DashboardPage = () => {
  // --- (Add State) ---
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // We won't show an error, just "..."

  // --- (Add useEffect to fetch data) ---
  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true);
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load stats:", err);
        // Don't set an error, we'll just show '...'
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStats();
  }, []); // Empty array means run once on load

  return (
    <Container fluid>
      <Row className="mb-4">
        {/* ... (Title and Subtitle are unchanged) ... */}
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
        as={Row}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* --- (Update StatCards) --- */}
        <motion.div 
          as={Col} 
          md={6} lg={3} className="mb-3" 
          variants={itemVariants}
        >
          <StatCard 
            title="Today's Flights" 
            value={isLoading ? "..." : (stats?.flightsToday ?? "0")} 
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
            value={isLoading ? "..." : (stats?.totalEmployees ?? "0")} 
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
            value={isLoading ? "..." : (stats?.bookingsThisMonth ?? "0")} 
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
            value={isLoading ? "..." : (stats?.totalAirports ?? "0")} 
            subtitle="Destinations served" 
            icon="📍" 
          />
        </motion.div>

      </motion.div>
    </Container>
  );
};

export default DashboardPage;