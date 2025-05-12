import React from 'react';
import Button from '../../../components/Button';
import * as Styles from '../Styles';

const ViewInternshipModal = ({ 
  isOpen, 
  internship, 
  closeModal,
  handleEditInternship 
}) => {
  if (!isOpen || !internship) return null;
  
  return (
    <Styles.ModalOverlay>
      <Styles.ModalContainer>
        <Styles.ModalHeader>
          <Styles.ModalTitle>Internship Details</Styles.ModalTitle>
          <Styles.CloseButton onClick={closeModal}>&times;</Styles.CloseButton>
        </Styles.ModalHeader>
        
        <div style={{ marginBottom: '2rem' }}>
          <Styles.StatusBadge status={internship.status} style={{ marginBottom: '1rem' }}>
            {internship.status.charAt(0).toUpperCase() + internship.status.slice(1)}
          </Styles.StatusBadge>
          
          <h2 style={{ color: '#333', marginBottom: '0.5rem' }}>{internship.title}</h2>
          
          <div style={{ color: '#666', marginBottom: '1rem' }}>
            <p><strong>Posted:</strong> {internship.posted}</p>
            <p><strong>Applications:</strong> {internship.applications}</p>
            <p><strong>Duration:</strong> {internship.duration}</p>
            <p><strong>Compensation:</strong> {internship.isPaid ? (internship.salary || 'Paid') : 'Unpaid'}</p>
            <p><strong>Location:</strong> {internship.location || 'Not specified'}</p>
            <p><strong>Period:</strong> {internship.startDate ? `${new Date(internship.startDate).toLocaleDateString()} - ${new Date(internship.endDate).toLocaleDateString()}` : 'Not specified'}</p>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>Description</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{internship.description || 'No description provided.'}</p>
          </div>
          
          <div>
            <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>Requirements</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{internship.requirements || 'No specific requirements provided.'}</p>
          </div>
        </div>
        
        <Styles.ButtonGroup>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
          <Button 
            variant="primary" 
            onClick={() => {
              closeModal();
              handleEditInternship(internship.id);
            }}
          >
            Edit Internship
          </Button>
        </Styles.ButtonGroup>
      </Styles.ModalContainer>
    </Styles.ModalOverlay>
  );
};

export default ViewInternshipModal; 