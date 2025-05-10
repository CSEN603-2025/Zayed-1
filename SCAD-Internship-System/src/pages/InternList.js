import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { FaSearch, FaFilter, FaEye, FaClipboardCheck, FaUserGraduate } from 'react-icons/fa';

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

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
`;

const Tab = styled.button`
  background: none;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-bottom: 3px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.darkGray};
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
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

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  margin-left: 1rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  background-color: white;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007bff%22%20d%3D%22M287%2C114.5L157.5%2C244.1c-4.5%2C4.5-12%2C4.5-16.5%2C0l-129.4-129.6c-4.5-4.5-4.5-12%2C0-16.5l22.2-22.2c4.5-4.5%2C12-4.5%2C16.5%2C0L149.2%2C178l115.5-115.5c4.5-4.5%2C12-4.5%2C16.5%2C0l22.2%2C22.2C291.5%2C102.5%2C291.5%2C110%2C287%2C114.5z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 12px;
  padding-right: 2.5rem;
  min-width: 110px;

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
      case 'current': return '#e6f7e6';
      case 'completed': return '#e1f5fe';
      case 'terminated': return '#f8d7da';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'current': return '#2e7d32';
      case 'completed': return '#0277bd';
      case 'terminated': return '#c62828';
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

// Mock data for interns
const mockInterns = [
  {
    id: 1,
    name: 'Michael Brown',
    position: 'UI/UX Design Intern',
    started: '02/01/2023',
    ends: '05/01/2023',
    status: 'current',
    department: 'Design',
    evaluated: false
  },
  {
    id: 2,
    name: 'David Wilson',
    position: 'Frontend Developer Intern',
    started: '09/01/2022',
    ends: '12/01/2022',
    status: 'completed',
    department: 'Engineering',
    evaluated: true
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    position: 'Marketing Intern',
    started: '01/15/2023',
    ends: '04/15/2023',
    status: 'current',
    department: 'Marketing',
    evaluated: false
  },
  {
    id: 4,
    name: 'James Smith',
    position: 'Data Analyst Intern',
    started: '08/01/2022',
    ends: '11/01/2022',
    status: 'completed',
    department: 'Data Science',
    evaluated: false
  },
  {
    id: 5,
    name: 'Emily Davis',
    position: 'HR Intern',
    started: '07/01/2022',
    ends: '09/30/2022',
    status: 'terminated',
    department: 'Human Resources',
    evaluated: false
  }
];

const InternList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [interns, setInterns] = useState(mockInterns);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter interns based on search term and filter status
  const filteredInterns = interns.filter(intern => 
    (intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     intern.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
     intern.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === 'all' || intern.status === filterStatus) &&
    (activeTab === 'all' || 
     (activeTab === 'current' && intern.status === 'current') ||
     (activeTab === 'past' && (intern.status === 'completed' || intern.status === 'terminated')))
  );
  
  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setInterns(prevInterns => 
      prevInterns.map(intern => 
        intern.id === id ? { ...intern, status: newStatus } : intern
      )
    );
  };
  
  // Handle view intern details
  const handleViewIntern = (id) => {
    // Navigate to intern profile page
    navigate(`/company/interns/${id}`);
  };
  
  // Handle create evaluation (only for completed interns)
  const handleEvaluation = (id) => {
    navigate(`/company/interns/evaluation/${id}`);
  };
  
  return (
    <PageContainer>
      <Navbar userType="company" />
      
      <ContentContainer>
        <Header>
          <Title>Interns Management</Title>
          <Description>Manage and evaluate current and past interns</Description>
        </Header>
        
        <TabContainer>
          <Tab 
            active={activeTab === 'all'} 
            onClick={() => setActiveTab('all')}
          >
            All Interns
          </Tab>
          <Tab 
            active={activeTab === 'current'} 
            onClick={() => setActiveTab('current')}
          >
            Current Interns
          </Tab>
          <Tab 
            active={activeTab === 'past'} 
            onClick={() => setActiveTab('past')}
          >
            Past Interns
          </Tab>
        </TabContainer>
        
        <ActionsContainer>
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput 
              placeholder="Search interns..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </SearchContainer>

          <FilterSelect value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="current">Current</option>
            <option value="completed">Completed</option>
            <option value="terminated">Terminated</option>
          </FilterSelect>
        </ActionsContainer>
        
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Position</TableHeaderCell>
                <TableHeaderCell>Department</TableHeaderCell>
                <TableHeaderCell>Start Date</TableHeaderCell>
                <TableHeaderCell>End Date</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </TableHeader>
            <TableBody>
              {filteredInterns.length > 0 ? (
                filteredInterns.map(intern => (
                  <TableRow key={intern.id}>
                    <TableCell>{intern.name}</TableCell>
                    <TableCell>{intern.position}</TableCell>
                    <TableCell>{intern.department}</TableCell>
                    <TableCell>{intern.started}</TableCell>
                    <TableCell>{intern.ends}</TableCell>
                    <TableCell>
                      <FilterSelect 
                        value={intern.status} 
                        onChange={(e) => handleStatusChange(intern.id, e.target.value)}
                        style={{ padding: '0.5rem', margin: 0 }}
                      >
                        <option value="current">Current</option>
                        <option value="completed">Completed</option>
                        <option value="terminated">Terminated</option>
                      </FilterSelect>
                    </TableCell>
                    <TableCell>
                      <ActionButtons>
                        <ActionButton title="View Details" onClick={() => handleViewIntern(intern.id)}>
                          <FaEye />
                        </ActionButton>
                        {intern.status === 'completed' && (
                          <ActionButton 
                            title={intern.evaluated ? "Manage Evaluation" : "Create Evaluation"} 
                            onClick={() => handleEvaluation(intern.id)}
                          >
                            <FaClipboardCheck />
                          </ActionButton>
                        )}
                      </ActionButtons>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="7" style={{ textAlign: 'center' }}>No interns found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default InternList; 