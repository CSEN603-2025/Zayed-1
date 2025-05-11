import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Card from '../components/Card';
import { useAuth } from '../contexts/AuthContext';
import { 
  FaUser, 
  FaGraduationCap, 
  FaEdit, 
  FaBriefcase, 
  FaAward, 
  FaPlus, 
  FaTrash, 
  FaCheck,
  FaTimes,
  FaStar,
  FaUniversity,
  FaChartBar,
  FaEye,
  FaEyeSlash
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

const ProfileHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

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

const UserEmail = styled.p`
  color: ${props => props.theme.colors.secondary};
  margin: 0 0 0.5rem;
  font-size: 1rem;
`;

const UserDetail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  
  svg {
    margin-right: 0.5rem;
    color: ${props => props.theme.colors.secondary};
  }
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

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
`;

const BadgeIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const BadgeLabel = styled.span`
  font-size: 0.8rem;
  text-align: center;
  color: ${props => props.theme.colors.darkGray};
`;

const ExperienceCard = styled(Card)`
  margin-bottom: 1.5rem;
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ExperienceTitle = styled.h4`
  color: ${props => props.theme.colors.primary};
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
`;

const ExperienceCompany = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const ExperienceDate = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: 1rem;
`;

const ExperienceActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const AddButton = styled(Button)`
  margin-bottom: 1.5rem;
`;

const KeywordsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Keyword = styled.div`
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-left: 0.5rem;
    cursor: pointer;
  }
`;

const Separator = styled.hr`
  border: none;
  border-top: 1px solid ${props => props.theme.colors.tertiary};
  margin: 2rem 0;
`;

const EditableField = styled.div`
  margin-bottom: 1.5rem;
`;

const EditableFieldHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const EditableFieldTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  color: ${props => props.theme.colors.primary};
`;

const EditButton = styled.div`
  color: ${props => props.theme.colors.secondary};
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const EditableFieldContent = styled.div`
  color: ${props => props.theme.colors.darkGray};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const AssessmentCard = styled(Card)`
  margin-bottom: 1rem;
`;

const AssessmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const AssessmentTitle = styled.h4`
  color: ${props => props.theme.colors.primary};
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
`;

const AssessmentDate = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
`;

const AssessmentDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const AssessmentDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: 0.25rem;
`;

const DetailValue = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

const ScoreCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => {
    const score = props.score;
    if (score >= 80) return '#e8f5e9';
    if (score >= 60) return '#fff3e0';
    return '#ffebee';
  }};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    border: 2px solid ${props => {
      const score = props.score;
      if (score >= 80) return '#4caf50';
      if (score >= 60) return '#ff9800';
      return '#f44336';
    }};
  }
`;

const ScoreValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => {
    const score = props.score;
    if (score >= 80) return '#2e7d32';
    if (score >= 60) return '#ef6c00';
    return '#c62828';
  }};
`;

const ScoreLabel = styled.div`
  font-size: 0.7rem;
  color: ${props => props.theme.colors.secondary};
`;

const VisibilityToggle = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: ${props => props.visible ? '#e8f5e9' : '#f5f5f5'};
  color: ${props => props.visible ? '#2e7d32' : '#757575'};
  cursor: pointer;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    opacity: 0.9;
  }
