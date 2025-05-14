import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { 
  FaBriefcase, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaMoneyBillWave, 
  FaBuilding, 
  FaUser, 
  FaFileAlt, 
  FaClipboardList, 
  FaArrowLeft,
  FaCertificate,
  FaCode,
  FaTasks
} from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.light};
`;

const ContentContainer = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.secondary};
  font-size: 1rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const InternshipTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 1.5rem;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => {
    switch(props.status) {
      case 'completed': return '#D4EDDA';
      case 'active': return '#D1ECF1';
      case 'canceled': return '#F8D7DA';
      case 'closed': return '#D4EDDA';
      default: return '#E2E3E5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'completed': return '#155724';
      case 'active': return '#0C5460';
      case 'canceled': return '#721C24';
      case 'closed': return '#155724';
      default: return '#383D41';
    }
  }};
  margin-left: 1rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const InfoCard = styled(Card)`
  padding: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoIcon = styled.div`
  margin-right: 0.75rem;
  color: ${props => props.theme.colors.secondary};
  min-width: 20px;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.primary};
`;

const Description = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  line-height: 1.6;
  
  p {
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.darkGray};
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SkillTag = styled.div`
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.primary};
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  font-size: 0.85rem;
`;

const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 1rem 0 0;
`;

const TaskItem = styled.li`
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
  
  &:last-child {
    border-bottom: none;
  }
  
  svg {
    color: ${props => props.theme.colors.secondary};
    margin-right: 0.75rem;
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 2rem;
`;

// Mock data for a specific internship - in a real app, this would come from an API
const mockInternships = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'Tech Innovations LLC',
    location: 'Abu Dhabi, UAE',
    duration: '3 months',
    startDate: '01/06/2022',
    endDate: '01/09/2022',
    posted: '15/05/2022',
    paid: true,
    salary: '1000 AED/month',
    status: 'completed',
    applications: 15,
    supervisor: 'Ahmed Mohammed',
    description: 'Worked on developing user interfaces for web applications using React. Was responsible for implementing new features and maintaining existing code. Collaborated with the design team to ensure UI/UX best practices were followed.',
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Git'],
    tasks: [
      'Developed responsive UI components',
      'Integrated frontend with RESTful APIs',
      'Fixed bugs and improved performance',
      'Participated in code reviews',
      'Created technical documentation'
    ]
  },
  {
    id: 2,
    title: 'Backend Developer Intern',
    company: 'Data Systems',
    location: 'Dubai, UAE',
    duration: '6 months',
    startDate: '01/01/2022',
    endDate: '30/06/2022',
    posted: '15/12/2021',
    paid: true,
    salary: '1200 AED/month',
    status: 'completed',
    applications: 20,
    supervisor: 'Mohammad Khalid',
    description: 'Worked with the backend development team to create and maintain APIs and server-side applications. Focused on database optimization and server performance.',
    skills: ['Node.js', 'Express', 'MongoDB', 'SQL', 'Docker'],
    tasks: [
      'Developed RESTful APIs',
      'Optimized database queries',
      'Implemented authentication and authorization',
      'Created automated tests',
      'Deployed services to cloud platforms'
    ]
  }
];

const InternshipDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll simulate a fetch with the mock data
    const fetchInternship = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        const foundInternship = mockInternships.find(
          internship => internship.id === parseInt(id)
        );
        
        if (foundInternship) {
          setInternship(foundInternship);
        }
        
        setLoading(false);
      }, 500);
    };
    
    fetchInternship();
  }, [id]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleViewCertificate = () => {
    // Create a link element
    const link = document.createElement('a');
    // Set the href to the PDF file path
    link.href = '/static/Dummy_pdf.pdf';
    // Set the download attribute with the desired filename
    link.download = 'Dummy_pdf.pdf';
    // Append the link to the body
    document.body.appendChild(link);
    // Programmatically click the link to trigger the download
    link.click();
    // Remove the link from the body
    document.body.removeChild(link);
  };
  
  const handleViewReports = () => {
    navigate(`/report-management/${id}`);
  };
  
  if (loading) {
    return (
      <PageContainer>
        <Navbar userType="student" />
        <ContentContainer>
          <p>Loading internship details...</p>
        </ContentContainer>
      </PageContainer>
    );
  }
  
  if (!internship) {
    return (
      <PageContainer>
        <Navbar userType="student" />
        <ContentContainer>
          <BackButton onClick={handleGoBack}>
            <FaArrowLeft /> Back
          </BackButton>
          <Card>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h2>Internship Not Found</h2>
              <p>The internship you're looking for doesn't exist or has been removed.</p>
              <Button 
                variant="primary" 
                onClick={() => navigate('/dashboard')}
                style={{ marginTop: '1rem' }}
              >
                Go to Dashboard
              </Button>
            </div>
          </Card>
        </ContentContainer>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <Navbar userType="student" />
      <ContentContainer>
        <BackButton onClick={handleGoBack}>
          <FaArrowLeft /> Back to Dashboard
        </BackButton>
        
        <PageHeader>
          <InternshipTitle>{internship.title}</InternshipTitle>
          <CompanyInfo>
            <FaBuilding /> {internship.company}
            <StatusBadge status={internship.status}>
              {internship.status.charAt(0).toUpperCase() + internship.status.slice(1)}
            </StatusBadge>
          </CompanyInfo>
        </PageHeader>
        
        <CardGrid>
          <InfoCard>
            <InfoItem>
              <InfoIcon><FaCalendarAlt /></InfoIcon>
              <InfoContent>
                <InfoLabel>Duration</InfoLabel>
                <InfoValue>{internship.duration}</InfoValue>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon><FaCalendarAlt /></InfoIcon>
              <InfoContent>
                <InfoLabel>Period</InfoLabel>
                <InfoValue>{internship.startDate} - {internship.endDate}</InfoValue>
              </InfoContent>
            </InfoItem>
          </InfoCard>
          
          <InfoCard>
            <InfoItem>
              <InfoIcon><FaMapMarkerAlt /></InfoIcon>
              <InfoContent>
                <InfoLabel>Location</InfoLabel>
                <InfoValue>{internship.location}</InfoValue>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon><FaMoneyBillWave /></InfoIcon>
              <InfoContent>
                <InfoLabel>Compensation</InfoLabel>
                <InfoValue>{internship.paid ? internship.salary : 'Unpaid'}</InfoValue>
              </InfoContent>
            </InfoItem>
          </InfoCard>
          
          <InfoCard>
            <InfoItem>
              <InfoIcon><FaUser /></InfoIcon>
              <InfoContent>
                <InfoLabel>Supervisor</InfoLabel>
                <InfoValue>{internship.supervisor}</InfoValue>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon><FaBriefcase /></InfoIcon>
              <InfoContent>
                <InfoLabel>Applications</InfoLabel>
                <InfoValue>{internship.applications}</InfoValue>
              </InfoContent>
            </InfoItem>
          </InfoCard>
        </CardGrid>
        
        <SectionTitle>
          <FaFileAlt /> Description
        </SectionTitle>
        <Description>
          <p>{internship.description}</p>
        </Description>
        
        <SectionTitle>
          <FaCode /> Skills Gained
        </SectionTitle>
        <Card>
          <div style={{ padding: '1.5rem' }}>
            <SkillsContainer>
              {internship.skills.map((skill, index) => (
                <SkillTag key={index}>{skill}</SkillTag>
              ))}
            </SkillsContainer>
          </div>
        </Card>
        
        <SectionTitle>
          <FaTasks /> Tasks & Responsibilities
        </SectionTitle>
        <Card>
          <div style={{ padding: '1.5rem' }}>
            <TaskList>
              {internship.tasks.map((task, index) => (
                <TaskItem key={index}>
                  <FaBriefcase size={12} /> {task}
                </TaskItem>
              ))}
            </TaskList>
          </div>
        </Card>
        
        <ActionButtonsContainer>
          <Button 
            variant="primary"
            icon={<FaCertificate />}
            onClick={handleViewCertificate}
          >
            View Certificate
          </Button>
          
          <Button 
            variant="secondary"
            icon={<FaClipboardList />}
            onClick={handleViewReports}
          >
            View Reports
          </Button>
        </ActionButtonsContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default InternshipDetailView; 