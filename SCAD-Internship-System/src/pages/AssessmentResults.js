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
  FaChartBar
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

const VisibilityToggle = styled.button`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  background-color: ${props => props.visible ? '#e8f5e9' : '#f5f5f5'};
  color: ${props => props.visible ? '#2e7d32' : '#757575'};
  cursor: pointer;
  margin: 1rem auto;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    opacity: 0.9;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const AssessmentResults = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [score, setScore] = useState(null);
  const [scoreVisible, setScoreVisible] = useState(false);
  
  useEffect(() => {
    // Get score from URL query parameter
    const params = new URLSearchParams(location.search);
    const scoreParam = params.get('score');
    if (scoreParam) {
      setScore(parseInt(scoreParam));
    }
  }, [location]);
  
  const toggleScoreVisibility = () => {
    setScoreVisible(prev => !prev);
    // In a real app, this would be an API call to update the visibility
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
            <AssessmentTitle>Technical Skills Assessment Results</AssessmentTitle>
          </ResultsHeader>
          
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
              <DetailValue>45 minutes</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Questions Answered</DetailLabel>
              <DetailValue>30/30</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Correct Answers</DetailLabel>
              <DetailValue>{Math.round((score / 100) * 30)}/30</DetailValue>
            </DetailItem>
          </ResultsDetails>
          
          <VisibilityToggle
            visible={scoreVisible}
            onClick={toggleScoreVisibility}
          >
            {scoreVisible ? <FaEye /> : <FaEyeSlash />}
            {scoreVisible ? 'Score is Visible' : 'Score is Hidden'}
          </VisibilityToggle>
          
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
        </ResultsCard>
      </ContentContainer>
    </PageContainer>
  );
};

export default AssessmentResults; 