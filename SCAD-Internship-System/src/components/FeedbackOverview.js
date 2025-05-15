import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Card from './Card';
import Select from './Select';
import { FaChartBar, FaComments, FaFilter, FaFileAlt, FaUser, FaSearch } from 'react-icons/fa';

const SearchFilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.div`
  flex: 1;
  position: relative;
  
  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid ${props => props.theme.colors.tertiary};
    border-radius: 5px;
    font-size: 0.9rem;
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.secondary};
    }
  }
  
  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.theme.colors.secondary};
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
`;

const FeedbackListContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FeedbackList = styled.div`
  max-height: 600px;
  overflow-y: auto;
`;

const FeedbackItem = styled.div`
  padding: 1.25rem;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.tertiary};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const FeedbackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const FeedbackMeta = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: ${props => props.theme.colors.secondary};
  }
`;

const FeedbackStudent = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const FeedbackDate = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
`;

const FeedbackCategory = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => {
    switch(props.category) {
      case 'content': return '#d1ecf1';
      case 'format': return '#d4edda';
      case 'technical': return '#fff3cd';
      case 'communication': return '#f8d7da';
      default: return '#e2e3e5';
    }
  }};
  margin-right: 0.5rem;
  color: ${props => {
    switch(props.category) {
      case 'content': return '#0c5460';
      case 'format': return '#155724';
      case 'technical': return '#856404';
      case 'communication': return '#721c24';
      default: return '#383d41';
    }
  }};
`;

const FeedbackRating = styled.div`
  display: flex;
  align-items: center;
  
  span {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
    margin-right: 0.25rem;
  }
`;

