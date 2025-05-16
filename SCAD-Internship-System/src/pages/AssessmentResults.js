import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import { 
  FaArrowLeft, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaStar,
  FaEye,
  FaEyeSlash,
  FaChartBar,
  FaUser,
  FaExclamationTriangle
} from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.light};
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  margin-bottom: 1.5rem;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    opacity: 0.8;
  }
`;

const ResultsCard = styled(Card)`
  text-align: center;
`;

const ResultsHeader = styled.div`
  margin-bottom: 2rem;
`;

const AssessmentTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  margin: 0 0 1rem;
  font-size: 1.8rem;
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
`;

const ScoreCircle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: ${props => {
    const score = props.score;
    if (score >= 80) return '#e8f5e9';
    if (score >= 60) return '#fff3e0';
    return '#ffebee';
  }};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    border: 4px solid ${props => {
      const score = props.score;
      if (score >= 80) return '#4caf50';
      if (score >= 60) return '#ff9800';
      return '#f44336';
    }};
  }
`;

const ScoreValue = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: ${props => {
    const score = props.score;
    if (score >= 80) return '#2e7d32';
    if (score >= 60) return '#ef6c00';
    return '#c62828';
  }};
`;

const ScoreLabel = styled.div`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.secondary};
  margin-top: 0.5rem;
`;

const ResultsDetails = styled.div`
  margin: 2rem 0;
  text-align: left;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  color: ${props => props.theme.colors.secondary};
`;

const DetailValue = styled.span`
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
`;

const ProfilePostingCard = styled(Card)`
  margin-top: 2rem;
  text-align: left;
`;

const ProfilePostingHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  svg {
    margin-right: 0.5rem;
    color: ${props => props.theme.colors.primary};
  }
`;

const ProfilePostingTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin: 0;
  font-size: 1.2rem;
`;

const ProfilePostingDescription = styled.p`
  color: ${props => props.theme.colors.secondary};
  margin: 0 0 1rem;
  font-size: 0.9rem;
`;

const PostToProfileButton = styled(Button)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  
  svg {
    font-size: 1.1rem;
  }
`;

const PostingStatus = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: ${props => props.posted ? '#e8f5e9' : '#f5f5f5'};
  color: ${props => props.posted ? '#2e7d32' : '#757575'};
  border-radius: 0.5rem;
  font-size: 0.9rem;
  margin-top: 1rem;
  
  svg {
    margin-right: 0.5rem;
    color: ${props => props.posted ? '#4caf50' : '#9e9e9e'};
  }
`;

const ConfirmationModal = styled.div`
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
`;

const ModalTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.primary};
  margin: 0 0 1rem;
  
  svg {
    color: #ff9800;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const PrivacySettings = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.light};
  border-radius: 0.5rem;
`;

const PrivacyOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  cursor: pointer;
  
  input {
    cursor: pointer;
  }
`;

const AssessmentResults = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [score, setScore] = useState(null);
  const [scoreVisible, setScoreVisible] = useState(true);
  const [assessmentDetails, setAssessmentDetails] = useState(null);
  const [isPostedToProfile, setIsPostedToProfile] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [privacyLevel, setPrivacyLevel] = useState('public');
  
  useEffect(() => {
    // Get score from URL query parameter
    const params = new URLSearchParams(location.search);
    const scoreParam = params.get('score');
    if (scoreParam) {
      const newScore = parseInt(scoreParam);
      setScore(newScore);
      
      // Create new assessment result
      const newAssessment = {
        id: parseInt(id),
        title: 'Technical Skills Assessment',
        date: new Date().toISOString().split('T')[0],
        score: newScore,
        totalQuestions: 30,
        correctAnswers: Math.round((newScore / 100) * 30),
        duration: '45 minutes',
        status: 'completed',
        posted: false, // New field to track if posted to profile
        privacyLevel: 'public' // New field to track privacy level
      };
      
      setAssessmentDetails(newAssessment);
      
      // Check if this assessment is already posted
      const savedAssessments = JSON.parse(localStorage.getItem('studentAssessments') || '[]');
      const existingAssessment = savedAssessments.find(a => a.id === parseInt(id));
      if (existingAssessment?.posted) {
        setIsPostedToProfile(true);
      }
    }
  }, [location, id]);
  
  const handlePostToProfile = () => {
    setShowConfirmation(true);
  };
  
  const confirmPostToProfile = () => {
    setIsPostedToProfile(true);
    setShowConfirmation(false);
    
    // Update localStorage with privacy settings
    const savedAssessments = JSON.parse(localStorage.getItem('studentAssessments') || '[]');
    const updatedAssessments = savedAssessments.map(assessment =>
      assessment.id === parseInt(id)
        ? { ...assessment, posted: true, privacyLevel }
        : assessment
    );
    localStorage.setItem('studentAssessments', JSON.stringify(updatedAssessments));
  };
  
  const cancelPostToProfile = () => {
    setShowConfirmation(false);
  };
  
  const getScoreColor = (score) => {
    if (score >= 80) return '#2e7d32';
    if (score >= 60) return '#ef6c00';
    return '#c62828';
  };
  
  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };
  
  if (!score) {
    return (
      <PageContainer>
        <Navbar userType="proStudent" />
        <ContentContainer>
          <BackButton onClick={() => navigate('/assessments')}>
            <FaArrowLeft /> Back to Assessments
          </BackButton>
          <ResultsCard>
            <p>No results found for this assessment.</p>
          </ResultsCard>
        </ContentContainer>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <Navbar userType="proStudent" />
      
      <ContentContainer>
        <BackButton onClick={() => navigate('/assessments')}>
          <FaArrowLeft /> Back to Assessments
        </BackButton>
        
        <ResultsCard>
          <ResultsHeader>
            <AssessmentTitle>
              {assessmentDetails?.title || 'Assessment Results'}
            </AssessmentTitle>
          </ResultsHeader>
          
          {score !== null && (
            <>
              <ScoreContainer>
                <ScoreCircle score={score}>
                  <ScoreValue score={score}>{score}%</ScoreValue>
                  <ScoreLabel>{getScoreLabel(score)}</ScoreLabel>
                </ScoreCircle>
              </ScoreContainer>
              
              <ResultsDetails>
                <DetailItem>
                  <DetailLabel>Assessment Date</DetailLabel>
                  <DetailValue>{new Date().toLocaleDateString()}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Time Taken</DetailLabel>
                  <DetailValue>{assessmentDetails?.duration || '45 minutes'}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Questions Answered</DetailLabel>
                  <DetailValue>{assessmentDetails?.totalQuestions || 30}/30</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Correct Answers</DetailLabel>
                  <DetailValue>{assessmentDetails?.correctAnswers || Math.round((score / 100) * 30)}/30</DetailValue>
                </DetailItem>
              </ResultsDetails>
              
              <ProfilePostingCard>
                <ProfilePostingHeader>
                  <FaUser />
                  <ProfilePostingTitle>Share Your Results</ProfilePostingTitle>
                </ProfilePostingHeader>
                
                <ProfilePostingDescription>
                  Post your assessment results to your profile to showcase your achievements to potential employers and advisors.
                </ProfilePostingDescription>
                
                {isPostedToProfile ? (
                  <>
                    <PostingStatus posted={true}>
                      <FaCheckCircle />
                      This result is posted on your profile
                    </PostingStatus>
                    <PrivacySettings>
                      <h4>Visibility Settings</h4>
                      <PrivacyOption>
                        <input
                          type="radio"
                          name="privacy"
                          value="public"
                          checked={privacyLevel === 'public'}
                          onChange={(e) => setPrivacyLevel(e.target.value)}
                        />
                        Public - Visible to employers and advisors
                      </PrivacyOption>
                      <PrivacyOption>
                        <input
                          type="radio"
                          name="privacy"
                          value="private"
                          checked={privacyLevel === 'private'}
                          onChange={(e) => setPrivacyLevel(e.target.value)}
                        />
                        Private - Only visible to you
                      </PrivacyOption>
                    </PrivacySettings>
                  </>
                ) : (
                  <PostToProfileButton
                    variant="primary"
                    onClick={handlePostToProfile}
                  >
                    <FaUser />
                    Post Result to Profile
                  </PostToProfileButton>
                )}
              </ProfilePostingCard>
              
              <ActionButtons>
                <Button
                  variant="secondary"
                  onClick={() => navigate('/assessments')}
                >
                  Back to Assessments
                </Button>
                
                <Button
                  variant="primary"
                  onClick={() => navigate('/profile')}
                >
                  View Profile
                </Button>
              </ActionButtons>
            </>
          )}
        </ResultsCard>
      </ContentContainer>
      
      {showConfirmation && (
        <ConfirmationModal>
          <ModalContent>
            <ModalTitle>
              <FaExclamationTriangle />
              Post Result to Profile?
            </ModalTitle>
            
            <p>
              This will make your assessment score visible on your profile. 
              You can control who sees your results with the privacy settings.
            </p>

            <PrivacySettings>
              <h4>Choose Visibility</h4>
              <PrivacyOption>
                <input
                  type="radio"
                  name="privacy"
                  value="public"
                  checked={privacyLevel === 'public'}
                  onChange={(e) => setPrivacyLevel(e.target.value)}
                />
                Public - Visible to employers and advisors
              </PrivacyOption>
              <PrivacyOption>
                <input
                  type="radio"
                  name="privacy"
                  value="private"
                  checked={privacyLevel === 'private'}
                  onChange={(e) => setPrivacyLevel(e.target.value)}
                />
                Private - Only visible to you
              </PrivacyOption>
            </PrivacySettings>
            
            <ModalButtons>
              <Button
                variant="secondary"
                onClick={cancelPostToProfile}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={confirmPostToProfile}
              >
                Post to Profile
              </Button>
            </ModalButtons>
          </ModalContent>
        </ConfirmationModal>
      )}
    </PageContainer>
  );
};

export default AssessmentResults; 