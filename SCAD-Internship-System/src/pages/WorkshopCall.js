import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FaFilter
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
      case 'open': return '#e6f7e6';
      case 'closed': return '#f8d7da';
      case 'draft': return '#fff3cd';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'open': return '#2e7d32';
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

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

// Mock data for workshop calls
const mockWorkshopCalls = [
  {
    id: 1,
    title: 'Summer Workshop Series 2023',
    description: 'Looking for industry experts to conduct workshops for our PRO students',
    categories: ['Technology', 'Career Development', 'Soft Skills'],
    openDate: '2023-04-01',
    closeDate: '2023-04-30',
    workshopStartDate: '2023-06-01',
    workshopEndDate: '2023-08-31',
    status: 'open',
    proposals: 12
  },
  {
    id: 2,
    title: 'Fall Professional Skills Workshops',
    description: 'Seeking professionals to conduct workshops on various professional skills',
    categories: ['Communication', 'Leadership', 'Time Management'],
    openDate: '2023-07-15',
    closeDate: '2023-08-15',
    workshopStartDate: '2023-09-01',
    workshopEndDate: '2023-12-15',
    status: 'draft',
    proposals: 0
  },
  {
    id: 3,
    title: 'Spring Technical Workshops',
    description: 'Call for technical workshops focusing on emerging technologies',
    categories: ['Programming', 'Data Science', 'Cloud Computing'],
    openDate: '2022-12-01',
    closeDate: '2023-01-15',
    workshopStartDate: '2023-02-01',
    workshopEndDate: '2023-05-31',
    status: 'closed',
    proposals: 25
  }
];

const WorkshopCall = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categories: [],
    openDate: '',
    closeDate: '',
    workshopStartDate: '',
    workshopEndDate: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Workshop call created successfully!');
    setIsCreating(false);
    // In a real app, would save the new call to the server
  };
  
  const filteredCalls = mockWorkshopCalls.filter(call => {
    if (activeTab === 'active') return call.status === 'open';
    if (activeTab === 'draft') return call.status === 'draft';
    if (activeTab === 'archived') return call.status === 'closed';
    return true;
  });
  
  const handleViewCall = (id) => {
    navigate(`/workshops/calls/${id}`);
  };
  
  const handleEditCall = (id) => {
    // In a real app, would load call data and set to form
    setIsCreating(true);
  };
  
  const handleDeleteCall = (id) => {
    if (window.confirm('Are you sure you want to delete this workshop call?')) {
      alert(`Workshop call with ID ${id} deleted`);
      // In a real app, would delete the call from the server
    }
  };
  
  const handlePublishCall = (id) => {
    alert(`Workshop call with ID ${id} published`);
    // In a real app, would update the call status to 'open'
  };
  
  return (
    <PageContainer>
      <Navbar userType="scadOffice" />
      
      <ContentContainer>
        <PageHeader>
          <PageTitle>Workshop Calls Management</PageTitle>
          <PageDescription>
            Create and manage calls for workshop proposals
          </PageDescription>
        </PageHeader>
        
        {!isCreating ? (
          <>
            <ActionBar>
              <Button 
                variant="primary" 
                icon={<FaPlus />}
                onClick={() => setIsCreating(true)}
              >
                Create New Call
              </Button>
            </ActionBar>
            
            <TabsContainer>
              <Tab 
                active={activeTab === 'active'} 
                onClick={() => setActiveTab('active')}
              >
                Active Calls
              </Tab>
              <Tab 
                active={activeTab === 'draft'} 
                onClick={() => setActiveTab('draft')}
              >
                Drafts
              </Tab>
              <Tab 
                active={activeTab === 'archived'} 
                onClick={() => setActiveTab('archived')}
              >
                Archived
              </Tab>
            </TabsContainer>
            
            <TableContainer>
              <Table>
                <TableHeader>
                  <tr>
                    <TableHeaderCell>Title</TableHeaderCell>
                    <TableHeaderCell>Categories</TableHeaderCell>
                    <TableHeaderCell>Submission Period</TableHeaderCell>
                    <TableHeaderCell>Workshop Period</TableHeaderCell>
                    <TableHeaderCell>Proposals</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Actions</TableHeaderCell>
                  </tr>
                </TableHeader>
                <TableBody>
                  {filteredCalls.map(call => (
                    <TableRow key={call.id}>
                      <TableCell>{call.title}</TableCell>
                      <TableCell>{call.categories.join(', ')}</TableCell>
                      <TableCell>{call.openDate} - {call.closeDate}</TableCell>
                      <TableCell>{call.workshopStartDate} - {call.workshopEndDate}</TableCell>
                      <TableCell>{call.proposals}</TableCell>
                      <TableCell>
                        <StatusBadge status={call.status}>
                          {call.status === 'open' ? 'Open' : 
                           call.status === 'closed' ? 'Closed' : 'Draft'}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        <ActionButtons>
                          <ActionButton title="View Details" onClick={() => handleViewCall(call.id)}>
                            <FaEye />
                          </ActionButton>
                          <ActionButton title="Edit" onClick={() => handleEditCall(call.id)}>
                            <FaEdit />
                          </ActionButton>
                          <ActionButton title="Delete" onClick={() => handleDeleteCall(call.id)}>
                            <FaTrash />
                          </ActionButton>
                          {call.status === 'draft' && (
                            <ActionButton title="Publish" onClick={() => handlePublishCall(call.id)}>
                              <FaPlus />
                            </ActionButton>
                          )}
                        </ActionButtons>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Card title="Create New Workshop Call">
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  label="Call Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a descriptive title for the call"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Input
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe what kind of workshops you're looking for"
                  multiline
                  rows={4}
                  required
                />
              </FormGroup>
              
              <FormRow>
                <Input
                  label="Submission Open Date"
                  name="openDate"
                  type="date"
                  value={formData.openDate}
                  onChange={handleInputChange}
                  required
                />
                
                <Input
                  label="Submission Close Date"
                  name="closeDate"
                  type="date"
                  value={formData.closeDate}
                  onChange={handleInputChange}
                  required
                />
              </FormRow>
              
              <FormRow>
                <Input
                  label="Workshop Start Date"
                  name="workshopStartDate"
                  type="date"
                  value={formData.workshopStartDate}
                  onChange={handleInputChange}
                  required
                />
                
                <Input
                  label="Workshop End Date"
                  name="workshopEndDate"
                  type="date"
                  value={formData.workshopEndDate}
                  onChange={handleInputChange}
                  required
                />
              </FormRow>
              
              <Card.Footer>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Button 
                    variant="secondary"
                    onClick={() => setIsCreating(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary"
                    type="submit"
                  >
                    Create Call
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

export default WorkshopCall; 