const FeedbackExcerpt = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const FeedbackOverview = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch data from an API
    const fetchFeedbacks = () => {
      // Mock data
      const mockFeedbacks = [
        {
          id: 1,
          reportId: 101,
          studentName: 'John Smith',
          studentId: 'S123456',
          date: '2023-05-15T14:30:00',
          category: 'content',
          rating: 3,
          content: 'Your report lacks detailed information about the technical aspects of your internship. Please provide more specific examples of the technologies you worked with.',
          major: 'Computer Science'
        },
        {
          id: 2,
          reportId: 102,
          studentName: 'Emma Johnson',
          studentId: 'S987654',
          date: '2023-05-10T11:20:00',
          category: 'format',
          rating: 2,
          content: 'Please follow the report template more closely. Your sections are not properly formatted according to the guidelines.',
          major: 'Electrical Engineering'
        },
        {
          id: 3,
          reportId: 103,
          studentName: 'Michael Brown',
          studentId: 'S654321',
          date: '2023-05-05T09:45:00',
          category: 'general',
          rating: 4,
          content: "Overall good progress. Your report demonstrates a clear understanding of the company's business and how your role contributes to it. Keep up the good work!",
          major: 'Information Systems'
        },
        {
          id: 4,
          reportId: 104,
          studentName: 'Sophia Davis',
          studentId: 'S246810',
          date: '2023-05-03T15:10:00',
          category: 'technical',
          rating: 3,
          content: "You've provided a good overview of the technical skills used, but I would like to see more reflection on what you learned and how you overcame challenges.",
          major: 'Computer Engineering'
        },
        {
          id: 5,
          reportId: 105,
          studentName: 'David Wilson',
          studentId: 'S135792',
          date: '2023-04-28T10:30:00',
          category: 'communication',
          rating: 2,
          content: 'Your report would benefit from clearer communication regarding your role in team projects. Be more specific about your contributions.',
          major: 'Computer Science'
        }
      ];
      
      setFeedbacks(mockFeedbacks);
      setLoading(false);
    };
    
    fetchFeedbacks();
  }, []);
  
  const handleViewReport = (reportId) => {
    navigate(`/report/${reportId}`);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
  };
  
  const getCategoryLabel = (category) => {
    switch(category) {
      case 'content': return 'Content';
      case 'format': return 'Format';
      case 'technical': return 'Technical';
      case 'communication': return 'Communication';
      default: return 'General';
    }
  };
  
  const filteredFeedbacks = feedbacks
    .filter(feedback => {
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesStudentName = feedback.studentName.toLowerCase().includes(searchLower);
        const matchesContent = feedback.content.toLowerCase().includes(searchLower);
        const matchesMajor = feedback.major.toLowerCase().includes(searchLower);
        const matchesStudentId = feedback.studentId.toLowerCase().includes(searchLower);
        
        if (!(matchesStudentName || matchesContent || matchesMajor || matchesStudentId)) {
          return false;
        }
      }
      
      // Apply category filter
      if (categoryFilter !== 'all' && feedback.category !== categoryFilter) {
        return false;
      }
      
      return true;
    });
  
  // Calculate statistics
  const totalFeedbacks = feedbacks.length;
  const averageRating = feedbacks.length 
    ? (feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length).toFixed(1)
    : 0;
  const feedbacksByCategory = feedbacks.reduce((acc, feedback) => {
    acc[feedback.category] = (acc[feedback.category] || 0) + 1;
    return acc;
  }, {});
  const mostCommonCategory = Object.entries(feedbacksByCategory).length 
    ? Object.entries(feedbacksByCategory).sort((a, b) => b[1] - a[1])[0][0]
    : 'None';
  
  if (loading) {
    return <div>Loading feedback overview...</div>;
  }
  
  return (
    <div>
      <SearchFilterContainer>
        <SearchInput>
          <FaSearch />
          <input 
            type="text" 
            placeholder="Search by student name, ID, major, or feedback content"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          options={[
            { value: 'all', label: 'All Categories' },
            { value: 'general', label: 'General' },
            { value: 'content', label: 'Content' },
            { value: 'format', label: 'Format' },
            { value: 'technical', label: 'Technical' },
            { value: 'communication', label: 'Communication' }
          ]}
        />
      </SearchFilterContainer>
      
      <StatsContainer>
        <StatCard>
          <StatIcon>
            <FaComments />
          </StatIcon>
          <StatValue>{totalFeedbacks}</StatValue>
          <StatLabel>Total Feedbacks</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <FaChartBar />
          </StatIcon>
          <StatValue>{averageRating}</StatValue>
          <StatLabel>Average Rating</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <FaFilter />
          </StatIcon>
          <StatValue>{getCategoryLabel(mostCommonCategory)}</StatValue>
          <StatLabel>Most Common Category</StatLabel>
        </StatCard>
      </StatsContainer>
      
      <Card>
        <Card.Header>
          <h3>Recent Feedback History</h3>
        </Card.Header>
        <Card.Body style={{ padding: 0 }}>
          <FeedbackList>
            {filteredFeedbacks.length === 0 ? (
              <FeedbackItem>
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                  No feedback matches your filters.
                </div>
              </FeedbackItem>
            ) : (
              filteredFeedbacks.map(feedback => (
                <FeedbackItem 
                  key={feedback.id}
                  onClick={() => handleViewReport(feedback.reportId)}
                >
                  <FeedbackHeader>
                    <FeedbackMeta>
                      <FaUser />
                      <FeedbackStudent>{feedback.studentName}</FeedbackStudent>
                      <span style={{ margin: '0 0.5rem' }}>•</span>
                      <span>{feedback.studentId}</span>
                      <span style={{ margin: '0 0.5rem' }}>•</span>
                      <span>{feedback.major}</span>
                    </FeedbackMeta>
                    <FeedbackDate>{formatDate(feedback.date)}</FeedbackDate>
                  </FeedbackHeader>
                  
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                    <FeedbackCategory category={feedback.category}>
                      {getCategoryLabel(feedback.category)}
                    </FeedbackCategory>
                    <FeedbackRating>
                      <span>{feedback.rating}</span>/5 rating
                    </FeedbackRating>
                    <div style={{ flex: 1 }}></div>
                    <div style={{ color: '#666', fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
                      <FaFileAlt style={{ marginRight: '0.25rem' }} />
                      Report #{feedback.reportId}
                    </div>
                  </div>
                  
                  <FeedbackExcerpt>{feedback.content}</FeedbackExcerpt>
                </FeedbackItem>
              ))
            )}
          </FeedbackList>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FeedbackOverview; 