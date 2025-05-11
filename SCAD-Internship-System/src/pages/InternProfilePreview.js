import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import { 
  FaUser, 
  FaGraduationCap, 
  FaBriefcase, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCalendar,
  FaUniversity,
  FaArrowLeft,
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaLaptopCode,
  FaChartLine,
  FaDownload
} from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.light};
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.secondary};
  font-size: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 1rem;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const ProfileHeader = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PageTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-left: 1rem;
  background-color: ${props => {
    switch(props.status) {
      case 'active': return '#e6f7e6';
      case 'pending': return '#fff3cd';
      case 'rejected': return '#f8d7da';
      case 'completed': return '#e1f5fe';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#2e7d32';
      case 'pending': return '#856404';
      case 'rejected': return '#c62828';
      case 'completed': return '#0277bd';
      default: return '#383d41';
    }
  }};
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const ProfileSidebar = styled.div``;

const ProfileContent = styled.div``;

const ProfilePicture = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const UserInfo = styled.div`
  margin-bottom: 1.5rem;
`;

const UserName = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin: 0 0 0.25rem;
  font-size: 1.5rem;
`;

const UserDetail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  
  svg {
    min-width: 16px;
    margin-right: 0.5rem;
    color: ${props => props.theme.colors.secondary};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const SectionTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.3rem;
  margin: 1.5rem 0 1rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const ProfileCard = styled(Card)`
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h4`
  color: ${props => props.theme.colors.primary};
  font-size: 1.1rem;
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const DetailsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
`;

const DetailItem = styled.div`
  margin-bottom: 0.5rem;
`;

const DetailLabel = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: 0.25rem;
`;

const DetailValue = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SkillTag = styled.div`
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
`;

const ExperienceTimeline = styled.div`
  margin-top: 1rem;
`;

const TimelineItem = styled.div`
  position: relative;
  padding-left: 2rem;
  padding-bottom: 1.5rem;
  border-left: 2px solid ${props => props.theme.colors.tertiary};
  
  &:last-child {
    border-left: none;
  }
  
  &:before {
    content: '';
    position: absolute;
    left: -8px;
    top: 0;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const TimelineTitle = styled.h5`
  color: ${props => props.theme.colors.primary};
  font-size: 1rem;
  margin: 0 0 0.25rem;
`;

const TimelineSubtitle = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const TimelinePeriod = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: 0.5rem;
`;

const TimelineDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  margin: 0;
`;

const AttachmentsList = styled.div`
  margin-top: 1rem;
`;

const AttachmentItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background-color: ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  margin-bottom: 0.5rem;
`;

const AttachmentInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AttachmentIcon = styled.div`
  margin-right: 0.75rem;
  color: ${props => props.theme.colors.secondary};
`;

const AttachmentName = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.primary};
`;

const AttachmentAction = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.secondary};
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

// Mock data for the intern profile
const mockInternData = {
  id: 123,
  name: 'Michael Brown',
  email: 'michael.brown@example.com',
  phone: '+971 50 123 4567',
  address: 'Dubai, United Arab Emirates',
  university: 'Zayed University',
  major: 'Computer Science',
  gpa: '3.8/4.0',
  expectedGraduation: 'May 2024',
  position: 'UI/UX Design Intern',
  department: 'Design',
  status: 'active',
  startDate: '02/01/2023',
  endDate: '05/01/2023',
  skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Sketch', 'Wireframing', 'Prototyping', 'User Research'],
  interests: ['Web Design', 'Mobile App Design', 'User Research'],
  experience: [
    {
      title: 'Junior UX Designer',
      company: 'Design Studio XYZ',
      period: 'June 2022 - August 2022',
      description: 'Assisted in designing user interfaces for mobile applications and conducted user research.'
    },
    {
      title: 'Design Intern',
      company: 'Creative Agency ABC',
      period: 'January 2022 - March 2022',
      description: 'Created wireframes and prototypes for web applications.'
    }
  ],
  education: [
    {
      institution: 'Zayed University',
      degree: 'Bachelor of Science in Computer Science',
      period: '2020 - Present'
    }
  ],
  attachments: [
    {
      name: 'Resume.pdf',
      type: 'pdf'
    },
    {
      name: 'Portfolio.pdf',
      type: 'pdf'
    },
    {
      name: 'Transcript.pdf',
      type: 'pdf'
    }
  ]
};

const InternProfilePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [intern, setIntern] = useState(mockInternData);
  const [loading, setLoading] = useState(false);
  
  // In a real application, you would fetch the intern data based on the ID
  useEffect(() => {
    // Fetch intern data here
    // For now, we're using mock data
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIntern({...mockInternData, id: id});
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleApprove = () => {
    // Logic to approve applicant
    alert('Applicant approved successfully');
    navigate(-1);
  };
  
  const handleReject = () => {
    // Logic to reject applicant
    alert('Applicant rejected');
    navigate(-1);
  };
  
  const handleEvaluate = () => {
    // Navigate to evaluation form
    navigate(`/company/interns/evaluation/${id}`);
  };
  
  if (loading) {
    return (
      <PageContainer>
        <Navbar />
        <ContentContainer>
          <div>Loading...</div>
        </ContentContainer>
      </PageContainer>
    );
  }
  
  const isApplicant = location.pathname.includes('applicant');
  
  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <BackButton onClick={handleGoBack}>
          <FaArrowLeft /> Back
        </BackButton>
        
        <ProfileHeader>
          <div>
            <PageTitle>{"isApplicant ? 'Applicant Profile' : 'Intern Profile'"}</PageTitle>
          </div>
          <StatusContainer>
            {intern.status && <StatusBadge status={intern.status}>{intern.status.charAt(0).toUpperCase() + intern.status.slice(1)}</StatusBadge>}
          </StatusContainer>
        </ProfileHeader>
        
        <TwoColumnLayout>
          <ProfileSidebar>
            <ProfilePicture>
              <FaUser />
            </ProfilePicture>
            
            <UserInfo>
              <UserName>{intern.name}</UserName>
              <UserDetail>
                <FaBriefcase /> {intern.position}
              </UserDetail>
              <UserDetail>
                <FaEnvelope /> {intern.email}
              </UserDetail>
              <UserDetail>
                <FaPhone /> {intern.phone}
              </UserDetail>
              <UserDetail>
                <FaMapMarkerAlt /> {intern.address}
              </UserDetail>
              <UserDetail>
                <FaUniversity /> {intern.university}
              </UserDetail>
              <UserDetail>
                <FaGraduationCap /> {intern.major}
              </UserDetail>
            </UserInfo>
            
            <ActionButtons>
              {isApplicant ? (
                <>
                  <Button 
                    primary 
                    fullWidth 
                    icon={<FaCheckCircle />} 
                    onClick={handleApprove}
                  >
                    Approve Application
                  </Button>
                  <Button 
                    secondary 
                    fullWidth 
                    icon={<FaTimesCircle />} 
                    onClick={handleReject}
                  >
                    Reject Application
                  </Button>
                </>
              ) : (
                <Button 
                  primary 
                  fullWidth 
                  icon={<FaChartLine />} 
                  onClick={handleEvaluate}
                >
                  Evaluate Intern
                </Button>
              )}
            </ActionButtons>
          </ProfileSidebar>
          
          <ProfileContent>
            <ProfileCard>
              <CardTitle>
                <FaGraduationCap /> Education Information
              </CardTitle>
              <DetailsList>
                <DetailItem>
                  <DetailLabel>University</DetailLabel>
                  <DetailValue>{intern.university}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Major</DetailLabel>
                  <DetailValue>{intern.major}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>GPA</DetailLabel>
                  <DetailValue>{intern.gpa}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Expected Graduation</DetailLabel>
                  <DetailValue>{intern.expectedGraduation}</DetailValue>
                </DetailItem>
              </DetailsList>
            </ProfileCard>
            
            <ProfileCard>
              <CardTitle>
                <FaBriefcase /> Internship Details
              </CardTitle>
              <DetailsList>
                <DetailItem>
                  <DetailLabel>Position</DetailLabel>
                  <DetailValue>{intern.position}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Department</DetailLabel>
                  <DetailValue>{intern.department}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Start Date</DetailLabel>
                  <DetailValue>{intern.startDate}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>End Date</DetailLabel>
                  <DetailValue>{intern.endDate}</DetailValue>
                </DetailItem>
              </DetailsList>
            </ProfileCard>
            
            <ProfileCard>
              <CardTitle>
                <FaLaptopCode /> Skills
              </CardTitle>
              <SkillsList>
                {intern.skills.map((skill, index) => (
                  <SkillTag key={index}>{skill}</SkillTag>
                ))}
              </SkillsList>
            </ProfileCard>
            
            <ProfileCard>
              <CardTitle>
                <FaBriefcase /> Professional Experience
              </CardTitle>
              <ExperienceTimeline>
                {intern.experience.map((exp, index) => (
                  <TimelineItem key={index}>
                    <TimelineTitle>{exp.title}</TimelineTitle>
                    <TimelineSubtitle>{exp.company}</TimelineSubtitle>
                    <TimelinePeriod>{exp.period}</TimelinePeriod>
                    <TimelineDescription>{exp.description}</TimelineDescription>
                  </TimelineItem>
                ))}
              </ExperienceTimeline>
            </ProfileCard>
            
            <ProfileCard>
              <CardTitle>
                <FaFileAlt /> Documents & Attachments
              </CardTitle>
              <AttachmentsList>
                {intern.attachments.map((attachment, index) => (
                  <AttachmentItem key={index}>
                    <AttachmentInfo>
                      <AttachmentIcon>
                        <FaFileAlt />
                      </AttachmentIcon>
                      <AttachmentName>{attachment.name}</AttachmentName>
                    </AttachmentInfo>
                    <AttachmentAction>
                      <FaDownload />
                    </AttachmentAction>
                  </AttachmentItem>
                ))}
              </AttachmentsList>
            </ProfileCard>
          </ProfileContent>
        </TwoColumnLayout>
      </ContentContainer>
    </PageContainer>
  );
};

export default InternProfilePreview; 