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

const StatsSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const GenerateReportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 2rem;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const StatsCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StatsTitle = styled.h3`
  margin: 0 0 1rem;
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
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
const mockStats = {
  pendingReports: 10,
  acceptedReports: 25,
  rejectedReports: 5,
  flaggedReports: 8,
  totalReports: 48
};

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('reports');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [majorFilter, setMajorFilter] = useState('');
  const [reports, setReports] = useState([]);
  
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
  
  const handleViewReport = (id) => {
    navigate(`/report/${id}`);
  };
  
  const handleGenerateReport = () => {
    alert('Generating system statistics report...');
    // In a real app, this would trigger a report generation process
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
              <StatValue>{mockStats.totalReports}</StatValue>
              <StatLabel>Total Reports</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard onClick={() => { setActiveTab('reports'); setStatusFilter('pending'); }}>
            <StatIconContainer>
              <FaFileAlt />
            </StatIconContainer>
            <StatContent>
              <StatValue>{mockStats.pendingReports}</StatValue>
              <StatLabel>Pending Review</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard onClick={() => { setActiveTab('reports'); setStatusFilter('flagged'); }}>
            <StatIconContainer>
              <FaFlag />
            </StatIconContainer>
            <StatContent>
              <StatValue>{mockStats.flaggedReports}</StatValue>
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
            System Statistics
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
            <GenerateReportButton onClick={handleGenerateReport}>
              <FaDownload />
              Generate Statistical Report
            </GenerateReportButton>
            
            <ChartContainer>
              <FaChartBar size={50} />
              <p style={{ marginLeft: '1rem' }}>Internship Reports by Status</p>
            </ChartContainer>
            
            <StatsSummary>
              <StatsCard>
                <StatsTitle>Reports by Major</StatsTitle>
                <ChartContainer style={{ height: '200px' }}>
                  <p>Major distribution chart would be displayed here</p>
                </ChartContainer>
              </StatsCard>
              
              <StatsCard>
                <StatsTitle>Reports by Company</StatsTitle>
                <ChartContainer style={{ height: '200px' }}>
                  <p>Company distribution chart would be displayed here</p>
                </ChartContainer>
              </StatsCard>
              
              <StatsCard>
                <StatsTitle>Internship Duration Analysis</StatsTitle>
                <ChartContainer style={{ height: '200px' }}>
                  <p>Duration analysis chart would be displayed here</p>
                </ChartContainer>
              </StatsCard>
              
              <StatsCard>
                <StatsTitle>Student Performance</StatsTitle>
                <ChartContainer style={{ height: '200px' }}>
                  <p>Student performance chart would be displayed here</p>
                </ChartContainer>
              </StatsCard>
            </StatsSummary>
          </>
        )}
        
        {activeTab === 'evaluations' && (
          <>
            <SearchFilterContainer>
              <SearchInput>
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search evaluations by student, company, or internship..."
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
            
            <EmptyState>
              <p>Evaluation reports feature is coming soon.</p>
              <p>This section will display company evaluations of students and student evaluations of internships.</p>
            </EmptyState>
          </>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default FacultyDashboard; 