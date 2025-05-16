import React, { useState, useEffect } from 'react';
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
  FaVideo, 
  FaPhone, 
  FaUser,
  FaCheck,
  FaTimes,
  FaCircle,
  FaPlus,
  FaFilter,
  FaSearch,
  FaBell
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

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  margin-left: 0.5rem;
  font-size: 0.9rem;
`;

const AppointmentCard = styled(Card)`
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const AppointmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const AppointmentTitle = styled.h3`
  margin: 0;
  color: ${props => props.theme.colors.primary};
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => {
    switch(props.status) {
      case 'scheduled': return '#e6f7e6';
      case 'completed': return '#e2e3e5';
      case 'cancelled': return '#f8d7da';
      case 'in-progress': return '#fff3cd';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'scheduled': return '#2e7d32';
      case 'completed': return '#383d41';
      case 'cancelled': return '#c62828';
      case 'in-progress': return '#856404';
      default: return '#383d41';
    }
  }};
`;

const AppointmentDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.darkGray};
  font-size: 0.9rem;
  
  svg {
    margin-right: 0.5rem;
    color: ${props => props.theme.colors.secondary};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const OnlineStatus = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${props => props.online ? '#2e7d32' : '#6c757d'};
  
  svg {
    margin-right: 0.5rem;
    color: ${props => props.online ? '#2e7d32' : '#6c757d'};
  }
`;

const VideoCallModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const VideoCallContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const VideoBox = styled.div`
  background-color: #1a1a1a;
  border-radius: 8px;
  aspect-ratio: 16/9;
  position: relative;
  overflow: hidden;
`;

const VideoControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const ControlButton = styled.button`
  background-color: ${props => props.variant === 'danger' ? '#dc3545' : props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    title: 'Career Guidance Session',
    type: 'career',
    date: '2024-03-20',
    time: '10:00 AM',
    duration: 30,
    status: 'scheduled',
    requester: {
      id: 1,
      name: 'John Smith',
      type: 'proStudent',
      online: true
    },
    receiver: {
      id: 2,
      name: 'Dr. Sarah Johnson',
      type: 'scadOffice',
      online: true
    }
  },
  {
    id: 2,
    title: 'Report Clarification',
    type: 'report',
    date: '2024-03-21',
    time: '2:30 PM',
    duration: 45,
    status: 'scheduled',
    requester: {
      id: 3,
      name: 'Emily Davis',
      type: 'proStudent',
      online: false
    },
    receiver: {
      id: 2,
      name: 'Dr. Sarah Johnson',
      type: 'scadOffice',
      online: true
    }
  }
];

