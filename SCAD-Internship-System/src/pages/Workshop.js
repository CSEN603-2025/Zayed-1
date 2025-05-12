import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaUserPlus, 
  FaFilter,
  FaSearch,
  FaChevronDown,
  FaChevronUp
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

const WorkshopGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const WorkshopCard = styled(Card)`
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const WorkshopTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
`;

const WorkshopDetail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.darkGray};
  font-size: 0.9rem;
  
  svg {
    margin-right: 0.5rem;
    color: ${props => props.theme.colors.secondary};
  }
`;

const WorkshopDescription = styled.p`
  margin: 1rem 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
`;

const Tag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.primary};
`;

const SpeakerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.tertiary};
`;

const SpeakerAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  font-weight: 600;
`;

const SpeakerDetails = styled.div`
  flex: 1;
`;

const SpeakerName = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
`;

const SpeakerTitle = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
`;

const FilterContent = styled.div`
  display: ${props => props.isVisible ? 'block' : 'none'};
  padding-top: 1rem;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-left: auto;
  background-color: ${props => {
    switch(props.status) {
      case 'upcoming': return '#e6f7e6';
      case 'full': return '#f8d7da';
      case 'inprogress': return '#fff3cd';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'upcoming': return '#2e7d32';
      case 'full': return '#c62828';
      case 'inprogress': return '#856404';
      default: return '#383d41';
    }
  }};
`;

// Mock data for workshops
const mockWorkshops = [
  {
    id: 1,
    title: 'Resume Building for Tech Careers',
    date: 'June 15, 2023',
    time: '10:00 AM - 12:00 PM',
    location: 'Engineering Building, Room 201',
    description: 'Learn how to craft a standout resume targeting technology companies. This workshop will cover best practices, common mistakes, and tailored approaches for different tech roles.',
    category: 'Career Development',
    speaker: {
      name: 'Jennifer Miller',
      title: 'Senior Recruiter, Tech Innovations',
      initials: 'JM'
    },
    tags: ['Resume', 'Tech Careers', 'Job Application'],
    status: 'completed',
    registered: false
  },
  {
    id: 2,
    title: 'Technical Interview Preparation',
    date: 'June 20, 2023',
    time: '2:00 PM - 4:30 PM',
    location: 'Virtual (Zoom)',
    description: 'Prepare for technical interviews with practice coding challenges, whiteboarding exercises, and common algorithmic questions. Get feedback from industry professionals.',
    category: 'Career Development',
    speaker: {
      name: 'Robert Chen',
      title: 'Software Engineering Manager, CodeCorp',
      initials: 'RC'
    },
    tags: ['Interviews', 'Coding', 'Algorithms'],
    status: 'upcoming',
    registered: true
  },
  {
    id: 3,
    title: 'Networking for Introverts',
    date: 'June 25, 2023',
    time: '11:00 AM - 1:00 PM',
    location: 'Business Building, Room 105',
    description: 'Effective networking strategies designed specifically for introverts. Learn how to make meaningful connections without exhausting your social battery.',
    category: 'Soft Skills',
    speaker: {
      name: 'Sarah Johnson',
      title: 'Career Counselor & Author',
      initials: 'SJ'
    },
    tags: ['Networking', 'Soft Skills', 'Communication'],
    status: 'full',
    registered: false
  },
  {
    id: 4,
    title: 'Portfolio Development for Designers',
    date: 'July 5, 2023',
    time: '1:00 PM - 4:00 PM',
    location: 'Arts Building, Room 302',
    description: 'Create a compelling design portfolio that showcases your skills and highlights your creative process. Learn from industry experts about what employers look for.',
    category: 'Design',
    speaker: {
      name: 'Michael Torres',
      title: 'Creative Director, Design Studio',
      initials: 'MT'
    },
    tags: ['Portfolio', 'Design', 'UX/UI'],
    status: 'upcoming',
    registered: false
  },
  {
    id: 5,
    title: 'Financial Management for Interns',
    date: 'July 10, 2023',
    time: '3:00 PM - 5:00 PM',
    location: 'Business Building, Room 201',
    description: 'Learn essential financial skills for managing your internship earnings, understanding taxes, budgeting, and planning for future financial goals.',
    category: 'Life Skills',
    speaker: {
      name: 'David Wilson',
      title: 'Financial Advisor, Smart Money',
      initials: 'DW'
    },
    tags: ['Finance', 'Budgeting', 'Taxes'],
    status: 'upcoming',
    registered: false
  },
  {
    id: 6,
    title: 'Effective Communication in the Workplace',
    date: 'July 15, 2023',
    time: '10:00 AM - 12:00 PM',
    location: 'Virtual (Zoom)',
    description: 'Develop strong workplace communication skills, including email etiquette, presenting ideas clearly, giving and receiving feedback, and navigating difficult conversations.',
    category: 'Soft Skills',
    speaker: {
      name: 'Lisa Patel',
      title: 'HR Director, Global Corp',
      initials: 'LP'
    },
    tags: ['Communication', 'Email', 'Feedback'],
    status: 'inprogress',
    registered: true
  }
];

