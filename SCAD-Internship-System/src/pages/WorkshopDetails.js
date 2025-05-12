import React, { useState, useEffect, useRef } from 'react';
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
  FaEnvelope,
  FaPhone,
  FaUsers,
  FaStar,
  FaPlay,
  FaPause,
  FaStop,
  FaComments,
  FaStickyNote,
  FaCertificate,
  FaDownload,
  FaSave
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

const VideoSection = styled.div`
  margin: 2rem 0;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: #000;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const VideoPlaceholder = styled.div`
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background-color: ${props => props.theme.colors.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
  position: relative;
`;

const YouTubeEmbed = styled.iframe`
  width: 100%;
  height: 450px;
  border: none;
  border-radius: 8px;
`;

const VideoControls = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ControlButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.tertiary};
    cursor: not-allowed;
  }
`;

const FeedbackSection = styled.div`
  margin-top: 2rem;
`;

const FeedbackTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  font-size: 0.9rem;
  margin-top: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const FeedbackItem = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.light};
  border-radius: 5px;
`;

const FeedbackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const FeedbackUser = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const FeedbackDate = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
`;

const FeedbackText = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
`;

const FeedbackRating = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  
  svg {
    color: #ffc107;
    margin-right: 0.25rem;
  }
`;

const NotesContainer = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.colors.tertiary};
`;

const NotesTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  font-size: 0.9rem;
  margin-top: 1rem;
  min-height: 200px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const CertificateIcon = styled(FaCertificate)`
  font-size: 4rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const CertificateTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
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
  status: 'completed',
  maxAttendees: 25,
  currentAttendees: 12,
  isRecorded: true,
  videoUrl: 'https://www.youtube.com/embed/CmP3XXwKJ60?si=y0Ds20kPrEhCxY1T', // Placeholder for video URL
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
  ],
  feedback: [
    {
      id: 1,
      user: 'Michael Brown',
      date: 'June 16, 2023',
      rating: 5,
      text: 'Excellent workshop! I learned a lot of useful techniques that I immediately applied to my resume.'
    },
    {
      id: 2,
      user: 'Emily Davis',
      date: 'June 17, 2023',
      rating: 4,
      text: 'Very informative and practical. Would have liked more examples specific to UX/UI design roles.'
    }
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
  const [feedback, setFeedback] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [notes, setNotes] = useState('');
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const videoRef = useRef(null);
  
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

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSaveNotes = () => {
    // In a real app, we would save the notes to the server
    alert('Your notes have been saved!');
  };

  const handleShowCertificate = () => {
    setShowCertificateModal(true);
  };

  const handleCloseCertificate = () => {
    setShowCertificateModal(false);
  };

  const handleDownloadCertificate = () => {
    // In a real app, this would generate and download a PDF certificate
    alert('Your certificate is being downloaded!');
    // Close the modal after download
    setShowCertificateModal(false);
  };

  const handleSubmitFeedback = () => {
    if (!rating) {
      alert('Please provide a rating before submitting feedback.');
      return;
    }

    if (!feedback.trim()) {
      alert('Please provide some feedback text.');
      return;
    }

    // In a real app, we would submit the feedback to the server
    alert('Thank you for your feedback!');
    
    // Add feedback to the local state
    const newFeedback = {
      id: workshop.feedback.length + 1,
      user: 'You', // In a real app, would use the actual user name
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      rating,
      text: feedback
    };
    
    setWorkshop(prev => ({
      ...prev,
      feedback: [newFeedback, ...prev.feedback]
    }));
    
    // Reset form
    setFeedback('');
    setRating(0);
  };
  
  // Function to check if URL is YouTube
  const isYouTubeUrl = (url) => {
    return url && url.includes('youtube.com');
  };
  
  // Function to extract YouTube video ID
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  // Function to get YouTube embed URL
  const getYouTubeEmbedUrl = (url) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };
  
  const handlePlayVideo = () => {
    if (videoRef.current && !isYouTubeUrl(workshop.videoUrl)) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  
  const handlePauseVideo = () => {
    if (videoRef.current && !isYouTubeUrl(workshop.videoUrl)) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  const handleStopVideo = () => {
    if (videoRef.current && !isYouTubeUrl(workshop.videoUrl)) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
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
              
              {workshop.isRecorded && (
                <VideoSection>
                  <SectionTitle>Workshop Recording</SectionTitle>
                  <VideoContainer>
                    {workshop.videoUrl ? (
                      isYouTubeUrl(workshop.videoUrl) ? (
                        <YouTubeEmbed
                          src={getYouTubeEmbedUrl(workshop.videoUrl)}
                          title="Workshop Video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video 
                          ref={videoRef}
                          width="100%" 
                          height="auto"
                          controls
                        >
                          <source src={workshop.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )
                    ) : (
                      <VideoPlaceholder>
                        Video will be available here after the workshop
                      </VideoPlaceholder>
                    )}
                  </VideoContainer>
                  
                  {workshop.videoUrl && !isYouTubeUrl(workshop.videoUrl) && (
                    <VideoControls>
                      <ControlButton onClick={handlePlayVideo} disabled={!workshop.videoUrl || isPlaying}>
                        <FaPlay />
                      </ControlButton>
                      <ControlButton onClick={handlePauseVideo} disabled={!workshop.videoUrl || !isPlaying}>
                        <FaPause />
                      </ControlButton>
                      <ControlButton onClick={handleStopVideo} disabled={!workshop.videoUrl || !isPlaying}>
                        <FaStop />
                      </ControlButton>
                    </VideoControls>
                  )}
                </VideoSection>
              )}
              
              <SectionTitle>Learning Outcomes</SectionTitle>
              <LearningOutcomesList>
                {workshop.learningOutcomes.map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </LearningOutcomesList>
              
              <NotesContainer>
                <SectionTitle>Workshop Notes</SectionTitle>
                <Description>Take notes during the workshop to help you remember key points</Description>
                <NotesTextarea
                  placeholder="Type your notes here..."
                  value={notes}
                  onChange={handleNotesChange}
                  rows={8}
                />
                <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                  <Button 
                    variant="primary" 
                    size="small"
                    icon={<FaSave />}
                    onClick={handleSaveNotes}
                  >
                    Save Notes
                  </Button>
                </div>
              </NotesContainer>

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
              
              <FeedbackSection>
                <SectionTitle>Rate & Provide Feedback</SectionTitle>
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
                
                <FeedbackTextarea
                  placeholder="Share your thoughts about this workshop..."
                  value={feedback}
                  onChange={handleFeedbackChange}
                  rows={4}
                />
                
                <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                  <Button 
                    variant="primary" 
                    size="small"
                    icon={<FaComments />}
                    onClick={handleSubmitFeedback}
                  >
                    Submit Feedback
                  </Button>
                </div>
                
                {workshop.feedback && workshop.feedback.length > 0 && (
                  <div style={{ marginTop: '2rem' }}>
                    <h4>Workshop Feedback</h4>
                    {workshop.feedback.map(item => (
                      <FeedbackItem key={item.id}>
                        <FeedbackHeader>
                          <FeedbackUser>{item.user}</FeedbackUser>
                          <FeedbackDate>{item.date}</FeedbackDate>
                        </FeedbackHeader>
                        <FeedbackRating>
                          <FaStar />
                          {item.rating}/5
                        </FeedbackRating>
                        <FeedbackText>{item.text}</FeedbackText>
                      </FeedbackItem>
                    ))}
                  </div>
                )}
              </FeedbackSection>
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

            {workshop.status === 'completed' && (
              <Card title="Certificate" style={{ marginTop: '1.5rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <FaCertificate style={{ fontSize: '3rem', color: '#ffc107', marginBottom: '1rem' }} />
                  <p>You've completed this workshop!</p>
                  <Button 
                    variant="primary" 
                    icon={<FaCertificate />}
                    onClick={handleShowCertificate}
                    style={{ marginTop: '1rem' }}
                  >
                    View Certificate
                  </Button>
                </div>
              </Card>
            )}
          </RegistrationSection>
        </TwoColumnLayout>
      </ContentContainer>

      {showCertificateModal && (
        <ModalOverlay>
          <ModalContent>
            <CertificateIcon />
            <CertificateTitle>Congratulations!</CertificateTitle>
            <p>You have successfully completed</p>
            <h3>{workshop.title}</h3>
            <p>on {workshop.date}</p>
            <ActionButtons>
              <Button 
                variant="secondary" 
                onClick={handleCloseCertificate}
              >
                Close
              </Button>
              <Button 
                variant="primary" 
                icon={<FaDownload />}
                onClick={handleDownloadCertificate}
              >
                Download Certificate
              </Button>
            </ActionButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default WorkshopDetails;