// Add new styled components for incoming calls
const IncomingCallCard = styled(Card)`
  background-color: ${props => props.theme.colors.light};
  border: 2px solid ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const IncomingCallHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CallerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const CallActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CareerGuidance = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [appointments, setAppointments] = useState(mockAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [currentCall, setCurrentCall] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    date: '',
    time: '',
    duration: 30,
    notes: ''
  });
  const [incomingCalls, setIncomingCalls] = useState([
    // Mock data for incoming calls
    {
      id: 1,
      caller: {
        id: 3,
        name: 'John Smith',
        type: 'proStudent',
        online: true
      },
      timestamp: new Date(),
      type: 'career'
    }
  ]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    // In a real app, this would create a new appointment
    const newAppointment = {
      id: appointments.length + 1,
      ...formData,
      status: 'scheduled',
      requester: {
        id: 1, // This would come from the authenticated user
        name: 'Current User',
        type: 'proStudent',
        online: true
      },
      receiver: {
        id: 2,
        name: 'Dr. Sarah Johnson',
        type: 'scadOffice',
        online: true
      }
    };
    setAppointments([...appointments, newAppointment]);
    setIsCreating(false);
  };

  const handleAcceptAppointment = (id) => {
    setAppointments(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status: 'scheduled' } : app
      )
    );
  };

  const handleRejectAppointment = (id) => {
    setAppointments(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status: 'cancelled' } : app
      )
    );
  };

  const handleStartCall = (appointment) => {
    navigate(`/career-guidance/call/${appointment.id}`);
  };

  const handleEndCall = () => {
    setShowVideoCall(false);
    setCurrentCall(null);
  };

  const handleAcceptCall = (callId) => {
    const call = incomingCalls.find(c => c.id === callId);
    if (call) {
      // Remove from incoming calls
      setIncomingCalls(prev => prev.filter(c => c.id !== callId));
      // Navigate to video call page
      navigate(`/career-guidance/call/${callId}`);
    }
  };

  const handleRejectCall = (callId) => {
    // Remove from incoming calls
    setIncomingCalls(prev => prev.filter(c => c.id !== callId));
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (activeTab === 'upcoming') return appointment.status === 'scheduled';
    if (activeTab === 'completed') return appointment.status === 'completed';
    if (activeTab === 'cancelled') return appointment.status === 'cancelled';
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        appointment.title.toLowerCase().includes(searchLower) ||
        appointment.requester.name.toLowerCase().includes(searchLower) ||
        appointment.receiver.name.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  return (
    <PageContainer>
      <Navbar userType="proStudent" />
      
      <ContentContainer>
        <PageHeader>
          <PageTitle>Career Guidance & Calls</PageTitle>
          <PageDescription>
            Schedule and manage career guidance sessions and report clarifications
          </PageDescription>
        </PageHeader>

        <ActionBar>
          <Button 
            variant="primary" 
            icon={<FaPlus />}
            onClick={() => setIsCreating(true)}
          >
            Request Appointment
          </Button>
          
          <SearchBar>
            <FaSearch />
            <SearchInput 
              placeholder="Search appointments..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </SearchBar>
        </ActionBar>

        <TabsContainer>
          <Tab 
            active={activeTab === 'upcoming'} 
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </Tab>
          <Tab 
            active={activeTab === 'received'} 
            onClick={() => setActiveTab('received')}
          >
            Received Calls
          </Tab>
          <Tab 
            active={activeTab === 'completed'} 
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </Tab>
          <Tab 
            active={activeTab === 'cancelled'} 
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled
          </Tab>
        </TabsContainer>

        {activeTab === 'received' ? (
          <>
            {incomingCalls.length > 0 ? (
              incomingCalls.map(call => (
                <IncomingCallCard key={call.id}>
                  <IncomingCallHeader>
                    <CallerInfo>
                      <FaVideo />
                      <div>
                        <strong>{call.caller.name}</strong>
                        <div>{call.type === 'career' ? 'Career Guidance' : 'Report Clarification'}</div>
                        <small>{new Date(call.timestamp).toLocaleTimeString()}</small>
                      </div>
                    </CallerInfo>
                    <CallActions>
                      <Button
                        variant="primary"
                        icon={<FaCheck />}
                        onClick={() => handleAcceptCall(call.id)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="secondary"
                        icon={<FaTimes />}
                        onClick={() => handleRejectCall(call.id)}
                      >
                        Reject
                      </Button>
                    </CallActions>
                  </IncomingCallHeader>
                </IncomingCallCard>
              ))
            ) : (
              <Card>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <FaBell style={{ fontSize: '2rem', color: '#ccc', marginBottom: '1rem' }} />
                  <h3>No Incoming Calls</h3>
                  <p>When someone calls you, their request will appear here.</p>
                </div>
              </Card>
            )}
          </>
        ) : isCreating ? (
          <Card title="Request New Appointment">
            <form onSubmit={handleCreateAppointment}>
              <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter appointment title"
                required
              />
              
              <Select
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                options={[
                  { value: 'career', label: 'Career Guidance' },
                  { value: 'report', label: 'Report Clarification' }
                ]}
                required
              />
              
              <Input
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
              
              <Input
                label="Time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
              
              <Select
                label="Duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                options={[
                  { value: 30, label: '30 minutes' },
                  { value: 45, label: '45 minutes' },
                  { value: 60, label: '1 hour' }
                ]}
                required
              />
              
              <Input
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Add any additional notes or context"
                multiline
                rows={3}
              />
              
              <ActionButtons>
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
                  Request Appointment
                </Button>
              </ActionButtons>
            </form>
          </Card>
        ) : (
          filteredAppointments.map(appointment => (
            <AppointmentCard key={appointment.id}>
              <AppointmentHeader>
                <AppointmentTitle>{appointment.title}</AppointmentTitle>
                <StatusBadge status={appointment.status}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </StatusBadge>
              </AppointmentHeader>
              
              <AppointmentDetails>
                <DetailItem>
                  <FaCalendarAlt />
                  {appointment.date}
                </DetailItem>
                <DetailItem>
                  <FaClock />
                  {appointment.time} ({appointment.duration} minutes)
                </DetailItem>
                <DetailItem>
                  <FaUser />
                  {appointment.type === 'career' ? 'Career Guidance' : 'Report Clarification'}
                </DetailItem>
              </AppointmentDetails>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <OnlineStatus online={appointment.requester.online}>
                  <FaCircle />
                  {appointment.requester.name} ({appointment.requester.type})
                </OnlineStatus>
                
                <OnlineStatus online={appointment.receiver.online}>
                  <FaCircle />
                  {appointment.receiver.name} ({appointment.receiver.type})
                </OnlineStatus>
              </div>
              
              <ActionButtons>
                {appointment.status === 'scheduled' && (
                  <>
                    <Button 
                      variant="primary"
                      icon={<FaVideo />}
                      onClick={() => handleStartCall(appointment)}
                      disabled={!appointment.requester.online || !appointment.receiver.online}
                    >
                      Start Call
                    </Button>
                    <Button 
                      variant="secondary"
                      icon={<FaTimes />}
                      onClick={() => handleRejectAppointment(appointment.id)}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                {appointment.status === 'pending' && (
                  <>
                    <Button 
                      variant="primary"
                      icon={<FaCheck />}
                      onClick={() => handleAcceptAppointment(appointment.id)}
                    >
                      Accept
                    </Button>
                    <Button 
                      variant="secondary"
                      icon={<FaTimes />}
                      onClick={() => handleRejectAppointment(appointment.id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </ActionButtons>
            </AppointmentCard>
          ))
        )}

        {showVideoCall && currentCall && (
          <VideoCallModal>
            <VideoCallContainer>
              <VideoGrid>
                <VideoBox>
                  {/* Local video stream would go here */}
                </VideoBox>
                <VideoBox>
                  {/* Remote video stream would go here */}
                </VideoBox>
              </VideoGrid>
              
              <VideoControls>
                <ControlButton onClick={() => {/* Toggle mute */}}>
                  <FaPhone />
                </ControlButton>
                <ControlButton onClick={() => {/* Toggle video */}}>
                  <FaVideo />
                </ControlButton>
                <ControlButton 
                  variant="danger"
                  onClick={handleEndCall}
                >
                  <FaPhone />
                </ControlButton>
              </VideoControls>
            </VideoCallContainer>
          </VideoCallModal>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default CareerGuidance; 