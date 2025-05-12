import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { FaStar, FaBuilding, FaBriefcase, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.light};
`;

const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin: 0;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const CompanyLogo = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-color: #f0f0f0;
  margin-right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 2rem;
`;

const CompanyDetails = styled.div`
  flex: 1;
`;

const CompanyName = styled.h2`
  margin: 0 0 0.5rem;
  color: ${props => props.theme.colors.primary};
`;

const CompanyMetaInfo = styled.div`
  display: flex;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: 0.5rem;
`;

const CompanyMetaItem = styled.span`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const EvaluationForm = styled.form`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${props => props.theme.colors.darkGray};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const StarRatingContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const RatingStar = styled(FaStar)`
  font-size: 28px;
  color: ${props => props.filled ? '#ffc107' : '#e4e5e9'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const CompanyEvaluation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId } = useAuth();
  
  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState(null);
  const [formData, setFormData] = useState({
    overallRating: 0,
    workEnvironmentRating: 0,
    mentorshipRating: 0,
    learningOpportunitiesRating: 0,
    workLifeBalanceRating: 0,
    pros: '',
    cons: '',
    feedback: '',
    recommend: false
  });
  
  useEffect(() => {
    // Fetch company details - in a real app this would be an API call
    // Using mock data for now
    setTimeout(() => {
      // Mock companies data that matches the internships
      const mockCompanies = {
        "1": {
          id: "1",
          name: 'Tech Innovations',
          industry: 'Technology',
          location: 'Abu Dhabi, UAE',
          size: '50-200 employees',
          rating: 4.8
        },
        "2": {
          id: "2",
          name: 'Data Systems Inc.',
          industry: 'Information Technology',
          location: 'Dubai, UAE',
          size: '100-500 employees',
          rating: 4.5
        },
        "3": {
          id: "3",
          name: 'Creative Solutions',
          industry: 'Design',
          location: 'Sharjah, UAE',
          size: '20-100 employees',
          rating: 4.2
        },
        "4": {
          id: "4",
          name: 'Analytics Pro',
          industry: 'Data Science',
          location: 'Abu Dhabi, UAE',
          size: '10-50 employees',
          rating: 4.6
        },
        "5": {
          id: "5",
          name: 'App Innovations',
          industry: 'Mobile Development',
          location: 'Dubai, UAE',
          size: '30-100 employees',
          rating: 4.3
        }
      };
      
      // Get the company based on the ID from the URL
      const selectedCompany = mockCompanies[id] || {
        id: id,
        name: 'Unknown Company',
        industry: 'Unknown',
        location: 'UAE',
        size: 'Unknown',
        rating: 0
      };
      
      setCompany(selectedCompany);
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleRatingChange = (category, rating) => {
    setFormData({
      ...formData,
      [category]: rating
    });
  };
  
  const renderStarRating = (category, value) => {
    return (
      <StarRatingContainer>
        {[...Array(5)].map((_, index) => (
          <RatingStar
            key={index}
            filled={index < value}
            onClick={() => handleRatingChange(category, index + 1)}
          />
        ))}
      </StarRatingContainer>
    );
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would send the evaluation data to your backend
    console.log('Submitting evaluation:', {
      companyId: id,
      userId,
      ...formData
    });
    
    // Show success message before redirecting
    alert('Thank you for your evaluation! Your feedback helps other students make informed decisions.');
    
    // Redirect back to the dashboard
    navigate('/dashboard');
  };
  
  const handleCancel = () => {
    navigate(-1);
  };
  
  if (isLoading) {
    return (
      <PageContainer>
        <Navbar />
        <ContentContainer>
          <div>Loading company information...</div>
        </ContentContainer>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <PageHeader>
          <BackButton onClick={() => navigate(-1)}>
            <FaArrowLeft style={{ marginRight: '0.5rem' }} />
            Back
          </BackButton>
          <PageTitle>Evaluate Company</PageTitle>
        </PageHeader>
        
        <CompanyInfo>
          <CompanyLogo>
            <FaBuilding />
          </CompanyLogo>
          <CompanyDetails>
            <CompanyName>{company.name}</CompanyName>
            <CompanyMetaInfo>
              <CompanyMetaItem>
                <FaBriefcase />
                {company.industry}
              </CompanyMetaItem>
              <CompanyMetaItem>
                {company.location}
              </CompanyMetaItem>
              <CompanyMetaItem>
                {company.size}
              </CompanyMetaItem>
            </CompanyMetaInfo>
          </CompanyDetails>
        </CompanyInfo>
        
        <EvaluationForm onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Rate Your Experience</SectionTitle>
            
            <FormGroup>
              <Label>Overall Rating</Label>
              {renderStarRating('overallRating', formData.overallRating)}
            </FormGroup>
            
            <FormGroup>
              <Label>Work Environment</Label>
              {renderStarRating('workEnvironmentRating', formData.workEnvironmentRating)}
            </FormGroup>
            
            <FormGroup>
              <Label>Mentorship Quality</Label>
              {renderStarRating('mentorshipRating', formData.mentorshipRating)}
            </FormGroup>
            
            <FormGroup>
              <Label>Learning Opportunities</Label>
              {renderStarRating('learningOpportunitiesRating', formData.learningOpportunitiesRating)}
            </FormGroup>
            
            <FormGroup>
              <Label>Work-Life Balance</Label>
              {renderStarRating('workLifeBalanceRating', formData.workLifeBalanceRating)}
            </FormGroup>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Share Your Thoughts</SectionTitle>
            
            <FormGroup>
              <Label>What did you like about interning here? (Pros)</Label>
              <Textarea
                name="pros"
                value={formData.pros}
                onChange={handleInputChange}
                placeholder="Share the positive aspects of your internship experience..."
              />
            </FormGroup>
            
            <FormGroup>
              <Label>What could be improved? (Cons)</Label>
              <Textarea
                name="cons"
                value={formData.cons}
                onChange={handleInputChange}
                placeholder="Share any challenges or areas for improvement..."
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Additional Feedback</Label>
              <Textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleInputChange}
                placeholder="Any other thoughts or advice for future interns..."
              />
            </FormGroup>
            
            <FormGroup>
              <Label>
                <Input
                  type="checkbox"
                  name="recommend"
                  checked={formData.recommend}
                  onChange={handleInputChange}
                  style={{ width: 'auto', marginRight: '0.5rem' }}
                />
                I would recommend this company to other students
              </Label>
            </FormGroup>
          </FormSection>
          
          <ButtonGroup>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              Submit Evaluation
            </Button>
          </ButtonGroup>
        </EvaluationForm>
      </ContentContainer>
    </PageContainer>
  );
};

export default CompanyEvaluation; 