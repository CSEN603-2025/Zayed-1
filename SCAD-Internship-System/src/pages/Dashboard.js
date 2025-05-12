import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { FaBriefcase, FaGraduationCap, FaBell, FaCalendarAlt, FaStar, FaBuilding, FaSearch } from 'react-icons/fa';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.light};
`;

const DashboardContent = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeSection = styled.div`
  margin-bottom: 2rem;
`;

const WelcomeTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const WelcomeSubtitle = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: 1rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
`;

const StatIconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: ${props => props.theme.colors.primary};
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatTitle = styled.h3`
  color: ${props => props.theme.colors.darkGray};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.p`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
`;

const InternshipList = styled.div`
  margin-bottom: 2rem;
`;

const SuggestedCompanies = styled.div`
  margin-bottom: 2rem;
`;

const CompanyCard = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const CompanyLogo = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-color: #f0f0f0;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 1.5rem;
`;

const CompanyInfo = styled.div`
  flex: 1;
`;

const CompanyName = styled.h3`
  margin: 0 0 0.25rem;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.primary};
`;

const CompanyDetails = styled.div`
  display: flex;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
`;

const CompanyDetail = styled.span`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  
  svg {
    margin-right: 0.25rem;
  }
`;

const CompanyRating = styled.div`
  display: flex;
  align-items: center;
  color: #ffc107;
  margin-top: 0.25rem;
  font-size: 0.8rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const NotificationItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
  
  &:last-child {
    border-bottom: none;
  }
`;

const NotificationTitle = styled.h4`
  margin: 0 0 0.5rem;
  color: ${props => props.theme.colors.primary};
  font-size: 1rem;
`;

const NotificationTime = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
`;

const InternshipItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
  
  &:last-child {
    border-bottom: none;
  }
`;

const InternshipInfo = styled.div`
  flex: 1;
`;

const InternshipTitle = styled.h4`
  margin: 0 0 0.5rem;
  color: ${props => props.theme.colors.primary};
  font-size: 1rem;
`;

const InternshipCompany = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 0.5rem;
`;

const InternshipDetails = styled.div`
  display: flex;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
`;

const InternshipDetail = styled.span`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  
  svg {
    margin-right: 0.25rem;
  }
`;

const Status = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => {
    switch(props.status) {
      case 'pending': return '#FFF3CD';
      case 'finalized': return '#D1ECF1';
      case 'accepted': return '#D4EDDA';
      case 'rejected': return '#F8D7DA';
      case 'completed': return '#E2E3E5';
      default: return '#F8F9FA';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'pending': return '#856404';
      case 'finalized': return '#0C5460';
      case 'accepted': return '#155724';
      case 'rejected': return '#721C24';
      case 'completed': return '#383D41';
      default: return '#818182';
    }
  }};
`;

const ExploreInternshipsSection = styled.div`
  margin: 2rem 0;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

const ExploreContent = styled.div`
  max-width: 60%;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ExploreTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ExploreDescription = styled.p`
  font-size: 1rem;
  opacity: 0.9;
`;

// Mock data
const mockSuggestedCompanies = [
  {
    id: 1,
    name: 'Tech Innovations',
    industry: 'Technology',
    rating: 4.8,
    logo: null,
    recommendedBy: 5
  },
  {
    id: 2,
    name: 'Finance Solutions',
    industry: 'Finance',
    rating: 4.5,
    logo: null,
    recommendedBy: 3
  },
  {
    id: 3,
    name: 'Healthcare Systems',
    industry: 'Healthcare',
    rating: 4.2,
    logo: null,
    recommendedBy: 2
  }
];

const mockApplications = [
  {
    id: 1,
    title: 'Software Developer Intern',
    company: 'Tech Innovations',
    duration: '3 months',
    paid: true,
    status: 'pending'
  },
  {
    id: 2,
    title: 'Data Analyst Intern',
    company: 'Finance Solutions',
    duration: '6 months',
    paid: true,
    status: 'accepted'
  },
  {
    id: 3,
    title: 'UX Designer Intern',
    company: 'Creative Designs',
    duration: '3 months',
    paid: false,
    status: 'rejected'
  }
];

