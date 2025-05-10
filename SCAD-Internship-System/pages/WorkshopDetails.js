import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaUserPlus, 
  FaArrowLeft,
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaUsers,
  FaStar
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

const WorkshopHeader = styled.div`
  background-color: ${props => props.theme.colors.primary};
  border-radius: 8px;
  padding: 2rem;
  color: white;
  margin-bottom: 2rem;
`;

const WorkshopTitle = styled.h1`
  margin: 0 0 1rem;
  font-size: 2rem;
  font-weight: 700;
`;

const DetailsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
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

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem;
`;

const Description = styled.div`
  line-height: 1.6;
  color: ${props => props.theme.colors.darkGray};
  white-space: pre-line;
`;

const LearningOutcomesList = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.75rem;
    color: ${props => props.theme.colors.darkGray};
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: 600;
  margin-bottom: 1.5rem;
  background-color: ${props => {
    switch(props.status) {
      case 'upcoming': return '#e6f7e6';
      case 'full': return '#f8d7da';
      case 'inprogress': return '#fff3cd';
      case 'completed': return '#e2e3e5';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'upcoming': return '#2e7d32';
      case 'full': return '#c62828';
      case 'inprogress': return '#856404';
      case 'completed': return '#383d41';
      default: return '#383d41';
    }
  }};
`;

const PresenterSection = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.colors.tertiary};
`;

const PresenterHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const PresenterAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const PresenterInfo = styled.div`
  flex: 1;
`;

const PresenterName = styled.h3`
  margin: 0 0 0.25rem;
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
`;

const PresenterTitle = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const PresenterContact = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
  
  div {
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 0.25rem;
    }
  }
`;

const RegistrationSection = styled.div`
  position: sticky;
  top: 100px;
`;

const ParticipantsList = styled.div`
  margin-top: 1rem;
`;

const ParticipantItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ParticipantAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  font-size: 1rem;
`;

const ParticipantName = styled.div`
  flex: 1;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

const RatingLabel = styled.div`
  margin-right: 1rem;
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
`;

const StarContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const Star = styled(FaStar)`
  color: ${props => props.filled ? '#ffc107' : '#e4e5e9'};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1.5rem;
  
  &:hover {
    transform: scale(1.1);
  }
`;

// Mock data for workshop details
const mockWorkshopData = {
  id: 1,
  title: 'Resume Building for Tech Careers',
  date: 'June 15, 2023',
  time: '10:00 AM - 12:00 PM',
  location: 'Engineering Building, Room 201',
  description: 'Learn how to craft a standout resume targeting technology companies. This workshop will cover best practices, common mistakes, and tailored approaches for different tech roles.',
  learningOutcomes: [
    'Understand the key elements of a strong technical resume',
    'Create a tailored resume that highlights your relevant skills and experience',
    'Learn how to effectively describe your projects and achievements',
    'Avoid common resume mistakes that disqualify candidates',
    'Format your resume for both human readers and ATS systems'
  ],
  category: 'Career Development',
  tags: ['Resume', 'Tech Careers', 'Job Application'],
  status: 'upcoming',
  maxAttendees: 25,
  currentAttendees: 12,
  presenter: {
    name: 'Jennifer Miller',
    title: 'Senior Recruiter, Tech Innovations',
    email: 'j.miller@techinnovations.com',
    phone: '(555) 123-4567',
    bio: 'Jennifer has over 10 years of experience in tech recruitment and has reviewed thousands of resumes for positions ranging from junior developers to CTOs. She specializes in helping candidates position themselves effectively in the competitive tech job market.',
    initials: 'JM'
  },
  participants: [
    { id: 1, name: 'John Smith', initials: 'JS' },
    { id: 2, name: 'Sarah Johnson', initials: 'SJ' },
    { id: 3, name: 'Michael Brown', initials: 'MB' },
    { id: 4, name: 'Emily Davis', initials: 'ED' },
    { id: 5, name: 'David Wilson', initials: 'DW' }
  ]
};

const WorkshopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [rating, setRating] = useState(0);
  
  useEffect(() => {
    // In a real app, we would fetch the workshop data based on the ID
    // For this demo, we'll just use the mock data
    setTimeout(() => {
      setWorkshop(mockWorkshopData);
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleRegister = () => {
    setIsRegistered(true);
    alert('You have successfully registered for this workshop!');
  };
  
  const handleCancelRegistration = () => {
    setIsRegistered(false);
    alert('Your registration has been cancelled.');
  };
  
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    // In a real app, we would submit the rating to the server
  };
  
  if (loading) {
    return (
      <PageContainer>
        <Navbar userType="proStudent" />
        <ContentContainer>
          <div>Loading...</div>
        </ContentContainer>
      </PageContainer>
    );
  }
  
  if (error) {
    return (
      <PageContainer>
        <Navbar userType="proStudent" />
        <ContentContainer>
          <div>Error: {error}</div>
        </ContentContainer>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <Navbar userType="proStudent" />
      
      <ContentContainer>
        <BackButton onClick={() => navigate('/workshops')}>
          <FaArrowLeft /> Back to Workshops
        </BackButton>
        
        <WorkshopHeader>
          <WorkshopTitle>{workshop.title}</WorkshopTitle>
          
          <DetailsList>
            <DetailItem>
              <FaCalendarAlt />
              {workshop.date}
            </DetailItem>
            <DetailItem>
              <FaClock />
              {workshop.time}
            </DetailItem>
            <DetailItem>
              <FaMapMarkerAlt />
              {workshop.location}
            </DetailItem>
            <DetailItem>
              <FaUsers />
              {workshop.currentAttendees} / {workshop.maxAttendees} Attendees
            </DetailItem>
          </DetailsList>
          
          <CategoryTags>
            <CategoryTag>{workshop.category}</CategoryTag>
            {workshop.tags.map((tag, index) => (
              <CategoryTag key={index}>{tag}</CategoryTag>
            ))}
          </CategoryTags>
        </WorkshopHeader>
        
        <StatusBadge status={workshop.status}>
          Status: {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
        </StatusBadge>
        
        <TwoColumnLayout>
          <div>
            <Card>
              <SectionTitle>Workshop Description</SectionTitle>
              <Description>{workshop.description}</Description>
              
              <SectionTitle>Learning Outcomes</SectionTitle>
              <LearningOutcomesList>
                {workshop.learningOutcomes.map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </LearningOutcomesList>
              
              <PresenterSection>
                <SectionTitle>About the Presenter</SectionTitle>
                <PresenterHeader>
                  <PresenterAvatar>
                    {workshop.presenter.initials}
                  </PresenterAvatar>
                  <PresenterInfo>
                    <PresenterName>{workshop.presenter.name}</PresenterName>
                    <PresenterTitle>{workshop.presenter.title}</PresenterTitle>
                    <PresenterContact>
                      <div>
                        <FaEnvelope />
                        {workshop.presenter.email}
                      </div>
                      <div>
                        <FaPhone />
                        {workshop.presenter.phone}
                      </div>
                    </PresenterContact>
                  </PresenterInfo>
                </PresenterHeader>
                <Description>{workshop.presenter.bio}</Description>
              </PresenterSection>
              
              {workshop.status === 'completed' && (
                <div>
                  <SectionTitle>Rate this Workshop</SectionTitle>
                  <RatingSection>
                    <RatingLabel>Your Rating:</RatingLabel>
                    <StarContainer>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          filled={star <= rating}
                          onClick={() => handleRatingChange(star)}
                        />
                      ))}
                    </StarContainer>
                  </RatingSection>
                </div>
              )}
            </Card>
          </div>
          
          <RegistrationSection>
            <Card title="Registration">
              <div>
                <p><strong>Date:</strong> {workshop.date}</p>
                <p><strong>Time:</strong> {workshop.time}</p>
                <p><strong>Location:</strong> {workshop.location}</p>
                <p><strong>Available Seats:</strong> {workshop.maxAttendees - workshop.currentAttendees}</p>
              </div>
              
              {workshop.status === 'upcoming' && !workshop.full && (
                <Card.Footer>
                  {!isRegistered ? (
                    <Button 
                      variant="primary" 
                      icon={<FaUserPlus />}
                      onClick={handleRegister}
                      disabled={workshop.currentAttendees >= workshop.maxAttendees}
                    >
                      Register for Workshop
                    </Button>
                  ) : (
                    <Button 
                      variant="secondary"
                      onClick={handleCancelRegistration}
                    >
                      Cancel Registration
                    </Button>
                  )}
                </Card.Footer>
              )}
              
              {workshop.status === 'full' && (
                <Card.Footer>
                  <Button 
                    variant="danger" 
                    disabled
                  >
                    Workshop Full
                  </Button>
                </Card.Footer>
              )}
              
              {(workshop.status === 'inprogress' || workshop.status === 'completed') && (
                <Card.Footer>
                  <Button 
                    variant="secondary" 
                    disabled
                  >
                    Registration Closed
                  </Button>
                </Card.Footer>
              )}
            </Card>
            
            <Card title="Participants" style={{ marginTop: '1.5rem' }}>
              <ParticipantsList>
                {workshop.participants.slice(0, 5).map(participant => (
                  <ParticipantItem key={participant.id}>
                    <ParticipantAvatar>
                      {participant.initials}
                    </ParticipantAvatar>
                    <ParticipantName>
                      {participant.name}
                    </ParticipantName>
                  </ParticipantItem>
                ))}
              </ParticipantsList>
              
              {workshop.participants.length > 5 && (
                <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                  +{workshop.currentAttendees - 5} more participants
                </div>
              )}
            </Card>
          </RegistrationSection>
        </TwoColumnLayout>
      </ContentContainer>
    </PageContainer>
  );
};

export default WorkshopDetails; 