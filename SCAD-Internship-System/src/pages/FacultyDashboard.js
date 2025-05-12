import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { 
  FaFileAlt, 
  FaChartBar, 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaFlag, 
  FaCheck, 
  FaTimes,
  FaGraduationCap,
  FaBuilding,
  FaDownload,
  FaClock,
  FaCalendarAlt,
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

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: 1rem;
`;

const StatCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
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

const SearchFilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchInput = styled.div`
  flex: 1;
  position: relative;
  
  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid ${props => props.theme.colors.tertiary};
    border-radius: 5px;
    font-size: 0.9rem;
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.secondary};
    }
  }
  
  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.theme.colors.secondary};
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
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
      case 'pending': return '#fff3cd';
      case 'accepted': return '#d4edda';
      case 'rejected': return '#f8d7da';
      case 'flagged': return '#d1ecf1';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'pending': return '#856404';
      case 'accepted': return '#155724';
      case 'rejected': return '#721c24';
      case 'flagged': return '#0c5460';
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

const ChartContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.darkGray};
  display: block;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme.colors.darkGray};
`;

// Mock data for reports
const mockReports = [
  {
    id: 1,
    title: "Software Development Internship at Tech Innovations",
    student: "John Smith",
    major: "Computer Science",
    company: "Tech Innovations",
    submittedDate: "2023-01-15",
    status: "pending"
  },
  {
    id: 2,
    title: "Marketing Internship Experience",
    student: "Emily Davis",
    major: "Marketing",
    company: "Global Marketing Solutions",
    submittedDate: "2023-02-10",
    status: "accepted"
  },
  {
    id: 3,
    title: "UX/UI Design Internship Report",
    student: "Sarah Johnson",
    major: "Graphic Design",
    company: "Creative Studios",
    submittedDate: "2023-01-28",
    status: "flagged"
  },
  {
    id: 4,
    title: "Data Analysis Internship at FinTech Corp",
    student: "Michael Brown",
    major: "Data Science",
    company: "FinTech Corp",
    submittedDate: "2023-02-05",
    status: "rejected"
  },
  {
    id: 5,
    title: "Software Engineering Internship",
    student: "David Wilson",
    major: "Computer Science",
    company: "SoftDev Inc.",
    submittedDate: "2023-02-15",
    status: "pending"
  }
];

// Mock data for statistics
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
  { value: 'other', label: 'Other (Contact Faculty)' }
];

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('reports');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [majorFilter, setMajorFilter] = useState('');
  const [reports, setReports] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [statistics, setStatistics] = useState(mockStatistics);
  const [selectedReportFormat, setSelectedReportFormat] = useState('pdf');
  const [cycleDates, setCycleDates] = useState({
    startDate: '2023-05-01',
    endDate: '2023-08-31'
  });
  
  // Add clarification handler
  const handleClarificationChange = (id, reason) => {
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === id ? { ...report, clarification: reason } : report
      )
    );
  };
  
  useEffect(() => {
    // Filter reports based on search term and filters
    let filteredReports = [...mockReports];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredReports = filteredReports.filter(
        report => 
          report.title.toLowerCase().includes(term) ||
          report.student.toLowerCase().includes(term) ||
          report.company.toLowerCase().includes(term)
      );
    }
    
    if (statusFilter) {
      filteredReports = filteredReports.filter(report => report.status === statusFilter);
    }
    
    if (majorFilter) {
      filteredReports = filteredReports.filter(report => report.major === majorFilter);
    }
    
    setReports(filteredReports);
  }, [searchTerm, statusFilter, majorFilter]);

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
    
    if (majorFilter) {
      filteredEvaluations = filteredEvaluations.filter(evaluation => evaluation.major === majorFilter);
    }
    
    setEvaluations(filteredEvaluations);
  }, [searchTerm, majorFilter]);
  
  const handleViewReport = (id) => {
    navigate(`/report/${id}`);
  };

  const handleViewEvaluation = (id) => {
    navigate(`/evaluation/${id}`);
  };
  
  const handleGenerateReport = () => {
    const anchor = document.createElement('a');
          anchor.href = `${process.env.PUBLIC_URL}/static/Dummy_pdf.pdf`;
          anchor.download = 'Dummy_pdf.pdf';
          anchor.click();
  };
  
  return (
    <PageContainer>
      <Navbar userType="faculty" />
      
      <ContentContainer>
        <Header>
          <Title>Faculty Dashboard</Title>
          <Description>Review internship reports and monitor student progress</Description>
        </Header>
        
        <StatCardsContainer>
          <StatCard onClick={() => setActiveTab('reports')}>
            <StatIconContainer>
              <FaFileAlt />
            </StatIconContainer>
            <StatContent>
              <StatValue>{mockStatistics.reportStats.total}</StatValue>
              <StatLabel>Total Reports</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard onClick={() => { setActiveTab('reports'); setStatusFilter('pending'); }}>
            <StatIconContainer>
              <FaFileAlt />
            </StatIconContainer>
            <StatContent>
              <StatValue>{mockStatistics.reportStats.pending}</StatValue>
              <StatLabel>Pending Review</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard onClick={() => { setActiveTab('reports'); setStatusFilter('flagged'); }}>
            <StatIconContainer>
              <FaFlag />
            </StatIconContainer>
            <StatContent>
              <StatValue>{mockStatistics.reportStats.flagged}</StatValue>
              <StatLabel>Flagged Reports</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard onClick={() => setActiveTab('statistics')}>
            <StatIconContainer>
              <FaChartBar />
            </StatIconContainer>
            <StatContent>
              <StatValue>Statistics</StatValue>
              <StatLabel>View System Analytics</StatLabel>
            </StatContent>
          </StatCard>
        </StatCardsContainer>
        
        <TabsContainer>
          <Tab 
            active={activeTab === 'reports'} 
            onClick={() => setActiveTab('reports')}
          >
            Internship Reports
          </Tab>
          <Tab 
            active={activeTab === 'statistics'} 
            onClick={() => setActiveTab('statistics')}
          >
            Statistics
          </Tab>
          <Tab 
            active={activeTab === 'evaluations'} 
            onClick={() => setActiveTab('evaluations')}
          >
            Evaluation Reports
          </Tab>
        </TabsContainer>
        
        {activeTab === 'reports' && (
          <>
            <SearchFilterContainer>
              <SearchInput>
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search reports by title, student, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchInput>
              
              <FilterSelect
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="flagged">Flagged</option>
              </FilterSelect>
              
              <FilterSelect
                value={majorFilter}
                onChange={(e) => setMajorFilter(e.target.value)}
              >
                <option value="">All Majors</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Marketing">Marketing</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Data Science">Data Science</option>
              </FilterSelect>
            </SearchFilterContainer>
            
            {reports.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHeader>
                    <tr>
                      <TableHeaderCell>Report Title</TableHeaderCell>
                      <TableHeaderCell>Student</TableHeaderCell>
                      <TableHeaderCell>Major</TableHeaderCell>
                      <TableHeaderCell>Company</TableHeaderCell>
                      <TableHeaderCell>Submitted Date</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                      <TableHeaderCell>Actions</TableHeaderCell>
                      <TableHeaderCell>Clarification</TableHeaderCell>
                    </tr>
                  </TableHeader>
                  
                  <TableBody>
                    {reports.map(report => (
                      <TableRow key={report.id}>
                        <TableCell>{report.title}</TableCell>
                        <TableCell>{report.student}</TableCell>
                        <TableCell>{report.major}</TableCell>
                        <TableCell>{report.company}</TableCell>
                        <TableCell>{report.submittedDate}</TableCell>
                        <TableCell>
                          <StatusBadge status={report.status}>
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          </StatusBadge>
                        </TableCell>
                        <TableCell>
                          <ActionButtons>
                            <ActionButton title="View Report" onClick={() => handleViewReport(report.id)}>
                              <FaEye />
                            </ActionButton>
                            
                            {report.status === 'pending' && (
                              <>
                                <ActionButton title="Accept" onClick={() => alert(`Accepting report ID: ${report.id}`)}>
                                  <FaCheck />
                                </ActionButton>
                                <ActionButton title="Reject" onClick={() => alert(`Rejecting report ID: ${report.id}`)}>
                                  <FaTimes />
                                </ActionButton>
                                <ActionButton title="Flag" onClick={() => alert(`Flagging report ID: ${report.id}`)}>
                                  <FaFlag />
                                </ActionButton>
                              </>
                            )}
                          </ActionButtons>
                        </TableCell>
                        <TableCell>
                          {(report.status === 'rejected' || report.status === 'flagged') && (
                            <FilterSelect
                              value={report.clarification || ''}
                              onChange={(e) => handleClarificationChange(report.id, e.target.value)}
                            >
                              <option value="">Select reason</option>
                              {rejectionReasons.map(reason => (
                                <option key={reason.value} value={reason.value}>{reason.label}</option>
                              ))}
                            </FilterSelect>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <EmptyState>
                <p>No reports found matching your criteria.</p>
                <p>Try adjusting your filters or search term.</p>
              </EmptyState>
            )}
          </>
        )}
        
        {activeTab === 'statistics' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: '#084B8A' }}>Internship Program Statistics</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FilterSelect 
                  value={selectedReportFormat} 
                  onChange={(e) => setSelectedReportFormat(e.target.value)}
                >
                  <option value="pdf">PDF Report</option>
                  <option value="excel">Excel Report</option>
                  <option value="csv">CSV Data</option>
                </FilterSelect>
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
        )}
        
        {activeTab === 'evaluations' && (
          <>
            <SearchFilterContainer>
              <SearchInput>
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search evaluations by student, company, or supervisor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchInput>
              
              <FilterSelect
                value={majorFilter}
                onChange={(e) => setMajorFilter(e.target.value)}
              >
                <option value="">All Majors</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Marketing">Marketing</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Data Science">Data Science</option>
              </FilterSelect>
            </SearchFilterContainer>
            
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
                            <ActionButton title="Download Evaluation Report" onClick={() => {
                              const anchor = document.createElement('a');
                              anchor.href = `${process.env.PUBLIC_URL}/static/Dummy_pdf.pdf`;
                              anchor.download = 'Dummy_pdf.pdf';
                              anchor.click();
                            }}>
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
              <EmptyState>
                <p>No evaluation reports found matching your criteria.</p>
                <p>Try adjusting your filters or search term.</p>
              </EmptyState>
            )}
          </>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default FacultyDashboard; 