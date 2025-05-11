import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import { useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  FaArrowLeft, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaClock, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaGraduationCap, 
  FaBriefcase, 
  FaUsers, 
  FaPaperPlane, 
  FaBookmark, 
  FaShare, 
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaPhone,
  FaEnvelope,
  FaGlobe
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

const InternshipHeader = styled.div`
  background-color: ${props => props.theme.colors.primary};
  border-radius: 8px;
  padding: 2rem;
  color: white;
  margin-bottom: 2rem;
`;

const InternshipTitle = styled.h1`
  margin: 0 0 1rem;
  font-size: 2rem;
  font-weight: 700;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CompanyLogo = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 8px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: ${props => props.theme.colors.primary};
  font-size: 1.8rem;
`;

const CompanyName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const CompanyLocation = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const QuickInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const QuickInfoItem = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.2);
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem;
`;

const Description = styled.div`
  line-height: 1.6;
  color: ${props => props.theme.colors.darkGray};
  white-space: pre-line;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const SkillTag = styled.div`
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.primary};
  padding: 0.5rem 0.75rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const DetailsList = styled.ul`
  padding-left: 1.5rem;
  margin: 1rem 0;
  line-height: 1.6;
  color: ${props => props.theme.colors.darkGray};
`;

const DetailItem = styled.li`
  margin-bottom: 0.5rem;
`;

const CompanySection = styled.div`
  margin-top: 1.5rem;
`;

const CompanyDescription = styled.p`
  line-height: 1.6;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: 1rem;
`;

const CompanyContactInfo = styled.div`
  margin-top: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.darkGray};
  
  svg {
    margin-right: 0.5rem;
    color: ${props => props.theme.colors.secondary};
  }
  
  a {
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const SimilarInternships = styled.div`
  margin-top: 2rem;
`;

const InternshipCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const InternshipCardTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.1rem;
  margin: 0 0 0.75rem;
`;

const InternshipMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.25rem;
  }
`;

const RatingStars = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

const StarIcon = styled(FaStar)`
  color: ${props => props.filled ? '#ffc107' : '#e4e5e9'};
  margin-right: 0.25rem;
`;

const RatingText = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  margin-left: 0.5rem;
`;

const ApplicationForm = styled.div`
  margin-top: 1.5rem;
`;

const CollapseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${props => props.theme.colors.tertiary};
  border: none;
  padding: 1rem;
  color: ${props => props.theme.colors.primary};
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    color: white;
  }
`;

const CollapseContent = styled.div`
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background-color: white;
  border-radius: 0 0 8px 8px;
`;

const InterestLevel = styled.div`
  margin: 1rem 0;
`;

const InterestOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const InterestOption = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.selected ? props.theme.colors.primary : 'white'};
  color: ${props => props.selected ? 'white' : props.theme.colors.darkGray};
  border: 1px solid ${props => props.selected ? props.theme.colors.primary : props.theme.colors.tertiary};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.selected ? props.theme.colors.primary : props.theme.colors.tertiary};
  }
