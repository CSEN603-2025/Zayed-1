import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { 
  FaArrowLeft, 
  FaUser, 
  FaBuilding, 
  FaCalendarAlt, 
  FaStar, 
  FaDownload,
  FaGraduationCap
} from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.light};
`;

const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.secondary};
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
  margin-bottom: 1.5rem;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ReportCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const ReportTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
  padding-bottom: 1rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.secondary};
  font-size: 1.25rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  margin-bottom: 1rem;
`;

const InfoLabel = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RatingStars = styled.div`
  display: flex;
  align-items: center;
  color: #f9a825;
`;

const RatingText = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.secondary};
`;

const CommentSection = styled.div`
  background-color: #f9f9f9;
  padding: 1.25rem;
  border-radius: 5px;
  margin-top: 1rem;
`;

const Comment = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.darkGray};
  margin: 0;
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 2rem;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

// Mock data for evaluation details
const mockEvaluations = [
  {
    id: 1,
    student: "David Wilson",
    studentId: "S10021",
    major: "Computer Science",
    gpa: "3.7",
    academicYear: "Third Year",
    email: "david.wilson@university.edu",
    company: "Tech Innovations",
    supervisor: "Sarah Parker",
    supervisorPosition: "Senior Software Engineer",
    supervisorEmail: "sarah.parker@techinnovations.com",
    supervisorPhone: "+1 (555) 123-4567",
    startDate: "2023-05-01",
    endDate: "2023-07-31",
    submittedDate: "2023-08-05",
    internshipTitle: "Software Developer Intern",
    departmentName: "Product Development",
    technicalSkillsRating: 4.5,
    communicationSkillsRating: 4.2,
    problemSolvingRating: 4.7,
    teamworkRating: 4.3,
    professionalismRating: 4.6,
    overallRating: 4.5,
    technicalSkillsFeedback: "David demonstrated excellent programming skills and was quick to learn our tech stack. He made valuable contributions to our codebase.",
    strengthsFeedback: "Strong analytical skills, excellent problem-solving abilities, and a quick learner. David was able to work independently after minimal guidance.",
    areasForImprovementFeedback: "Could improve communication with non-technical team members and documentation practices.",
    additionalComments: "We were very impressed with David's performance and would be happy to have him return for another internship or consider him for a full-time position after graduation.",
    recommendationLevel: "Highly Recommend",
    status: "completed"
  },
  {
    id: 2,
    student: "Emily Davis",
    studentId: "S10043",
    major: "Marketing",
    gpa: "3.9",
    academicYear: "Fourth Year",
    email: "emily.davis@university.edu",
    company: "Global Marketing Solutions",
    supervisor: "Michael Rodriguez",
    supervisorPosition: "Marketing Director",
    supervisorEmail: "m.rodriguez@globalmarketing.com",
    supervisorPhone: "+1 (555) 987-6543",
    startDate: "2023-06-15",
    endDate: "2023-09-15",
    submittedDate: "2023-09-20",
    internshipTitle: "Marketing Strategy Intern",
    departmentName: "Brand Strategy",
    technicalSkillsRating: 4.7,
    communicationSkillsRating: 5.0,
    problemSolvingRating: 4.6,
    teamworkRating: 4.9,
    professionalismRating: 4.8,
    overallRating: 4.8,
    technicalSkillsFeedback: "Emily has exceptional market research skills and showed great aptitude with our analytics tools.",
    strengthsFeedback: "Outstanding communication skills, creative thinking, and ability to present complex ideas clearly. Emily contributed several innovative campaign concepts that we implemented.",
    areasForImprovementFeedback: "Could benefit from more experience with data visualization tools.",
    additionalComments: "Emily was an exceptional intern who performed at the level of a full-time employee. We have extended a job offer for her to join us after graduation.",
    recommendationLevel: "Highly Recommend",
    status: "completed"
  },
  {
    id: 3,
    student: "James Thompson",
    studentId: "S10056",
    major: "Graphic Design",
    gpa: "3.5",
    academicYear: "Third Year",
    email: "james.thompson@university.edu",
    company: "Creative Studios",
    supervisor: "Amanda Lee",
    supervisorPosition: "Creative Director",
    supervisorEmail: "amanda.lee@creativestudios.com",
    supervisorPhone: "+1 (555) 456-7890",
    startDate: "2023-05-15",
    endDate: "2023-08-15",
    submittedDate: "2023-08-18",
    internshipTitle: "UI/UX Design Intern",
    departmentName: "User Experience",
    technicalSkillsRating: 3.9,
    communicationSkillsRating: 3.5,
    problemSolvingRating: 3.8,
    teamworkRating: 3.6,
    professionalismRating: 3.7,
    overallRating: 3.7,
    technicalSkillsFeedback: "James has solid design skills but needs more practice with industry-standard tools.",
    strengthsFeedback: "Strong creativity and ability to generate original concepts. James had a good eye for visual aesthetics.",
    areasForImprovementFeedback: "Needs to improve communication skills and meeting deadlines. Should work on taking feedback more constructively.",
    additionalComments: "James has potential but needs to develop more professional working habits. With more experience and mentorship, he could develop into a strong designer.",
    recommendationLevel: "Recommend with Reservations",
    status: "completed"
  },
  {
    id: 4,
    student: "Sophia Martinez",
    studentId: "S10067",
    major: "Data Science",
    gpa: "4.0",
    academicYear: "Fourth Year",
    email: "sophia.martinez@university.edu",
    company: "FinTech Corp",
    supervisor: "Robert Johnson",
    supervisorPosition: "Data Science Manager",
    supervisorEmail: "r.johnson@fintechcorp.com",
    supervisorPhone: "+1 (555) 234-5678",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    submittedDate: "2023-09-02",
    internshipTitle: "Data Science Intern",
    departmentName: "Analytics",
    technicalSkillsRating: 4.8,
    communicationSkillsRating: 3.9,
    problemSolvingRating: 4.7,
    teamworkRating: 3.8,
    professionalismRating: 4.0,
    overallRating: 4.2,
    technicalSkillsFeedback: "Sophia's technical skills are exceptional. She quickly mastered our data pipeline and contributed high-quality analytics code.",
    strengthsFeedback: "Excellent analytical abilities, solid programming skills, and attention to detail. Sophia's work on our fraud detection model was particularly impressive.",
    areasForImprovementFeedback: "Should work on communication skills, particularly when explaining technical concepts to non-technical stakeholders.",
    additionalComments: "Sophia has great potential as a data scientist. We would be interested in having her return for a full-time position after she graduates.",
    recommendationLevel: "Recommend",
    status: "completed"
  },
  {
    id: 5,
    student: "Ethan Brown",
    studentId: "S10089",
    major: "Computer Science",
    gpa: "3.6",
    academicYear: "Fourth Year",
    email: "ethan.brown@university.edu",
    company: "SoftDev Inc.",
    supervisor: "Jennifer Williams",
    supervisorPosition: "Technical Lead",
    supervisorEmail: "j.williams@softdev.com",
    supervisorPhone: "+1 (555) 876-5432",
    startDate: "2023-05-10",
    endDate: "2023-08-10",
    submittedDate: "2023-08-15",
    internshipTitle: "Software Engineer Intern",
    departmentName: "Backend Development",
    technicalSkillsRating: 4.1,
    communicationSkillsRating: 3.8,
    problemSolvingRating: 4.2,
    teamworkRating: 4.1,
    professionalismRating: 3.8,
    overallRating: 4.0,
    technicalSkillsFeedback: "Ethan has good programming skills and was able to contribute to our codebase after ramping up.",
    strengthsFeedback: "Good problem-solving skills and willing to take on challenges. Ethan showed initiative in suggesting improvements to our testing framework.",
    areasForImprovementFeedback: "Could benefit from improving code documentation and communication with team members about his work progress.",
    additionalComments: "Ethan was a solid intern who met our expectations. He would be considered for future opportunities with more experience.",
    recommendationLevel: "Recommend",
    status: "completed"
  }
];

const EvaluationReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userType } = useAuth();
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real application, you would fetch the evaluation data from an API
    // For this demo, we're using the mock data
    const fetchedEvaluation = mockEvaluations.find(evaluation => evaluation.id === parseInt(id));
    setEvaluation(fetchedEvaluation);
    setLoading(false);
  }, [id]);
  
  if (loading) {
    return (
      <PageContainer>
        <Navbar userType={userType} />
        <ContentContainer>
          <p>Loading evaluation report...</p>
        </ContentContainer>
      </PageContainer>
    );
  }
  
  if (!evaluation) {
    return (
      <PageContainer>
        <Navbar userType={userType} />
        <ContentContainer>
          <BackButton onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back to Dashboard
          </BackButton>
          <ReportCard>
            <ReportTitle>Evaluation Report Not Found</ReportTitle>
            <p>The evaluation report you're looking for doesn't exist or you don't have permission to view it.</p>
          </ReportCard>
        </ContentContainer>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <Navbar userType={userType} />
      <ContentContainer>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back to Dashboard
        </BackButton>
        
        <ReportCard>
          <ReportTitle>Evaluation Report: {evaluation.student}</ReportTitle>
          
          <Section>
            <SectionTitle>
              <FaUser /> Student Information
            </SectionTitle>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Name</InfoLabel>
                <InfoValue>{evaluation.student}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Student ID</InfoLabel>
                <InfoValue>{evaluation.studentId}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Major</InfoLabel>
                <InfoValue>{evaluation.major}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>GPA</InfoLabel>
                <InfoValue>{evaluation.gpa}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Academic Year</InfoLabel>
                <InfoValue>{evaluation.academicYear}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>{evaluation.email}</InfoValue>
              </InfoItem>
            </InfoGrid>
          </Section>
          
          <Section>
            <SectionTitle>
              <FaBuilding /> Company Information
            </SectionTitle>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Company</InfoLabel>
                <InfoValue>{evaluation.company}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Department</InfoLabel>
                <InfoValue>{evaluation.departmentName}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Internship Title</InfoLabel>
                <InfoValue>{evaluation.internshipTitle}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Supervisor</InfoLabel>
                <InfoValue>{evaluation.supervisor}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Supervisor Position</InfoLabel>
                <InfoValue>{evaluation.supervisorPosition}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Supervisor Contact</InfoLabel>
                <InfoValue>{evaluation.supervisorEmail}<br />{evaluation.supervisorPhone}</InfoValue>
              </InfoItem>
            </InfoGrid>
          </Section>
          
          <Section>
            <SectionTitle>
              <FaCalendarAlt /> Internship Details
            </SectionTitle>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Start Date</InfoLabel>
                <InfoValue>{evaluation.startDate}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>End Date</InfoLabel>
                <InfoValue>{evaluation.endDate}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Duration</InfoLabel>
                <InfoValue>
                  {(() => {
                    const start = new Date(evaluation.startDate);
                    const end = new Date(evaluation.endDate);
                    const diffTime = Math.abs(end - start);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    const weeks = Math.floor(diffDays / 7);
                    const days = diffDays % 7;
                    return `${weeks} weeks${days > 0 ? ` and ${days} days` : ''}`;
                  })()}
                </InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Report Submitted</InfoLabel>
                <InfoValue>{evaluation.submittedDate}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Recommendation</InfoLabel>
                <InfoValue>{evaluation.recommendationLevel}</InfoValue>
              </InfoItem>
            </InfoGrid>
          </Section>
          
          <Section>
            <SectionTitle>
              <FaStar /> Performance Ratings
            </SectionTitle>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Technical Skills</InfoLabel>
                <Rating>
                  <RatingStars>
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        color={i < Math.floor(evaluation.technicalSkillsRating) ? '#f9a825' : '#e0e0e0'} 
                        style={{ marginRight: '2px' }} 
                      />
                    ))}
                  </RatingStars>
                  <RatingText>{evaluation.technicalSkillsRating}</RatingText>
                </Rating>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Communication</InfoLabel>
                <Rating>
                  <RatingStars>
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        color={i < Math.floor(evaluation.communicationSkillsRating) ? '#f9a825' : '#e0e0e0'} 
                        style={{ marginRight: '2px' }} 
                      />
                    ))}
                  </RatingStars>
                  <RatingText>{evaluation.communicationSkillsRating}</RatingText>
                </Rating>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Problem Solving</InfoLabel>
                <Rating>
                  <RatingStars>
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        color={i < Math.floor(evaluation.problemSolvingRating) ? '#f9a825' : '#e0e0e0'} 
                        style={{ marginRight: '2px' }} 
                      />
                    ))}
                  </RatingStars>
                  <RatingText>{evaluation.problemSolvingRating}</RatingText>
                </Rating>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Teamwork</InfoLabel>
                <Rating>
                  <RatingStars>
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        color={i < Math.floor(evaluation.teamworkRating) ? '#f9a825' : '#e0e0e0'} 
                        style={{ marginRight: '2px' }} 
                      />
                    ))}
                  </RatingStars>
                  <RatingText>{evaluation.teamworkRating}</RatingText>
                </Rating>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Professionalism</InfoLabel>
                <Rating>
                  <RatingStars>
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        color={i < Math.floor(evaluation.professionalismRating) ? '#f9a825' : '#e0e0e0'} 
                        style={{ marginRight: '2px' }} 
                      />
                    ))}
                  </RatingStars>
                  <RatingText>{evaluation.professionalismRating}</RatingText>
                </Rating>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Overall Rating</InfoLabel>
                <Rating>
                  <RatingStars>
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        color={i < Math.floor(evaluation.overallRating) ? '#f9a825' : '#e0e0e0'} 
                        style={{ marginRight: '2px' }} 
                      />
                    ))}
                  </RatingStars>
                  <RatingText>{evaluation.overallRating}</RatingText>
                </Rating>
              </InfoItem>
            </InfoGrid>
          </Section>
          
          <Section>
            <SectionTitle>
              <FaGraduationCap /> Supervisor Feedback
            </SectionTitle>
            <InfoItem>
              <InfoLabel>Technical Skills Feedback</InfoLabel>
              <CommentSection>
                <Comment>{evaluation.technicalSkillsFeedback}</Comment>
              </CommentSection>
            </InfoItem>
            <InfoItem style={{ marginTop: '1rem' }}>
              <InfoLabel>Key Strengths</InfoLabel>
              <CommentSection>
                <Comment>{evaluation.strengthsFeedback}</Comment>
              </CommentSection>
            </InfoItem>
            <InfoItem style={{ marginTop: '1rem' }}>
              <InfoLabel>Areas for Improvement</InfoLabel>
              <CommentSection>
                <Comment>{evaluation.areasForImprovementFeedback}</Comment>
              </CommentSection>
            </InfoItem>
            <InfoItem style={{ marginTop: '1rem' }}>
              <InfoLabel>Additional Comments</InfoLabel>
              <CommentSection>
                <Comment>{evaluation.additionalComments}</Comment>
              </CommentSection>
            </InfoItem>
          </Section>
          
          <DownloadButton onClick={() => {
            const anchor = document.createElement('a');
            anchor.href = `${process.env.PUBLIC_URL}/static/Dummy_pdf.pdf`;
            anchor.download = 'Dummy_pdf.pdf';
            anchor.click();
          }}>
            <FaDownload /> Download Full Evaluation Report
          </DownloadButton>
        </ReportCard>
      </ContentContainer>
    </PageContainer>
  );
};

export default EvaluationReport; 