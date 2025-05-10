import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import FeedbackSystem from '../components/FeedbackSystem';
import { 
  FaArrowLeft, 
  FaCalendarAlt, 
  FaBuilding, 
  FaUser, 
  FaFileAlt,
  FaPaperclip,
  FaDownload,
  FaCheck,
  FaTimes,
  FaFlag,
  FaStar,
  FaComments
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

const ReportHeader = styled.div`
  background-color: ${props => props.theme.colors.primary};
  border-radius: 8px;
  padding: 2rem;
  color: white;
  margin-bottom: 2rem;
`;

const ReportTitle = styled.h1`
  margin: 0 0 1rem;
  font-size: 2rem;
  font-weight: 700;
`;

const ReportMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
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
      case 'pending': return '#fff3cd';
      case 'accepted': return '#d4edda';
      case 'rejected': return '#f8d7da';
      case 'flagged': return '#d1ecf1';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'pending': return '#856404';
      case 'accepted': return '#155724';
      case 'rejected': return '#721c24';
      case 'flagged': return '#0c5460';
      default: return '#383d41';
    }
  }};
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem;
`;

const ReportContent = styled.div`
  line-height: 1.6;
  color: ${props => props.theme.colors.darkGray};
  white-space: pre-line;
`;

const AttachmentCard = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.light};
  }
`;

const AttachmentIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

const AttachmentInfo = styled.div`
  flex: 1;
`;

const AttachmentName = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.25rem;
`;

const AttachmentSize = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
`;

const CommentSection = styled.div`
  margin-top: 2rem;
`;

const Comment = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
  
  &:last-child {
    border-bottom: none;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const CommentAuthor = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
`;

const CommentDate = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
`;

const CommentText = styled.div`
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

const ReviewSection = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.colors.tertiary};
`;

const ReviewActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const FacultyReviewSection = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionButtonFaculty = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.variant === 'success' && `
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    
    &:hover {
      background-color: #c3e6cb;
    }
  `}
  
  ${props => props.variant === 'danger' && `
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    
    &:hover {
      background-color: #f5c6cb;
    }
  `}
  
  ${props => props.variant === 'warning' && `
    background-color: #fff3cd;
    color: #856404;
    border: 1px solid #ffeeba;
    
    &:hover {
      background-color: #ffeeba;
    }
  `}
  
  ${props => props.variant === 'info' && `
    background-color: #d1ecf1;
    color: #0c5460;
    border: 1px solid #bee5eb;
    
    &:hover {
      background-color: #bee5eb;
    }
  `}
`;

const FeedbackContainer = styled.div`
  margin-top: 1.5rem;
`;

const TextAreaStyled = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const FeedbackHistory = styled.div`
  margin-top: 1.5rem;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
`;

const FeedbackItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
  
  &:last-child {
    border-bottom: none;
  }
`;

const FeedbackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const FeedbackAuthor = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
`;

const FeedbackDate = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
`;

const FeedbackText = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  white-space: pre-line;
`;

const SubmitButton = styled(Button)`
  margin-top: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// Mock data
const mockReportData = {
  id: 1,
  title: "Software Development Internship at Tech Innovations",
  status: "pending",
  student: {
    name: "John Smith",
    id: "STU2023001",
    major: "Computer Science",
    semester: 6
  },
  company: {
    name: "Tech Innovations",
    location: "San Francisco, CA"
  },
  dates: {
    startDate: "May 15, 2023",
    endDate: "August 15, 2023",
    submissionDate: "August 20, 2023"
  },
  content: {
    summary: "During my 3-month internship at Tech Innovations, I worked with the frontend development team on their main product, a customer relationship management (CRM) system. I was responsible for implementing new features, fixing bugs, and contributing to the team's sprint planning and review meetings.",
    learningOutcomes: "Throughout this internship, I've gained valuable experience with modern frontend frameworks, particularly React and Redux. I've improved my skills in writing clean, maintainable code, and learned best practices for component architecture and state management.\n\nI also gained experience with agile development methodologies, participating in daily standups, sprint planning, and retrospectives. This helped me understand how engineering teams collaborate effectively and manage complex projects.",
    challenges: "The biggest challenge I faced was coming up to speed with the large existing codebase. Initially, it was overwhelming to understand how all the different components interacted. I overcame this by asking questions, pair programming with senior developers, and spending time studying the architecture documentation.\n\nAnother challenge was balancing feature development with bug fixes and technical debt. I learned how to prioritize tasks and communicate effectively about timeline constraints.",
    conclusion: "This internship was an invaluable experience that bridged the gap between my academic knowledge and real-world software development. I'm particularly grateful for the mentorship I received from the senior developers on the team.\n\nThe skills I've gained will definitely help me in my future career, and I feel much more confident in my abilities as a developer. I would highly recommend Tech Innovations for future interns."
  },
  attachments: [
    {
      name: "Final Presentation.pdf",
      size: "2.4 MB",
      type: "pdf"
    },
    {
      name: "Project Screenshots.zip",
      size: "5.1 MB",
      type: "zip"
    }
  ],
  comments: [
    {
      author: "Dr. Sarah Miller",
      role: "Faculty Advisor",
      date: "August 22, 2023",
      text: "This is a comprehensive report that clearly outlines your experience and learning outcomes. I particularly appreciate the detailed description of the challenges you faced and how you overcame them."
    }
  ],
  rating: 4
};

