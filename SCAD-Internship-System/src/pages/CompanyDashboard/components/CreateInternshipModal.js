import React from 'react';
import Button from '../../../components/Button';
import * as Styles from '../Styles';

const CreateInternshipModal = ({ 
  isOpen,
  newInternship,
  handleInputChange,
  closeModal,
  handleCreateInternship
}) => {
  if (!isOpen) return null;
  
  return (
    <Styles.ModalOverlay>
      <Styles.ModalContainer>
        <Styles.ModalHeader>
          <Styles.ModalTitle>Create New Internship</Styles.ModalTitle>
          <Styles.CloseButton onClick={closeModal}>&times;</Styles.CloseButton>
        </Styles.ModalHeader>
        
        <Styles.FormGroup>
          <Styles.FormLabel htmlFor="title">Internship Title</Styles.FormLabel>
          <Styles.FormInput 
            type="text" 
            id="title" 
            name="title" 
            value={newInternship.title}
            onChange={handleInputChange}
            placeholder="e.g. Frontend Developer Intern"
          />
        </Styles.FormGroup>
        
        <Styles.FormGroup>
          <Styles.FormLabel htmlFor="description">Description</Styles.FormLabel>
          <Styles.FormTextArea 
            id="description" 
            name="description" 
            value={newInternship.description}
            onChange={handleInputChange}
            placeholder="Describe the internship role, responsibilities and learning opportunities"
          />
        </Styles.FormGroup>
        
        <Styles.FormGroup>
          <Styles.FormLabel htmlFor="requirements">Requirements</Styles.FormLabel>
          <Styles.FormTextArea 
            id="requirements" 
            name="requirements" 
            value={newInternship.requirements}
            onChange={handleInputChange}
            placeholder="List the skills, qualifications, and attributes required"
          />
        </Styles.FormGroup>
        
        <Styles.FormGroup>
          <Styles.FormLabel htmlFor="duration">Duration</Styles.FormLabel>
          <Styles.FormInput 
            type="text" 
            id="duration" 
            name="duration" 
            value={newInternship.duration}
            onChange={handleInputChange}
            placeholder="e.g. 3 months, 6 months, etc."
          />
        </Styles.FormGroup>
        
        <Styles.FormGroup>
          <Styles.FormLabel>Is this a paid internship?</Styles.FormLabel>
          <Styles.RadioGroup>
            <Styles.RadioOption>
              <Styles.RadioInput 
                type="radio" 
                id="paid" 
                name="isPaid"
                checked={newInternship.isPaid}
                onChange={() => handleInputChange({ 
                  target: { name: 'isPaid', type: 'checkbox', checked: true }
                })}
              />
              <Styles.RadioLabel htmlFor="paid">Yes</Styles.RadioLabel>
            </Styles.RadioOption>
            <Styles.RadioOption>
              <Styles.RadioInput 
                type="radio" 
                id="unpaid" 
                name="isPaid"
                checked={!newInternship.isPaid}
                onChange={() => handleInputChange({ 
                  target: { name: 'isPaid', type: 'checkbox', checked: false }
                })}
              />
              <Styles.RadioLabel htmlFor="unpaid">No</Styles.RadioLabel>
            </Styles.RadioOption>
          </Styles.RadioGroup>
        </Styles.FormGroup>
        
        {newInternship.isPaid && (
          <Styles.FormGroup>
            <Styles.FormLabel htmlFor="salary">Compensation</Styles.FormLabel>
            <Styles.FormInput 
              type="text" 
              id="salary" 
              name="salary" 
              value={newInternship.salary}
              onChange={handleInputChange}
              placeholder="e.g. 1000 AED/month, stipend, etc."
            />
          </Styles.FormGroup>
        )}
        
        <Styles.FormGroup>
          <Styles.FormLabel htmlFor="location">Location</Styles.FormLabel>
          <Styles.FormInput 
            type="text" 
            id="location" 
            name="location" 
            value={newInternship.location}
            onChange={handleInputChange}
            placeholder="e.g. Remote, Dubai, Abu Dhabi, etc."
          />
        </Styles.FormGroup>
        
        <Styles.FormGroup>
          <Styles.FormLabel htmlFor="startDate">Start Date</Styles.FormLabel>
          <Styles.FormInput 
            type="date" 
            id="startDate" 
            name="startDate" 
            value={newInternship.startDate}
            onChange={handleInputChange}
          />
        </Styles.FormGroup>
        
        <Styles.FormGroup>
          <Styles.FormLabel htmlFor="endDate">End Date</Styles.FormLabel>
          <Styles.FormInput 
            type="date" 
            id="endDate" 
            name="endDate" 
            value={newInternship.endDate}
            onChange={handleInputChange}
          />
        </Styles.FormGroup>
        
        <Styles.FormGroup>
          <Styles.FormLabel htmlFor="status">Status</Styles.FormLabel>
          <Styles.FormSelect 
            id="status" 
            name="status" 
            value={newInternship.status}
            onChange={handleInputChange}
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </Styles.FormSelect>
        </Styles.FormGroup>
        
        <Styles.ButtonGroup>
          <Button variant="secondary" onClick={closeModal}>Cancel</Button>
          <Button variant="primary" onClick={handleCreateInternship}>Create Internship</Button>
        </Styles.ButtonGroup>
      </Styles.ModalContainer>
    </Styles.ModalOverlay>
  );
};

export default CreateInternshipModal; 