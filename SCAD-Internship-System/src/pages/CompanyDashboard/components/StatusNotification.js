import React from 'react';
import { FaCheck, FaClock, FaTimes } from 'react-icons/fa';
import Card from '../../../components/Card';

const StatusNotification = () => {
  const companyStatus = 'approved';
  
  if (companyStatus === 'pending') {
    return (
      <Card style={{ marginBottom: '2rem', backgroundColor: '#fff3cd' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '1rem', color: '#856404', fontSize: '1.5rem' }}>
            <FaClock />
          </div>
          <div>
            <h3 style={{ color: '#856404', marginBottom: '0.5rem' }}>Application Under Review</h3>
            <p>Your company application is currently being reviewed by the SCAD office. 
            You will be notified once a decision has been made.</p>
          </div>
        </div>
      </Card>
    );
  } else if (companyStatus === 'approved') {
    return (
      <Card style={{ marginBottom: '2rem', backgroundColor: '#e6f7e6' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '1rem', color: '#2e7d32', fontSize: '1.5rem' }}>
            <FaCheck />
          </div>
          <div>
            <h3 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>Application Approved</h3>
            <p>Your company application has been approved. You can now post internship opportunities.</p>
          </div>
        </div>
      </Card>
    );
  } else if (companyStatus === 'rejected') {
    return (
      <Card style={{ marginBottom: '2rem', backgroundColor: '#f8d7da' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '1rem', color: '#c62828', fontSize: '1.5rem' }}>
            <FaTimes />
          </div>
          <div>
            <h3 style={{ color: '#c62828', marginBottom: '0.5rem' }}>Application Rejected</h3>
            <p>Your company application has been rejected. Please contact the SCAD office for more information.</p>
          </div>
        </div>
      </Card>
    );
  }
  
  return null;
};

export default StatusNotification; 