const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState("faculty"); // This would come from auth context in a real app
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [showClarificationForm, setShowClarificationForm] = useState(false);
  const [clarificationText, setClarificationText] = useState("");
  const [reportStatus, setReportStatus] = useState("pending");
  const [feedbackHistory, setFeedbackHistory] = useState([
    {
      id: 1,
      author: "Dr. Emily Williams",
      date: "2023-02-10",
      text: "Please provide more details about your daily responsibilities during the internship.",
      status: "flagged"
    }
  ]);
  const [showDetailedFeedback, setShowDetailedFeedback] = useState(false);
  
  useEffect(() => {
    // In a real app, we would fetch the report data based on the ID
    // For this demo, we'll use the mock data
    setTimeout(() => {
      setReport(mockReportData);
      setRating(mockReportData.rating);
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  
  const handleFeedbackChange = (e) => {
    setFeedbackText(e.target.value);
  };
  
  const handleStatusChange = (newStatus) => {
    if (feedbackText.trim() === "") {
      alert("Please provide feedback before changing the status.");
      return;
    }
    
    // In a real app, this would make an API call to update the status
    setReportStatus(newStatus);
    
    // Add feedback to history
    const newFeedback = {
      id: feedbackHistory.length + 1,
      author: "Dr. Emily Williams", // This would come from the authenticated user
      date: new Date().toISOString().split('T')[0],
      text: feedbackText,
      status: newStatus
    };
    
    setFeedbackHistory([...feedbackHistory, newFeedback]);
    setFeedbackText("");
    
    // Show confirmation
    alert(`Report status updated to: ${newStatus}`);
  };
  
  const handleSubmitClarification = () => {
    if (clarificationText.trim() === "") {
      alert("Please enter clarification text.");
      return;
    }
    
    // Add clarification to feedback history
    const newClarification = {
      id: feedbackHistory.length + 1,
      author: "Dr. Emily Williams", // This would come from the authenticated user
      date: new Date().toISOString().split('T')[0],
      text: clarificationText,
      type: "clarification"
    };
    
    setFeedbackHistory([...feedbackHistory, newClarification]);
    setClarificationText("");
    setShowClarificationForm(false);
    
    // Show confirmation
    alert("Clarification submitted successfully.");
  };
  
  const toggleDetailedFeedback = () => {
    setShowDetailedFeedback(!showDetailedFeedback);
  };
  
  if (loading) {
    return (
      <PageContainer>
        <Navbar userType={userType} />
        <ContentContainer>
          <div>Loading...</div>
        </ContentContainer>
      </PageContainer>
    );
  }
  
  if (error) {
    return (
      <PageContainer>
        <Navbar userType={userType} />
        <ContentContainer>
          <div>Error: {error}</div>
        </ContentContainer>
      </PageContainer>
    );
  }
  
  const canReview = userType === "faculty" || userType === "scadOffice";
  
  const renderFacultyReviewSection = () => {
    if (userType !== "faculty") return null;
    
    return (
      <>
        <Card>
          <Card.Header>
            <h3>Faculty Review Actions</h3>
          </Card.Header>
          <Card.Body>
            <SectionTitle>Report Status</SectionTitle>
            <ButtonGroup>
              <Button 
                variant={report.status === 'accepted' ? 'primary' : 'outlined'} 
                onClick={() => handleStatusChange('accepted')}
                icon={<FaCheck />}
              >
                Accept Report
              </Button>
              <Button 
                variant={report.status === 'rejected' ? 'danger' : 'outlined'} 
                onClick={() => handleStatusChange('rejected')}
                icon={<FaTimes />}
              >
                Reject Report
              </Button>
              <Button 
                variant={report.status === 'flagged' ? 'warning' : 'outlined'} 
                onClick={() => handleStatusChange('flagged')}
                icon={<FaFlag />}
              >
                Flag for Review
              </Button>
            </ButtonGroup>
            
            <SectionTitle style={{ marginTop: '2rem' }}>Quick Comment</SectionTitle>
            <Input
              as="textarea"
              rows={4}
              placeholder="Add a quick comment or clarification request..."
              value={clarificationText}
              onChange={(e) => setClarificationText(e.target.value)}
            />
            <ButtonContainer style={{ marginTop: '1rem' }}>
              <Button 
                variant="primary" 
                onClick={handleSubmitClarification}
              >
                Submit Comment
              </Button>
            </ButtonContainer>
            
            <ButtonContainer style={{ marginTop: '2rem' }}>
              <Button 
                variant="secondary" 
                onClick={toggleDetailedFeedback}
                icon={<FaComments />}
              >
                {showDetailedFeedback ? 'Hide Detailed Feedback' : 'Show Detailed Feedback'}
              </Button>
            </ButtonContainer>
          </Card.Body>
        </Card>
        
        <FeedbackSystem
          reportId={id}
          studentName={report?.student.name || 'Student'}
          isVisible={showDetailedFeedback}
        />
      </>
    );
  };
  
  return (
    <PageContainer>
      <Navbar userType={userType} />
      
      <ContentContainer>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back to Reports
        </BackButton>
        
        <ReportHeader>
          <ReportTitle>{report.title}</ReportTitle>
          
          <ReportMeta>
            <MetaItem>
              <FaUser />
              {report.student.name} ({report.student.id})
            </MetaItem>
            <MetaItem>
              <FaBuilding />
              {report.company.name}, {report.company.location}
            </MetaItem>
            <MetaItem>
              <FaCalendarAlt />
              {report.dates.startDate} - {report.dates.endDate}
            </MetaItem>
            <MetaItem>
              <FaFileAlt />
              Submitted: {report.dates.submissionDate}
            </MetaItem>
          </ReportMeta>
        </ReportHeader>
        
        <StatusBadge status={report.status}>
          Status: {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
        </StatusBadge>
        
        <TwoColumnLayout>
          <div>
            <Card>
              <SectionTitle>Summary</SectionTitle>
              <ReportContent>{report.content.summary}</ReportContent>
              
              <SectionTitle>Learning Outcomes</SectionTitle>
              <ReportContent>{report.content.learningOutcomes}</ReportContent>
              
              <SectionTitle>Challenges & Problem Solving</SectionTitle>
              <ReportContent>{report.content.challenges}</ReportContent>
              
              <SectionTitle>Conclusion</SectionTitle>
              <ReportContent>{report.content.conclusion}</ReportContent>
              
              <SectionTitle>Attachments</SectionTitle>
              {report.attachments.map((attachment, index) => (
                <AttachmentCard key={index}>
                  <AttachmentIcon>
                    <FaPaperclip />
                  </AttachmentIcon>
                  <AttachmentInfo>
                    <AttachmentName>{attachment.name}</AttachmentName>
                    <AttachmentSize>{attachment.size}</AttachmentSize>
                  </AttachmentInfo>
                  <Button 
                    variant="secondary" 
                    size="small" 
                    icon={<FaDownload />}
                    onClick={() => alert(`Downloading ${attachment.name}`)}
                  >
                    Download
                  </Button>
                </AttachmentCard>
              ))}
              
              <RatingSection>
                <RatingLabel>Rating:</RatingLabel>
                <StarContainer>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      filled={star <= rating}
                      onClick={() => canReview && handleRatingChange(star)}
                    />
                  ))}
                </StarContainer>
              </RatingSection>
            </Card>
          </div>
          
          <div>
            <Card title="Comments & Feedback">
              {report.comments.length > 0 ? (
                <CommentSection>
                  {report.comments.map((comment, index) => (
                    <Comment key={index}>
                      <CommentHeader>
                        <CommentAuthor>{comment.author} ({comment.role})</CommentAuthor>
                        <CommentDate>{comment.date}</CommentDate>
                      </CommentHeader>
                      <CommentText>{comment.text}</CommentText>
                    </Comment>
                  ))}
                </CommentSection>
              ) : (
                <p>No comments yet.</p>
              )}
              
              {canReview && (
                <div style={{ marginTop: '1.5rem' }}>
                  <Input 
                    label="Add Feedback"
                    placeholder="Write your feedback here..."
                    value={feedbackText}
                    onChange={handleFeedbackChange}
                    multiline
                    rows={4}
                  />
                  <Button 
                    variant="primary" 
                    size="small" 
                    style={{ marginTop: '1rem' }}
                    onClick={() => alert("Feedback submitted successfully!")}
                  >
                    Submit Feedback
                  </Button>
                </div>
              )}
            </Card>
            
            {canReview && report.status === "pending" && (
              <Card title="Review Actions" style={{ marginTop: '1.5rem' }}>
                <p>Please review this report and provide appropriate feedback before taking action.</p>
                
                <ReviewActions>
                  <Button 
                    variant="success" 
                    icon={<FaCheck />}
                    onClick={() => alert("Report marked as accepted!")}
                  >
                    Accept
                  </Button>
                  <Button 
                    variant="danger" 
                    icon={<FaTimes />}
                    onClick={() => alert("Report marked as rejected!")}
                  >
                    Reject
                  </Button>
                  <Button 
                    variant="secondary" 
                    icon={<FaFlag />}
                    onClick={() => alert("Report flagged for review!")}
                  >
                    Flag for Review
                  </Button>
                </ReviewActions>
              </Card>
            )}
          </div>
        </TwoColumnLayout>
        
        {renderFacultyReviewSection()}
      </ContentContainer>
    </PageContainer>
  );
};

export default ReportDetails; 