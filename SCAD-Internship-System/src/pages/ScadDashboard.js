import React, { useState } from 'react';
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
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(Card)`
  display: flex;
  align-items: center;
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

const ChartContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.darkGray};
`;

const CycleDateSettings = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
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

const ScadDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('companies');
  const [searchTerm, setSearchTerm] = useState('');
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
  
  const filteredCompanies = mockCompanies.filter(company => {
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
    navigate(`/scad/companies/${id}`);
  };
  
  const handleRejectCompany = (id) => {
    navigate(`/scad/companies/${id}`);
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
  
  return (
    <PageContainer>
      <Navbar userType="scadOffice" />
      
      <ContentContainer>
        <DashboardHeader>
          <PageTitle>SCAD Office Dashboard</PageTitle>
          <PageDescription>Manage company applications, students, and internship reports</PageDescription>
        </DashboardHeader>
        
        <StatCardsContainer>
          <StatCard>
            <StatIconContainer>
              <FaBuilding />
            </StatIconContainer>
            <StatContent>
              <StatValue>{mockCompanies.filter(c => c.status === 'pending').length}</StatValue>
              <StatLabel>Pending Company Applications</StatLabel>
            </StatContent>
            <Button 
              variant="small" 
              onClick={() => navigate('/scad/companies')}
              style={{ marginLeft: '1rem' }}
            >
              View All
            </Button>
          </StatCard>
          
          <StatCard>
            <StatIconContainer>
              <FaGraduationCap />
            </StatIconContainer>
            <StatContent>
              <StatValue>{mockStudents.length}</StatValue>
              <StatLabel>Registered Students</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIconContainer>
              <FaFileAlt />
            </StatIconContainer>
            <StatContent>
              <StatValue>{mockReports.filter(r => r.status === 'pending').length}</StatValue>
              <StatLabel>Pending Reports</StatLabel>
            </StatContent>
          </StatCard>
        </StatCardsContainer>
        
        <Card>
          <SectionTitle>
            <FaCalendarAlt /> Set Internship Cycle Dates
          </SectionTitle>
          <p>Current cycle: May 1, 2023 - August 31, 2023</p>
          
          <CycleDateSettings>
            <div>
              <Input 
                label="Start Date"
                type="date"
                name="startDate"
                value={cycleDates.startDate}
                onChange={handleDateChange}
              />
            </div>
            <div>
              <Input 
                label="End Date"
                type="date"
                name="endDate"
                value={cycleDates.endDate}
                onChange={handleDateChange}
              />
            </div>
            <div style={{ alignSelf: 'flex-end' }}>
              <Button 
                variant="primary"
                onClick={handleSaveCycleDates}
              >
                Save Cycle Dates
              </Button>
            </div>
          </CycleDateSettings>
        </Card>
        
        <TabsContainer>
          <Tab 
            active={activeTab === 'companies'} 
            onClick={() => setActiveTab('companies')}
          >
            Company Applications
          </Tab>
          <Tab 
            active={activeTab === 'students'} 
            onClick={() => setActiveTab('students')}
          >
            Students
          </Tab>
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
        </TabsContainer>
        
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        
        {activeTab === 'statistics' && (
          <StatsContainer>
            <Card title="Reports by Status">
              <ChartContainer>
                <FaChartBar size={50} />
                <p style={{ marginLeft: '1rem' }}>Chart showing report statistics would be displayed here</p>
              </ChartContainer>
            </Card>
            
            <Card title="Internships by Company">
              <ChartContainer>
                <FaChartBar size={50} />
                <p style={{ marginLeft: '1rem' }}>Chart showing internship distribution would be displayed here</p>
              </ChartContainer>
            </Card>
            
            <Card title="Average Review Time">
              <ChartContainer>
                <FaClock size={50} />
                <p style={{ marginLeft: '1rem' }}>Chart showing review time statistics would be displayed here</p>
              </ChartContainer>
            </Card>
            
            <Card title="Top Rated Companies">
              <ChartContainer>
                <FaBuilding size={50} />
                <p style={{ marginLeft: '1rem' }}>Chart showing company ratings would be displayed here</p>
              </ChartContainer>
            </Card>
          </StatsContainer>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default ScadDashboard;