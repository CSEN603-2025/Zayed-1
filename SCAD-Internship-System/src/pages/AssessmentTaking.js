import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import { 
  FaArrowLeft, 
  FaClock, 
  FaCheck, 
  FaTimes,
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

const AssessmentCard = styled(Card)`
  margin-bottom: 2rem;
`;

const AssessmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const AssessmentTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  margin: 0;
  font-size: 1.8rem;
`;

const Timer = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.secondary};
  font-size: 1.1rem;
  
  svg {
    margin-right: 0.5rem;
    color: ${props => props.theme.colors.warning};
  }
`;

const QuestionCard = styled(Card)`
  margin-bottom: 1.5rem;
`;

const QuestionNumber = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const QuestionText = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin: 0 0 1rem;
  font-size: 1.2rem;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.lightHover};
  }
  
  input {
    margin-right: 1rem;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const SubmitButton = styled(Button)`
  margin-left: auto;
`;

const WarningModal = styled.div`
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

const ModalContent = styled(Card)`
  max-width: 400px;
  width: 90%;
  padding: 2rem;
  text-align: center;
`;

const ModalTitle = styled.h2`
  color: ${props => props.theme.colors.warning};
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

// Mock data for assessment questions
const mockQuestions = [
  {
    id: 1,
    text: 'What is the time complexity of a binary search algorithm?',
    options: [
      { id: 'a', text: 'O(1)' },
      { id: 'b', text: 'O(log n)' },
      { id: 'c', text: 'O(n)' },
      { id: 'd', text: 'O(n log n)' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 2,
    text: 'Which of the following is NOT a valid HTTP method?',
    options: [
      { id: 'a', text: 'GET' },
      { id: 'b', text: 'POST' },
      { id: 'c', text: 'FETCH' },
      { id: 'd', text: 'DELETE' }
    ],
    correctAnswer: 'c'
  },
  {
    id: 3,
    text: 'What is the main purpose of a database index?',
    options: [
      { id: 'a', text: 'To store backup data' },
      { id: 'b', text: 'To improve query performance' },
      { id: 'c', text: 'To ensure data integrity' },
      { id: 'd', text: 'To reduce storage space' }
    ],
    correctAnswer: 'b'
  }
];

const AssessmentTaking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [showWarning, setShowWarning] = useState(false);
  
  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const handleAnswerSelect = (questionId, answerId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };
  
  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const handleSubmit = () => {
    // Calculate score
    const score = Object.entries(answers).reduce((acc, [questionId, answerId]) => {
      const question = mockQuestions.find(q => q.id === parseInt(questionId));
      return acc + (question && answerId === question.correctAnswer ? 1 : 0);
    }, 0);
    
    const percentage = Math.round((score / mockQuestions.length) * 100);
    
    // In a real app, this would be an API call to save the results
    console.log('Assessment completed with score:', percentage);
    
    // Navigate to results page
    navigate(`/assessments/results/${id}?score=${percentage}`);
  };
  
  const handleLeave = () => {
    setShowWarning(true);
  };
  
  const confirmLeave = () => {
    navigate('/assessments');
  };
  
  const cancelLeave = () => {
    setShowWarning(false);
  };
  
  const currentQ = mockQuestions[currentQuestion];
  
  return (
    <PageContainer>
      <Navbar userType="proStudent" />
      
      <ContentContainer>
        <BackButton onClick={handleLeave}>
          <FaArrowLeft /> Back to Assessments
        </BackButton>
        
        <AssessmentCard>
          <AssessmentHeader>
            <AssessmentTitle>Technical Skills Assessment</AssessmentTitle>
            <Timer>
              <FaClock />
              {formatTime(timeLeft)}
            </Timer>
          </AssessmentHeader>
          
          <QuestionCard>
            <QuestionNumber>
              Question {currentQuestion + 1} of {mockQuestions.length}
            </QuestionNumber>
            
            <QuestionText>{currentQ.text}</QuestionText>
            
            <OptionsList>
              {currentQ.options.map(option => (
                <Option key={option.id}>
                  <input
                    type="radio"
                    name={`question-${currentQ.id}`}
                    value={option.id}
                    checked={answers[currentQ.id] === option.id}
                    onChange={() => handleAnswerSelect(currentQ.id, option.id)}
                  />
                  {option.text}
                </Option>
              ))}
            </OptionsList>
          </QuestionCard>
          
          <NavigationButtons>
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            {currentQuestion === mockQuestions.length - 1 ? (
              <SubmitButton
                variant="primary"
                onClick={() => setShowWarning(true)}
              >
                Submit Assessment
              </SubmitButton>
            ) : (
              <Button
                variant="primary"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </NavigationButtons>
        </AssessmentCard>
      </ContentContainer>
      
      {showWarning && (
        <WarningModal>
          <ModalContent>
            <ModalTitle>
              <FaExclamationTriangle />
              {currentQuestion === mockQuestions.length - 1 ? 'Submit Assessment?' : 'Leave Assessment?'}
            </ModalTitle>
            
            <p>
              {currentQuestion === mockQuestions.length - 1
                ? 'Are you sure you want to submit your assessment? You cannot change your answers after submission.'
                : 'Are you sure you want to leave? Your progress will be lost.'}
            </p>
            
            <ModalButtons>
              <Button
                variant="secondary"
                onClick={cancelLeave}
              >
                Cancel
              </Button>
              
              <Button
                variant="primary"
                onClick={currentQuestion === mockQuestions.length - 1 ? handleSubmit : confirmLeave}
              >
                {currentQuestion === mockQuestions.length - 1 ? 'Submit' : 'Leave'}
              </Button>
            </ModalButtons>
          </ModalContent>
        </WarningModal>
      )}
    </PageContainer>
  );
};

export default AssessmentTaking; 