const Workshop = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    registered: ''
  });
  const [workshops, setWorkshops] = useState(mockWorkshops);
  
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
  
  const handleRegister = (id) => {
    setWorkshops(prev => 
      prev.map(workshop => 
        workshop.id === id 
          ? { ...workshop, registered: !workshop.registered } 
          : workshop
      )
    );
  };
  
  const viewWorkshopDetails = (id) => {
    navigate(`/workshops/${id}`);
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
    
    // Registration filter
    if (filters.registered === 'registered' && !workshop.registered) {
      return false;
    }
    
    if (filters.registered === 'notregistered' && workshop.registered) {
      return false;
    }
    
    return true;
  });
  
  const categories = [...new Set(workshops.map(workshop => workshop.category))];
  const statuses = [...new Set(workshops.map(workshop => workshop.status))];
  
  return (
    <PageContainer>
      <Navbar userType="proStudent" />
      
      <ContentContainer>
        <PageHeader>
          <PageTitle>Workshops & Events</PageTitle>
          <PageDescription>
            Exclusive workshops and events for PRO Students to enhance your skills and career prospects
          </PageDescription>
        </PageHeader>
        
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
            
            <h4>Registration</h4>
            <FilterRow>
              <FilterItem 
                active={filters.registered === 'registered'}
                onClick={() => handleFilterClick('registered', 'registered')}
              >
                Registered
              </FilterItem>
              <FilterItem 
                active={filters.registered === 'notregistered'}
                onClick={() => handleFilterClick('registered', 'notregistered')}
              >
                Not Registered
              </FilterItem>
            </FilterRow>
          </FilterContent>
        </FilterSection>
        
        <div>
          <p>{filteredWorkshops.length} workshops found</p>
        </div>
        
        <WorkshopGrid>
          {filteredWorkshops.map(workshop => (
            <WorkshopCard key={workshop.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <WorkshopTitle>{workshop.title}</WorkshopTitle>
                <StatusBadge status={workshop.status}>
                  {workshop.status === 'upcoming' ? 'Upcoming' : 
                    workshop.status === 'full' ? 'Full' : 
                    workshop.status === 'inprogress' ? 'In Progress' : workshop.status}
                </StatusBadge>
              </div>
              
              <div>
                {workshop.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </div>
              
              <WorkshopDetail>
                <FaCalendarAlt />
                {workshop.date}
              </WorkshopDetail>
              
              <WorkshopDetail>
                <FaClock />
                {workshop.time}
              </WorkshopDetail>
              
              <WorkshopDetail>
                <FaMapMarkerAlt />
                {workshop.location}
              </WorkshopDetail>
              
              <WorkshopDescription>
                {workshop.description}
              </WorkshopDescription>
              
              <SpeakerInfo>
                <SpeakerAvatar>{workshop.speaker.initials}</SpeakerAvatar>
                <SpeakerDetails>
                  <SpeakerName>{workshop.speaker.name}</SpeakerName>
                  <SpeakerTitle>{workshop.speaker.title}</SpeakerTitle>
                </SpeakerDetails>
              </SpeakerInfo>
              
              <Card.Footer>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Button 
                    variant="secondary" 
                    size="small"
                    onClick={() => viewWorkshopDetails(workshop.id)}
                  >
                    View Details
                  </Button>
                  
                  {workshop.status !== 'full' && !workshop.registered ? (
                    <Button 
                      variant="primary" 
                      size="small"
                      icon={<FaUserPlus />}
                      onClick={() => handleRegister(workshop.id)}
                    >
                      Register
                    </Button>
                  ) : workshop.registered ? (
                    <Button 
                      variant="secondary" 
                      size="small"
                      onClick={() => handleRegister(workshop.id)}
                    >
                      Cancel Registration
                    </Button>
                  ) : (
                    <Button 
                      variant="danger" 
                      size="small"
                      disabled
                    >
                      Workshop Full
                    </Button>
                  )}
                </div>
              </Card.Footer>
            </WorkshopCard>
          ))}
        </WorkshopGrid>
      </ContentContainer>
    </PageContainer>
  );
};

export default Workshop; 