import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaPlus, 
  FaEdit,
  FaTrash,
  FaEye,
  FaFilter,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaSave,
  FaUserPlus,
  FaGlobe,
  FaBriefcase
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

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const PageDescription = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: 1rem;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const FilterSection = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const FilterTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  width: 100%;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  color: ${props => props.theme.colors.secondary};
`;

const FilterContent = styled.div`
  display: ${props => props.isVisible ? 'block' : 'none'};
  padding-top: 1rem;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const FilterItem = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.active 
    ? props.theme.colors.secondary 
    : props.theme.colors.tertiary};
  background-color: ${props => props.active 
    ? props.theme.colors.tertiary 
    : 'white'};
  color: ${props => props.active 
    ? props.theme.colors.primary 
    : props.theme.colors.darkGray};
  border-radius: 50px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.primary};
  }
`;

const TableContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: ${props => props.theme.colors.primary};
  color: white;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${props => props.theme.colors.light};
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => {
    switch(props.status) {
      case 'upcoming': return '#e6f7e6';
      case 'full': return '#f8d7da';
      case 'inprogress': return '#fff3cd';
      case 'completed': return '#e2e3e5';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'upcoming': return '#2e7d32';
      case 'full': return '#c62828';
      case 'inprogress': return '#856404';
      case 'completed': return '#383d41';
      default: return '#383d41';
    }
  }};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.secondary};
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem;
`;

const AgendaContainer = styled.div`
  margin-top: 1rem;
`;

const AgendaItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const AgendaTime = styled.div`
  font-weight: 500;
  width: 150px;
  color: ${props => props.theme.colors.primary};
`;

const AgendaContent = styled.div`
  flex: 1;
`;

const AgendaActions = styled.div`
  margin-left: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const AddButton = styled(Button)`
  margin-top: 0.5rem;
`;

const QuickFilterButton = styled(Button)`
  margin-right: 1rem;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
  margin-bottom: 1.5rem;
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

