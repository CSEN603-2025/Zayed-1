import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEdit, FaSave, FaTrash, FaHistory, FaPaperPlane } from 'react-icons/fa';
import Button from './Button';

const FeedbackContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FeedbackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const FeedbackTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
  margin: 0;
`;

const FeedbackInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  font-size: 0.9rem;
  min-height: 120px;
  margin-bottom: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const FeedbackActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const FeedbackHistoryContainer = styled.div`
  margin-top: 2rem;
`;

const FeedbackHistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const FeedbackHistoryTitle = styled.h4`
  color: ${props => props.theme.colors.primary};
  font-size: 1rem;
  margin: 0;
`;

const FeedbackHistoryToggle = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.secondary};
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const FeedbackHistoryList = styled.div`
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const FeedbackHistoryItem = styled.div`
  border-left: 3px solid ${props => props.theme.colors.secondary};
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: ${props => props.theme.colors.tertiary};
  border-radius: 0 5px 5px 0;
`;

const FeedbackHistoryItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const FeedbackHistoryItemTitle = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const FeedbackHistoryItemDate = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
`;

const FeedbackHistoryItemContent = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.secondary};
`;

const FeedbackCategory = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const FeedbackRating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const RatingLabel = styled.span`
  margin-right: 1rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
`;

const RatingOptions = styled.div`
  display: flex;
`;

const RatingOption = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.isSelected 
    ? props.theme.colors.secondary 
    : props.theme.colors.tertiary};
  background-color: ${props => props.isSelected 
    ? props.theme.colors.secondary
    : 'transparent'};
  color: ${props => props.isSelected 
    ? 'white' 
    : props.theme.colors.darkGray};
  margin-right: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.isSelected 
      ? props.theme.colors.secondary 
      : props.theme.colors.tertiary};
  }
`;

const FeedbackSystem = ({ reportId, studentName, isVisible = true }) => {
  const [feedback, setFeedback] = useState('');
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [category, setCategory] = useState('general');
  const [rating, setRating] = useState(0);
  
  useEffect(() => {
    // In a real app, this would fetch feedback history from API
    const mockFeedbackHistory = [
      {
        id: 1,
        category: 'content',
        content: 'Your report lacks detailed information about the technical aspects of your internship. Please provide more specific examples of the technologies you worked with.',
        rating: 3,
        date: '2023-05-15T14:30:00'
      },
      {
        id: 2,
        category: 'format',
        content: 'Please follow the report template more closely. Your sections are not properly formatted according to the guidelines.',
        rating: 2,
        date: '2023-05-10T11:20:00'
      },
      {
        id: 3,
        category: 'general',
        content: 'Overall good progress. Keep up the good work!',
        rating: 4,
        date: '2023-05-05T09:45:00'
      }
    ];
    
    setFeedbackHistory(mockFeedbackHistory);
  }, [reportId]);
  
  const handleSubmitFeedback = () => {
    if (!feedback.trim()) return;
    
    // In a real app, this would send data to API
    const newFeedback = {
      id: Date.now(),
      category,
      content: feedback,
      rating,
      date: new Date().toISOString()
    };
    
    setFeedbackHistory([newFeedback, ...feedbackHistory]);
    setFeedback('');
    setCategory('general');
    setRating(0);
    
    // Show success message or notification
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
  };
  
  const getCategoryLabel = (category) => {
    switch(category) {
      case 'content': return 'Content Feedback';
      case 'format': return 'Format Feedback';
      case 'technical': return 'Technical Feedback';
      case 'communication': return 'Communication Feedback';
      default: return 'General Feedback';
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <FeedbackContainer>
      <FeedbackHeader>
        <FeedbackTitle>Provide Feedback to {studentName}</FeedbackTitle>
      </FeedbackHeader>
      
      <FeedbackCategory 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="general">General Feedback</option>
        <option value="content">Content Feedback</option>
        <option value="format">Format Feedback</option>
        <option value="technical">Technical Feedback</option>
        <option value="communication">Communication Feedback</option>
      </FeedbackCategory>
      
      <FeedbackRating>
        <RatingLabel>Rating:</RatingLabel>
        <RatingOptions>
          {[1, 2, 3, 4, 5].map((value) => (
            <RatingOption 
              key={value}
              isSelected={rating === value}
              onClick={() => setRating(value)}
            >
              {value}
            </RatingOption>
          ))}
        </RatingOptions>
      </FeedbackRating>
      
      <FeedbackInput
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Enter your feedback for the student..."
      />
      
      <FeedbackActions>
        <Button 
          onClick={() => setFeedback('')}
          variant="outlined"
          icon={<FaTrash />}
        >
          Clear
        </Button>
        <Button 
          onClick={handleSubmitFeedback}
          variant="primary"
          icon={<FaPaperPlane />}
        >
          Submit Feedback
        </Button>
      </FeedbackActions>
      
      {feedbackHistory.length > 0 && (
        <FeedbackHistoryContainer>
          <FeedbackHistoryHeader>
            <FeedbackHistoryTitle>Previous Feedback</FeedbackHistoryTitle>
            <FeedbackHistoryToggle onClick={() => setShowHistory(!showHistory)}>
              <FaHistory />
              {showHistory ? 'Hide History' : 'Show History'}
            </FeedbackHistoryToggle>
          </FeedbackHistoryHeader>
          
          <FeedbackHistoryList isOpen={showHistory}>
            {feedbackHistory.map((item) => (
              <FeedbackHistoryItem key={item.id}>
                <FeedbackHistoryItemHeader>
                  <FeedbackHistoryItemTitle>
                    {getCategoryLabel(item.category)} (Rating: {item.rating}/5)
                  </FeedbackHistoryItemTitle>
                  <FeedbackHistoryItemDate>
                    {formatDate(item.date)}
                  </FeedbackHistoryItemDate>
                </FeedbackHistoryItemHeader>
                <FeedbackHistoryItemContent>
                  {item.content}
                </FeedbackHistoryItemContent>
              </FeedbackHistoryItem>
            ))}
          </FeedbackHistoryList>
        </FeedbackHistoryContainer>
      )}
    </FeedbackContainer>
  );
};

export default FeedbackSystem; 