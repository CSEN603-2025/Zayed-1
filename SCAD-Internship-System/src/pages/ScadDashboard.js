import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import { 
  FaBuilding, 
  FaGraduationCap, 
  FaFileAlt, 
  FaSearch, 
  FaEye, 
  FaCheck, 
  FaTimes,
  FaFilter,
  FaChartBar,
  FaCalendarAlt,
  FaClock,
  FaFlag,
  FaDownload,
  FaStar,
  FaChartLine,
  FaBook,
  FaThumbsUp,
  FaPrint
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

const DashboardHeader = styled.div`
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

const StatCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatsCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StatsTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.1rem;
  margin: 0;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const StatsValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin: 1rem 0;
`;

const StatsDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const StatsLabel = styled.span`
  color: ${props => props.theme.colors.darkGray};
`;

const StatsNumber = styled.span`
  color: ${props => props.theme.colors.secondary};
  font-weight: 600;
`;

const ChartContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RankingContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const RankingTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.1rem;
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const RankingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
  
  &:last-child {
    border-bottom: none;
  }
`;

const RankingNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RankingIndex = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.index <= 3 ? props.theme.colors.primary : props.theme.colors.tertiary};
  color: ${props => props.index <= 3 ? 'white' : props.theme.colors.darkGray};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  margin-right: 0.75rem;
`;

const RankingName = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.darkGray};
`;

const RankingValue = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.secondary};
`;

const ReportButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 2rem;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const StatCard = styled(Card)`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StatIconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
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

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SearchFilterContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 600px;
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
      case 'pending': return '#fff3cd';
      case 'approved': return '#d4edda';
      case 'rejected': return '#f8d7da';
      case 'flagged': return '#d1ecf1';
      case 'accepted': return '#d4edda';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'pending': return '#856404';
      case 'approved': return '#155724';
      case 'rejected': return '#721c24';
      case 'flagged': return '#0c5460';
      case 'accepted': return '#155724';
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

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.darkGray};
  display: block;
`;

// Mock data
const mockCompanies = [
  {
    id: 1,
    name: 'Tech Innovations',
    industry: 'Technology',
    size: 'medium',
    email: 'contact@techinnovations.com',
    status: 'pending',
    applied: '01/15/2023',
    logo: null
  },
  {
    id: 2,
    name: 'Finance Solutions',
    industry: 'Finance',
    size: 'large',
    email: 'hr@financesolutions.com',
    status: 'approved',
    applied: '12/05/2022',
    logo: null
  },
  {
    id: 3,
    name: 'Healthcare Systems',
    industry: 'Healthcare',
    size: 'corporate',
    email: 'info@healthcaresystems.com',
    status: 'rejected',
    applied: '02/20/2023',
    logo: null
  },
  {
    id: 4,
    name: 'Creative Designs',
    industry: 'Design',
    size: 'small',
    email: 'hello@creativedesigns.com',
    status: 'pending',
    applied: '02/28/2023',
    logo: null
  }
];

const mockStudents = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@university.edu',
    major: 'Computer Science',
    semester: 6,
    internshipStatus: 'current'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    major: 'Finance',
    semester: 5,
    internshipStatus: 'pending'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.brown@university.edu',
    major: 'Graphic Design',
    semester: 7,
    internshipStatus: 'completed'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@university.edu',
    major: 'Computer Engineering',
    semester: 6,
    internshipStatus: 'none'
  }
];

const mockReports = [
  {
    id: 1,
    student: 'Michael Brown',
    title: 'UI/UX Design Internship at Creative Designs',
    company: 'Creative Designs',
    submitted: '01/10/2023',
    status: 'accepted'
  },
  {
    id: 2,
    student: 'Lisa Wang',
    title: 'Software Development at Tech Innovations',
    company: 'Tech Innovations',
    submitted: '02/05/2023',
    status: 'flagged'
  },
  {
    id: 3,
    student: 'David Johnson',
    title: 'Data Analysis Internship',
    company: 'Finance Solutions',
    submitted: '02/15/2023',
    status: 'pending'
  },
  {
    id: 4,
    student: 'James Wilson',
    title: 'Marketing Internship Experience',
    company: 'Global Marketing',
    submitted: '01/20/2023',
    status: 'rejected'
  }
];

