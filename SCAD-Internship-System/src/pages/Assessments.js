import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import { 
  FaClipboardList, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock,
  FaStar,
  FaLock,
  FaUnlock,
  FaEye,
  FaEyeSlash
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

const PageTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const AssessmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const AssessmentCard = styled(Card)`
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const AssessmentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  svg {
    margin-right: 0.5rem;
    color: ${props => props.theme.colors.primary};
  }
`;

const AssessmentTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin: 0;
  font-size: 1.2rem;
`;

const AssessmentInfo = styled.div`
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.secondary};
  font-size: 0.9rem;
`;

const AssessmentStatus = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  
  svg {
    margin-right: 0.5rem;
  }
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  
  ${props => {
    switch (props.status) {
      case 'completed':
        return `
          background-color: #e8f5e9;
          color: #2e7d32;
        `;
      case 'available':
        return `
          background-color: #e3f2fd;
          color: #1565c0;
        `;
      case 'locked':
        return `
          background-color: #f5f5f5;
          color: #757575;
        `;
      default:
        return '';
    }
  }}
`;

const ScoreBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: #fff3e0;
  color: #ef6c00;
  margin-left: auto;
  
  svg {
    margin-right: 0.25rem;
  }
`;

const VisibilityToggle = styled.button`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => props.visible ? '#e8f5e9' : '#f5f5f5'};
  color: ${props => props.visible ? '#2e7d32' : '#757575'};
  cursor: pointer;
  margin-left: 0.5rem;
  
  svg {
    margin-right: 0.25rem;
  }
  
  &:hover {
    opacity: 0.9;
  }
`;

// Mock data for assessments
const mockAssessments = [
  {
    id: 1,
    title: 'Technical Skills Assessment',
    description: 'Evaluate your programming and technical problem-solving abilities',
    duration: 60,
    questions: 30,
    status: 'completed',
    score: 85,
    scoreVisible: true,
    completedDate: '2024-03-15'
  },
  {
    id: 2,
    title: 'Communication Skills Test',
    description: 'Assess your written and verbal communication abilities',
    duration: 45,
    questions: 25,
    status: 'available',
    score: null,
    scoreVisible: false
  },
  {
    id: 3,
    title: 'Leadership Assessment',
    description: 'Evaluate your leadership and team management capabilities',
    duration: 90,
    questions: 40,
    status: 'locked',
    score: null,
    scoreVisible: false,
    unlockDate: '2024-04-01'
  },
  {
    id: 4,
    title: 'Problem Solving Challenge',
    description: 'Test your analytical and problem-solving skills',
    duration: 75,
    questions: 35,
    status: 'completed',
    score: 92,
    scoreVisible: false,
    completedDate: '2024-03-10'
  }
];

const Assessments = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState(mockAssessments);
  
  const handleAssessmentClick = (assessment) => {
    if (assessment.status === 'available') {
      // Navigate to assessment taking page
      navigate(`/assessments/take/${assessment.id}`);
    } else if (assessment.status === 'completed') {
      // Navigate to assessment results page
      navigate(`/assessments/results/${assessment.id}`);
    }
  };
  
  const toggleScoreVisibility = (assessmentId) => {
    setAssessments(prevAssessments =>
      prevAssessments.map(assessment =>
        assessment.id === assessmentId
          ? { ...assessment, scoreVisible: !assessment.scoreVisible }
          : assessment
      )
    );
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle />;
      case 'available':
        return <FaClock />;
      case 'locked':
        return <FaLock />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'available':
        return 'Available';
      case 'locked':
        return 'Locked';
      default:
        return status;
    }
  };
  
  return (
    <PageContainer>
      <Navbar userType="proStudent" />
      
      <ContentContainer>
        <PageTitle>
          <FaClipboardList /> Online Assessments
        </PageTitle>
        
        <AssessmentGrid>
          {assessments.map(assessment => (
            <AssessmentCard 
              key={assessment.id}
              onClick={() => handleAssessmentClick(assessment)}
            >
              <AssessmentHeader>
                <AssessmentTitle>{assessment.title}</AssessmentTitle>
              </AssessmentHeader>
              
              <AssessmentInfo>
                <p>{assessment.description}</p>
                <p>Duration: {assessment.duration} minutes</p>
                <p>Questions: {assessment.questions}</p>
                {assessment.completedDate && (
                  <p>Completed: {assessment.completedDate}</p>
                )}
                {assessment.unlockDate && (
                  <p>Available from: {assessment.unlockDate}</p>
                )}
              </AssessmentInfo>
              
              <AssessmentStatus>
                <StatusBadge status={assessment.status}>
                  {getStatusIcon(assessment.status)}
                  {getStatusText(assessment.status)}
                </StatusBadge>
                
                {assessment.status === 'completed' && (
                  <>
                    <ScoreBadge>
                      <FaStar />
                      {assessment.score}%
                    </ScoreBadge>
                    <VisibilityToggle
                      visible={assessment.scoreVisible}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleScoreVisibility(assessment.id);
                      }}
                    >
                      {assessment.scoreVisible ? <FaEye /> : <FaEyeSlash />}
                      {assessment.scoreVisible ? 'Visible' : 'Hidden'}
                    </VisibilityToggle>
                  </>
                )}
              </AssessmentStatus>
            </AssessmentCard>
          ))}
        </AssessmentGrid>
      </ContentContainer>
    </PageContainer>
  );
};

export default Assessments; 