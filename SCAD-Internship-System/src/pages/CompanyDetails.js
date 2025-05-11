import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import {
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaUsers,
  FaIndustry,
  FaArrowLeft,
  FaFileAlt,
  FaDownload,
  FaCheckCircle,
  FaTimesCircle
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

const BackButton = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  margin-bottom: 1.5rem;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const CompanyHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CompanyLogo = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2rem;
  overflow: hidden;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  svg {
    font-size: 3rem;
    color: ${props => props.theme.colors.primary};
  }
`;

const CompanyInfo = styled.div`
  flex: 1;
`;

const CompanyName = styled.h1`
  font-size: 2rem;
  margin: 0 0 0.5rem;
  color: ${props => props.theme.colors.primary};
`;

const CompanyMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
  
  div {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: ${props => props.theme.colors.darkGray};
    
    svg {
      margin-right: 0.5rem;
      color: ${props => props.theme.colors.secondary};
    }
  }
`;

const StatusBadge = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.5rem;
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

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const DocumentContainer = styled.div`
  margin-top: 1rem;
`;

const Document = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  margin-bottom: 1rem;
  
  &:hover {
    background-color: ${props => props.theme.colors.lightTertiary};
  }
`;

const DocumentIcon = styled.div`
  margin-right: 1rem;
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
`;

const DocumentInfo = styled.div`
  flex: 1;
`;

const DocumentTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const DocumentMeta = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.darkGray};
`;

const DocumentAction = styled.div`
  color: ${props => props.theme.colors.secondary};
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ReviewSectionCard = styled(Card)`
  position: sticky;
  top: 2rem;
`;

const ReviewActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ReviewNotes = styled.div`
  margin-top: 1.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

// Mock data for the company details
const mockCompanyData = {
  id: 1,
  name: 'Tech Innovations',
  logo: null,
  email: 'contact@techinnovations.com',
  phone: '+1 (555) 123-4567',
  website: 'www.techinnovations.com',
  industry: 'Technology',
  size: 'medium', // small, medium, large, corporate
  description: 'Tech Innovations is a forward-thinking technology company specializing in software development, cloud solutions, and AI integration. We are committed to pushing the boundaries of what\'s possible with technology while creating meaningful solutions for real-world problems.',
  address: '123 Tech Boulevard, San Francisco, CA 94107',
  status: 'pending',
  appliedDate: '2023-01-15',
  documents: [
    {
      id: 1,
      name: 'Company Registration Certificate',
      type: 'PDF',
      size: '1.2 MB',
      uploadedDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Tax Identification Documents',
      type: 'PDF',
      size: '845 KB',
      uploadedDate: '2023-01-15'
    },
    {
      id: 3,
      name: 'Business License',
      type: 'PDF',
      size: '1.5 MB',
      uploadedDate: '2023-01-15'
    }
  ]
};

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userType } = useAuth();
  const [company, setCompany] = useState(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null); // 'approve' or 'reject' or null
  
  useEffect(() => {
    // In a real app, we would fetch the company data from the API
    // For this demo, we'll just use the mock data
    setTimeout(() => {
      setCompany(mockCompanyData);
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleApproveCompany = () => {
    if (!reviewNotes.trim()) {
      alert('Please add review notes before approving.');
      return;
    }
    
    // In a real app, we would call an API to approve the company
    alert(`Company ${company.name} has been approved. An email notification will be sent to ${company.email}.`);
    
    // Update the local state
    setCompany({
      ...company,
      status: 'approved'
    });
    
    // Close the confirmation dialog
    setShowConfirm(null);
  };
  
  const handleRejectCompany = () => {
    if (!reviewNotes.trim()) {
      alert('Please add review notes before rejecting.');
      return;
    }
    
    // In a real app, we would call an API to reject the company
    alert(`Company ${company.name} has been rejected. An email notification will be sent to ${company.email}.`);
    
    // Update the local state
    setCompany({
      ...company,
      status: 'rejected'
    });
    
    // Close the confirmation dialog
    setShowConfirm(null);
  };
  
  const handleDownloadDocument = (documentId) => {
    // In a real app, we would initiate a download of the document
    alert(`Downloading document ID: ${documentId}`);
  };
  
  if (loading) {
    return (
      <PageContainer>
        <Navbar />
        <ContentContainer>
          <div>Loading...</div>
        </ContentContainer>
      </PageContainer>
    );
  }
  
  if (error) {
    return (
      <PageContainer>
        <Navbar />
        <ContentContainer>
          <div>Error: {error}</div>
        </ContentContainer>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <Navbar />
      
      <ContentContainer>
        
        <CompanyHeader>
          <CompanyLogo>
            {company.logo ? (
              <img src={company.logo} alt={`${company.name} logo`} />
            ) : (
              <FaBuilding />
            )}
          </CompanyLogo>
          
          <CompanyInfo>
            <CompanyName>{company.name}</CompanyName>
            
            <CompanyMeta>
              <div>
                <FaIndustry />
                {company.industry}
              </div>
              
              <div>
                <FaUsers />
                {company.size === 'small' ? 'Small (≤50 employees)' :
                 company.size === 'medium' ? 'Medium (51-100 employees)' :
                 company.size === 'large' ? 'Large (101-500 employees)' :
                 'Corporate (500+ employees)'}
              </div>
              
              <div>
                <FaEnvelope />
                {company.email}
              </div>
              
              {company.phone && (
                <div>
                  <FaPhone />
                  {company.phone}
                </div>
              )}
              
              {company.website && (
                <div>
                  <FaGlobe />
                  {company.website}
                </div>
              )}
            </CompanyMeta>
            
            <StatusBadge status={company.status}>
              Status: {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
            </StatusBadge>
          </CompanyInfo>
        </CompanyHeader>
        
        <TwoColumnLayout>
          <div>
            <Card>
              <SectionTitle>Company Description</SectionTitle>
              <p>{company.description}</p>
              
              <SectionTitle>Company Address</SectionTitle>
              <p>{company.address}</p>
              
              <SectionTitle>
                <FaFileAlt /> Verification Documents
              </SectionTitle>
              
              <DocumentContainer>
                {company.documents.map(doc => (
                  <Document key={doc.id}>
                    <DocumentIcon>
                      <FaFileAlt />
                    </DocumentIcon>
                    
                    <DocumentInfo>
                      <DocumentTitle>{doc.name}</DocumentTitle>
                      <DocumentMeta>
                        {doc.type} • {doc.size} • Uploaded on {doc.uploadedDate}
                      </DocumentMeta>
                    </DocumentInfo>
                    
                    <DocumentAction onClick={() => handleDownloadDocument(doc.id)}>
                      <FaDownload />
                    </DocumentAction>
                  </Document>
                ))}
              </DocumentContainer>
            </Card>
          </div>
          
          <div>
            {userType === 'scadOffice' && (
              <ReviewSectionCard title="Review Application">
                <div>
                  <p>Application submitted on: {company.appliedDate}</p>
                  
                  {company.status === 'pending' ? (
                    <>
                      <ReviewNotes>
                        <label htmlFor="reviewNotes">Review Notes (required):</label>
                        <TextArea
                          id="reviewNotes"
                          placeholder="Enter your notes for this company application review..."
                          value={reviewNotes}
                          onChange={(e) => setReviewNotes(e.target.value)}
                        />
                      </ReviewNotes>
                      
                      <ReviewActions>
                        <Button 
                          variant="danger" 
                          onClick={() => setShowConfirm('reject')}
                          fullWidth
                        >
                          Reject Application
                        </Button>
                        
                        <Button 
                          variant="success" 
                          onClick={() => setShowConfirm('approve')}
                          fullWidth
                        >
                          Approve Application
                        </Button>
                      </ReviewActions>
                      
                      {showConfirm === 'approve' && (
                        <Card.Footer>
                          <div>
                            <p>Are you sure you want to approve this company application?</p>
                            <p>An email notification will be sent to the company.</p>
                            
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                              <Button 
                                variant="secondary" 
                                onClick={() => setShowConfirm(null)}
                              >
                                Cancel
                              </Button>
                              
                              <Button 
                                variant="success" 
                                onClick={handleApproveCompany}
                              >
                                Confirm Approval
                              </Button>
                            </div>
                          </div>
                        </Card.Footer>
                      )}
                      
                      {showConfirm === 'reject' && (
                        <Card.Footer>
                          <div>
                            <p>Are you sure you want to reject this company application?</p>
                            <p>An email notification will be sent to the company.</p>
                            
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                              <Button 
                                variant="secondary" 
                                onClick={() => setShowConfirm(null)}
                              >
                                Cancel
                              </Button>
                              
                              <Button 
                                variant="danger" 
                                onClick={handleRejectCompany}
                              >
                                Confirm Rejection
                              </Button>
                            </div>
                          </div>
                        </Card.Footer>
                      )}
                    </>
                  ) : (
                    <div style={{ marginTop: '1.5rem' }}>
                      <StatusBadge status={company.status}>
                        This application has been {company.status}
                      </StatusBadge>
                      
                      {company.status === 'approved' ? (
                        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
                          <FaCheckCircle style={{ color: '#2e7d32', marginRight: '0.5rem' }} />
                          Company has been notified and can now post internship opportunities
                        </div>
                      ) : (
                        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
                          <FaTimesCircle style={{ color: '#c62828', marginRight: '0.5rem' }} />
                          Company has been notified about the rejection
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </ReviewSectionCard>
            )}
          </div>
        </TwoColumnLayout>
      </ContentContainer>
    </PageContainer>
  );
};

export default CompanyDetails; 