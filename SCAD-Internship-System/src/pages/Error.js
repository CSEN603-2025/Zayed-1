import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.light};
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 70px); /* Account for navbar height */
`;

const ErrorCode = styled.h1`
  font-size: 10rem;
  color: ${props => props.theme.colors.primary};
  margin: 0;
  line-height: 1;
  font-weight: 700;
`;

const ErrorTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.secondary};
  margin: 1rem 0;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: 2rem;
`;

const BackButton = styled(Link)`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const ErrorPage = () => {
  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <ErrorCode>404</ErrorCode>
        <ErrorTitle>Page Not Found</ErrorTitle>
        <ErrorMessage>
          The page you are looking for doesn't exist or has been moved.
        </ErrorMessage>
        <BackButton to="/">Back to Home</BackButton>
      </ContentContainer>
    </PageContainer>
  );
};

export default ErrorPage;
