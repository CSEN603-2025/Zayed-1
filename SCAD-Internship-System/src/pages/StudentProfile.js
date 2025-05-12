import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FaEyeSlash,
  FaBuilding,
  FaCalendarAlt,
  FaClock
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin: 0;
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.darkGray};
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.darkGray};
  display: block;
`;

const ProfileViewContainer = styled.div`
  margin-bottom: 2rem;
`;

const ViewItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.tertiary}40;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const ViewCompanyLogo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
  margin-right: 1rem;
`;

const ViewInfo = styled.div`
  flex: 1;
`;

const ViewCompanyName = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.25rem;
`;

const ViewDate = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
  
  svg {
    margin-right: 0.25rem;
  }
`;

const ViewTimeInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
  margin-left: 1rem;
  
  svg {
    margin-right: 0.25rem;
  }
`;

const ViewCount = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
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
  ],
  profileViews: [
    {
      id: 1,
      companyName: "Tech Innovations",
      companyLogo: null,
      industry: "Technology",
      date: "2024-03-20",
      time: "14:35",
      viewCount: 3,
      interested: true
    },
    {
      id: 2,
      companyName: "Global Marketing Solutions",
      companyLogo: null,
      industry: "Marketing",
      date: "2024-03-18",
      time: "10:15",
      viewCount: 1,
      interested: false
    },
    {
      id: 3,
      companyName: "Data Systems Inc.",
      companyLogo: null,
      industry: "Information Technology",
      date: "2024-03-15",
      time: "16:22",
      viewCount: 2,
      interested: true
    },
    {
      id: 4,
      companyName: "Creative Studios",
      companyLogo: null,
      industry: "Design",
      date: "2024-03-12",
      time: "09:45",
      viewCount: 1,
      interested: false
    },
    {
      id: 5,
      companyName: "FinTech Corp",
      companyLogo: null,
      industry: "Finance",
      date: "2024-03-10",
      time: "13:30",
      viewCount: 4,
      interested: true
    }
  ]
};

const StudentProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(mockUserData);
  const [editing, setEditing] = useState({
    personalInfo: false,
    academicInfo: false,
    jobInterests: false
  });
  const [newInterest, setNewInterest] = useState('');
  const { userType } = useAuth();
  
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    skills: []
  });
  
  const [newActivity, setNewActivity] = useState({
    name: '',
    role: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  
  const [newSkill, setNewSkill] = useState('');
  
  // Load saved assessments when component mounts
  useEffect(() => {
    const savedAssessments = JSON.parse(localStorage.getItem('studentAssessments') || '[]');
    if (savedAssessments.length > 0) {
      setUserData(prev => ({
        ...prev,
        assessments: savedAssessments
      }));
    }
    
    // Load saved experiences and activities
    const savedExperiences = JSON.parse(localStorage.getItem('studentExperiences') || '[]');
    if (savedExperiences.length > 0) {
      setUserData(prev => ({
        ...prev,
        workExperiences: savedExperiences
      }));
    }
    
    const savedActivities = JSON.parse(localStorage.getItem('studentActivities') || '[]');
    if (savedActivities.length > 0) {
      setUserData(prev => ({
        ...prev,
        activities: savedActivities
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
  
  const handleExperienceInputChange = (e) => {
    const { name, value } = e.target;
    setNewExperience(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleActivityInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const addSkillToExperience = () => {
    if (newSkill.trim() === '') return;
    
    if (!newExperience.skills.includes(newSkill)) {
      setNewExperience(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
    }
    
    setNewSkill('');
  };
  
  const removeSkillFromExperience = (skill) => {
    setNewExperience(prev => ({
      ...prev,
      skills: prev.skills.filter(item => item !== skill)
    }));
  };
  
  const openEditExperienceModal = (experience) => {
    setNewExperience({
      title: experience.title,
      company: experience.company,
      startDate: experience.startDate,
      endDate: experience.endDate || '',
      description: experience.description || '',
      skills: experience.skills || []
    });
    setIsEditing(true);
    setEditingItemId(experience.id);
    setShowExperienceModal(true);
  };
  
  const openEditActivityModal = (activity) => {
    setNewActivity({
      name: activity.name,
      role: activity.role,
      startDate: activity.startDate,
      endDate: activity.endDate || '',
      description: activity.description || ''
    });
    setIsEditing(true);
    setEditingItemId(activity.id);
    setShowActivityModal(true);
  };
  
  const openAddExperienceModal = () => {
    setNewExperience({
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      skills: []
    });
    setIsEditing(false);
    setEditingItemId(null);
    setShowExperienceModal(true);
  };
  
  const openAddActivityModal = () => {
    setNewActivity({
      name: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setIsEditing(false);
    setEditingItemId(null);
    setShowActivityModal(true);
  };
  
  const saveExperience = () => {
    // Validate required fields
    if (!newExperience.title || !newExperience.company || !newExperience.startDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    let updatedExperiences;
    
    if (isEditing) {
      // Update existing experience
      updatedExperiences = userData.workExperiences.map(exp => 
        exp.id === editingItemId ? { ...newExperience, id: editingItemId } : exp
      );
    } else {
      // Add new experience
      const newExperienceItem = {
        ...newExperience,
        id: Date.now() // Generate a unique ID
      };
      updatedExperiences = [...userData.workExperiences, newExperienceItem];
    }
    
    // Update state
    setUserData(prev => ({
      ...prev,
      workExperiences: updatedExperiences
    }));
    
    // Save to localStorage
    localStorage.setItem('studentExperiences', JSON.stringify(updatedExperiences));
    
    // Reset form and close modal
    setNewExperience({
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      skills: []
    });
    setIsEditing(false);
    setEditingItemId(null);
    setShowExperienceModal(false);
  };
  
  const saveActivity = () => {
    // Validate required fields
    if (!newActivity.name || !newActivity.role || !newActivity.startDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    let updatedActivities;
    
    if (isEditing) {
      // Update existing activity
      updatedActivities = userData.activities.map(act => 
        act.id === editingItemId ? { ...newActivity, id: editingItemId } : act
      );
    } else {
      // Add new activity
      const newActivityItem = {
        ...newActivity,
        id: Date.now() // Generate a unique ID
      };
      updatedActivities = [...userData.activities, newActivityItem];
    }
    
    // Update state
    setUserData(prev => ({
      ...prev,
      activities: updatedActivities
    }));
    
    // Save to localStorage
    localStorage.setItem('studentActivities', JSON.stringify(updatedActivities));
    
    // Reset form and close modal
    setNewActivity({
      name: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setIsEditing(false);
    setEditingItemId(null);
    setShowActivityModal(false);
  };
  
  const deleteExperience = (id) => {
    const updatedExperiences = userData.workExperiences.filter(exp => exp.id !== id);
    
    setUserData(prev => ({
      ...prev,
      workExperiences: updatedExperiences
    }));
    
    localStorage.setItem('studentExperiences', JSON.stringify(updatedExperiences));
  };
  
  const deleteActivity = (id) => {
    const updatedActivities = userData.activities.filter(act => act.id !== id);
    
    setUserData(prev => ({
      ...prev,
      activities: updatedActivities
    }));
    
    localStorage.setItem('studentActivities', JSON.stringify(updatedActivities));
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
  
  const handleCompanyClick = (companyId) => {
    navigate(`/scad/companies/${companyId}`);
  };
  
  const renderProfileViews = () => {
    return (
      <>
        <SectionTitle>
          <FaEye /> Companies That Viewed Your Profile
        </SectionTitle>
        <Card>
          <div style={{ padding: '1rem' }}>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              These companies have viewed your profile recently. Companies marked with a star have indicated interest in your profile.
            </p>
            
            {userData.profileViews && userData.profileViews.length > 0 ? (
              <ProfileViewContainer>
                {userData.profileViews.map(view => (
                  <ViewItem 
                    key={view.id}
                    onClick={() => handleCompanyClick(view.id)}
                    title="Click to view company details"
                  >
                    <ViewCompanyLogo>
                      <FaBuilding />
                    </ViewCompanyLogo>
                    <ViewInfo>
                      <ViewCompanyName>
                        {view.companyName} {view.interested && <FaStar size={14} color="#FFD700" style={{ marginLeft: '5px' }} />}
                      </ViewCompanyName>
                      <div style={{ display: 'flex' }}>
                        <ViewDate>
                          <FaCalendarAlt /> {view.date}
                        </ViewDate>
                        <ViewTimeInfo>
                          <FaClock /> {view.time}
                        </ViewTimeInfo>
                      </div>
                    </ViewInfo>
                    <ViewCount title={`Viewed your profile ${view.viewCount} ${view.viewCount === 1 ? 'time' : 'times'}`}>
                      {view.viewCount}
                    </ViewCount>
                  </ViewItem>
                ))}
              </ProfileViewContainer>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <FaEyeSlash style={{ fontSize: '2rem', color: '#ccc', marginBottom: '1rem' }} />
                <p>No companies have viewed your profile yet.</p>
              </div>
            )}
            
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="secondary" 
                size="small"
                onClick={() => navigate('/internships')}
              >
                Find More Opportunities
              </Button>
            </div>
          </div>
        </Card>
      </>
    );
  };
  
  return (
    <PageContainer>
      <Navbar userType="student" />
      
      <ContentContainer>
        <ProfileHeader>
          <PageTitle>My Profile</PageTitle>
        </ProfileHeader>
        
        {/* Work Experience Modal */}
        {showExperienceModal && (
          <Modal>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>{isEditing ? 'Edit Work Experience' : 'Add Work Experience'}</ModalTitle>
                <CloseButton onClick={() => setShowExperienceModal(false)}>×</CloseButton>
              </ModalHeader>
              
              <FormContainer>
                <Input 
                  label="Job Title *"
                  name="title"
                  value={newExperience.title}
                  onChange={handleExperienceInputChange}
                />
                <Input 
                  label="Company Name *"
                  name="company"
                  value={newExperience.company}
                  onChange={handleExperienceInputChange}
                />
                <Input 
                  label="Start Date *"
                  name="startDate"
                  placeholder="e.g., Jun 2022"
                  value={newExperience.startDate}
                  onChange={handleExperienceInputChange}
                />
                <Input 
                  label="End Date"
                  name="endDate"
                  placeholder="e.g., Aug 2022 or Present"
                  value={newExperience.endDate}
                  onChange={handleExperienceInputChange}
                />
              </FormContainer>
              
              <div style={{ marginTop: '1rem' }}>
                <Label>Description & Responsibilities</Label>
                <TextArea
                  name="description"
                  value={newExperience.description}
                  onChange={handleExperienceInputChange}
                  placeholder="Describe your responsibilities and achievements in this role"
                />
              </div>
              
              <div style={{ marginTop: '1rem' }}>
                <Label>Skills</Label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Input 
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <Button 
                    variant="secondary" 
                    size="small" 
                    onClick={addSkillToExperience}
                    icon={<FaPlus />}
                  >
                    Add
                  </Button>
                </div>
                
                <KeywordsList>
                  {newExperience.skills.map((skill, index) => (
                    <Keyword key={index}>
                      {skill}
                      <FaTimes 
                        size={12} 
                        onClick={() => removeSkillFromExperience(skill)}
                      />
                    </Keyword>
                  ))}
                </KeywordsList>
              </div>
              
              <ModalFooter>
                <Button 
                  variant="tertiary" 
                  size="small" 
                  onClick={() => setShowExperienceModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  size="small" 
                  onClick={saveExperience}
                >
                  {isEditing ? 'Update Experience' : 'Save Experience'}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
        
        {/* Activity Modal */}
        {showActivityModal && (
          <Modal>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>{isEditing ? 'Edit Activity' : 'Add Activity'}</ModalTitle>
                <CloseButton onClick={() => setShowActivityModal(false)}>×</CloseButton>
              </ModalHeader>
              
              <FormContainer>
                <Input 
                  label="Activity Name *"
                  name="name"
                  value={newActivity.name}
                  onChange={handleActivityInputChange}
                />
                <Input 
                  label="Your Role *"
                  name="role"
                  value={newActivity.role}
                  onChange={handleActivityInputChange}
                />
                <Input 
                  label="Start Date *"
                  name="startDate"
                  placeholder="e.g., Sep 2021"
                  value={newActivity.startDate}
                  onChange={handleActivityInputChange}
                />
                <Input 
                  label="End Date"
                  name="endDate"
                  placeholder="e.g., Jun 2022 or Present"
                  value={newActivity.endDate}
                  onChange={handleActivityInputChange}
                />
              </FormContainer>
              
              <div style={{ marginTop: '1rem' }}>
                <Label>Description</Label>
                <TextArea
                  name="description"
                  value={newActivity.description}
                  onChange={handleActivityInputChange}
                  placeholder="Describe your involvement in this activity"
                />
              </div>
              
              <ModalFooter>
                <Button 
                  variant="tertiary" 
                  size="small" 
                  onClick={() => setShowActivityModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  size="small" 
                  onClick={saveActivity}
                >
                  {isEditing ? 'Update Activity' : 'Save Activity'}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
        
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
              <Tab 
                active={activeTab === 'viewers'} 
                onClick={() => setActiveTab('viewers')}
              >
                Profile Viewers
              </Tab>
            </TabsContainer>
            
            {activeTab === 'viewers' && renderProfileViews()}
            
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
                  onClick={openAddExperienceModal}
                >
                  Add Work Experience
                </AddButton>
                
                {userData.workExperiences.map(experience => (
                  <ExperienceCard key={experience.id}>
                    <ExperienceHeader>
                      <div>
                        <ExperienceTitle>{experience.title}</ExperienceTitle>
                        <ExperienceCompany>{experience.company}</ExperienceCompany>
                        <ExperienceDate>{experience.startDate} - {experience.endDate || 'Present'}</ExperienceDate>
                      </div>
                      <ExperienceActions>
                        <Button 
                          variant="secondary" 
                          size="small" 
                          icon={<FaEdit />}
                          onClick={() => openEditExperienceModal(experience)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="danger" 
                          size="small" 
                          icon={<FaTrash />}
                          onClick={() => deleteExperience(experience.id)}
                        >
                          Delete
                        </Button>
                      </ExperienceActions>
                    </ExperienceHeader>
                    
                    <p>{experience.description}</p>
                    
                    <KeywordsList>
                      {experience.skills && experience.skills.map((skill, index) => (
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
                  onClick={openAddActivityModal}
                >
                  Add Activity
                </AddButton>
                
                {userData.activities.map(activity => (
                  <ExperienceCard key={activity.id}>
                    <ExperienceHeader>
                      <div>
                        <ExperienceTitle>{activity.name}</ExperienceTitle>
                        <ExperienceCompany>{activity.role}</ExperienceCompany>
                        <ExperienceDate>{activity.startDate} - {activity.endDate || 'Present'}</ExperienceDate>
                      </div>
                      <ExperienceActions>
                        <Button 
                          variant="secondary" 
                          size="small" 
                          icon={<FaEdit />}
                          onClick={() => openEditActivityModal(activity)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="danger" 
                          size="small" 
                          icon={<FaTrash />}
                          onClick={() => deleteActivity(activity.id)}
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