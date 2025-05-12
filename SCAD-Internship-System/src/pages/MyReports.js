import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { FaEye, FaFileAlt, FaPlus, FaEdit, FaTrash, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

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
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const PageDescription = styled.p`
  color: ${props => props.theme.colors.darkGray};
`;

const TableContainer = styled(Card)`
  overflow: hidden;
  padding: 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: ${props => props.theme.colors.light};
  border-bottom: 2px solid ${props => props.theme.colors.tertiary};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${props => props.theme.colors.light};
  }

  &:hover {
    background-color: ${props => props.theme.colors.lightHover};
  }
  
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const TableCell = styled.td`
  padding: 1rem;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: 600;
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

const NoReportsMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme.colors.darkGray};
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  width: 300px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { userId } = useAuth();

  useEffect(() => {
    // Fetch student's reports
    // This is mock data - in a real application, you would fetch from your API
    setIsLoading(true);
    
    // Mock data
    setTimeout(() => {
      const mockReports = [
        {
          id: '1',
          title: 'Week 1 Internship Report',
          submittedDate: '2023-06-05',
          status: 'accepted',
          feedback: 'Great work on your first week!',
          internshipId: '1',
          internshipTitle: 'Frontend Developer Intern at Tech Innovations'
        },
        {
          id: '2',
          title: 'Week 2 Internship Report',
          submittedDate: '2023-06-12',
          status: 'flagged',
          feedback: 'Some issues need to be addressed.',
          internshipId: '1',
          internshipTitle: 'Frontend Developer Intern at Tech Innovations'
        },
        {
          id: '3',
          title: 'Week 3 Internship Report',
          submittedDate: '2023-06-19',
          status: 'rejected',
          feedback: 'Please revise and resubmit with the required information.',
          internshipId: '1',
          internshipTitle: 'Frontend Developer Intern at Tech Innovations'
        },
        {
          id: '4',
          title: 'Week 4 Internship Report',
          submittedDate: '2023-06-26',
          status: 'pending',
          feedback: '',
          internshipId: '1',
          internshipTitle: 'Frontend Developer Intern at Tech Innovations'
        },
        {
          id: '5',
          title: 'Week 1 Progress Report',
          submittedDate: '2023-01-05',
          status: 'accepted',
          feedback: 'Excellent start!',
          internshipId: '2',
          internshipTitle: 'Data Analyst Intern at ADNOC'
        },
      ];
      
      setReports(mockReports);
      setFilteredReports(mockReports);
      setIsLoading(false);
    }, 1000);
  }, [userId]);

  useEffect(() => {
    // Filter reports based on search term
    if (searchTerm.trim() === '') {
      setFilteredReports(reports);
    } else {
      const filtered = reports.filter(
        report => 
          report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.internshipTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReports(filtered);
    }
  }, [searchTerm, reports]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleViewReport = (reportId) => {
    navigate(`/report/${reportId}`);
  };

  const handleManageReports = (internshipId) => {
    navigate(`/report-management/${internshipId}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Group reports by internship
  const reportsByInternship = filteredReports.reduce((acc, report) => {
    if (!acc[report.internshipId]) {
      acc[report.internshipId] = {
        internshipId: report.internshipId,
        internshipTitle: report.internshipTitle,
        reports: []
      };
    }
    acc[report.internshipId].reports.push(report);
    return acc;
  }, {});

  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <PageHeader>
          <PageTitle>My Reports</PageTitle>
          <PageDescription>
            View and manage all your submitted internship reports.
          </PageDescription>
        </PageHeader>

        <FilterContainer>
          <SearchInput
            type="text"
            placeholder="Search reports or internships..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </FilterContainer>

        {isLoading ? (
          <NoReportsMessage>Loading reports...</NoReportsMessage>
        ) : filteredReports.length === 0 ? (
          <NoReportsMessage>No reports found matching your search criteria.</NoReportsMessage>
        ) : (
          Object.values(reportsByInternship).map(group => (
            <div key={group.internshipId} style={{ marginBottom: '2rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem' 
              }}>
                <h2 style={{ color: '#05445E' }}>{group.internshipTitle}</h2>
                <Button
                  variant="primary"
                  onClick={() => handleManageReports(group.internshipId)}
                >
                  Manage Reports <FaArrowRight style={{ marginLeft: '0.5rem' }} />
                </Button>
              </div>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeader>Report Title</TableHeader>
                      <TableHeader>Submitted Date</TableHeader>
                      <TableHeader>Status</TableHeader>
                      <TableHeader>Actions</TableHeader>
                    </TableRow>
                  </TableHead>
                  <tbody>
                    {group.reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FaFileAlt style={{ marginRight: '0.5rem', color: '#007bff' }} />
                            {report.title}
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(report.submittedDate)}</TableCell>
                        <TableCell>
                          <StatusBadge status={report.status}>
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          </StatusBadge>
                        </TableCell>
                        <TableCell>
                          <ActionButtonsContainer>
                            <Button 
                              variant="secondary" 
                              size="small"
                              onClick={() => handleViewReport(report.id)}
                            >
                              <FaEye style={{ marginRight: '0.25rem' }} />
                              View
                            </Button>
                          </ActionButtonsContainer>
                        </TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            </div>
          ))
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default MyReports; 