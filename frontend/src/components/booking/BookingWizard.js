import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';

// API
import { getFlights, getFaresForFlight, createBooking } from '../../api/flightApi';

// Components
import FlightTable from '../flight/FlightTable';
import LoadingSpinner from '../ui/LoadingSpinner';
import AlertMessage from '../ui/AlertMessage';

// We'll create these sub-components in a bit
import FareSelector from './FareSelector';
import PassengerForm from './PassengerForm';

const BookingWizard = () => {
  const [step, setStep] = useState(1); // 1: Flight, 2: Fare, 3: Passenger, 4: Review, 5: Success
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Data state
  const [flights, setFlights] = useState([]);
  const [fares, setFares] = useState([]);
  
  // Selections
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedFare, setSelectedFare] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState(null);
  
  // Final booking response
  const [bookingResponse, setBookingResponse] = useState(null);

  // --- STEP 1: Load Flights ---
  useEffect(() => {
    // Only load flights if we are on step 1 and they aren't loaded
    if (step === 1 && flights.length === 0) {
      const loadFlights = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const data = await getFlights();
          setFlights(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      loadFlights();
    }
  }, [step, flights.length]);

  // --- STEP 2: Load Fares ---
  const handleFlightSelect = (flight) => {
    const loadFares = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getFaresForFlight(flight.flight_id);
        setFares(data);
        setSelectedFlight(flight);
        setStep(2); // Move to next step
      } catch (err) {
        setError(err.message);
        // Don't move to next step if fares fail to load
      } finally {
        setIsLoading(false);
      }
    };
    loadFares();
  };

  // --- STEP 3: Select Fare ---
  const handleFareSelect = (fare) => {
    setSelectedFare(fare);
    setStep(3); // Move to passenger form
  };

  // --- STEP 4: Get Passenger Details ---
  const handlePassengerSubmit = (passengerData) => {
    setPassengerDetails(passengerData);
    setStep(4); // Move to review step
  };

  // --- STEP 5: Submit Booking ---
  const handleSubmitBooking = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const bookingData = {
        flight_id: selectedFlight.flight_id,
        fare_id: selectedFare.fare_id,
        passenger: passengerDetails
      };

      const response = await createBooking(bookingData);
      setBookingResponse(response);
      setStep(5); // Move to success page

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // --- Navigation ---
  const goBack = () => {
    setError(null); // Clear errors on navigation
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const startOver = () => {
    setStep(1);
    setSelectedFlight(null);
    setSelectedFare(null);
    setPassengerDetails(null);
    setBookingResponse(null);
    setError(null);
    // We keep the flights list loaded for speed
  };

  // --- Render Functions for each step ---
  
  const renderStep1 = () => (
    <>
      <h3>Step 1: Select Flight</h3>
      <p className="text-muted">Choose an available flight to begin.</p>
      {isLoading && <LoadingSpinner />}
      {!isLoading && !error && <FlightTable flights={flights} onRowClick={handleFlightSelect} />}
    </>
  );
  
  const renderStep2 = () => (
    <>
      <Button variant="link" onClick={goBack} className="p-0 mb-2">← Back to flights</Button>
      <h3>Step 2: Select Fare</h3>
      <p className="text-muted">For flight <strong>{selectedFlight.flight_id}</strong> from <strong>{selectedFlight.take_off_point}</strong> to <strong>{selectedFlight.destination}</strong>.</p>
      {isLoading && <LoadingSpinner />}
      {!isLoading && !error && <FareSelector fares={fares} onFareSelect={handleFareSelect} />}
    </>
  );
  
  const renderStep3 = () => (
    <>
      <Button variant="link" onClick={goBack} className="p-0 mb-2">← Back to fares</Button>
      <h3>Step 3: Passenger Details</h3>
      <p className="text-muted">Enter the passenger's information.</p>
      <PassengerForm onSubmit={handlePassengerSubmit} />
    </>
  );

  const renderStep4 = () => (
    <>
      <Button variant="link" onClick={goBack} className="p-0 mb-2">← Back to passenger details</Button>
      <h3>Step 4: Review & Confirm</h3>
      <p className="text-muted">Please review all details before confirming your booking.</p>
      
      <Card>
        <Card.Body>
          <h5>Flight Details</h5>
          <p><strong>Flight:</strong> {selectedFlight.flight_id} ({selectedFlight.company})</p>
          <p><strong>Route:</strong> {selectedFlight.take_off_point} → {selectedFlight.destination}</p>
          
          <hr />
          <h5>Fare Details</h5>
          <p><strong>Type:</strong> {selectedFare.description}</p>
          <p><strong>Price:</strong> ${selectedFare.charge_amount}</p> {/* Assuming charge_amount is in dollars */}

          <hr />
          <h5>Passenger Details</h5>
          <p><strong>Name:</strong> {passengerDetails.ps_name}</p>
          <p><strong>Age:</strong> {passengerDetails.age}</p>
          <p><strong>Contact:</strong> {passengerDetails.contacts}</p>
          
          <Button 
            variant="primary" 
            onClick={handleSubmitBooking} 
            disabled={isLoading}
            className="mt-3"
          >
            {isLoading ? "Confirming..." : "Confirm Booking"}
          </Button>
        </Card.Body>
      </Card>
    </>
  );
  
  const renderStep5 = () => (
    <>
      <h3>Booking Successful!</h3>
      <Alert variant="success">
        <Alert.Heading>Thank You!</Alert.Heading>
        <p>Your booking has been confirmed.</p>
        <hr />
        <p><strong>Booking ID:</strong> {bookingResponse.booking_id}</p>
        <p><strong>Passenger ID:</strong> {bookingResponse.passenger_id}</p>
      </Alert>
      <Button variant="primary" onClick={startOver}>
        Make Another Booking
      </Button>
    </>
  );

  return (
    <Card className="shadow-sm border-0">
      <Card.Body style={{ minHeight: '400px', padding: '2rem' }}>
        {error && <AlertMessage message={error} />}
        
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderStep5()}
        
      </Card.Body>
    </Card>
  );
};

export default BookingWizard;