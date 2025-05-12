import React from 'react';
import Button from '../../../components/Button';
import * as Styles from '../Styles';

const EditInternshipModal = ({ 
  isOpen,
  internship,
  handleInputChange,
  closeModal,
  handleUpdateInternship
}) => {
  if (!isOpen || !internship) return null;
  
  return (
    <Styles.ModalOverlay>
      <Styles.ModalContainer>
        <Styles.ModalHeader>
          <Styles.ModalTitle>Edit Internship</Styles.ModalTitle>
          <Styles.CloseButton onClick={closeModal}>&times;</Styles.CloseButton>
        </Styles.ModalHeader>
        
        <Styles.FormGroup>
          <Styles.FormLabel htmlFor="edit-title">Internship Title</Styles.FormLabel>
          <Styles.FormInput 
            type="text" 
            id="edit-title" 
            name="title" 
            value={internship.title}
            onChange={handleInputChange}
          />
        </Styles.FormGroup>
        
        <Styles.FormGroup>
          <Styles.FormLabel htmlFor="edit-description">Description</Styles.FormLabel>
          <Styles.FormTextArea 
            id="edit-description" 
            name="description" 
            value={internship.description}
            onChange={handleInputChange}
          />
        </Styles.FormGroup>
        
        <Styles.FormGroup>
          <Styles.FormLabel htmlFor="edit-requirements">Requirements</Styles.FormLabel>
          <Styles.FormTextArea 
            id="edit-requirements" 
            name="requirements" 
            value={internship.requirements}
            onChange={handleInputChange}
          />
        </Styles.FormGroup>
        
        <Styles.FormGroup>
          <Styles.FormLabel htmlFor="edit-duration">Duration</Styles.FormLabel>
          <Styles.FormInput 
            type="text" 
            id="edit-duration" 
            name="duration" 
            value={internship.duration}
            onChange={handleInputChange}
          />
        </Styles.FormGroup>
        
        <Styles.FormGroup>
          <Styles.FormLabel>Is this a paid internship?</Styles.FormLabel>
          <Styles.RadioGroup>
            <Styles.RadioOption>
              <Styles.RadioInput 
                type="radio" 
                id="edit-paid" 
                name="isPaid"
                checked={internship.isPaid}
                onChange={() => handleInputChange({ 
                  target: { name: 'isPaid', type: 'checkbox', checked: true }
                })}
              />
              <Styles.RadioLabel htmlFor="edit-paid">Yes</Styles.RadioLabel>
            </Styles.RadioOption>
            <Styles.RadioOption>
              <Styles.RadioInput 
                type="radio" 
                id="edit-unpaid" 
                name="isPaid"
                checked={!internship.isPaid}
                onChange={() => handleInputChange({ 
                  target: { name: 'isPaid', type: 'checkbox', checked: false }
                })}
              />
              <Styles.RadioLabel htmlFor="edit-unpaid">No</Styles.RadioLabel>
            </Styles.RadioOption>
          </Styles.RadioGroup>
        </Styles.FormGroup>
        
        {internship.isPaid && (
          <Styles.FormGroup>
            <Styles.FormLabel htmlFor="edit-salary">Compensation</Styles.FormLabel>
            <Styles.FormInput 
              type="text" 
              id="edit-salary" 
              name="salary" 
              value={internship.salary}
              onChange={handleInputChange}
            />
          </Styles.FormGroup>
        )}
        
        <Styles.FormGroup>
          <Styles.FormLabel htmlFor="edit-location">Location</Styles.FormLabel>
          <Styles.FormInput 
            type="text" 
            id="edit-location" 
            name="location" 
            value={internship.location}
            onChange={handleInputChange}
          />
        </Styles.FormGroup>
        
        <Styles.FormGroup>
          <Styles.FormLabel htmlFor="edit-startDate">Start Date</Styles.FormLabel>
          <Styles.FormInput 
            type="date" 
            id="edit-startDate" 
            name="startDate" 
            value={internship.startDate}
            onChange={handleInputChange}
          />
        </Styles.FormGroup>
        
        <Styles.FormGroup>
          <Styles.FormLabel htmlFor="edit-endDate">End Date</Styles.FormLabel>
          <Styles.FormInput 
            type="date" 
            id="edit-endDate" 
            name="endDate" 
            value={internship.endDate}
            onChange={handleInputChange}
          />
        </Styles.FormGroup>
        
        <Styles.FormGroup>
          <Styles.FormLabel htmlFor="edit-status">Status</Styles.FormLabel>
          <Styles.FormSelect 
            id="edit-status" 
            name="status" 
            value={internship.status}
            onChange={handleInputChange}
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </Styles.FormSelect>
        </Styles.FormGroup>
        
        <Styles.ButtonGroup>
          <Button variant="secondary" onClick={closeModal}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdateInternship}>Update Internship</Button>
        </Styles.ButtonGroup>
      </Styles.ModalContainer>
    </Styles.ModalOverlay>
  );
};

export default EditInternshipModal; 