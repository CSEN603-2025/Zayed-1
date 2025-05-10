import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { 
  FaBriefcase, 
  FaUsers, 
  FaPlusCircle, 
  FaSearch, 
  FaEye, 
  FaEdit, 
  FaTrash,
  FaFilter,
  FaChevronDown,
  FaCheck,
  FaClock,
  FaTimes
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

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 300px;
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

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  padding: 0.75rem 1rem;
  margin-left: 1rem;
  cursor: pointer;
  color: ${props => props.theme.colors.primary};
  
  svg {
    margin-right: 0.5rem;
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
      case 'active': return '#e6f7e6';
      case 'closed': return '#f8d7da';
      case 'draft': return '#fff3cd';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#2e7d32';
      case 'closed': return '#c62828';
      case 'draft': return '#856404';
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border: 1px solid ${props => props.active ? props.theme.colors.secondary : props.theme.colors.tertiary};
  background-color: ${props => props.active ? props.theme.colors.secondary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.secondary};
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.colors.secondary : props.theme.colors.tertiary};
    color: ${props => props.active ? 'white' : props.theme.colors.primary};
  }
`;

// Mock data
const mockInternships = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    applications: 12,
    posted: '10/01/2023',
    status: 'active',
    duration: '3 months',
    paid: true
  },
  {
    id: 2,
    title: 'Backend Developer Intern',
    applications: 8,
    posted: '12/15/2022',
    status: 'closed',
    duration: '6 months',
    paid: true
  },
  {
    id: 3,
    title: 'UI/UX Design Intern',
    applications: 5,
    posted: '01/05/2023',
    status: 'active',
    duration: '3 months',
    paid: false
  },
  {
    id: 4,
    title: 'Marketing Intern',
    applications: 0,
    posted: '02/01/2023',
    status: 'draft',
    duration: '4 months',
    paid: false
  }
];

const mockApplications = [
  {
    id: 1,
    student: 'John Smith',
    position: 'Frontend Developer Intern',
    applied: '01/15/2023',
    status: 'pending'
  },
  {
    id: 2,
    student: 'Sarah Johnson',
    position: 'Frontend Developer Intern',
    applied: '01/16/2023',
    status: 'finalized'
  },
  {
    id: 3,
    student: 'Michael Brown',
    position: 'UI/UX Design Intern',
    applied: '01/10/2023',
    status: 'accepted'
  },
  {
    id: 4,
    student: 'Emily Davis',
    position: 'Backend Developer Intern',
    applied: '12/20/2022',
    status: 'rejected'
  }
];

const mockInterns = [
  {
    id: 1,
    name: 'Michael Brown',
    position: 'UI/UX Design Intern',
    started: '02/01/2023',
    ends: '05/01/2023',
    status: 'current'
  },
  {
    id: 2,
    name: 'David Wilson',
    position: 'Frontend Developer Intern',
    started: '09/01/2022',
    ends: '12/01/2022',
    status: 'completed'
  }
];

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('internships');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredInternships = mockInternships.filter(internship => 
    internship.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredApplications = mockApplications.filter(application => 
    application.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.position.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredInterns = mockInterns.filter(intern => 
    intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.position.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCreateNewInternship = () => {
    // Navigate to create internship page
    alert('Navigating to create internship page');
  };
  
  const handleViewInternship = (id) => {
    // Navigate to view internship page
    alert(`Viewing internship with ID: ${id}`);
  };
  
  const handleEditInternship = (id) => {
    // Navigate to edit internship page
    alert(`Editing internship with ID: ${id}`);
  };
  
  const handleDeleteInternship = (id) => {
    // Confirm and delete internship
    if (window.confirm('Are you sure you want to delete this internship?')) {
      alert(`Deleting internship with ID: ${id}`);
    }
  };
  
  const handleViewApplication = (id) => {
    // Navigate to view application page
    alert(`Viewing application with ID: ${id}`);
  };
  
  const handleViewIntern = (id) => {
    // Navigate to view intern page
    alert(`Viewing intern with ID: ${id}`);
  };
  
  return (
    <PageContainer>
      <Navbar userType="company" />
      
      <ContentContainer>
        <DashboardHeader>
          <PageTitle>Company Dashboard</PageTitle>
          <PageDescription>Manage your internships, applications, and interns</PageDescription>
        </DashboardHeader>
        
        {/* Application Status Notification - For demo purposes we'll use an assumed status */}
        {/* In a real app, this would come from an API or context */}
        {(() => {
          // Mock company status - in a real app this would come from API/context
          const companyStatus = 'approved'; // Options: 'pending', 'approved', 'rejected'
          
          if (companyStatus === 'pending') {
            return (
              <Card style={{ marginBottom: '2rem', backgroundColor: '#fff3cd' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '1rem', color: '#856404', fontSize: '1.5rem' }}>
                    <FaClock />
                  </div>
                  <div>
                    <h3 style={{ color: '#856404', marginBottom: '0.5rem' }}>Application Under Review</h3>
                    <p>Your company application is currently being reviewed by the SCAD office. 
                    You will be notified once a decision has been made.</p>
                  </div>
                </div>
              </Card>
            );
          } else if (companyStatus === 'approved') {
            return (
              <Card style={{ marginBottom: '2rem', backgroundColor: '#e6f7e6' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '1rem', color: '#2e7d32', fontSize: '1.5rem' }}>
                    <FaCheck />
                  </div>
                  <div>
                    <h3 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>Application Approved</h3>
                    <p>Your company application has been approved. You can now post internship opportunities.</p>
                  </div>
                </div>
              </Card>
            );
          } else if (companyStatus === 'rejected') {
            return (
              <Card style={{ marginBottom: '2rem', backgroundColor: '#f8d7da' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '1rem', color: '#c62828', fontSize: '1.5rem' }}>
                    <FaTimes />
                  </div>
                  <div>
                    <h3 style={{ color: '#c62828', marginBottom: '0.5rem' }}>Application Rejected</h3>
                    <p>Your company application has been rejected. Please contact the SCAD office for more information.</p>
                  </div>
                </div>
              </Card>
            );
          }
          
          return null;
        })()}
        
        <StatCardsContainer>
          <StatCard>
            <StatIconContainer>
              <FaBriefcase />
            </StatIconContainer>
            <StatContent>
              <StatValue>{mockInternships.length}</StatValue>
              <StatLabel>Active Internship Postings</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIconContainer>
              <FaUsers />
            </StatIconContainer>
            <StatContent>
              <StatValue>{mockApplications.length}</StatValue>
              <StatLabel>Total Applications</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIconContainer>
              <FaUsers />
            </StatIconContainer>
            <StatContent>
              <StatValue>{mockInterns.filter(intern => intern.status === 'current').length}</StatValue>
              <StatLabel>Current Interns</StatLabel>
            </StatContent>
          </StatCard>
        </StatCardsContainer>
        
        <SectionTitle>
          <FaBriefcase /> Internship Listings
        </SectionTitle>
        
        <ActionsContainer>
          <Button 
            variant="primary"
            icon={<FaPlusCircle />}
            onClick={handleCreateNewInternship}
          >
            Create New Internship
          </Button>
          
          <div style={{ display: 'flex' }}>
            <SearchContainer>
              <SearchIcon>
                <FaSearch />
              </SearchIcon>
              <SearchInput 
                placeholder="Search internships..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </SearchContainer>
            
            <FilterButton>
              <FaFilter />
              Filter
              <FaChevronDown style={{ marginLeft: '0.5rem' }} />
            </FilterButton>
          </div>
        </ActionsContainer>
        
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>Title</TableHeaderCell>
                <TableHeaderCell>Applications</TableHeaderCell>
                <TableHeaderCell>Posted Date</TableHeaderCell>
                <TableHeaderCell>Duration</TableHeaderCell>
                <TableHeaderCell>Paid/Unpaid</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </TableHeader>
            <TableBody>
              {filteredInternships.map(internship => (
                <TableRow key={internship.id}>
                  <TableCell>{internship.title}</TableCell>
                  <TableCell>{internship.applications}</TableCell>
                  <TableCell>{internship.posted}</TableCell>
                  <TableCell>{internship.duration}</TableCell>
                  <TableCell>{internship.paid ? 'Paid' : 'Unpaid'}</TableCell>
                  <TableCell>
                    <StatusBadge status={internship.status}>
                      {internship.status.charAt(0).toUpperCase() + internship.status.slice(1)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <ActionButtons>
                      <ActionButton title="View" onClick={() => handleViewInternship(internship.id)}>
                        <FaEye />
                      </ActionButton>
                      <ActionButton title="Edit" onClick={() => handleEditInternship(internship.id)}>
                        <FaEdit />
                      </ActionButton>
                      <ActionButton title="Delete" onClick={() => handleDeleteInternship(internship.id)}>
                        <FaTrash />
                      </ActionButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <SectionTitle>
          <FaUsers /> Recent Applications
        </SectionTitle>
        
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>Student</TableHeaderCell>
                <TableHeaderCell>Position</TableHeaderCell>
                <TableHeaderCell>Applied Date</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </TableHeader>
            <TableBody>
              {filteredApplications.map(application => (
                <TableRow key={application.id}>
                  <TableCell>{application.student}</TableCell>
                  <TableCell>{application.position}</TableCell>
                  <TableCell>{application.applied}</TableCell>
                  <TableCell>
                    <StatusBadge status={application.status}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <ActionButtons>
                      <ActionButton title="View" onClick={() => handleViewApplication(application.id)}>
                        <FaEye />
                      </ActionButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <SectionTitle>
          <FaUsers /> Current Interns
        </SectionTitle>
        
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Position</TableHeaderCell>
                <TableHeaderCell>Start Date</TableHeaderCell>
                <TableHeaderCell>End Date</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </TableHeader>
            <TableBody>
              {filteredInterns.map(intern => (
                <TableRow key={intern.id}>
                  <TableCell>{intern.name}</TableCell>
                  <TableCell>{intern.position}</TableCell>
                  <TableCell>{intern.started}</TableCell>
                  <TableCell>{intern.ends}</TableCell>
                  <TableCell>
                    <StatusBadge status={intern.status === 'current' ? 'active' : 'closed'}>
                      {intern.status.charAt(0).toUpperCase() + intern.status.slice(1)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <ActionButtons>
                      <ActionButton title="View" onClick={() => handleViewIntern(intern.id)}>
                        <FaEye />
                      </ActionButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default CompanyDashboard;