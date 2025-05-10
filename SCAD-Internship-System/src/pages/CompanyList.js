import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import {
  FaBuilding,
  FaSearch,
  FaFilter,
  FaEye,
  FaCheck,
  FaTimes,
  FaArrowLeft,
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
  margin-bottom: 2rem;
`;

const SearchFilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.secondary};
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

const CompanyCell = styled.div`
  display: flex;
  align-items: center;
`;

const CompanyLogo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.tertiary};
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 5px;
  }
`;

const CompanyName = styled.div`
  font-weight: 500;
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
      case 'pending': return '#fff3cd';
      case 'approved': return '#e6f7e6';
      case 'rejected': return '#f8d7da';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'pending': return '#856404';
      case 'approved': return '#2e7d32';
      case 'rejected': return '#c62828';
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

const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  color: ${props => props.theme.colors.darkGray};
  
  svg {
    font-size: 3rem;
    color: ${props => props.theme.colors.tertiary};
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  span {
    font-size: 0.9rem;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.tertiary};
  background-color: ${props => props.active ? props.theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.darkGray};
  width: 35px;
  height: 35px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.light};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

// Mock data for companies
const mockCompanies = [
  {
    id: 1,
    name: 'Tech Innovations',
    logo: null,
    industry: 'Technology',
    size: 'medium',
    email: 'contact@techinnovations.com',
    status: 'pending',
    applied: '2023-01-15'
  },
  {
    id: 2,
    name: 'Finance Solutions',
    logo: null,
    industry: 'Finance',
    size: 'large',
    email: 'hr@financesolutions.com',
    status: 'approved',
    applied: '2022-12-05'
  },
  {
    id: 3,
    name: 'Healthcare Systems',
    logo: null,
    industry: 'Healthcare',
    size: 'corporate',
    email: 'info@healthcaresystems.com',
    status: 'rejected',
    applied: '2023-02-20'
  },
  {
    id: 4,
    name: 'Creative Designs',
    logo: null,
    industry: 'Design',
    size: 'small',
    email: 'hello@creativedesigns.com',
    status: 'pending',
    applied: '2023-02-28'
  },
  {
    id: 5,
    name: 'Global Logistics',
    logo: null,
    industry: 'Logistics',
    size: 'large',
    email: 'contact@globallogistics.com',
    status: 'pending',
    applied: '2023-03-10'
  },
  {
    id: 6,
    name: 'Marketing Experts',
    logo: null,
    industry: 'Marketing',
    size: 'small',
    email: 'info@marketingexperts.com',
    status: 'approved',
    applied: '2023-01-08'
  },
  {
    id: 7,
    name: 'Educational Resources',
    logo: null,
    industry: 'Education',
    size: 'medium',
    email: 'contact@eduresources.com',
    status: 'pending',
    applied: '2023-03-05'
  },
  {
    id: 8,
    name: 'Food Innovations',
    logo: null,
    industry: 'Food',
    size: 'medium',
    email: 'hello@foodinnovations.com',
    status: 'approved',
    applied: '2023-02-12'
  }
];

const CompanyList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 5;
  
  useEffect(() => {
    // In a real app, we would fetch the companies from the API
    // For this demo, we'll just use the mock data
    setTimeout(() => {
      setCompanies(mockCompanies);
      setLoading(false);
    }, 500);
  }, []);
  
  // Get filtered companies based on search term and filters
  const filteredCompanies = companies.filter(company => {
    // Search filter
    if (searchTerm && !company.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Industry filter
    if (industryFilter && company.industry !== industryFilter) {
      return false;
    }
    
    // Status filter
    if (statusFilter && company.status !== statusFilter) {
      return false;
    }
    
    // Tab filter
    if (activeTab === 'pending' && company.status !== 'pending') {
      return false;
    }
    
    if (activeTab === 'approved' && company.status !== 'approved') {
      return false;
    }
    
    if (activeTab === 'rejected' && company.status !== 'rejected') {
      return false;
    }
    
    return true;
  });
  
  // Get current companies for pagination
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Calculate stats
  const pendingCount = companies.filter(company => company.status === 'pending').length;
  const approvedCount = companies.filter(company => company.status === 'approved').length;
  const rejectedCount = companies.filter(company => company.status === 'rejected').length;
  
  // Generate industry options for filter
  const industries = [...new Set(companies.map(company => company.industry))];
  const industryOptions = [
    { value: '', label: 'All Industries' },
    ...industries.map(industry => ({ value: industry, label: industry }))
  ];
  
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
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
  
  const handleExportCompanies = () => {
    alert("Exporting company list to CSV...");
    // In a real app, we would generate and download a CSV file
  };
  
  return (
    <PageContainer>
      <Navbar userType="scadOffice" />
      
      <ContentContainer>
        <PageHeader>
          <PageTitle>Company Applications</PageTitle>
          <PageDescription>
            Manage and review company applications to join the internship system
          </PageDescription>
        </PageHeader>
        
        <StatsContainer>
          <StatCard>
            <StatValue>{companies.length}</StatValue>
            <StatLabel>Total Companies</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatValue>{pendingCount}</StatValue>
            <StatLabel>Pending Applications</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatValue>{approvedCount}</StatValue>
            <StatLabel>Approved Companies</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatValue>{rejectedCount}</StatValue>
            <StatLabel>Rejected Applications</StatLabel>
          </StatCard>
        </StatsContainer>
        
        <FilterSection>
          <Card>
            <SearchFilterContainer>
              <div style={{ flex: 2 }}>
                <Input
                  placeholder="Search companies by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<FaSearch />}
                />
              </div>
              
              <div style={{ flex: 1 }}>
                <Select
                  placeholder="Filter by Industry"
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  options={industryOptions}
                />
              </div>
              
              <div style={{ flex: 1 }}>
                <Select
                  placeholder="Filter by Status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  options={statusOptions}
                />
              </div>
              
              <div>
                <Button
                  variant="secondary"
                  onClick={handleExportCompanies}
                  icon={<FaDownload />}
                >
                  Export
                </Button>
              </div>
            </SearchFilterContainer>
          </Card>
        </FilterSection>
        
        <TabsContainer>
          <Tab 
            active={activeTab === 'all'} 
            onClick={() => setActiveTab('all')}
          >
            All Companies
          </Tab>
          <Tab 
            active={activeTab === 'pending'} 
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </Tab>
          <Tab 
            active={activeTab === 'approved'} 
            onClick={() => setActiveTab('approved')}
          >
            Approved
          </Tab>
          <Tab 
            active={activeTab === 'rejected'} 
            onClick={() => setActiveTab('rejected')}
          >
            Rejected
          </Tab>
        </TabsContainer>
        
        {loading ? (
          <div>Loading...</div>
        ) : currentCompanies.length === 0 ? (
          <EmptyState>
            <FaBuilding />
            <p>No companies found</p>
            <span>Try adjusting your search or filters</span>
          </EmptyState>
        ) : (
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>Company</TableHeaderCell>
                  <TableHeaderCell>Industry</TableHeaderCell>
                  <TableHeaderCell>Size</TableHeaderCell>
                  <TableHeaderCell>Email</TableHeaderCell>
                  <TableHeaderCell>Applied On</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </tr>
              </TableHeader>
              
              <TableBody>
                {currentCompanies.map(company => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <CompanyCell>
                        <CompanyLogo>
                          {company.logo ? (
                            <img src={company.logo} alt={`${company.name} logo`} />
                          ) : (
                            <FaBuilding />
                          )}
                        </CompanyLogo>
                        <CompanyName>{company.name}</CompanyName>
                      </CompanyCell>
                    </TableCell>
                    <TableCell>{company.industry}</TableCell>
                    <TableCell>
                      {company.size === 'small' ? 'Small (≤50)' :
                       company.size === 'medium' ? 'Medium (51-100)' :
                       company.size === 'large' ? 'Large (101-500)' :
                       'Corporate (500+)'}
                    </TableCell>
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
        )}
        
        {/* Pagination */}
        {!loading && filteredCompanies.length > companiesPerPage && (
          <Pagination>
            <PageButton
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &laquo;
            </PageButton>
            
            {[...Array(Math.ceil(filteredCompanies.length / companiesPerPage))].map((_, index) => (
              <PageButton
                key={index}
                active={currentPage === index + 1}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </PageButton>
            ))}
            
            <PageButton
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredCompanies.length / companiesPerPage)}
            >
              &raquo;
            </PageButton>
          </Pagination>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default CompanyList; 