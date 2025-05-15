import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import FeedbackOverview from '../components/FeedbackOverview';
import { FaChartBar, FaComments } from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.light};
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
    color: ${props => props.theme.colors.secondary};
  }
`;

const Description = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: 1rem;
  max-width: 800px;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
  margin-bottom: 2rem;
`;

const Tab = styled.div`
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.darkGray};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
  
  ${props => props.active && `
    &:after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 3px;
      background-color: ${props.theme.colors.secondary};
    }
  `}
`;

const FacultyFeedback = () => {
  const [activeTab, setActiveTab] = React.useState('overview');
  
  return (
    <PageContainer>
      <Navbar userType="faculty" />
      
      <ContentContainer>
        <Header>
          <PageTitle>
            <FaComments />
            Feedback Management
          </PageTitle>
          <Description>
            Track and manage all feedback provided to students about their internship reports. 
            Use the search and filter tools to find specific feedback or analyze trends.
          </Description>
        </Header>
        
        {activeTab === 'overview' && <FeedbackOverview />}
      </ContentContainer>
    </PageContainer>
  );
};

export default FacultyFeedback; 