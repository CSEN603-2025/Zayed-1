import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { 
  FaSearch, 
  FaFilter, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaDollarSign, 
  FaBuilding,
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
  margin-bottom: 1.5rem;
`;

const SearchFilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
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

const FiltersButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.active ? props.theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 5px;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.lightTertiary};
  }
`;

const FilterPanel = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: ${props => props.visible ? 'block' : 'none'};
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FilterGroup = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FilterLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const CheckboxGroup = styled.div`
  margin-top: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  
  input {
    margin-right: 0.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.primary ? `
    background-color: ${props.theme.colors.primary};
    color: white;
    border: none;
    
    &:hover {
      background-color: ${props.theme.colors.secondary};
    }
  ` : `
    background-color: white;
    color: ${props.theme.colors.primary};
    border: 1px solid ${props.theme.colors.tertiary};
    
    &:hover {
      background-color: ${props.theme.colors.lightTertiary};
    }
  `}
`;

const InternshipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InternshipCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 1.5rem;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const CompanyLogo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const CompanyName = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;

const InternshipTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const DetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  
  svg {
    margin-right: 0.75rem;
    color: ${props => props.theme.colors.secondary};
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Skill = styled.span`
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.primary};
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.3rem 0.75rem;
  border-radius: 50px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.darkGray};
  font-size: 0.9rem;
`;

const PaymentTag = styled.div`
  background-color: ${props => props.paid ? '#e6f7e6' : '#fff3cd'};
  color: ${props => props.paid ? '#2e7d32' : '#856404'};
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.3rem 0.75rem;
  border-radius: 50px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const PaginationButton = styled.button`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.25rem;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.active ? `
    background-color: ${props.theme.colors.primary};
    color: white;
    border: none;
  ` : `
    background-color: white;
    color: ${props.theme.colors.primary};
    border: 1px solid ${props.theme.colors.tertiary};
    
    &:hover {
      background-color: ${props.theme.colors.lightTertiary};
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const EmptyTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const EmptyMessage = styled.p`
  color: ${props => props.theme.colors.darkGray};
  font-size: 1rem;
  max-width: 500px;
  margin: 0 auto;
`;

// Mock internship data
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
    postedDate: '2023-10-10',
    skills: ['React', 'JavaScript', 'HTML/CSS'],
    description: 'Join our team to develop responsive web applications using modern technologies.'
  },
  {
    id: 2,
    title: 'UX/UI Design Intern',
    company: 'Creative Designs',
    location: 'New York, NY',
    duration: '6 months',
    paid: true,
    salary: '$18/hr',
    industry: 'Design',
    postedDate: '2023-10-05',
    skills: ['Figma', 'UI Design', 'Wireframing'],
    description: 'Help create intuitive user interfaces and improve user experience for our clients.'
  },
  {
    id: 3,
    title: 'Marketing Intern',
    company: 'Global Marketing',
    location: 'Remote',
    duration: '4 months',
    paid: false,
    industry: 'Marketing',
    postedDate: '2023-10-15',
    skills: ['Social Media', 'Content Creation', 'Analytics'],
    description: 'Assist in developing marketing strategies and creating engaging content.'
  },
  {
    id: 4,
    title: 'Data Analysis Intern',
    company: 'Data Insights',
    location: 'Chicago, IL',
    duration: '3 months',
    paid: true,
    salary: '$22/hr',
    industry: 'Data Science',
    postedDate: '2023-09-28',
    skills: ['Python', 'SQL', 'Data Visualization'],
    description: 'Work on analyzing large datasets and creating meaningful insights for business decisions.'
  },
  {
    id: 5,
    title: 'Software Engineering Intern',
    company: 'Cloud Solutions',
    location: 'Seattle, WA',
    duration: '6 months',
    paid: true,
    salary: '$25/hr',
    industry: 'Technology',
    postedDate: '2023-10-12',
    skills: ['Java', 'Spring Boot', 'AWS'],
    description: 'Develop and maintain backend services for our cloud-based solutions.'
  },
  {
    id: 6,
    title: 'Content Writing Intern',
    company: 'Media House',
    location: 'Remote',
    duration: '3 months',
    paid: false,
    industry: 'Media',
    postedDate: '2023-10-08',
    skills: ['Content Writing', 'Editing', 'SEO'],
    description: 'Create engaging articles, blog posts, and social media content for various platforms.'
  }
];

const industryOptions = [
  { value: '', label: 'All Industries' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Design', label: 'Design' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'Media', label: 'Media' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Healthcare', label: 'Healthcare' }
];

const durationOptions = [
  { value: '', label: 'Any Duration' },
  { value: '3 months', label: '3 Months' },
  { value: '4 months', label: '4 Months' },
  { value: '6 months', label: '6 Months' }
];

const locationOptions = [
  { value: '', label: 'Any Location' },
  { value: 'San Francisco, CA', label: 'San Francisco, CA' },
  { value: 'New York, NY', label: 'New York, NY' },
  { value: 'Chicago, IL', label: 'Chicago, IL' },
  { value: 'Seattle, WA', label: 'Seattle, WA' },
  { value: 'Remote', label: 'Remote' }
];

const InternshipList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    industry: '',
    duration: '',
    location: '',
    isPaid: null
  });
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const internshipsPerPage = 6;
  
  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters]);
  
  const applyFilters = () => {
    let result = [...mockInternships];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        internship => 
          internship.title.toLowerCase().includes(term) ||
          internship.company.toLowerCase().includes(term) ||
          internship.description.toLowerCase().includes(term)
      );
    }
    
    // Apply industry filter
    if (filters.industry) {
      result = result.filter(internship => internship.industry === filters.industry);
    }
    
    // Apply duration filter
    if (filters.duration) {
      result = result.filter(internship => internship.duration === filters.duration);
    }
    
    // Apply location filter
    if (filters.location) {
      result = result.filter(internship => internship.location === filters.location);
    }
    
    // Apply paid/unpaid filter
    if (filters.isPaid !== null) {
      result = result.filter(internship => internship.paid === filters.isPaid);
    }
    
    setFilteredInternships(result);
    setCurrentPage(1); // Reset to first page when filters change
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
  
  const handlePaidFilterChange = (e) => {
    const value = e.target.value;
    setFilters(prev => ({
      ...prev,
      isPaid: value === '' ? null : value === 'paid'
    }));
  };
  
  const handleResetFilters = () => {
    setFilters({
      industry: '',
      duration: '',
      location: '',
      isPaid: null
    });
    setSearchTerm('');
  };
  
  const handleInternshipClick = (id) => {
    navigate(`/internships/${id}`);
  };
  
  // Get current internships for pagination
  const indexOfLastInternship = currentPage * internshipsPerPage;
  const indexOfFirstInternship = indexOfLastInternship - internshipsPerPage;
  const currentInternships = filteredInternships.slice(indexOfFirstInternship, indexOfLastInternship);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <PageContainer>
      <Navbar userType="student" />
      
      <ContentContainer>
        <Header>
          <Title>Internship Opportunities</Title>
          <Description>
            Discover and apply for internships that match your skills and interests
          </Description>
        </Header>
        
        <SearchFilterContainer>
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput 
              placeholder="Search by title, company or keywords..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </SearchContainer>
          
          <FiltersButton 
            active={showFilters}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter />
            Filters
            {showFilters ? <FaChevronUp /> : <FaChevronDown />}
          </FiltersButton>
        </SearchFilterContainer>
        
        <FilterPanel visible={showFilters}>
          <FilterRow>
            <FilterGroup>
              <FilterLabel>Industry</FilterLabel>
              <Select
                name="industry"
                value={filters.industry}
                onChange={handleFilterChange}
              >
                {industryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>Duration</FilterLabel>
              <Select
                name="duration"
                value={filters.duration}
                onChange={handleFilterChange}
              >
                {durationOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>Location</FilterLabel>
              <Select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
              >
                {locationOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FilterGroup>
          </FilterRow>
          
          <FilterRow>
            <FilterGroup>
              <FilterLabel>Payment</FilterLabel>
              <CheckboxGroup>
                <Select
                  name="isPaid"
                  value={filters.isPaid === null ? '' : filters.isPaid ? 'paid' : 'unpaid'}
                  onChange={handlePaidFilterChange}
                >
                  <option value="">All</option>
                  <option value="paid">Paid Only</option>
                  <option value="unpaid">Unpaid Only</option>
                </Select>
              </CheckboxGroup>
            </FilterGroup>
            
            <ButtonGroup>
              <Button onClick={handleResetFilters}>
                Reset Filters
              </Button>
            </ButtonGroup>
          </FilterRow>
        </FilterPanel>
        
        {currentInternships.length > 0 ? (
          <>
            <InternshipGrid>
              {currentInternships.map(internship => (
                <InternshipCard key={internship.id} onClick={() => handleInternshipClick(internship.id)}>
                  <CardHeader>
                    <CompanyInfo>
                      <CompanyLogo>
                        <FaBuilding size={20} />
                      </CompanyLogo>
                      <CompanyName>{internship.company}</CompanyName>
                    </CompanyInfo>
                    <InternshipTitle>{internship.title}</InternshipTitle>
                  </CardHeader>
                  
                  <CardBody>
                    <DetailsList>
                      <DetailItem>
                        <FaMapMarkerAlt />
                        {internship.location}
                      </DetailItem>
                      <DetailItem>
                        <FaCalendarAlt />
                        {internship.duration}
                      </DetailItem>
                      {internship.paid && (
                        <DetailItem>
                          <FaDollarSign />
                          {internship.salary}
                        </DetailItem>
                      )}
                    </DetailsList>
                    
                    <p>{internship.description}</p>
                    
                    <SkillsList>
                      {internship.skills.map((skill, index) => (
                        <Skill key={index}>{skill}</Skill>
                      ))}
                    </SkillsList>
                  </CardBody>
                  
                  <CardFooter>
                    <span>Posted on {formatDate(internship.postedDate)}</span>
                    <PaymentTag paid={internship.paid}>
                      {internship.paid ? 'Paid' : 'Unpaid'}
                    </PaymentTag>
                  </CardFooter>
                </InternshipCard>
              ))}
            </InternshipGrid>
            
            {filteredInternships.length > internshipsPerPage && (
              <PaginationContainer>
                <PaginationButton
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </PaginationButton>
                
                {[...Array(Math.ceil(filteredInternships.length / internshipsPerPage))].map((_, index) => (
                  <PaginationButton
                    key={index}
                    active={currentPage === index + 1}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </PaginationButton>
                ))}
                
                <PaginationButton
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredInternships.length / internshipsPerPage)}
                >
                  &gt;
                </PaginationButton>
              </PaginationContainer>
            )}
          </>
        ) : (
          <EmptyState>
            <EmptyTitle>No internships found</EmptyTitle>
            <EmptyMessage>
              We couldn't find any internships matching your search criteria. 
              Try adjusting your filters or search term.
            </EmptyMessage>
          </EmptyState>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default InternshipList; 