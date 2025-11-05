import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertMessage = ({ variant = 'danger', message }) => {
  return (
    <Alert variant={variant}>
      {message}
    </Alert>
  );
};

export default AlertMessage;