const mockNotifications = [
  {
    id: 1,
    title: 'New internship cycle has begun!',
    time: '2 hours ago'
  },
  {
    id: 2,
    title: 'Your application to Tech Innovations has been viewed',
    time: '1 day ago'
  },
  {
    id: 3,
    title: 'Finance Solutions has accepted your application',
    time: '3 days ago'
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [userType] = useState('student'); // This could come from context/state in a real app
  
  return (
    <DashboardContainer>
      <Navbar userType={userType} />
      
      <DashboardContent>
        <WelcomeSection>
          <WelcomeTitle>Welcome, John</WelcomeTitle>
          <WelcomeSubtitle>Here's an overview of your internship journey</WelcomeSubtitle>
        </WelcomeSection>
        
        <CardGrid>
          <StatCard>
            <StatIconContainer>
              <FaBriefcase size={24} />
            </StatIconContainer>
            <StatContent>
              <StatTitle>Applications</StatTitle>
              <StatValue>3</StatValue>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIconContainer>
              <FaGraduationCap size={24} />
            </StatIconContainer>
            <StatContent>
              <StatTitle>Completed Internships</StatTitle>
              <StatValue>1</StatValue>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIconContainer>
              <FaBell size={24} />
            </StatIconContainer>
            <StatContent>
              <StatTitle>Current Internship Cycle</StatTitle>
              <StatValue>Spring 2023</StatValue>
            </StatContent>
          </StatCard>
        </CardGrid>
        
        <ExploreInternshipsSection>
          <ExploreContent>
            <ExploreTitle>Find Your Next Opportunity</ExploreTitle>
            <ExploreDescription>
              Explore our internship listings to find opportunities that match your skills and interests. 
              Apply directly and track your applications all in one place.
            </ExploreDescription>
          </ExploreContent>
          <Button 
            variant="white" 
            size="large"
            icon={<FaSearch />}
            onClick={() => navigate('/internships')}
            style={{ backgroundColor: 'white', color: '#084B8A', padding: '1rem 1.5rem' }}
          >
            Explore Internship Listings
          </Button>
        </ExploreInternshipsSection>
        
        <SectionTitle>Your Applications</SectionTitle>
        <InternshipList>
          <Card title="Recent Applications">
            {mockApplications.map(app => (
              <InternshipItem key={app.id}>
                <InternshipInfo>
                  <InternshipTitle>{app.title}</InternshipTitle>
                  <InternshipCompany>{app.company}</InternshipCompany>
                  <InternshipDetails>
                    <InternshipDetail>
                      <FaCalendarAlt />
                      {app.duration}
                    </InternshipDetail>
                    <InternshipDetail>
                      {app.paid ? 'Paid' : 'Unpaid'}
                    </InternshipDetail>
                  </InternshipDetails>
                </InternshipInfo>
                <Status status={app.status}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </Status>
              </InternshipItem>
            ))}
            
          </Card>
        </InternshipList>
        
        <SectionTitle>Suggested Companies</SectionTitle>
        <SuggestedCompanies>
          <Card>
            {mockSuggestedCompanies.map(company => (
              <CompanyCard key={company.id}>
                <CompanyLogo>
                  <FaBuilding />
                </CompanyLogo>
                <CompanyInfo>
                  <CompanyName>{company.name}</CompanyName>
                  <CompanyDetails>
                    <CompanyDetail>
                      <FaBriefcase />
                      {company.industry}
                    </CompanyDetail>
                    <CompanyDetail>
                      {company.recommendedBy} past interns recommend
                    </CompanyDetail>
                  </CompanyDetails>
                  <CompanyRating>
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} size={12} color={index < Math.floor(company.rating) ? '#ffc107' : '#e4e5e9'} />
                    ))}
                    <span style={{ marginLeft: '5px', color: '#666' }}>{company.rating}</span>
                  </CompanyRating>
                </CompanyInfo>
                <ActionButtons>
                  <Button 
                    variant="secondary" 
                    size="small"
                    onClick={() => navigate(`/student/companies/${company.id}`)}
                  >
                    View
                  </Button>
                </ActionButtons>
              </CompanyCard>
            ))}
          </Card>
        </SuggestedCompanies>
        
        <SectionTitle>Helpful Video Guide</SectionTitle>
        <Card>
          <iframe 
            title="Internship Guide Video"
            width="100%" 
            height="500" 
            src="https://www.youtube.com/embed/CmP3XXwKJ60?si=y0Ds20kPrEhCxY1T"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </Card>
        
        
      </DashboardContent>
    </DashboardContainer>
  );
};

export default Dashboard; 