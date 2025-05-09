import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.light};
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: 1rem;
`;

const InternshipPost = () => {
  return (
    <PageContainer>
      <Navbar userType="company" />
      
      <ContentContainer>
        <Header>
          <Title>Post Internship Opportunity</Title>
          <Description>Create a new internship posting for students</Description>
        </Header>
        
        <div>
          <p>This page is under construction.</p>
        </div>
      </ContentContainer>
    </PageContainer>
  );
};

export default InternshipPost; 