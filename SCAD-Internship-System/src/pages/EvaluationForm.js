import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { FaSave, FaTrash, FaArrowLeft } from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.light};
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleContainer = styled.div``;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: 1rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.secondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  
  &:hover {
    background-color: ${props => props.theme.colors.tertiary};
  }
`;

const FormCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FormLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 4px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 4px;
  font-size: 0.9rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 4px;
  font-size: 0.9rem;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007bff%22%20d%3D%22M287%2C114.5L157.5%2C244.1c-4.5%2C4.5-12%2C4.5-16.5%2C0l-129.4-129.6c-4.5-4.5-4.5-12%2C0-16.5l22.2-22.2c4.5-4.5%2C12-4.5%2C16.5%2C0L149.2%2C178l115.5-115.5c4.5-4.5%2C12-4.5%2C16.5%2C0l22.2%2C22.2C291.5%2C102.5%2C291.5%2C110%2C287%2C114.5z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 12px;
  padding-right: 2rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const RatingButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${props => props.active 
    ? props.theme.colors.secondary 
    : props.theme.colors.tertiary};
  background-color: ${props => props.active 
    ? props.theme.colors.secondary 
    : 'white'};
  color: ${props => props.active 
    ? 'white' 
    : props.theme.colors.darkGray};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active 
      ? props.theme.colors.secondary 
      : props.theme.colors.tertiary};
    color: ${props => props.active 
      ? 'white' 
      : props.theme.colors.primary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const SuccessMessage = styled.div`
  background-color: #e6f7e6;
  color: #2e7d32;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #c62828;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

// Mock data
const mockInterns = [
  {
    id: 1,
    name: 'Michael Brown',
    position: 'UI/UX Design Intern',
    started: '02/01/2023',
    ends: '05/01/2023',
    status: 'current',
    department: 'Design'
  },
  {
    id: 2,
    name: 'David Wilson',
    position: 'Frontend Developer Intern',
    started: '09/01/2022',
    ends: '12/01/2022',
    status: 'completed',
    department: 'Engineering',
    evaluation: {
      overallPerformance: 4,
      technicalSkills: 4,
      problemSolving: 3,
      teamwork: 5,
      communication: 4,
      workEthic: 5,
      adaptability: 4,
      strengths: 'Excellent front-end development skills and great team player.',
      areasForImprovement: 'Could improve on problem-solving skills for complex issues.',
      additionalComments: 'David was a valuable asset to our team and would be welcome back.',
      recommendHire: 'yes'
    }
  },
  {
    id: 4,
    name: 'James Smith',
    position: 'Data Analyst Intern',
    started: '08/01/2022',
    ends: '11/01/2022',
    status: 'completed',
    department: 'Data Science'
  }
];

const EvaluationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [intern, setIntern] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    overallPerformance: 0,
    technicalSkills: 0,
    problemSolving: 0,
    teamwork: 0,
    communication: 0,
    workEthic: 0,
    adaptability: 0,
    strengths: '',
    areasForImprovement: '',
    additionalComments: '',
    recommendHire: ''
  });
  
  // Fetch intern data
  useEffect(() => {
    // In a real app, this would be an API call to fetch the intern data
    const fetchedIntern = mockInterns.find(intern => intern.id === parseInt(id));
    
    if (fetchedIntern) {
      setIntern(fetchedIntern);
      
      // If intern has an evaluation, load it into the form
      if (fetchedIntern.evaluation) {
        setFormData(fetchedIntern.evaluation);
      }
    }
    
    setLoading(false);
  }, [id]);
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  // Handle rating selection
  const handleRatingClick = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (formData.overallPerformance === 0) {
      setErrorMessage('Please provide an overall performance rating');
      return;
    }
    
    // In a real app, this would be an API call to submit the evaluation
    console.log('Submitting evaluation for intern ID:', id);
    console.log('Evaluation data:', formData);
    
    // Show success message
    setSuccessMessage('Evaluation saved successfully');
    setErrorMessage('');
    
    // Auto-dismiss success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };
  
  // Handle delete evaluation
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this evaluation?')) {
      // In a real app, this would be an API call to delete the evaluation
      console.log('Deleting evaluation for intern ID:', id);
      
      // Clear form data
      setFormData({
        overallPerformance: 0,
        technicalSkills: 0,
        problemSolving: 0,
        teamwork: 0,
        communication: 0,
        workEthic: 0,
        adaptability: 0,
        strengths: '',
        areasForImprovement: '',
        additionalComments: '',
        recommendHire: ''
      });
      
      // Show success message
      setSuccessMessage('Evaluation deleted successfully');
      setErrorMessage('');
      
      // Auto-dismiss success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };
  
  if (loading) {
    return (
      <PageContainer>
        <Navbar userType="company" />
        <ContentContainer>
          <p>Loading...</p>
        </ContentContainer>
      </PageContainer>
    );
  }
  
  if (!intern) {
    return (
      <PageContainer>
        <Navbar userType="company" />
        <ContentContainer>
          <p>Intern not found</p>
        </ContentContainer>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <Navbar userType="company" />
      
      <ContentContainer>
        <Header>
          <TitleContainer>
            <Title>Intern Evaluation</Title>
            <Description>Evaluate performance for {intern.name}</Description>
          </TitleContainer>
          
          <BackButton onClick={() => navigate('/company/interns')}>
            <FaArrowLeft /> Back to Interns
          </BackButton>
        </Header>
        
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        
        <FormCard>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Intern Information</FormLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div><strong>Name:</strong> {intern.name}</div>
                <div><strong>Position:</strong> {intern.position}</div>
                <div><strong>Department:</strong> {intern.department}</div>
                <div><strong>Period:</strong> {intern.started} to {intern.ends}</div>
              </div>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Overall Performance</FormLabel>
              <RatingContainer>
                {[1, 2, 3, 4, 5].map(rating => (
                  <RatingButton
                    key={rating}
                    type="button"
                    active={formData.overallPerformance === rating}
                    onClick={() => handleRatingClick('overallPerformance', rating)}
                  >
                    {rating}
                  </RatingButton>
                ))}
              </RatingContainer>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Technical Skills</FormLabel>
              <RatingContainer>
                {[1, 2, 3, 4, 5].map(rating => (
                  <RatingButton
                    key={rating}
                    type="button"
                    active={formData.technicalSkills === rating}
                    onClick={() => handleRatingClick('technicalSkills', rating)}
                  >
                    {rating}
                  </RatingButton>
                ))}
              </RatingContainer>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Problem Solving</FormLabel>
              <RatingContainer>
                {[1, 2, 3, 4, 5].map(rating => (
                  <RatingButton
                    key={rating}
                    type="button"
                    active={formData.problemSolving === rating}
                    onClick={() => handleRatingClick('problemSolving', rating)}
                  >
                    {rating}
                  </RatingButton>
                ))}
              </RatingContainer>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Teamwork</FormLabel>
              <RatingContainer>
                {[1, 2, 3, 4, 5].map(rating => (
                  <RatingButton
                    key={rating}
                    type="button"
                    active={formData.teamwork === rating}
                    onClick={() => handleRatingClick('teamwork', rating)}
                  >
                    {rating}
                  </RatingButton>
                ))}
              </RatingContainer>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Communication</FormLabel>
              <RatingContainer>
                {[1, 2, 3, 4, 5].map(rating => (
                  <RatingButton
                    key={rating}
                    type="button"
                    active={formData.communication === rating}
                    onClick={() => handleRatingClick('communication', rating)}
                  >
                    {rating}
                  </RatingButton>
                ))}
              </RatingContainer>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Work Ethic</FormLabel>
              <RatingContainer>
                {[1, 2, 3, 4, 5].map(rating => (
                  <RatingButton
                    key={rating}
                    type="button"
                    active={formData.workEthic === rating}
                    onClick={() => handleRatingClick('workEthic', rating)}
                  >
                    {rating}
                  </RatingButton>
                ))}
              </RatingContainer>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Adaptability</FormLabel>
              <RatingContainer>
                {[1, 2, 3, 4, 5].map(rating => (
                  <RatingButton
                    key={rating}
                    type="button"
                    active={formData.adaptability === rating}
                    onClick={() => handleRatingClick('adaptability', rating)}
                  >
                    {rating}
                  </RatingButton>
                ))}
              </RatingContainer>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Strengths</FormLabel>
              <FormTextarea
                name="strengths"
                placeholder="What were the intern's key strengths?"
                value={formData.strengths}
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Areas for Improvement</FormLabel>
              <FormTextarea
                name="areasForImprovement"
                placeholder="What areas could the intern improve?"
                value={formData.areasForImprovement}
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Additional Comments</FormLabel>
              <FormTextarea
                name="additionalComments"
                placeholder="Any additional feedback or comments"
                value={formData.additionalComments}
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Would you recommend hiring this intern in the future?</FormLabel>
              <FormSelect
                name="recommendHire"
                value={formData.recommendHire}
                onChange={handleInputChange}
              >
                <option value="">Select an option</option>
                <option value="yes">Yes, definitely</option>
                <option value="maybe">Maybe, with reservations</option>
                <option value="no">No</option>
              </FormSelect>
            </FormGroup>
            
            <ButtonContainer>
              {intern.evaluation && (
                <Button
                  variant="danger"
                  icon={<FaTrash />}
                  onClick={handleDelete}
                  type="button"
                >
                  Delete Evaluation
                </Button>
              )}
              
              <Button
                variant="primary"
                icon={<FaSave />}
                type="submit"
              >
                Save Evaluation
              </Button>
            </ButtonContainer>
          </form>
        </FormCard>
        
        <div style={{ fontSize: '0.8rem', color: props => props.theme.colors.darkGray, textAlign: 'center' }}>
          This evaluation will only be visible to the SCAD office.
        </div>
      </ContentContainer>
    </PageContainer>
  );
};

export default EvaluationForm; 