`;

// Mock data for an internship
const mockInternshipData = {
  id: 1,
  title: "Software Development Intern",
  company: {
    name: "Tech Innovations Inc.",
    logo: null,
    location: "San Francisco, CA",
    description: "Tech Innovations Inc. is a leading technology company focused on developing cutting-edge software solutions for businesses. We specialize in cloud computing, artificial intelligence, and data analytics.",
    website: "https://techinnovations.example.com",
    email: "careers@techinnovations.example.com",
    phone: "+1-555-123-4567"
  },
  status: "Open",
  type: "Full-time",
  duration: "3 months",
  startDate: "June 1, 2023",
  stipend: "$2,500/month",
  applicationDeadline: "May 15, 2023",
  positions: 5,
  eligibility: "Computer Science, Software Engineering students in their 3rd or 4th year",
  description: "We're looking for passionate software development interns to join our innovative team for the summer. As an intern, you'll work closely with experienced developers to build new features, fix bugs, and improve our core products.",
  responsibilities: [
    "Collaborate with development team on real-world projects",
    "Write clean, maintainable code following our coding standards",
    "Participate in code reviews and learn best practices",
    "Debug and fix issues in existing applications",
    "Contribute to the development of new features",
    "Document your work and share knowledge with the team"
  ],
  requirements: [
    "Currently pursuing a degree in Computer Science, Software Engineering, or related field",
    "Strong understanding of at least one programming language (preferably JavaScript, Python, or Java)",
    "Basic knowledge of web technologies (HTML, CSS, HTTP)",
    "Familiarity with version control systems (Git)",
    "Good problem-solving skills and attention to detail",
    "Excellent communication and teamwork skills"
  ],
  skills: [
    "JavaScript", "React", "Python", "Git", "REST APIs", "Problem Solving"
  ],
  perks: [
    "Flexible work hours",
    "Mentorship from experienced developers",
    "Fun and collaborative work environment",
    "Weekly tech talks and learning sessions",
    "Snacks and beverages provided",
    "Possibility of full-time offer for outstanding performers"
  ],
  rating: 4.8,
  reviewCount: 15
};

// Mock data for similar internships
const mockSimilarInternships = [
  {
    id: 2,
    title: "Frontend Development Intern",
    company: "WebWizards LLC",
    location: "Remote",
    type: "Part-time",
    stipend: "$1,800/month",
    duration: "4 months"
  },
  {
    id: 3,
    title: "Mobile App Development Intern",
    company: "AppGenius Inc.",
    location: "New York, NY",
    type: "Full-time",
    stipend: "$2,200/month",
    duration: "3 months"
  },
  {
    id: 4,
    title: "Backend Developer Intern",
    company: "ServerStack Technologies",
    location: "Austin, TX",
    type: "Full-time",
    stipend: "$2,400/month",
    duration: "6 months"
  }
];

const InternshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const [similarInternships, setSimilarInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [interestLevel, setInterestLevel] = useState("high");
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const { userType } = useAuth();
  
  useEffect(() => {
    // In a real app, this would fetch data from an API based on the ID
    // For this demo, we'll simulate a data fetch
    setTimeout(() => {
      setInternship(mockInternshipData);
      setSimilarInternships(mockSimilarInternships);
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleSaveInternship = () => {
    setIsSaved(!isSaved);
    // In a real app, this would call an API to save/unsave
    const message = isSaved ? "Internship removed from saved list" : "Internship saved to your list";
    alert(message);
  };
  
  const handleShareInternship = () => {
    // In a real app, this would open a share dialog
    alert("Share functionality would be implemented here");
  };
  
  const handleApply = (e) => {
    e.preventDefault();
    // Only process application if user is a student or prostudent
    if (userType === "student" || userType === "prostudent") {
      // In a real app, this would submit the application data to an API
      alert(`Application submitted with interest level: ${interestLevel}`);
      setIsApplicationOpen(false);
    }
  };
  
  // Helper to check if application form should be visible
  const shouldShowApplicationForm = () => {
    return userType === "student" || userType === "prostudent";
  };
  
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };
  
  const renderRatingStars = (rating) => {
    return (
      <RatingStars>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon key={star} filled={star <= Math.round(rating)} />
        ))}
        <RatingText>{rating} out of 5</RatingText>
      </RatingStars>
    );
  };
  
  if (loading) {
    return (
      <PageContainer>
        <Navbar userType={userType} />
        <ContentContainer>
          <div>Loading internship details...</div>
        </ContentContainer>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <Navbar userType={userType} />
      
      <ContentContainer>
        <BackButton onClick={() => navigate("/internships")}>
          <FaArrowLeft /> Back to Internships
        </BackButton>
        
        <InternshipHeader>
          <InternshipTitle>{internship.title}</InternshipTitle>
          
          <CompanyInfo>
            <CompanyLogo>
              <FaBuilding />
            </CompanyLogo>
            <div>
              <CompanyName>{internship.company.name}</CompanyName>
              <CompanyLocation>
                <FaMapMarkerAlt /> {internship.company.location}
              </CompanyLocation>
            </div>
          </CompanyInfo>
          
          <QuickInfo>
            <QuickInfoItem>
              <FaBriefcase /> {internship.type}
            </QuickInfoItem>
            <QuickInfoItem>
              <FaClock /> {internship.duration}
            </QuickInfoItem>
            <QuickInfoItem>
              <FaCalendarAlt /> Start: {internship.startDate}
            </QuickInfoItem>
            <QuickInfoItem>
              <FaMoneyBillWave /> {internship.stipend}
            </QuickInfoItem>
            <QuickInfoItem>
              <FaUsers /> {internship.positions} positions
            </QuickInfoItem>
          </QuickInfo>
          
          <StatusBadge>{internship.status}</StatusBadge>
        </InternshipHeader>
        
        <TwoColumnLayout>
          <div>
            <Card>
              <Card.Body>
                <SectionTitle>Internship Description</SectionTitle>
                <Description>{internship.description}</Description>
                
                <SectionTitle>Responsibilities</SectionTitle>
                <DetailsList>
                  {internship.responsibilities.map((item, index) => (
                    <DetailItem key={index}>{item}</DetailItem>
                  ))}
                </DetailsList>
                
                <SectionTitle>Requirements</SectionTitle>
                <DetailsList>
                  {internship.requirements.map((item, index) => (
                    <DetailItem key={index}>{item}</DetailItem>
                  ))}
                </DetailsList>
                
                <SectionTitle>Required Skills</SectionTitle>
                <SkillsList>
                  {internship.skills.map((skill, index) => (
                    <SkillTag key={index}>{skill}</SkillTag>
                  ))}
                </SkillsList>
                
                <SectionTitle>Perks & Benefits</SectionTitle>
                <DetailsList>
                  {internship.perks.map((item, index) => (
                    <DetailItem key={index}>{item}</DetailItem>
                  ))}
                </DetailsList>
                
                <SectionTitle>Eligibility</SectionTitle>
                <Description>{internship.eligibility}</Description>
                
                {renderRatingStars(internship.rating)}
                <Description>{internship.reviewCount} students have reviewed this internship</Description>
                
                {(userType === "student" || userType === "proStudent") && (
                  <ActionButtons>
                    <Button 
                      variant="primary" 
                      icon={<FaPaperPlane />}
                      onClick={() => shouldShowApplicationForm() && setIsApplicationOpen(!isApplicationOpen)}
                    >
                      Apply Now
                    </Button>
                    <Button 
                      variant={isSaved ? "secondary" : "outlined"}
                      icon={<FaBookmark />}
                      onClick={handleSaveInternship}
                    >
                      {isSaved ? "Saved" : "Save for Later"}
                    </Button>
                    <Button 
                      variant="outlined"
                      icon={<FaShare />}
                      onClick={handleShareInternship}
                    >
                      Share
                    </Button>
                  </ActionButtons>
                )}
                
                {(userType === "student" || userType === "proStudent") && (
                  <ApplicationForm>
                    <CollapseButton onClick={() => shouldShowApplicationForm() && setIsApplicationOpen(!isApplicationOpen)}>
                      Quick Apply
                      {isApplicationOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </CollapseButton>
                    
                    <CollapseContent isOpen={isApplicationOpen}>
                      <Card.Body>
                        <form onSubmit={handleApply}>
                          <InterestLevel>
                            <label>How interested are you in this internship?</label>
                            <InterestOptions>
                              <InterestOption 
                                type="button"
                                selected={interestLevel === "high"}
                                onClick={() => setInterestLevel("high")}
                              >
                                Very Interested
                              </InterestOption>
                              <InterestOption 
                                type="button"
                                selected={interestLevel === "medium"}
                                onClick={() => setInterestLevel("medium")}
                              >
                                Somewhat Interested
                              </InterestOption>
                              <InterestOption 
                                type="button"
                                selected={interestLevel === "low"}
                                onClick={() => setInterestLevel("low")}
                              >
                                Just Exploring
                              </InterestOption>
                            </InterestOptions>
                          </InterestLevel>
                          
                          <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                              Upload your resume (PDF)
                            </label>
                            <input 
                              type="file" 
                              accept=".pdf"
                              onChange={handleFileChange}
                              style={{ 
                                border: '1px solid #ddd', 
                                borderRadius: '4px', 
                                padding: '0.5rem',
                                width: '100%' 
                              }}
                            />
                          </div>
                          
                          <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                              Cover Letter (Optional)
                            </label>
                            <textarea
                              value={coverLetter}
                              onChange={(e) => setCoverLetter(e.target.value)}
                              placeholder="Tell the company why you're interested in this position..."
                              style={{ 
                                width: '100%', 
                                minHeight: '150px', 
                                padding: '0.75rem',
                                borderRadius: '4px',
                                border: '1px solid #ddd'
                              }}
                            />
                          </div>
                          
                          <Button 
                            type="submit" 
                            variant="primary" 
                            style={{ width: '100%' }}
                          >
                            Submit Application
                          </Button>
                        </form>
                      </Card.Body>
                    </CollapseContent>
                  </ApplicationForm>
                )}
              </Card.Body>
            </Card>
          </div>
          
          <div>
            <Card>
              <Card.Header>
                <h3>Company Information</h3>
              </Card.Header>
              <Card.Body>
                <CompanySection>
                  <CompanyDescription>
                    {internship.company.description}
                  </CompanyDescription>
                  
                  <CompanyContactInfo>
                    <ContactItem>
                      <FaGlobe />
                      <a href={internship.company.website} target="_blank" rel="noopener noreferrer">
                        Company Website
                      </a>
                    </ContactItem>
                    <ContactItem>
                      <FaEnvelope />
                      <a href={`mailto:${internship.company.email}`}>
                        {internship.company.email}
                      </a>
                    </ContactItem>
                    <ContactItem>
                      <FaPhone />
                      {internship.company.phone}
                    </ContactItem>
                  </CompanyContactInfo>
                </CompanySection>
              </Card.Body>
            </Card>
            
            {(userType === "student" || userType === "proStudent") && (
              <Card style={{ marginTop: '1.5rem' }}>
                <Card.Header>
                  <h3>Application Deadline</h3>
                </Card.Header>
                <Card.Body>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#dc3545' }}>
                    <FaCalendarAlt style={{ marginRight: '0.5rem' }} />
                    <span style={{ fontWeight: '600' }}>{internship.applicationDeadline}</span>
                  </div>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#6c757d' }}>
                    Don't miss your chance to apply for this opportunity.
                  </p>
                </Card.Body>
              </Card>
            )}
            
            <SimilarInternships>
              <Card>
                <Card.Header>
                  <h3>Similar Internships</h3>
                </Card.Header>
                <Card.Body>
                  {similarInternships.map(internship => (
                    <InternshipCard 
                      key={internship.id}
                      onClick={() => navigate(`/internships/${internship.id}`)}
                    >
                      <InternshipCardTitle>{internship.title}</InternshipCardTitle>
                      <InternshipMeta>
                        <MetaItem>
                          <FaBuilding />
                          {internship.company}
                        </MetaItem>
                        <MetaItem>
                          <FaMapMarkerAlt />
                          {internship.location}
                        </MetaItem>
                      </InternshipMeta>
                      <InternshipMeta>
                        <MetaItem>
                          <FaBriefcase />
                          {internship.type}
                        </MetaItem>
                        <MetaItem>
                          <FaClock />
                          {internship.duration}
                        </MetaItem>
                        <MetaItem>
                          <FaMoneyBillWave />
                          {internship.stipend}
                        </MetaItem>
                      </InternshipMeta>
                    </InternshipCard>
                  ))}
                </Card.Body>
              </Card>
            </SimilarInternships>
          </div>
        </TwoColumnLayout>
      </ContentContainer>
    </PageContainer>
  );
};

export default InternshipDetails; 