import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaExclamationTriangle, FaArrowLeft, FaQuestionCircle, FaEnvelope } from 'react-icons/fa';
import Button from '../components/Button';

const RejectedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.light};
  padding: 2rem;
`;

const RejectedCard = styled.div`
  width: 100%;
  max-width: 700px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const IconContainer = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.error};
  font-size: 1.8rem;
  margin: 0;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.darkGray};
  font-size: 1.1rem;
  margin: 0;
`;

const ContentSection = styled.div`
  margin-bottom: 2rem;
  text-align: left;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.4rem;
  margin: 0;
  margin-bottom: 1rem;
`;

const ReasonsList = styled.ul`
  text-align: left;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ReasonItem = styled.li`
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.darkGray};
`;

const ContactCard = styled.div`
  background-color: ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ContactIcon = styled.div`
  margin-right: 1rem;
  color: ${props => props.theme.colors.primary};
`;

const ContactText = styled.div`
  text-align: left;
`;

const ContactTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.1rem;
  margin: 0;
  margin-bottom: 0.25rem;
`;

const ContactDetails = styled.p`
  color: ${props => props.theme.colors.darkGray};
  font-size: 0.9rem;
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const CompanyRejected = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // In a real application, you would get this information from the query parameters or context
  const rejectionReasons = location.state?.reasons || [
    "Incomplete company information provided",
    "Tax documents couldn't be verified",
    "The company doesn't meet minimum requirements for internships",
    "Inconsistencies in the provided documentation"
  ];
  
  const companyName = location.state?.companyName || "Your company";
  
  return (
    <RejectedContainer>
      <RejectedCard>
        <Header>
          <IconContainer>
            <FaExclamationTriangle size={48} color="#DC3545" />
          </IconContainer>
          <Title>Registration Rejected</Title>
          <Subtitle>We are sorry, but your company registration has been rejected by SCAD Office.</Subtitle>
        </Header>
        
        <ContentSection>
          <SectionTitle>Reason for Rejection</SectionTitle>
          <ReasonsList>
            {rejectionReasons.map((reason, index) => (
              <ReasonItem key={index}>{reason}</ReasonItem>
            ))}
          </ReasonsList>
          
          <p>
            {companyName} can address these issues and reapply at any time through the registration portal.
            For more information about our requirements, please refer to our company registration guidelines.
          </p>
        </ContentSection>
        
        <ContactCard>
          <ContactInfo>
            <ContactIcon>
              <FaEnvelope size={24} />
            </ContactIcon>
            <ContactText>
              <ContactTitle>Need further assistance?</ContactTitle>
              <ContactDetails>Contact SCAD Office at <strong>scad.office@example.com</strong></ContactDetails>
            </ContactText>
          </ContactInfo>
          <Button
            variant="outlined"
            onClick={() => window.location.href = "mailto:scad.office@example.com"}
            style={{ minWidth: "120px" }}
          >
            Contact
          </Button>
        </ContactCard>
        
        <ActionButtons>
          <Button 
            variant="secondary" 
            onClick={() => navigate('/register/company')}
            leftIcon={<FaArrowLeft />}
          >
            Try Again
          </Button>
          <Button 
            variant="primary" 
            onClick={() => navigate('/')}
          >
            Back to Login
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/faq')}
            leftIcon={<FaQuestionCircle />}
          >
            FAQ
          </Button>
        </ActionButtons>
      </RejectedCard>
    </RejectedContainer>
  );
};

export default CompanyRejected;