// Mock data for evaluation reports
const mockEvaluations = [
  {
    id: 1,
    student: "David Wilson",
    studentId: "S10021",
    major: "Computer Science",
    company: "Tech Innovations",
    supervisor: "Sarah Parker",
    startDate: "2023-05-01",
    endDate: "2023-07-31",
    submittedDate: "2023-08-05",
    rating: 4.5,
    status: "completed"
  },
  {
    id: 2,
    student: "Emily Davis",
    studentId: "S10043",
    major: "Marketing",
    company: "Global Marketing Solutions",
    supervisor: "Michael Rodriguez",
    startDate: "2023-06-15",
    endDate: "2023-09-15",
    submittedDate: "2023-09-20",
    rating: 4.8,
    status: "completed"
  },
  {
    id: 3,
    student: "James Thompson",
    studentId: "S10056",
    major: "Graphic Design",
    company: "Creative Studios",
    supervisor: "Amanda Lee",
    startDate: "2023-05-15",
    endDate: "2023-08-15",
    submittedDate: "2023-08-18",
    rating: 3.7,
    status: "completed"
  },
  {
    id: 4,
    student: "Sophia Martinez",
    studentId: "S10067",
    major: "Data Science",
    company: "FinTech Corp",
    supervisor: "Robert Johnson",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    submittedDate: "2023-09-02",
    rating: 4.2,
    status: "completed"
  },
  {
    id: 5,
    student: "Ethan Brown",
    studentId: "S10089",
    major: "Computer Science",
    company: "SoftDev Inc.",
    supervisor: "Jennifer Williams",
    startDate: "2023-05-10",
    endDate: "2023-08-10",
    submittedDate: "2023-08-15",
    rating: 4.0,
    status: "completed"
  }
];

// Add clarification reasons array above the component
const rejectionReasons = [
  { value: 'incomplete', label: 'Incomplete Information' },
  { value: 'formatting', label: 'Improper Formatting' },
  { value: 'plagiarism', label: 'Suspected Plagiarism' },
  { value: 'inaccurate', label: 'Inaccurate Information' },
  { value: 'inappropriate', label: 'Inappropriate Content' },
  { value: 'other', label: 'Other (Contact SCAD Office)' }
];

// Add mock data for statistics below other mock data
const mockStatistics = {
  reportStats: {
    accepted: 35,
    rejected: 8,
    flagged: 5,
    pending: 12,
    total: 60
  },
  reviewTime: {
    average: 2.3, // days
    fastest: 0.5, // days
    slowest: 5, // days
  },
  topCourses: [
    { name: 'Data Structures and Algorithms', count: 24 },
    { name: 'Web Development', count: 18 },
    { name: 'Database Systems', count: 15 },
    { name: 'Software Engineering', count: 12 },
    { name: 'Mobile App Development', count: 10 }
  ],
  topCompanies: {
    byRating: [
      { name: 'Tech Innovations', rating: 4.8, count: 5 },
      { name: 'Global Marketing Solutions', rating: 4.6, count: 4 },
      { name: 'Data Systems Inc.', rating: 4.5, count: 3 },
      { name: 'Creative Studios', rating: 4.3, count: 6 },
      { name: 'FinTech Corp', rating: 4.2, count: 4 }
    ],
    byInternshipCount: [
      { name: 'Creative Studios', count: 6, rating: 4.3 },
      { name: 'Tech Innovations', count: 5, rating: 4.8 },
      { name: 'Global Marketing Solutions', count: 4, rating: 4.6 },
      { name: 'FinTech Corp', count: 4, rating: 4.2 },
      { name: 'Data Systems Inc.', count: 3, rating: 4.5 }
    ]
  },
  cycleMetrics: {
    totalStudents: 120,
    placedStudents: 85,
    placementRate: 70.8,
    averageSalary: 2500
  }
};

