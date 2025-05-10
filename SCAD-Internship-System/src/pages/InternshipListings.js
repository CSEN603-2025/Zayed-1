import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import { 
  FaSearch, 
  FaFilter, 
  FaBriefcase, 
  FaBuilding, 
  FaCalendarAlt, 
  FaDollarSign,
  FaMapMarkerAlt
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

const FiltersSection = styled.div`
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
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const InternshipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const InternshipCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const CompanyLogo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: ${props => props.theme.colors.primary};
`;

const CompanyName = styled.h4`
  margin: 0;
  font-size: 1.1rem;
`;

const JobTitle = styled.h3`
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const JobDetailsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const JobDetail = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  
  svg {
    margin-right: 0.5rem;
    color: ${props => props.theme.colors.secondary};
  }
`;

const JobDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Skill = styled.span`
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.primary};
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
`;

const CardFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.tertiary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PaymentTag = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.paid ? '#4caf50' : '#f44336'};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border: 1px solid ${props => props.theme.colors.secondary};
  background-color: ${props => props.active ? props.theme.colors.secondary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.secondary};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.primary};
  }
`;

// Mock data for internships
const mockInternships = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'Tech Innovations',
    location: 'San Francisco, CA',
    duration: '3 months',
    paid: true,
    salary: '$20/hr',
    industry: 'Technology',
    skills: ['React', 'JavaScript', 'HTML/CSS'],
    description: 'Join our team to develop cutting-edge web applications using React and modern JavaScript frameworks. You will work closely with our experienced developers to build responsive and user-friendly interfaces.'
  },
  {
    id: 2,
    title: 'Data Analyst Intern',
    company: 'Finance Solutions',
    location: 'New York, NY',
    duration: '6 months',
    paid: true,
    salary: '$22/hr',
    industry: 'Finance',
    skills: ['SQL', 'Python', 'Data Visualization'],
    description: 'Work with our analytics team to analyze financial data, create reports, and develop visualizations to support business decisions. Strong analytical skills and experience with SQL required.'
  },
  {
    id: 3,
    title: 'Marketing Intern',
    company: 'Brand Builders',
    location: 'Chicago, IL',
    duration: '3 months',
    paid: false,
    industry: 'Marketing',
    skills: ['Social Media', 'Content Creation', 'Analytics'],
    description: 'Support our marketing team in developing and implementing marketing campaigns. You will help with social media management, content creation, and analyzing campaign performance.'
  },
  {
    id: 4,
    title: 'UX Design Intern',
    company: 'Creative Designs',
    location: 'Seattle, WA',
    duration: '4 months',
    paid: true,
    salary: '$18/hr',
    industry: 'Design',
    skills: ['Figma', 'UI/UX', 'Prototyping'],
    description: 'Join our design team to create intuitive and user-centered designs for web and mobile applications. You will participate in user research, create wireframes, and design prototypes.'
  },
  {
    id: 5,
    title: 'Machine Learning Intern',
    company: 'AI Solutions',
    location: 'Boston, MA',
    duration: '6 months',
    paid: true,
    salary: '$25/hr',
    industry: 'Artificial Intelligence',
    skills: ['Python', 'TensorFlow', 'ML Algorithms'],
    description: 'Work on cutting-edge machine learning projects, developing and training models for various applications. Strong programming skills in Python and knowledge of ML frameworks required.'
  },
  {
    id: 6,
    title: 'HR Intern',
    company: 'People First',
    location: 'Austin, TX',
    duration: '3 months',
    paid: false,
    industry: 'Human Resources',
    skills: ['Recruitment', 'Employee Relations', 'HR Software'],
    description: 'Assist our HR team in various activities including recruitment, onboarding, and employee relations. You will gain hands-on experience in HR processes and tools.'
  }
];

const InternshipListings = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    industry: '',
    duration: '',
    paymentType: ''
  });
  
  const industryOptions = [
    { value: '', label: 'All Industries' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Design', label: 'Design' },
    { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
    { value: 'Human Resources', label: 'Human Resources' }
  ];
  
  const durationOptions = [
    { value: '', label: 'Any Duration' },
    { value: '3 months', label: '3 months' },
    { value: '4 months', label: '4 months' },
    { value: '6 months', label: '6 months' }
  ];
  
  const paymentOptions = [
    { value: '', label: 'All' },
    { value: 'paid', label: 'Paid Only' },
    { value: 'unpaid', label: 'Unpaid Only' }
  ];
  
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
  
  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      industry: '',
      duration: '',
      paymentType: ''
    });
  };
  
  const handleCardClick = (id) => {
    navigate(`/internships/${id}`);
  };
  
  const filteredInternships = mockInternships.filter(internship => {
    // Search term filter
    if (searchTerm && 
        !internship.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !internship.company.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Industry filter
    if (filters.industry && internship.industry !== filters.industry) {
      return false;
    }
    
    // Duration filter
    if (filters.duration && internship.duration !== filters.duration) {
      return false;
    }
    
    // Payment type filter
    if (filters.paymentType === 'paid' && !internship.paid) {
      return false;
    }
    
    if (filters.paymentType === 'unpaid' && internship.paid) {
      return false;
    }
    
    return true;
  });
  
  return (
    <PageContainer>
      <Navbar userType="student" />
      
      <ContentContainer>
        <PageHeader>
          <PageTitle>Internship Opportunities</PageTitle>
          <PageDescription>Discover and apply for internships that match your interests and skills</PageDescription>
        </PageHeader>
        
        <FiltersSection>
          <FilterHeader>
            <FilterTitle>
              <FaFilter /> Filters and Search
            </FilterTitle>
            <Button 
              variant="secondary" 
              size="small" 
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </FilterHeader>
          
          <SearchBar>
            <Input 
              placeholder="Search by job title or company" 
              value={searchTerm}
              onChange={handleSearchChange}
              icon={<FaSearch />}
              style={{ flex: '1' }}
            />
          </SearchBar>
          
          <FiltersGrid>
            <Select 
              name="industry"
              value={filters.industry}
              onChange={handleFilterChange}
              options={industryOptions}
              placeholder="Select Industry"
            />
            
            <Select 
              name="duration"
              value={filters.duration}
              onChange={handleFilterChange}
              options={durationOptions}
              placeholder="Select Duration"
            />
            
            <Select 
              name="paymentType"
              value={filters.paymentType}
              onChange={handleFilterChange}
              options={paymentOptions}
              placeholder="Payment Type"
            />
          </FiltersGrid>
        </FiltersSection>
        
        <div>
          <p>{filteredInternships.length} internships found</p>
        </div>
        
        <InternshipGrid>
          {filteredInternships.map(internship => (
            <InternshipCard 
              key={internship.id} 
              onClick={() => handleCardClick(internship.id)}
              style={{ cursor: 'pointer' }}
            >
              <CardHeader>
                <CompanyInfo>
                  <CompanyLogo>
                    <FaBuilding size={24} />
                  </CompanyLogo>
                  <CompanyName>{internship.company}</CompanyName>
                </CompanyInfo>
                <JobTitle>{internship.title}</JobTitle>
              </CardHeader>
              
              <CardBody>
                <JobDetailsList>
                  <JobDetail>
                    <FaMapMarkerAlt />
                    {internship.location}
                  </JobDetail>
                  <JobDetail>
                    <FaCalendarAlt />
                    {internship.duration}
                  </JobDetail>
                  <JobDetail>
                    <FaBriefcase />
                    {internship.industry}
                  </JobDetail>
                  {internship.paid && internship.salary && (
                    <JobDetail>
                      <FaDollarSign />
                      {internship.salary}
                    </JobDetail>
                  )}
                </JobDetailsList>
                
                <JobDescription>{internship.description}</JobDescription>
                
                <SkillsList>
                  {internship.skills.map((skill, index) => (
                    <Skill key={index}>{skill}</Skill>
                  ))}
                </SkillsList>
              </CardBody>
              
              <CardFooter onClick={(e) => e.stopPropagation()}>
                <PaymentTag paid={internship.paid}>
                  {internship.paid ? 'Paid Internship' : 'Unpaid Internship'}
                </PaymentTag>
                <Button 
                  variant="primary" 
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/internships/${internship.id}`);
                  }}
                >
                  View Details
                </Button>
              </CardFooter>
            </InternshipCard>
          ))}
        </InternshipGrid>
        
        <PaginationContainer>
          <PaginationButton active>1</PaginationButton>
          <PaginationButton>2</PaginationButton>
          <PaginationButton>3</PaginationButton>
          <PaginationButton>Next</PaginationButton>
        </PaginationContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default InternshipListings; 