`;

// Mock data
const mockUserData = {
  id: 1,
  name: 'John Smith',
  email: 'john.smith@university.edu',
  major: 'Computer Science',
  semester: 6,
  gpa: 3.8,
  university: 'Sample University',
  jobInterests: ['Web Development', 'Mobile App Development', 'UI/UX Design'],
  workExperiences: [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'Tech Innovations',
      startDate: 'Jun 2022',
      endDate: 'Aug 2022',
      description: 'Developed responsive web applications using React and modern JavaScript frameworks. Collaborated with the design team to implement user interfaces.',
      skills: ['React', 'JavaScript', 'HTML/CSS']
    }
  ],
  activities: [
    {
      id: 1,
      name: 'Web Development Club',
      role: 'Vice President',
      startDate: 'Sep 2021',
      endDate: 'Present',
      description: 'Organized workshops and hackathons for club members. Mentored junior students in web development technologies.'
    }
  ],
  coursesCompleted: [
    'Data Structures and Algorithms',
    'Database Systems',
    'Web Programming',
    'Mobile App Development',
    'Operating Systems'
  ],
  badges: [
    {
      id: 1,
      name: 'PRO Student',
      icon: <FaStar />,
      earned: true
    },
    {
      id: 2,
      name: 'Top Performer',
      icon: <FaAward />,
      earned: true
    }
  ],
  assessments: [
    {
      id: 1,
      title: 'Technical Skills Assessment',
      date: '2024-03-15',
      score: 85,
      totalQuestions: 30,
      correctAnswers: 25,
      duration: '45 minutes',
      status: 'completed',
      visible: true
    },
    {
      id: 2,
      title: 'Problem Solving Assessment',
      date: '2024-03-10',
      score: 92,
      totalQuestions: 25,
      correctAnswers: 23,
      duration: '40 minutes',
      status: 'completed',
      visible: true
    },
    {
      id: 3,
      title: 'Communication Skills Assessment',
      date: '2024-03-05',
      score: 78,
      totalQuestions: 20,
      correctAnswers: 15,
      duration: '30 minutes',
      status: 'completed',
      visible: false
    }
  ]
};

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(mockUserData);
  const [editing, setEditing] = useState({
    personalInfo: false,
    academicInfo: false,
    jobInterests: false
  });
  const [newInterest, setNewInterest] = useState('');
  const { userType } = useAuth();
  
  // Load saved assessments when component mounts
  useEffect(() => {
    const savedAssessments = JSON.parse(localStorage.getItem('studentAssessments') || '[]');
    if (savedAssessments.length > 0) {
      setUserData(prev => ({
        ...prev,
        assessments: savedAssessments
      }));
    }
  }, []);
  
  const [editedUserData, setEditedUserData] = useState({
    name: userData.name,
    email: userData.email,
    major: userData.major,
    semester: userData.semester,
    gpa: userData.gpa,
    university: userData.university
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const savePersonalInfo = () => {
    setUserData(prev => ({
      ...prev,
      name: editedUserData.name,
      email: editedUserData.email,
      university: editedUserData.university
    }));
    setEditing(prev => ({ ...prev, personalInfo: false }));
  };
  
  const saveAcademicInfo = () => {
    setUserData(prev => ({
      ...prev,
      major: editedUserData.major,
      semester: editedUserData.semester,
      gpa: editedUserData.gpa
    }));
    setEditing(prev => ({ ...prev, academicInfo: false }));
  };
  
  const addInterest = () => {
    if (newInterest.trim() === '') return;
    
    if (!userData.jobInterests.includes(newInterest)) {
      setUserData(prev => ({
        ...prev,
        jobInterests: [...prev.jobInterests, newInterest]
      }));
    }
    
    setNewInterest('');
  };
  
  const removeInterest = (interest) => {
    setUserData(prev => ({
      ...prev,
      jobInterests: prev.jobInterests.filter(item => item !== interest)
    }));
  };
  
  const toggleScoreVisibility = (assessmentId) => {
    // Update local state
    setUserData(prev => ({
      ...prev,
      assessments: prev.assessments.map(assessment =>
        assessment.id === assessmentId
          ? { ...assessment, visible: !assessment.visible }
          : assessment
      )
    }));
    
    // Update localStorage
    const savedAssessments = JSON.parse(localStorage.getItem('studentAssessments') || '[]');
    const updatedAssessments = savedAssessments.map(assessment =>
      assessment.id === assessmentId
        ? { ...assessment, visible: !assessment.visible }
        : assessment
    );
    localStorage.setItem('studentAssessments', JSON.stringify(updatedAssessments));
  };
  
  return (
    <PageContainer>
      <Navbar userType="student" />
      
      <ContentContainer>
        <ProfileHeader>
          <PageTitle>My Profile</PageTitle>
          <p>Current User Type: {userType}</p>
        </ProfileHeader>
        
        <TwoColumnLayout>
          <div>
            <Card>
              <ProfilePicture>
                <FaUser />
              </ProfilePicture>
              
              <UserInfo>
                <UserName>{userData.name}</UserName>
                <UserEmail>{userData.email}</UserEmail>
                <UserDetail>
                  <FaGraduationCap />
                  {userData.major}, Semester {userData.semester}
                </UserDetail>
                <UserDetail>
                  <FaUniversity />
                  {userData.university}
                </UserDetail>
              </UserInfo>
              
              <SectionTitle>
                <FaAward /> Badges
              </SectionTitle>
              
              <BadgeContainer>
                {userData.badges.map(badge => (
                  (badge.name !== 'PRO Student' || userType === 'proStudent') && (
                    <Badge key={badge.id}>
                      <BadgeIcon>
                        {badge.icon}
                      </BadgeIcon>
                      <BadgeLabel>{badge.name}</BadgeLabel>
                    </Badge>
                  )
                ))}
              </BadgeContainer>
              
              <SectionTitle>
                <FaGraduationCap /> Courses Completed
              </SectionTitle>
              
              <ul>
                {userData.coursesCompleted.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </Card>
          </div>
          
          <div>
            <TabsContainer>
              <Tab 
                active={activeTab === 'profile'} 
                onClick={() => setActiveTab('profile')}
              >
                Profile Information
              </Tab>
              <Tab 
                active={activeTab === 'experience'} 
                onClick={() => setActiveTab('experience')}
              >
                Work Experience
              </Tab>
              <Tab 
                active={activeTab === 'activities'} 
                onClick={() => setActiveTab('activities')}
              >
                Activities
              </Tab>
              <Tab 
                active={activeTab === 'assessments'} 
                onClick={() => setActiveTab('assessments')}
              >
                Assessments
              </Tab>
            </TabsContainer>
            
            {activeTab === 'profile' && (
              <>
                <Card>
                  <EditableField>
                    <EditableFieldHeader>
                      <EditableFieldTitle>Personal Information</EditableFieldTitle>
                      <EditButton onClick={() => setEditing(prev => ({ ...prev, personalInfo: !prev.personalInfo }))}>
                        {editing.personalInfo ? 'Cancel' : 'Edit'}
                      </EditButton>
                    </EditableFieldHeader>
                    
                    {editing.personalInfo ? (
                      <FormContainer>
                        <Input 
                          label="Full Name"
                          name="name"
                          value={editedUserData.name}
                          onChange={handleInputChange}
                        />
                        <Input 
                          label="Email"
                          name="email"
                          type="email"
                          value={editedUserData.email}
                          onChange={handleInputChange}
                        />
                        <Input 
                          label="University"
                          name="university"
                          value={editedUserData.university}
                          onChange={handleInputChange}
                        />
                        <div>
                          <Button 
                            variant="primary" 
                            size="small" 
                            onClick={savePersonalInfo}
                          >
                            Save
                          </Button>
                        </div>
                      </FormContainer>
                    ) : (
                      <EditableFieldContent>
                        <p><strong>Name:</strong> {userData.name}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>University:</strong> {userData.university}</p>
                      </EditableFieldContent>
                    )}
                  </EditableField>
                  
                  <Separator />
                  
                  <EditableField>
                    <EditableFieldHeader>
                      <EditableFieldTitle>Academic Information</EditableFieldTitle>
                      <EditButton onClick={() => setEditing(prev => ({ ...prev, academicInfo: !prev.academicInfo }))}>
                        {editing.academicInfo ? 'Cancel' : 'Edit'}
                      </EditButton>
                    </EditableFieldHeader>
                    
                    {editing.academicInfo ? (
                      <FormContainer>
                        <Select 
                          label="Major"
                          name="major"
                          value={editedUserData.major}
                          onChange={handleInputChange}
                          options={[
                            { value: 'MET', label: 'MET' },
                            { value: 'BI', label: 'BI' },
                            { value: 'CIVL', label: 'CIVL' },
                            { value: 'Applied Arts', label: 'Applied Arts' },
                            { value: 'architechture', label: 'architechture' },
                            { value: 'Law', label: 'Law' },
                            { value: 'IET', label: 'IET' },
                            { value: 'Mechatronics', label: 'Mechatronics' }
                          ]}
                        />
                        <Input 
                          label="Semester"
                          name="semester"
                          type="number"
                          value={editedUserData.semester}
                          onChange={handleInputChange}
                        />
                        <Input 
                          label="GPA"
                          name="gpa"
                          type="number"
                          step="0.01"
                          min="0"
                          max="4.0"
                          value={editedUserData.gpa}
                          onChange={handleInputChange}
                        />
                        <div>
                          <Button 
                            variant="primary" 
                            size="small" 
                            onClick={saveAcademicInfo}
                          >
                            Save
                          </Button>
                        </div>
                      </FormContainer>
                    ) : (
                      <EditableFieldContent>
                        <p><strong>Major:</strong> {userData.major}</p>
                        <p><strong>Semester:</strong> {userData.semester}</p>
                        <p><strong>GPA:</strong> {userData.gpa}</p>
                      </EditableFieldContent>
                    )}
                  </EditableField>
                  
                  <Separator />
                  
                  <EditableField>
                    <EditableFieldHeader>
                      <EditableFieldTitle>Job Interests</EditableFieldTitle>
                      <EditButton onClick={() => setEditing(prev => ({ ...prev, jobInterests: !prev.jobInterests }))}>
                        {editing.jobInterests ? 'Done' : 'Edit'}
                      </EditButton>
                    </EditableFieldHeader>
                    
                    {editing.jobInterests && (
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <Input 
                            placeholder="Add new interest"
                            value={newInterest}
                            onChange={(e) => setNewInterest(e.target.value)}
                          />
                          <Button 
                            variant="secondary" 
                            size="small" 
                            onClick={addInterest}
                            icon={<FaPlus />}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <KeywordsList>
                      {userData.jobInterests.map((interest, index) => (
                        <Keyword key={index}>
                          {interest}
                          {editing.jobInterests && (
                            <FaTimes 
                              size={12} 
                              onClick={() => removeInterest(interest)}
                            />
                          )}
                        </Keyword>
                      ))}
                    </KeywordsList>
                  </EditableField>
                </Card>
              </>
            )}
            
            {activeTab === 'experience' && (
              <>
                <AddButton 
                  variant="primary" 
                  size="small" 
                  icon={<FaPlus />}
                >
                  Add Work Experience
                </AddButton>
                
                {userData.workExperiences.map(experience => (
                  <ExperienceCard key={experience.id}>
                    <ExperienceHeader>
                      <div>
                        <ExperienceTitle>{experience.title}</ExperienceTitle>
                        <ExperienceCompany>{experience.company}</ExperienceCompany>
                        <ExperienceDate>{experience.startDate} - {experience.endDate}</ExperienceDate>
                      </div>
                      <ExperienceActions>
                        <Button 
                          variant="secondary" 
                          size="small" 
                          icon={<FaEdit />}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="danger" 
                          size="small" 
                          icon={<FaTrash />}
                        >
                          Delete
                        </Button>
                      </ExperienceActions>
                    </ExperienceHeader>
                    
                    <p>{experience.description}</p>
                    
                    <KeywordsList>
                      {experience.skills.map((skill, index) => (
                        <Keyword key={index}>{skill}</Keyword>
                      ))}
                    </KeywordsList>
                  </ExperienceCard>
                ))}
              </>
            )}
            
            {activeTab === 'activities' && (
              <>
                <AddButton 
                  variant="primary" 
                  size="small" 
                  icon={<FaPlus />}
                >
                  Add Activity
                </AddButton>
                
                {userData.activities.map(activity => (
                  <ExperienceCard key={activity.id}>
                    <ExperienceHeader>
                      <div>
                        <ExperienceTitle>{activity.name}</ExperienceTitle>
                        <ExperienceCompany>{activity.role}</ExperienceCompany>
                        <ExperienceDate>{activity.startDate} - {activity.endDate}</ExperienceDate>
                      </div>
                      <ExperienceActions>
                        <Button 
                          variant="secondary" 
                          size="small" 
                          icon={<FaEdit />}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="danger" 
                          size="small" 
                          icon={<FaTrash />}
                        >
                          Delete
                        </Button>
                      </ExperienceActions>
                    </ExperienceHeader>
                    
                    <p>{activity.description}</p>
                  </ExperienceCard>
                ))}
              </>
            )}
            
            {activeTab === 'assessments' && (
              <>
                <SectionTitle>
                  <FaChartBar /> Assessment Results
                </SectionTitle>
                
                {userData.assessments.map(assessment => (
                  <AssessmentCard key={assessment.id}>
                    <AssessmentHeader>
                      <div>
                        <AssessmentTitle>{assessment.title}</AssessmentTitle>
                        <AssessmentDate>
                          Taken on {new Date(assessment.date).toLocaleDateString()}
                        </AssessmentDate>
                      </div>
                      <ScoreCircle score={assessment.score}>
                        <ScoreValue score={assessment.score}>{assessment.score}%</ScoreValue>
                        <ScoreLabel>Score</ScoreLabel>
                      </ScoreCircle>
                    </AssessmentHeader>
                    
                    <AssessmentDetails>
                      <AssessmentDetail>
                        <DetailLabel>Total Questions</DetailLabel>
                        <DetailValue>{assessment.totalQuestions}</DetailValue>
                      </AssessmentDetail>
                      <AssessmentDetail>
                        <DetailLabel>Correct Answers</DetailLabel>
                        <DetailValue>{assessment.correctAnswers}</DetailValue>
                      </AssessmentDetail>
                      <AssessmentDetail>
                        <DetailLabel>Duration</DetailLabel>
                        <DetailValue>{assessment.duration}</DetailValue>
                      </AssessmentDetail>
                      <AssessmentDetail>
                        <DetailLabel>Status</DetailLabel>
                        <DetailValue style={{ 
                          color: assessment.status === 'completed' ? '#2e7d32' : '#f44336'
                        }}>
                          {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                        </DetailValue>
                      </AssessmentDetail>
                    </AssessmentDetails>
                    
                    <VisibilityToggle
                      visible={assessment.visible}
                      onClick={() => toggleScoreVisibility(assessment.id)}
                    >
                      {assessment.visible ? <FaEye /> : <FaEyeSlash />}
                      {assessment.visible ? 'Score is Visible' : 'Score is Hidden'}
                    </VisibilityToggle>
                  </AssessmentCard>
                ))}
              </>
            )}
          </div>
        </TwoColumnLayout>
      </ContentContainer>
    </PageContainer>
  );
};

export default StudentProfile; 