const ScadDashboard = () => {
  const navigate = useNavigate();
  const tabsRef = useRef(null);
  const [activeTab, setActiveTab] = useState('companies');
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState(mockCompanies);
  const [filters, setFilters] = useState({
    companyIndustry: '',
    reportStatus: '',
    studentMajor: '',
    internshipStatus: ''
  });
  const [cycleDates, setCycleDates] = useState({
    startDate: '2023-05-01',
    endDate: '2023-08-31'
  });
  const [reports, setReports] = useState(mockReports);
  const [evaluations, setEvaluations] = useState([]);
  const [statistics, setStatistics] = useState(mockStatistics);
  const [selectedReportFormat, setSelectedReportFormat] = useState('pdf');
  
  // Add clarification handler
  const handleClarificationChange = (id, reason) => {
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === id ? { ...report, clarification: reason } : report
      )
    );
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setCycleDates(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveCycleDates = () => {
    alert(`Internship cycle dates set: ${cycleDates.startDate} to ${cycleDates.endDate}`);
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Scroll to tabs container smoothly
    tabsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const filteredCompanies = companies.filter(company => {
    // Search filter
    if (searchTerm && !company.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Industry filter
    if (filters.companyIndustry && company.industry !== filters.companyIndustry) {
      return false;
    }
    
    return true;
  });
  
  const filteredStudents = mockStudents.filter(student => {
    // Search filter
    if (searchTerm && !student.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Major filter
    if (filters.studentMajor && student.major !== filters.studentMajor) {
      return false;
    }
    
    // Internship status filter
    if (filters.internshipStatus && student.internshipStatus !== filters.internshipStatus) {
      return false;
    }
    
    return true;
  });
  
  const filteredReports = reports.filter(report => {
    // Search filter
    if (
      searchTerm && 
      !report.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !report.student.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Status filter
    if (filters.reportStatus && report.status !== filters.reportStatus) {
      return false;
    }
    
    // Major filter - lookup student major from mockStudents array by name
    if (filters.studentMajor) {
      const student = mockStudents.find(s => s.name === report.student);
      if (!student || student.major !== filters.studentMajor) {
        return false;
      }
    }
    
    return true;
  });
  
  const industryOptions = [
    { value: '', label: 'All Industries' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Design', label: 'Design' }
  ];
  
  const majorOptions = [
    { value: '', label: 'All Majors' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Computer Engineering', label: 'Computer Engineering' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Graphic Design', label: 'Graphic Design' }
  ];
  
  const internshipStatusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'none', label: 'No Internship' },
    { value: 'pending', label: 'Application Pending' },
    { value: 'current', label: 'Currently Interning' },
    { value: 'completed', label: 'Completed' }
  ];
  
  const reportStatusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'flagged', label: 'Flagged' }
  ];
  
  const handleViewCompany = (id) => {
    navigate(`/scad/companies/${id}`);
  };
  
  const handleApproveCompany = (id) => {
    setCompanies(prevCompanies => 
      prevCompanies.map(company => 
        company.id === id ? { ...company, status: 'approved' } : company
      )
    );
    // Optional: Show a success message
    alert('Company has been approved');
  };
  
  const handleRejectCompany = (id) => {
    setCompanies(prevCompanies => 
      prevCompanies.map(company => 
        company.id === id ? { ...company, status: 'rejected' } : company
      )
    );
    // Optional: Show a rejection message
    alert('Company has been rejected');
  };
  
  const handleViewStudent = (id) => {
    navigate(`/scad/studentPreview`);
  };
  
  const handleViewReport = (id) => {
    navigate(`/scad/viewReport`);
  };
  
  const handleReportStatusChange = (id, newStatus) => {
    // Update the reports state with the new status
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === id ? {...report, status: newStatus} : report
      )
    );
  };
  
  useEffect(() => {
    // Filter evaluations based on search term and major filter
    let filteredEvaluations = [...mockEvaluations];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredEvaluations = filteredEvaluations.filter(
        evaluation => 
          evaluation.student.toLowerCase().includes(term) ||
          evaluation.company.toLowerCase().includes(term) ||
          evaluation.supervisor.toLowerCase().includes(term)
      );
    }
    
    if (filters.studentMajor) {
      filteredEvaluations = filteredEvaluations.filter(evaluation => evaluation.major === filters.studentMajor);
    }
    
    setEvaluations(filteredEvaluations);
  }, [searchTerm, filters.studentMajor]);
  
  const handleViewEvaluation = (id) => {
    navigate(`/evaluation/${id}`);
  };

  // Add a function to generate reports
  const handleGenerateReport = () => {
    alert(`Generating ${selectedReportFormat.toUpperCase()} report with current statistics...`);
    // In a real implementation, this would call an API to generate the report
  };

  // Add a new statistics tab renderer
  const renderStatisticsTab = () => {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: '#084B8A' }}>Internship Program Statistics</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <select 
              value={selectedReportFormat} 
              onChange={(e) => setSelectedReportFormat(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="pdf">PDF Report</option>
              <option value="excel">Excel Report</option>
              <option value="csv">CSV Data</option>
            </select>
            <ReportButton onClick={handleGenerateReport}>
              <FaPrint /> Generate Report
            </ReportButton>
          </div>
        </div>
        
        <StatsContainer>
          <StatsCard>
            <StatsHeader>
              <StatsTitle><FaFileAlt /> Report Statistics</StatsTitle>
            </StatsHeader>
            <StatsValue>{statistics.reportStats.total}</StatsValue>
            <div>
              <StatsDetail>
                <StatsLabel>Accepted Reports</StatsLabel>
                <StatsNumber>{statistics.reportStats.accepted}</StatsNumber>
              </StatsDetail>
              <StatsDetail>
                <StatsLabel>Rejected Reports</StatsLabel>
                <StatsNumber>{statistics.reportStats.rejected}</StatsNumber>
              </StatsDetail>
              <StatsDetail>
                <StatsLabel>Flagged Reports</StatsLabel>
                <StatsNumber>{statistics.reportStats.flagged}</StatsNumber>
              </StatsDetail>
              <StatsDetail>
                <StatsLabel>Pending Review</StatsLabel>
                <StatsNumber>{statistics.reportStats.pending}</StatsNumber>
              </StatsDetail>
            </div>
          </StatsCard>
          
          <StatsCard>
            <StatsHeader>
              <StatsTitle><FaClock /> Review Time</StatsTitle>
            </StatsHeader>
            <StatsValue>{statistics.reviewTime.average} days</StatsValue>
            <div>
              <StatsDetail>
                <StatsLabel>Fastest Review</StatsLabel>
                <StatsNumber>{statistics.reviewTime.fastest} days</StatsNumber>
              </StatsDetail>
              <StatsDetail>
                <StatsLabel>Slowest Review</StatsLabel>
                <StatsNumber>{statistics.reviewTime.slowest} days</StatsNumber>
              </StatsDetail>
            </div>
          </StatsCard>
          
          <StatsCard>
            <StatsHeader>
              <StatsTitle><FaChartLine /> Placement Metrics</StatsTitle>
            </StatsHeader>
            <StatsValue>{statistics.cycleMetrics.placementRate}%</StatsValue>
            <div>
              <StatsDetail>
                <StatsLabel>Total Students</StatsLabel>
                <StatsNumber>{statistics.cycleMetrics.totalStudents}</StatsNumber>
              </StatsDetail>
              <StatsDetail>
                <StatsLabel>Placed Students</StatsLabel>
                <StatsNumber>{statistics.cycleMetrics.placedStudents}</StatsNumber>
              </StatsDetail>
              <StatsDetail>
                <StatsLabel>Average Salary</StatsLabel>
                <StatsNumber>${statistics.cycleMetrics.averageSalary}</StatsNumber>
              </StatsDetail>
            </div>
          </StatsCard>
        </StatsContainer>
        
        <ChartContainer>
          <RankingTitle><FaChartLine /> Report Status Distribution</RankingTitle>
          <div style={{ fontSize: '5rem', opacity: 0.3, margin: '2rem 0' }}>📊</div>
          <div>Chart visualization would be displayed here</div>
        </ChartContainer>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <RankingContainer>
            <RankingTitle><FaBook /> Most Frequently Used Courses</RankingTitle>
            {statistics.topCourses.map((course, index) => (
              <RankingItem key={`course-${index}`}>
                <RankingNameContainer>
                  <RankingIndex index={index + 1}>{index + 1}</RankingIndex>
                  <RankingName>{course.name}</RankingName>
                </RankingNameContainer>
                <RankingValue>{course.count} students</RankingValue>
              </RankingItem>
            ))}
          </RankingContainer>
          
          <RankingContainer>
            <RankingTitle><FaThumbsUp /> Top Rated Companies</RankingTitle>
            {statistics.topCompanies.byRating.map((company, index) => (
              <RankingItem key={`rating-${index}`}>
                <RankingNameContainer>
                  <RankingIndex index={index + 1}>{index + 1}</RankingIndex>
                  <RankingName>{company.name}</RankingName>
                </RankingNameContainer>
                <RankingValue>⭐ {company.rating.toFixed(1)}</RankingValue>
              </RankingItem>
            ))}
          </RankingContainer>
          
          <RankingContainer>
            <RankingTitle><FaBuilding /> Top Companies by Internship Count</RankingTitle>
            {statistics.topCompanies.byInternshipCount.map((company, index) => (
              <RankingItem key={`count-${index}`}>
                <RankingNameContainer>
                  <RankingIndex index={index + 1}>{index + 1}</RankingIndex>
                  <RankingName>{company.name}</RankingName>
                </RankingNameContainer>
                <RankingValue>{company.count} interns</RankingValue>
              </RankingItem>
            ))}
          </RankingContainer>
          
          <ChartContainer style={{ height: 'auto' }}>
            <RankingTitle><FaCalendarAlt /> Current Internship Cycle</RankingTitle>
            <div style={{ width: '100%', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <Label>Start Date</Label>
                  <div>{cycleDates.startDate}</div>
                </div>
                <div>
                  <Label>End Date</Label>
                  <div>{cycleDates.endDate}</div>
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '4px', textAlign: 'center' }}>
                <p style={{ margin: '0 0 0.5rem', fontWeight: '600' }}>Current Cycle Progress</p>
                <div style={{ 
                  height: '20px', 
                  backgroundColor: '#e0e0e0', 
                  borderRadius: '10px', 
                  position: 'relative', 
                  overflow: 'hidden' 
                }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    height: '100%', 
                    width: '65%', 
                    backgroundColor: '#084B8A',
                    borderRadius: '10px' 
                  }}></div>
                </div>
                <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>65% Complete</p>
              </div>
            </div>
          </ChartContainer>
        </div>
      </>
    );
  };

  return (
    <PageContainer>
      <Navbar userType="scadOffice" />
      
      <ContentContainer>
        <DashboardHeader>
          <PageTitle>SCAD Office Dashboard</PageTitle>
          <PageDescription>Manage company applications, students, and internship reports</PageDescription>
        </DashboardHeader>
        
        <StatCardsContainer>
          <StatCard onClick={() => navigate('/scad/companies')}>
            <StatIconContainer>
              <FaBuilding />
            </StatIconContainer>
            <StatContent>
              <StatValue>{companies.filter(c => c.status === 'pending').length}</StatValue>
              <StatLabel>Pending Company Applications</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard onClick={() => handleTabChange('students')}>
            <StatIconContainer>
              <FaGraduationCap />
            </StatIconContainer>
            <StatContent>
              <StatValue>{mockStudents.length}</StatValue>
              <StatLabel>Registered Students</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard onClick={() => handleTabChange('reports')}>
            <StatIconContainer>
              <FaFileAlt />
            </StatIconContainer>
            <StatContent>
              <StatValue>{mockReports.filter(r => r.status === 'pending').length}</StatValue>
              <StatLabel>Pending Reports</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard onClick={() => handleTabChange('statistics')}>
            <StatIconContainer>
              <FaChartLine />
            </StatIconContainer>
            <StatContent>
              <StatValue>{statistics.cycleMetrics.placementRate}%</StatValue>
              <StatLabel>Placement Rate</StatLabel>
            </StatContent>
          </StatCard>
        </StatCardsContainer>
        
        <div ref={tabsRef}>
          <TabsContainer>
            <Tab 
              active={activeTab === 'companies'} 
              onClick={() => handleTabChange('companies')}
            >
              Company Applications
            </Tab>
            <Tab 
              active={activeTab === 'students'} 
              onClick={() => handleTabChange('students')}
            >
              Students
            </Tab>
            <Tab 
              active={activeTab === 'reports'} 
              onClick={() => handleTabChange('reports')}
            >
              Internship Reports
            </Tab>
            <Tab 
              active={activeTab === 'statistics'} 
              onClick={() => handleTabChange('statistics')}
            >
              Statistics
            </Tab>
            <Tab 
              active={activeTab === 'evaluations'} 
              onClick={() => handleTabChange('evaluations')}
            >
              Evaluation Reports
            </Tab>
            <Tab 
              active={activeTab === 'guidance'} 
              onClick={() => navigate('/career-guidance')}
            >
              Career Guidance
            </Tab>
          </TabsContainer>
        </div>
        
        {/* Add the statistics tab content */}
        {activeTab === 'statistics' && renderStatisticsTab()}

        {/* Other existing tab content */}
        {activeTab === 'companies' && (
          <>
            <ActionBar>
              <SearchFilterContainer>
                <Input
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ flex: 1, marginRight: '1rem' }}
                />
                <Select
                  name="companyIndustry"
                  value={filters.companyIndustry}
                  onChange={handleFilterChange}
                  options={industryOptions}
                  placeholder="Filter by Industry"
                />
              </SearchFilterContainer>
            </ActionBar>
            
            <TableContainer>
              <Table>
                <TableHeader>
                  <tr>
                    <TableHeaderCell>Company Name</TableHeaderCell>
                    <TableHeaderCell>Industry</TableHeaderCell>
                    <TableHeaderCell>Size</TableHeaderCell>
                    <TableHeaderCell>Email</TableHeaderCell>
                    <TableHeaderCell>Application Date</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Actions</TableHeaderCell>
                  </tr>
                </TableHeader>
                <TableBody>
                  {filteredCompanies.map(company => (
                    <TableRow key={company.id}>
                      <TableCell>{company.name}</TableCell>
                      <TableCell>{company.industry}</TableCell>
                      <TableCell>{company.size.charAt(0).toUpperCase() + company.size.slice(1)}</TableCell>
                      <TableCell>{company.email}</TableCell>
                      <TableCell>{company.applied}</TableCell>
                      <TableCell>
                        <StatusBadge status={company.status}>
                          {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        <ActionButtons>
                          <ActionButton title="View Details" onClick={() => handleViewCompany(company.id)}>
                            <FaEye />
                          </ActionButton>
                          
                          {company.status === 'pending' && (
                            <>
                              <ActionButton title="Approve" onClick={() => handleApproveCompany(company.id)}>
                                <FaCheck />
                              </ActionButton>
                              <ActionButton title="Reject" onClick={() => handleRejectCompany(company.id)}>
                                <FaTimes />
                              </ActionButton>
                            </>
                          )}
                        </ActionButtons>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        
        {activeTab === 'students' && (
          <>
            <ActionBar>
              <SearchFilterContainer>
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ flex: 1, marginRight: '1rem' }}
                />
                <Select
                  name="studentMajor"
                  value={filters.studentMajor}
                  onChange={handleFilterChange}
                  options={majorOptions}
                  placeholder="Filter by Major"
                  style={{ marginRight: '1rem' }}
                />
                <Select
                  name="internshipStatus"
                  value={filters.internshipStatus}
                  onChange={handleFilterChange}
                  options={internshipStatusOptions}
                  placeholder="Filter by Status"
                />
              </SearchFilterContainer>
            </ActionBar>
            
            <TableContainer>
              <Table>
                <TableHeader>
                  <tr>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Email</TableHeaderCell>
                    <TableHeaderCell>Major</TableHeaderCell>
                    <TableHeaderCell>Semester</TableHeaderCell>
                    <TableHeaderCell>Internship Status</TableHeaderCell>
                    <TableHeaderCell>Actions</TableHeaderCell>
                  </tr>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map(student => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.major}</TableCell>
                      <TableCell>{student.semester}</TableCell>
                      <TableCell>
                        <StatusBadge status={
                          student.internshipStatus === 'completed' ? 'accepted' :
                          student.internshipStatus === 'current' ? 'approved' :
                          student.internshipStatus === 'pending' ? 'pending' : 'rejected'
                        }>
                          {student.internshipStatus.charAt(0).toUpperCase() + student.internshipStatus.slice(1)}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        <ActionButtons>
                          <ActionButton title="View Profile" onClick={() => handleViewStudent(student.id)}>
                            <FaEye />
                          </ActionButton>
                        </ActionButtons>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        
        {activeTab === 'reports' && (
          <>
            <ActionBar>
              <SearchFilterContainer>
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ flex: 1, marginRight: '1rem' }}
                />
                <Select
                  name="studentMajor"
                  value={filters.studentMajor}
                  onChange={handleFilterChange}
                  options={majorOptions}
                  placeholder="Filter by Major"
                  style={{ marginRight: '1rem' }}
                />
                <Select
                  name="reportStatus"
                  value={filters.reportStatus}
                  onChange={handleFilterChange}
                  options={reportStatusOptions}
                  placeholder="Filter by Status"
                />
              </SearchFilterContainer>
            </ActionBar>
            
            <TableContainer>
              <Table>
                <TableHeader>
                  <tr>
                    <TableHeaderCell>Title</TableHeaderCell>
                    <TableHeaderCell>Student</TableHeaderCell>
                    <TableHeaderCell>Company</TableHeaderCell>
                    <TableHeaderCell>Submission Date</TableHeaderCell>
                    <TableHeaderCell>Current Status</TableHeaderCell>
                    <TableHeaderCell>Change Status</TableHeaderCell>
                    <TableHeaderCell>Actions</TableHeaderCell>
                    <TableHeaderCell>Clarification</TableHeaderCell>
                  </tr>
                </TableHeader>
                <TableBody>
                  {filteredReports.map(report => (
                    <TableRow key={report.id}>
                      <TableCell>{report.title}</TableCell>
                      <TableCell>{report.student}</TableCell>
                      <TableCell>{report.company}</TableCell>
                      <TableCell>{report.submitted}</TableCell>
                      <TableCell>
                        <StatusBadge status={report.status}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={report.status}
                          onChange={(e) => handleReportStatusChange(report.id, e.target.value)}
                          options={[
                            { value: 'pending', label: 'Pending' },
                            { value: 'accepted', label: 'Accepted' },
                            { value: 'rejected', label: 'Rejected' },
                            { value: 'flagged', label: 'Flagged' }
                          ]}
                          style={{ minWidth: '120px' }}
                        />
                      </TableCell>
                      <TableCell>
                        <ActionButtons>
                          <ActionButton title="View Report" onClick={() => handleViewReport(report.id)}>
                            <FaEye />
                          </ActionButton>
                        </ActionButtons>
                      </TableCell>
                      <TableCell>
                        {/* Show clarification dropdown only for rejected or flagged reports */}
                        {(report.status === 'rejected' || report.status === 'flagged') && (
                          <Select
                            value={report.clarification || ''}
                            onChange={(e) => handleClarificationChange(report.id, e.target.value)}
                            options={[
                              { value: '', label: 'Select reason' },
                              ...rejectionReasons
                            ]}
                            style={{ minWidth: '150px', fontSize: '0.9rem' }}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        
        {activeTab === 'evaluations' && (
          <>
            <ActionBar>
              <SearchFilterContainer>
                <Input
                  type="text"
                  placeholder="Search evaluations by student, company, or supervisor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<FaSearch />}
                />
                <Select
                  name="studentMajor"
                  value={filters.studentMajor}
                  onChange={handleFilterChange}
                  style={{ marginLeft: '1rem', minWidth: '180px' }}
                >
                  <option value="">All Majors</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Data Science">Data Science</option>
                </Select>
              </SearchFilterContainer>
            </ActionBar>
            
            {evaluations.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHeader>
                    <tr>
                      <TableHeaderCell>Student</TableHeaderCell>
                      <TableHeaderCell>Student ID</TableHeaderCell>
                      <TableHeaderCell>Major</TableHeaderCell>
                      <TableHeaderCell>Company</TableHeaderCell>
                      <TableHeaderCell>Supervisor</TableHeaderCell>
                      <TableHeaderCell>Internship Period</TableHeaderCell>
                      <TableHeaderCell>Rating</TableHeaderCell>
                      <TableHeaderCell>Actions</TableHeaderCell>
                    </tr>
                  </TableHeader>
                  
                  <TableBody>
                    {evaluations.map(evaluation => (
                      <TableRow key={evaluation.id}>
                        <TableCell>{evaluation.student}</TableCell>
                        <TableCell>{evaluation.studentId}</TableCell>
                        <TableCell>{evaluation.major}</TableCell>
                        <TableCell>{evaluation.company}</TableCell>
                        <TableCell>{evaluation.supervisor}</TableCell>
                        <TableCell>{`${evaluation.startDate} to ${evaluation.endDate}`}</TableCell>
                        <TableCell>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            {evaluation.rating} / 5
                            <div style={{ 
                              marginLeft: '8px', 
                              width: '80px', 
                              height: '8px', 
                              backgroundColor: '#e0e0e0',
                              borderRadius: '4px',
                              overflow: 'hidden'
                            }}>
                              <div style={{ 
                                width: `${(evaluation.rating / 5) * 100}%`, 
                                height: '100%', 
                                backgroundColor: '#4caf50',
                                borderRadius: '4px'
                              }} />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <ActionButtons>
                            <ActionButton title="View Evaluation Report" onClick={() => handleViewEvaluation(evaluation.id)}>
                              <FaEye />
                            </ActionButton>
                            <ActionButton title="Download Evaluation Report" onClick={() => alert(`Downloading evaluation ID: ${evaluation.id}`)}>
                              <FaDownload />
                            </ActionButton>
                          </ActionButtons>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#6c757d' }}>
                <p>No evaluation reports found matching your criteria.</p>
                <p>Try adjusting your filters or search term.</p>
              </div>
            )}
          </>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default ScadDashboard;