// Mock data for workshops
const mockWorkshops = [
  {
    id: 1,
    title: 'Resume Building for Tech Careers',
    date: '2023-06-15',
    startTime: '10:00',
    endTime: '12:00',
    location: 'Engineering Building, Room 201',
    description: 'Learn how to craft a standout resume targeting technology companies. This workshop will cover best practices, common mistakes, and tailored approaches for different tech roles.',
    category: 'Career Development',
    speaker: {
      name: 'Jennifer Miller',
      title: 'Senior Recruiter, Tech Innovations',
      bio: 'Jennifer has over 10 years of experience in tech recruitment and has reviewed thousands of resumes for positions ranging from junior developers to CTOs.',
      email: 'j.miller@example.com',
      phone: '(555) 123-4567'
    },
    agenda: [
      { time: '10:00 - 10:15', description: 'Introduction and Overview' },
      { time: '10:15 - 10:45', description: 'Resume Structure and Key Components' },
      { time: '10:45 - 11:15', description: 'Common Mistakes and How to Avoid Them' },
      { time: '11:15 - 11:45', description: 'Tailoring for Tech Positions' },
      { time: '11:45 - 12:00', description: 'Q&A Session' }
    ],
    status: 'upcoming',
    maxAttendees: 25,
    currentAttendees: 12
  },
  {
    id: 2,
    title: 'Technical Interview Preparation',
    date: '2023-06-20',
    startTime: '14:00',
    endTime: '16:30',
    location: 'Virtual (Zoom)',
    description: 'Prepare for technical interviews with practice coding challenges, whiteboarding exercises, and common algorithmic questions. Get feedback from industry professionals.',
    category: 'Career Development',
    speaker: {
      name: 'Robert Chen',
      title: 'Software Engineering Manager, CodeCorp',
      bio: 'Robert has interviewed hundreds of candidates for software engineering positions and leads technical interviews at CodeCorp.',
      email: 'r.chen@example.com',
      phone: '(555) 987-6543'
    },
    agenda: [
      { time: '14:00 - 14:15', description: 'Welcome and Introductions' },
      { time: '14:15 - 14:45', description: 'Types of Technical Interviews' },
      { time: '14:45 - 15:30', description: 'Problem-Solving Approaches' },
      { time: '15:30 - 16:15', description: 'Practice Session with Feedback' },
      { time: '16:15 - 16:30', description: 'Summary and Resources' }
    ],
    status: 'inprogress',
    maxAttendees: 30,
    currentAttendees: 28
  },
  {
    id: 3,
    title: 'Networking for Introverts',
    date: '2023-06-25',
    startTime: '11:00',
    endTime: '13:00',
    location: 'Business Building, Room 105',
    description: 'Effective networking strategies designed specifically for introverts. Learn how to make meaningful connections without exhausting your social battery.',
    category: 'Soft Skills',
    speaker: {
      name: 'Sarah Johnson',
      title: 'Career Counselor & Author',
      bio: 'Sarah specializes in helping introverted professionals develop networking strategies that work with their natural tendencies rather than against them.',
      email: 's.johnson@example.com',
      phone: '(555) 456-7890'
    },
    agenda: [
      { time: '11:00 - 11:15', description: 'Introduction: Networking Myths' },
      { time: '11:15 - 11:45', description: 'Understanding Your Strengths as an Introvert' },
      { time: '11:45 - 12:15', description: 'Preparation Strategies' },
      { time: '12:15 - 12:45', description: 'Making Meaningful Connections' },
      { time: '12:45 - 13:00', description: 'Action Planning' }
    ],
    status: 'full',
    maxAttendees: 20,
    currentAttendees: 20
  },
  {
    id: 4,
    title: 'Career Preparation in the Digital Age',
    date: '2023-07-20',
    startTime: '13:00',
    endTime: '15:00',
    location: 'Virtual (Zoom)',
    description: 'Essential strategies for job hunting, resume building, and interview skills tailored for the current job market and remote work environment.',
    category: 'Career Development',
    speaker: {
      name: 'David Wilson',
      title: 'Senior Career Advisor, TechHire',
      bio: 'David has helped thousands of professionals successfully transition into tech careers and navigate modern job markets.',
      email: 'd.wilson@example.com',
      phone: '(555) 234-5678'
    },
    agenda: [
      { time: '13:00 - 13:15', description: 'Introduction to Modern Job Markets' },
      { time: '13:15 - 13:45', description: 'Digital Resumes and Portfolios' },
      { time: '13:45 - 14:15', description: 'Remote Interview Techniques' },
      { time: '14:15 - 14:45', description: 'Networking in Digital Spaces' },
      { time: '14:45 - 15:00', description: 'Q&A and Resources' }
    ],
    status: 'upcoming',
    maxAttendees: 35,
    currentAttendees: 18
  },
  {
    id: 6,
    title: 'AI in Modern Industries',
    date: '2023-08-05',
    startTime: '10:00',
    endTime: '12:30',
    location: 'Virtual (Zoom)',
    description: 'Explore how artificial intelligence is transforming various industries and creating new job opportunities. Learn about essential AI skills for career advancement.',
    category: 'Technical Skills',
    speaker: {
      name: 'Michelle Zhang',
      title: 'AI Research Lead, TechFuture Labs',
      bio: 'Michelle leads AI research initiatives at TechFuture Labs and has published numerous papers on practical applications of AI in business settings.',
      email: 'm.zhang@example.com',
      phone: '(555) 345-6789'
    },
    agenda: [
      { time: '10:00 - 10:20', description: 'Introduction to AI Technology Trends' },
      { time: '10:20 - 10:50', description: 'AI Applications Across Industries' },
      { time: '10:50 - 11:20', description: 'Career Paths in AI and Machine Learning' },
      { time: '11:20 - 12:00', description: 'Essential Skills for AI-Adjacent Roles' },
      { time: '12:00 - 12:30', description: 'Q&A and Resource Sharing' }
    ],
    status: 'upcoming',
    maxAttendees: 50,
    currentAttendees: 32
  },
  {
    id: 7,
    title: 'Freelancing 101: Building Your Independent Career',
    date: '2023-07-29',
    startTime: '14:00',
    endTime: '16:00',
    location: 'Virtual (Zoom)',
    description: 'Learn how to launch and sustain a successful freelance career. Topics include finding clients, setting rates, managing projects, and legal considerations.',
    category: 'Career Development',
    speaker: {
      name: 'Alex Rivera',
      title: 'Freelance Design Consultant & Educator',
      bio: 'Alex has been a successful freelancer for over 8 years, working with major brands while mentoring emerging freelance professionals.',
      email: 'a.rivera@example.com',
      phone: '(555) 567-8901'
    },
    agenda: [
      { time: '14:00 - 14:15', description: 'The Freelance Landscape in 2023' },
      { time: '14:15 - 14:45', description: 'Building Your Brand and Portfolio' },
      { time: '14:45 - 15:15', description: 'Client Acquisition and Retention' },
      { time: '15:15 - 15:45', description: 'Business Operations and Legal Basics' },
      { time: '15:45 - 16:00', description: 'Q&A and Next Steps' }
    ],
    status: 'upcoming',
    maxAttendees: 40,
    currentAttendees: 29
  },
  {
    id: 8,
    title: 'Data Visualization for Business Communication',
    date: '2023-08-12',
    startTime: '11:00',
    endTime: '13:30',
    location: 'Engineering Building, Room 305',
    description: 'Master the art of transforming complex data into compelling visual stories. Learn effective data visualization techniques for business presentations and reports.',
    category: 'Technical Skills',
    speaker: {
      name: 'James Peterson',
      title: 'Data Analytics Director, Insight Corp',
      bio: 'James specializes in data-driven storytelling and has helped organizations improve their decision-making through effective data visualization.',
      email: 'j.peterson@example.com',
      phone: '(555) 678-9012'
    },
    agenda: [
      { time: '11:00 - 11:20', description: 'Principles of Effective Data Visualization' },
      { time: '11:20 - 11:50', description: 'Choosing the Right Charts and Graphs' },
      { time: '11:50 - 12:30', description: 'Tools and Technologies Overview' },
      { time: '12:30 - 13:10', description: 'Hands-on Visualization Exercise' },
      { time: '13:10 - 13:30', description: 'Review and Best Practices' }
    ],
    status: 'inprogress',
    maxAttendees: 25,
    currentAttendees: 23
  },
  {
    id: 9,
    title: 'Effective Public Speaking for Professionals',
    date: '2023-09-05',
    startTime: '15:00',
    endTime: '17:00',
    location: 'Virtual (Zoom)',
    description: 'Develop confident public speaking skills for presentations, meetings, and professional events. Overcome anxiety and learn to engage any audience.',
    category: 'Soft Skills',
    speaker: {
      name: 'Natalie Thompson',
      title: 'Communications Coach & Former News Anchor',
      bio: 'Natalie has trained executives and professionals in public speaking for over 15 years, following her successful career in broadcast journalism.',
      email: 'n.thompson@example.com',
      phone: '(555) 789-0123'
    },
    agenda: [
      { time: '15:00 - 15:20', description: 'Understanding Speaking Anxiety' },
      { time: '15:20 - 15:45', description: 'Structuring Compelling Content' },
      { time: '15:45 - 16:15', description: 'Voice, Body Language, and Presence' },
      { time: '16:15 - 16:45', description: 'Virtual Presentation Techniques' },
      { time: '16:45 - 17:00', description: 'Practice and Feedback' }
    ],
    status: 'upcoming',
    maxAttendees: 30,
    currentAttendees: 12
  },
  {
    id: 10,
    title: 'Personal Finance for Young Professionals',
    date: '2023-07-18',
    startTime: '18:00',
    endTime: '20:00',
    location: 'Virtual (Zoom)',
    description: 'Build financial literacy and learn essential money management skills for early career success. Topics include budgeting, investing, debt management, and financial planning.',
    category: 'Life Skills',
    speaker: {
      name: 'Marcus Williams',
      title: 'Financial Advisor, Future Planning Associates',
      bio: 'Marcus specializes in financial education for young professionals and has helped hundreds of clients build sustainable financial strategies.',
      email: 'm.williams@example.com',
      phone: '(555) 890-1234'
    },
    agenda: [
      { time: '18:00 - 18:15', description: 'Financial Foundations for Early Career' },
      { time: '18:15 - 18:45', description: 'Building and Managing Credit' },
      { time: '18:45 - 19:15', description: 'Investment Basics for Long-term Growth' },
      { time: '19:15 - 19:45', description: 'Tax Considerations and Strategies' },
      { time: '19:45 - 20:00', description: 'Q&A and Resources' }
    ],
    status: 'completed',
    maxAttendees: 45,
    currentAttendees: 38
  },
  {
    id: 11,
    title: 'User Experience Design Fundamentals',
    date: '2023-08-23',
    startTime: '13:00',
    endTime: '16:00',
    location: 'Design Building, Studio 401',
    description: 'Learn the core principles of user-centered design and how to create digital experiences that delight users while meeting business objectives.',
    category: 'Design',
    speaker: {
      name: 'Sofia Garcia',
      title: 'UX Director, Interactive Solutions',
      bio: 'Sofia leads UX strategy and design for major tech clients and has pioneered user-centered design methodologies adopted across the industry.',
      email: 's.garcia@example.com',
      phone: '(555) 901-2345'
    },
    agenda: [
      { time: '13:00 - 13:30', description: 'Introduction to UX Principles' },
      { time: '13:30 - 14:15', description: 'User Research and Personas' },
      { time: '14:15 - 14:45', description: 'Information Architecture' },
      { time: '14:45 - 15:30', description: 'Prototyping and Usability Testing' },
      { time: '15:30 - 16:00', description: 'Case Studies and Discussion' }
    ],
    status: 'upcoming',
    maxAttendees: 30,
    currentAttendees: 27
  },
  {
    id: 12,
    title: 'Workplace Conflict Resolution Strategies',
    date: '2023-09-15',
    startTime: '10:00',
    endTime: '12:00',
    location: 'Virtual (Zoom)',
    description: 'Develop practical skills for effectively managing and resolving workplace conflicts. Learn to transform disagreements into opportunities for growth and collaboration.',
    category: 'Soft Skills',
    speaker: {
      name: 'Dr. Karen Richardson',
      title: 'Organizational Psychologist & Mediator',
      bio: 'Dr. Richardson has worked with Fortune 500 companies to improve conflict resolution practices and workplace dynamics for over 20 years.',
      email: 'k.richardson@example.com',
      phone: '(555) 012-3456'
    },
    agenda: [
      { time: '10:00 - 10:20', description: 'Understanding Conflict Types and Triggers' },
      { time: '10:20 - 10:50', description: 'Communication Skills for Difficult Conversations' },
      { time: '10:50 - 11:20', description: 'Mediation and Facilitation Techniques' },
      { time: '11:20 - 11:45', description: 'Case Studies and Role-Playing Exercises' },
      { time: '11:45 - 12:00', description: 'Personal Action Planning' }
    ],
    status: 'upcoming',
    maxAttendees: 25,
    currentAttendees: 8
  }
];

const WorkshopManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    location: '',
  });
  const [workshops, setWorkshops] = useState(mockWorkshops);
  const [isEditing, setIsEditing] = useState(false);
  const [currentWorkshop, setCurrentWorkshop] = useState(null);
  const [currentAgendaItem, setCurrentAgendaItem] = useState({ time: '', description: '' });
  const [activeView, setActiveView] = useState('all'); // 'all' or 'onlineCareer'
  
  // Check URL parameters on component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const viewParam = queryParams.get('view');
    
    if (viewParam === 'onlineCareer') {
      handleViewChange('onlineCareer');
    }
  }, [location.search]);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleFilterClick = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value
    }));
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('speaker.')) {
      const field = name.split('.')[1];
      setCurrentWorkshop(prev => ({
        ...prev,
        speaker: {
          ...prev.speaker,
          [field]: value
        }
      }));
    } else {
      setCurrentWorkshop(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleAgendaItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentAgendaItem(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const addAgendaItem = () => {
    if (currentAgendaItem.time && currentAgendaItem.description) {
      setCurrentWorkshop(prev => ({
        ...prev,
        agenda: [...prev.agenda, { ...currentAgendaItem }]
      }));
      setCurrentAgendaItem({ time: '', description: '' });
    }
  };
  
  const removeAgendaItem = (index) => {
    setCurrentWorkshop(prev => ({
      ...prev,
      agenda: prev.agenda.filter((_, i) => i !== index)
    }));
  };
  
  const createNewWorkshop = () => {
    setCurrentWorkshop({
      id: Date.now(), // temporary ID
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      description: '',
      category: '',
      speaker: {
        name: '',
        title: '',
        bio: '',
        email: '',
        phone: ''
      },
      agenda: [],
      status: 'upcoming',
      maxAttendees: 20,
      currentAttendees: 0
    });
    setIsEditing(true);
  };
  
  const editWorkshop = (id) => {
    const workshopToEdit = workshops.find(workshop => workshop.id === id);
    setCurrentWorkshop({ ...workshopToEdit });
    setIsEditing(true);
  };
  
  const deleteWorkshop = (id) => {
    if (window.confirm('Are you sure you want to delete this workshop?')) {
      setWorkshops(prev => prev.filter(workshop => workshop.id !== id));
    }
  };
  
  const saveWorkshop = () => {
    if (workshops.some(w => w.id === currentWorkshop.id)) {
      // Update existing workshop
      setWorkshops(prev => 
        prev.map(w => 
          w.id === currentWorkshop.id ? currentWorkshop : w
        )
      );
    } else {
      // Add new workshop
      setWorkshops(prev => [...prev, currentWorkshop]);
    }
    
    setIsEditing(false);
    setCurrentWorkshop(null);
  };
  
  const cancelEditing = () => {
    if (window.confirm('Are you sure you want to discard your changes?')) {
      setIsEditing(false);
      setCurrentWorkshop(null);
    }
  };
  
  const applyQuickFilter = (filterType) => {
    if (filterType === 'onlineCareer') {
      setFilters({
        category: 'Career Development',
        status: 'upcoming',
        location: 'virtual'
      });
    } else if (filterType === 'clearAll') {
      setFilters({
        category: '',
        status: '',
        location: ''
      });
    }
  };
  
  const handleViewChange = (view) => {
    setActiveView(view);
    
    if (view === 'onlineCareer') {
      setFilters({
        category: 'Career Development',
        status: 'upcoming',
        location: 'virtual'
      });
    } else {
      setFilters({
        category: '',
        status: '',
        location: ''
      });
    }
  };
  
  const filteredWorkshops = workshops.filter(workshop => {
    // Search filter
    if (searchTerm && !workshop.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (filters.category && workshop.category !== filters.category) {
      return false;
    }
    
    // Status filter
    if (filters.status && workshop.status !== filters.status) {
      return false;
    }
    
    // Location filter - check if it contains "Virtual" or "Zoom" (case insensitive)
    if (filters.location === 'virtual' && 
        !workshop.location.toLowerCase().includes('virtual') && 
        !workshop.location.toLowerCase().includes('zoom')) {
      return false;
    }
    
    return true;
  });
  
  const categories = [...new Set(workshops.map(workshop => workshop.category))];
  const statuses = [...new Set(workshops.map(workshop => workshop.status))];
  
  return (
    <PageContainer>
      <Navbar userType="scadOffice" />
      
      <ContentContainer>
        <PageHeader>
          <PageTitle>Workshop Management</PageTitle>
          <PageDescription>
            Create, edit and manage workshops for SCAD students
          </PageDescription>
        </PageHeader>
        
        {!isEditing ? (
          <>
            <ActionBar>
              <div>
                <Button 
                  variant="primary" 
                  icon={<FaPlus />}
                  onClick={createNewWorkshop}
                >
                  Create New Workshop
                </Button>
              </div>
              <div>
              </div>
            </ActionBar>
            
            <TabsContainer>
              <Tab 
                active={activeView === 'all'} 
                onClick={() => handleViewChange('all')}
              >
                All Workshops
              </Tab>
              <Tab 
                active={activeView === 'onlineCareer'} 
                onClick={() => handleViewChange('onlineCareer')}
              >
                <FaGlobe style={{ marginRight: '0.5rem' }} /> Online Career Workshops
              </Tab>
            </TabsContainer>
            
            <FilterSection>
              <FilterHeader onClick={toggleFilters}>
                <FilterTitle>
                  <FaFilter /> Filters and Search
                </FilterTitle>
                {showFilters ? <FaChevronUp /> : <FaChevronDown />}
              </FilterHeader>
              
              <SearchBar>
                <SearchIcon>
                  <FaSearch />
                </SearchIcon>
                <SearchInput 
                  placeholder="Search workshops..." 
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </SearchBar>
              
              <FilterContent isVisible={showFilters}>
                <h4>Categories</h4>
                <FilterRow>
                  {categories.map(category => (
                    <FilterItem 
                      key={category}
                      active={filters.category === category}
                      onClick={() => handleFilterClick('category', category)}
                    >
                      {category}
                    </FilterItem>
                  ))}
                </FilterRow>
                
                <h4>Status</h4>
                <FilterRow>
                  {statuses.map(status => (
                    <FilterItem 
                      key={status}
                      active={filters.status === status}
                      onClick={() => handleFilterClick('status', status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </FilterItem>
                  ))}
                </FilterRow>
                
                <h4>Location</h4>
                <FilterRow>
                  <FilterItem 
                    active={filters.location === 'virtual'}
                    onClick={() => handleFilterClick('location', 'virtual')}
                  >
                    Online/Virtual
                  </FilterItem>
                  <FilterItem
                    active={filters.location === ''}
                    onClick={() => handleFilterClick('location', '')}
                  >
                    All Locations
                  </FilterItem>
                </FilterRow>
              </FilterContent>
            </FilterSection>
            
            <div>
              <p>{filteredWorkshops.length} workshops found</p>
            </div>
            
            {activeView === 'onlineCareer' && filteredWorkshops.length === 0 && (
              <Card>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', flexDirection: 'column'}}>
                  <FaBriefcase style={{fontSize: '3rem', color: '#ccc', marginBottom: '1rem'}} />
                  <h3>No online career workshops found</h3>
                  <p>Create a new online career workshop to get started.</p>
                  <Button 
                    variant="primary" 
                    icon={<FaPlus />}
                    onClick={createNewWorkshop}
                    style={{marginTop: '1rem'}}
                  >
                    Create New Workshop
                  </Button>
                </div>
              </Card>
            )}
            
            <TableContainer>
              <Table>
                <TableHeader>
                  <tr>
                    <TableHeaderCell>Title</TableHeaderCell>
                    <TableHeaderCell>Date & Time</TableHeaderCell>
                    <TableHeaderCell>Location</TableHeaderCell>
                    <TableHeaderCell>Speaker</TableHeaderCell>
                    <TableHeaderCell>Registration</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Actions</TableHeaderCell>
                  </tr>
                </TableHeader>
                <TableBody>
                  {filteredWorkshops.map(workshop => (
                    <TableRow key={workshop.id}>
                      <TableCell>{workshop.title}</TableCell>
                      <TableCell>
                        {new Date(workshop.date).toLocaleDateString()} <br />
                        {workshop.startTime} - {workshop.endTime}
                      </TableCell>
                      <TableCell>{workshop.location}</TableCell>
                      <TableCell>{workshop.speaker.name}</TableCell>
                      <TableCell>
                        {workshop.currentAttendees}/{workshop.maxAttendees}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={workshop.status}>
                          {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        <ActionButtons>
                          <ActionButton title="View Details" onClick={() => navigate(`/workshops/${workshop.id}`)}>
                            <FaEye />
                          </ActionButton>
                          <ActionButton title="Edit" onClick={() => editWorkshop(workshop.id)}>
                            <FaEdit />
                          </ActionButton>
                          <ActionButton title="Delete" onClick={() => deleteWorkshop(workshop.id)}>
                            <FaTrash />
                          </ActionButton>
                        </ActionButtons>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Card title={currentWorkshop.id !== Date.now() ? "Edit Workshop" : "Create New Workshop"}>
            <form>
              <SectionTitle>Workshop Details</SectionTitle>
              
              <FormGroup>
                <Input
                  label="Workshop Title"
                  name="title"
                  value={currentWorkshop.title}
                  onChange={handleInputChange}
                  placeholder="Enter workshop title"
                  required
                />
              </FormGroup>
              
              <FormRow>
                <Input
                  label="Date"
                  name="date"
                  type="date"
                  value={currentWorkshop.date}
                  onChange={handleInputChange}
                  required
                />
                
                <Input
                  label="Start Time"
                  name="startTime"
                  type="time"
                  value={currentWorkshop.startTime}
                  onChange={handleInputChange}
                  required
                />
                
                <Input
                  label="End Time"
                  name="endTime"
                  type="time"
                  value={currentWorkshop.endTime}
                  onChange={handleInputChange}
                  required
                />
              </FormRow>
              
              <FormRow>
                <Input
                  label="Location"
                  name="location"
                  value={currentWorkshop.location}
                  onChange={handleInputChange}
                  placeholder="Physical location or 'Virtual'"
                  required
                />
                
                <Select
                  label="Category"
                  name="category"
                  value={currentWorkshop.category}
                  onChange={handleInputChange}
                  options={[
                    { value: 'Career Development', label: 'Career Development' },
                    { value: 'Soft Skills', label: 'Soft Skills' },
                    { value: 'Technical Skills', label: 'Technical Skills' },
                    { value: 'Design', label: 'Design' },
                    { value: 'Life Skills', label: 'Life Skills' }
                  ]}
                  placeholder="Select a category"
                  required
                />
              </FormRow>
              
              <FormGroup>
                <Input
                  label="Workshop Description"
                  name="description"
                  value={currentWorkshop.description}
                  onChange={handleInputChange}
                  placeholder="Describe what the workshop is about"
                  multiline
                  rows={4}
                  required
                />
              </FormGroup>
              
              <FormRow>
                <Input
                  label="Maximum Attendees"
                  name="maxAttendees"
                  type="number"
                  min="1"
                  value={currentWorkshop.maxAttendees}
                  onChange={handleInputChange}
                  required
                />
                
                <Select
                  label="Status"
                  name="status"
                  value={currentWorkshop.status}
                  onChange={handleInputChange}
                  options={[
                    { value: 'upcoming', label: 'Upcoming' },
                    { value: 'inprogress', label: 'In Progress' },
                    { value: 'full', label: 'Full' },
                    { value: 'completed', label: 'Completed' }
                  ]}
                  required
                />
              </FormRow>
              
              <SectionTitle>Speaker Information</SectionTitle>
              
              <FormRow>
                <Input
                  label="Speaker Name"
                  name="speaker.name"
                  value={currentWorkshop.speaker.name}
                  onChange={handleInputChange}
                  placeholder="Full name of the speaker"
                  required
                />
                
                <Input
                  label="Speaker Title"
                  name="speaker.title"
                  value={currentWorkshop.speaker.title}
                  onChange={handleInputChange}
                  placeholder="Job title and organization"
                  required
                />
              </FormRow>
              
              <FormGroup>
                <Input
                  label="Speaker Bio"
                  name="speaker.bio"
                  value={currentWorkshop.speaker.bio}
                  onChange={handleInputChange}
                  placeholder="Brief biography of the speaker"
                  multiline
                  rows={3}
                  required
                />
              </FormGroup>
              
              <FormRow>
                <Input
                  label="Email"
                  name="speaker.email"
                  type="email"
                  value={currentWorkshop.speaker.email}
                  onChange={handleInputChange}
                  placeholder="Contact email"
                  required
                />
                
                <Input
                  label="Phone"
                  name="speaker.phone"
                  value={currentWorkshop.speaker.phone}
                  onChange={handleInputChange}
                  placeholder="Contact phone number"
                  required
                />
              </FormRow>
              
              <SectionTitle>Workshop Agenda</SectionTitle>
              
              <AgendaContainer>
                {currentWorkshop.agenda.map((item, index) => (
                  <AgendaItem key={index}>
                    <AgendaTime>{item.time}</AgendaTime>
                    <AgendaContent>{item.description}</AgendaContent>
                    <AgendaActions>
                      <ActionButton onClick={() => removeAgendaItem(index)} title="Remove">
                        <FaTrash />
                      </ActionButton>
                    </AgendaActions>
                  </AgendaItem>
                ))}
                
                <FormRow>
                  <Input
                    label="Time Slot"
                    name="time"
                    value={currentAgendaItem.time}
                    onChange={handleAgendaItemChange}
                    placeholder="e.g. 10:00 - 10:30"
                  />
                  
                  <Input
                    label="Description"
                    name="description"
                    value={currentAgendaItem.description}
                    onChange={handleAgendaItemChange}
                    placeholder="What happens during this time"
                  />
                </FormRow>
                
                <AddButton 
                  variant="secondary" 
                  size="small"
                  icon={<FaPlus />}
                  onClick={addAgendaItem}
                  disabled={!currentAgendaItem.time || !currentAgendaItem.description}
                >
                  Add Agenda Item
                </AddButton>
              </AgendaContainer>
              
              <Card.Footer>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Button 
                    variant="secondary"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary"
                    icon={<FaSave />}
                    onClick={saveWorkshop}
                  >
                    Save Workshop
                  </Button>
                </div>
              </Card.Footer>
            </form>
          </Card>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default WorkshopManagement; 