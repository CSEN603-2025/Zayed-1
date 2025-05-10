import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaUpload,
  FaArrowLeft,
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.light};
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  margin-bottom: 1.5rem;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const PageTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const PageDescription = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const FileUploadContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const FileUploadLabel = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

const FileUploadBox = styled.div`
  border: 2px dashed ${props => props.theme.colors.secondary};
  border-radius: 5px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.light};
  }
`;

const FileIcon = styled(FaUpload)`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 0.5rem;
`;

const FileName = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.secondary};
`;

const HiddenInput = styled.input`
  display: none;
`;

const CallInfoSection = styled.div`
  background-color: ${props => props.theme.colors.primary};
  border-radius: 8px;
  padding: 1.5rem;
  color: white;
  margin-bottom: 2rem;
`;

const CallTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
`;

const CallDetail = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const CallDescription = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
`;

const CategoryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const CategoryTag = styled.span`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
`;

// Mock data for the workshop call
const mockWorkshopCall = {
  id: 1,
  title: 'Summer Workshop Series 2023',
  description: 'Looking for industry experts to conduct workshops for our PRO students. Topics should focus on practical skills that will help students in their internships and future careers.',
  categories: ['Technology', 'Career Development', 'Soft Skills'],
  openDate: '2023-04-01',
  closeDate: '2023-04-30',
  workshopStartDate: '2023-06-01',
  workshopEndDate: '2023-08-31',
  status: 'open'
};

const WorkshopProposal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [call, setCall] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    learningOutcomes: '',
    targetAudience: '',
    category: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    maxAttendees: '',
    presenterName: '',
    presenterTitle: '',
    presenterEmail: '',
    presenterPhone: '',
    presenterBio: '',
    materials: null,
    slides: null
  });
  
  useEffect(() => {
    // In a real app, we would fetch the call data based on the ID
    // For this demo, we'll just use the mock data
    setCall(mockWorkshopCall);
  }, [id]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Workshop proposal submitted successfully!');
      setIsSubmitting(false);
      navigate('/workshops');
    }, 1500);
  };
  
  if (!call) {
    return (
      <PageContainer>
        <Navbar userType="external" />
        <ContentContainer>
          <div>Loading...</div>
        </ContentContainer>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <Navbar userType="external" />
      
      <ContentContainer>
        <BackButton onClick={() => navigate('/workshops')}>
          <FaArrowLeft /> Back to Workshops
        </BackButton>
        
        <PageTitle>Submit Workshop Proposal</PageTitle>
        <PageDescription>
          Fill out the form below to propose a workshop for the selected call
        </PageDescription>
        
        <CallInfoSection>
          <CallTitle>{call.title}</CallTitle>
          
          <CallDetail>
            <FaCalendarAlt />
            Submission period: {call.openDate} to {call.closeDate}
          </CallDetail>
          
          <CallDetail>
            <FaCalendarAlt />
            Workshop period: {call.workshopStartDate} to {call.workshopEndDate}
          </CallDetail>
          
          <CallDescription>{call.description}</CallDescription>
          
          <CategoryTags>
            {call.categories.map((category, index) => (
              <CategoryTag key={index}>{category}</CategoryTag>
            ))}
          </CategoryTags>
        </CallInfoSection>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <SectionTitle>Workshop Details</SectionTitle>
            
            <FormGroup>
              <Input
                label="Workshop Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter a descriptive title for your workshop"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Input
                label="Workshop Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your workshop content and methodology"
                multiline
                rows={4}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Input
                label="Learning Outcomes"
                name="learningOutcomes"
                value={formData.learningOutcomes}
                onChange={handleInputChange}
                placeholder="What will participants learn or be able to do after the workshop?"
                multiline
                rows={3}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Input
                label="Target Audience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                placeholder="Who is this workshop designed for?"
                required
              />
            </FormGroup>
            
            <FormRow>
              <Select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                options={call.categories.map(cat => ({ value: cat, label: cat }))}
                placeholder="Select a category"
                required
              />
              
              <Input
                label="Preferred Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                min={call.workshopStartDate}
                max={call.workshopEndDate}
                required
              />
            </FormRow>
            
            <FormRow>
              <Input
                label="Start Time"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleInputChange}
                required
              />
              
              <Input
                label="End Time"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleInputChange}
                required
              />
            </FormRow>
            
            <FormRow>
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location or 'Virtual'"
                required
              />
              
              <Input
                label="Maximum Attendees"
                name="maxAttendees"
                type="number"
                min="1"
                value={formData.maxAttendees}
                onChange={handleInputChange}
                required
              />
            </FormRow>
            
            <SectionTitle>Presenter Information</SectionTitle>
            
            <FormRow>
              <Input
                label="Full Name"
                name="presenterName"
                value={formData.presenterName}
                onChange={handleInputChange}
                placeholder="Enter presenter's full name"
                required
              />
              
              <Input
                label="Title & Organization"
                name="presenterTitle"
                value={formData.presenterTitle}
                onChange={handleInputChange}
                placeholder="e.g. Senior Developer at Tech Company"
                required
              />
            </FormRow>
            
            <FormRow>
              <Input
                label="Email Address"
                name="presenterEmail"
                type="email"
                value={formData.presenterEmail}
                onChange={handleInputChange}
                placeholder="Enter contact email"
                required
              />
              
              <Input
                label="Phone Number"
                name="presenterPhone"
                value={formData.presenterPhone}
                onChange={handleInputChange}
                placeholder="Enter contact phone number"
                required
              />
            </FormRow>
            
            <FormGroup>
              <Input
                label="Presenter Biography"
                name="presenterBio"
                value={formData.presenterBio}
                onChange={handleInputChange}
                placeholder="Brief biography highlighting relevant experience"
                multiline
                rows={3}
                required
              />
            </FormGroup>
            
            <SectionTitle>Supporting Materials</SectionTitle>
            
            <FileUploadContainer>
              <FileUploadLabel>Workshop Materials (Optional)</FileUploadLabel>
              <FileUploadBox onClick={() => document.getElementById('materials').click()}>
                <FileIcon />
                <div>Upload any materials to be used in the workshop</div>
                {formData.materials && <FileName>{formData.materials.name}</FileName>}
                <HiddenInput
                  type="file"
                  id="materials"
                  name="materials"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                  onChange={handleFileChange}
                />
              </FileUploadBox>
            </FileUploadContainer>
            
            <FileUploadContainer>
              <FileUploadLabel>Presentation Slides (Optional)</FileUploadLabel>
              <FileUploadBox onClick={() => document.getElementById('slides').click()}>
                <FileIcon />
                <div>Upload presentation slides if available</div>
                {formData.slides && <FileName>{formData.slides.name}</FileName>}
                <HiddenInput
                  type="file"
                  id="slides"
                  name="slides"
                  accept=".pdf,.ppt,.pptx"
                  onChange={handleFileChange}
                />
              </FileUploadBox>
            </FileUploadContainer>
            
            <Card.Footer>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button 
                  variant="secondary"
                  onClick={() => navigate('/workshops')}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
                </Button>
              </div>
            </Card.Footer>
          </form>
        </Card>
      </ContentContainer>
    </PageContainer>
  );
};

export default WorkshopProposal; 