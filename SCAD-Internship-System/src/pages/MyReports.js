import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { FaEye, FaFileAlt } from 'react-icons/fa';
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

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        },
        {
          id: '2',
          title: 'Week 2 Internship Report',
          submittedDate: '2023-06-12',
          status: 'flagged',
          feedback: 'Some issues need to be addressed.',
        },
        {
          id: '3',
          title: 'Week 3 Internship Report',
          submittedDate: '2023-06-19',
          status: 'rejected',
          feedback: 'Please revise and resubmit with the required information.',
        },
        {
          id: '4',
          title: 'Week 4 Internship Report',
          submittedDate: '2023-06-26',
          status: 'pending',
          feedback: '',
        },
      ];
      
      setReports(mockReports);
      setIsLoading(false);
    }, 1000);
  }, [userId]);

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

        <TableContainer>
          {isLoading ? (
            <NoReportsMessage>Loading reports...</NoReportsMessage>
          ) : reports.length === 0 ? (
            <NoReportsMessage>You haven't submitted any reports yet.</NoReportsMessage>
          ) : (
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
                {reports.map((report) => (
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
                      <Button 
                        variant="secondary" 
                        size="small"
                        onClick={() => handleViewReport(report.id)}
                      >
                        <FaEye style={{ marginRight: '0.5rem' }} />
                        View Report
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          )}
        </TableContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default MyReports; 