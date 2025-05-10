import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

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

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: 1rem;
`;

const ApplicationList = () => {
  return (
    <PageContainer>
      <Navbar userType="student" />
      
      <ContentContainer>
        <Header>
          <Title>My Applications</Title>
          <Description>Track the status of your internship applications</Description>
        </Header>
        
        <div>
          <p>This page is under construction.</p>
        </div>
      </ContentContainer>
    </PageContainer>
  );
};

export default ApplicationList; 