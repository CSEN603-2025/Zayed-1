import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.light};
  padding: 2rem;
`;

const StudentRegistration = () => {
  const navigate = useNavigate();
  
  return (
    <Container>
      <h2>Student Registration Page</h2>
      <p>This page is under construction.</p>
      <button onClick={() => navigate('/')}>Back to Login</button>
    </Container>
  );
};

export default StudentRegistration; 