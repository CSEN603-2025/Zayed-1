import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Select from '../components/Select';
import { 
  FaArrowLeft, 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaEye, 
  FaFile, 
  FaSave,
  FaTimes,
  FaFileAlt,
  FaCalendarAlt,
  FaUser,
  FaGraduationCap,
  FaCheck
} from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.light};
`;

const ContentContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.secondary};
  font-size: 1rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
  }
`;

const PageDescription = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: 1rem;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
`;

const Tab = styled.div`
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.darkGray};
  border-bottom: 3px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ActionBar = styled.div`
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

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  margin-left: 1rem;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const ReportCard = styled(Card)`
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ReportHeader = styled.div`
  padding: 1rem 1.5rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReportTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const ReportActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionIcon = styled.div`
  cursor: pointer;
  color: white;
  opacity: 0.8;
  
  &:hover {
    opacity: 1;
  }
`;

const ReportContent = styled.div`
  padding: 1.5rem;
`;

const ReportInfo = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const ReportInfoItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  
  svg {
    margin-right: 0.5rem;
    color: ${props => props.theme.colors.secondary};
  }
`;

const ReportDescription = styled.p`
  margin: 1rem 0;
  color: ${props => props.theme.colors.darkGray};
  line-height: 1.6;
`;

const CreateReportForm = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  font-size: 1rem;
  min-height: 200px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const ReportDetailContent = styled.div`
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const ReportDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
`;

const ReportDetailTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin: 0;
`;

const ReportDetailMeta = styled.div`
  margin-bottom: 2rem;
`;

const ReportDetailSection = styled.div`
  margin-bottom: 2rem;
`;

const ReportDetailSectionTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const ReportDetailText = styled.div`
  color: ${props => props.theme.colors.darkGray};
  line-height: 1.8;
  white-space: pre-wrap;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.tertiary};
  margin-bottom: 1rem;
`;

const EmptyStateTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const EmptyStateText = styled.p`
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: 1.5rem;
`;

const MultiSelectContainer = styled.div`
  margin-bottom: 16px;
  width: 100%;
`;

const MultiSelectLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  font-size: 14px;
`;

const MultiSelectOptions = styled.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 4px;
  padding: 8px;
  background-color: white;
`;

const MultiSelectOption = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.tertiary};
  }
  
  input {
    margin-right: 8px;
  }
`;

const SelectedCoursesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const SelectedCourseTag = styled.div`
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.primary};
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  
  button {
    background: none;
    border: none;
    color: ${props => props.theme.colors.secondary};
    margin-left: 5px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 0;
  }
`;

// Mock data for reports
const mockReports = [
  {
    id: 1,
    title: 'First Week Progress Report',
    date: '15/06/2022',
    type: 'Weekly',
    submittedBy: 'John Smith',
    content: `This is my first week progress report at Tech Innovations LLC.

During this first week, I have:
- Completed the onboarding process
- Set up my development environment
- Learned about the company's coding standards
- Started working on small bug fixes

Challenges faced:
- Getting familiar with the large codebase
- Understanding the team's workflow

Next week's goals:
- Complete my first feature implementation
- Start contributing to code reviews
- Learn more about the backend architecture`,
    status: 'submitted',
    feedback: 'Great start! Keep up the good work and focus on understanding the architecture.',
    internshipId: 1
  },
  {
    id: 2,
    title: 'Second Week Progress Report',
    date: '22/06/2022',
    type: 'Weekly',
    submittedBy: 'John Smith',
    content: `This is my second week progress report at Tech Innovations LLC.

Accomplishments this week:
- Implemented a new UI component for the dashboard
- Fixed 3 bugs in the existing codebase
- Participated in my first code review
- Attended the team's planning meeting

Challenges faced:
- Debugging cross-browser compatibility issues
- Understanding some of the legacy code

Next week's goals:
- Start working on a larger feature
- Improve test coverage for my components
- Learn more about state management patterns`,
    status: 'submitted',
    feedback: "You're making good progress! Try to focus more on writing tests for your components.",
    internshipId: 1
  },
  {
    id: 3,
    title: 'First Week Progress Report',
    date: '05/01/2022',
    type: 'Weekly',
    submittedBy: 'John Smith',
    content: `This is my first week progress report at Data Systems.

During this first week, I have:
- Completed the orientation process
- Set up my development environment with Docker
- Learned about the company's API design principles
- Started working on database schema designs

Challenges faced:
- Understanding the complex database architecture
- Getting up to speed with the team's Agile workflow

Next week's goals:
- Implement my first API endpoint
- Create unit tests for my code
- Learn more about query optimization`,
    status: 'submitted',
    feedback: 'Good start with the database work. For next week, focus on the API security aspects as well.',
    internshipId: 2
  }
];

const ReportCRUD = () => {
  const { id: internshipId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('list');
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState('');
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  
  // Form state for create/edit
  const [formData, setFormData] = useState({
    title: '',
    type: 'Weekly',
    content: '',
    relatedCourses: []
  });
  
  // University majors options
  const majorOptions = [
    { value: '', label: 'All Majors' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'computer-engineering', label: 'Computer Engineering' },
    { value: 'electrical-engineering', label: 'Electrical Engineering' },
    { value: 'mechanical-engineering', label: 'Mechanical Engineering' },
    { value: 'civil-engineering', label: 'Civil Engineering' },
    { value: 'business-administration', label: 'Business Administration' },
    { value: 'finance', label: 'Finance' },
    { value: 'accounting', label: 'Accounting' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'graphic-design', label: 'Graphic Design' },
    { value: 'architecture', label: 'Architecture' }
  ];
  
  // Courses by major
  const coursesByMajor = {
    'computer-science': [
      { value: 'cs101', label: 'CS101: Introduction to Programming' },
      { value: 'cs201', label: 'CS201: Data Structures and Algorithms' },
      { value: 'cs301', label: 'CS301: Database Systems' },
      { value: 'cs401', label: 'CS401: Software Engineering' },
      { value: 'cs501', label: 'CS501: Artificial Intelligence' }
    ],
    'computer-engineering': [
      { value: 'ce101', label: 'CE101: Digital Logic Design' },
      { value: 'ce201', label: 'CE201: Computer Architecture' },
      { value: 'ce301', label: 'CE301: Embedded Systems' },
      { value: 'ce401', label: 'CE401: Computer Networks' }
    ],
    'electrical-engineering': [
      { value: 'ee101', label: 'EE101: Circuit Analysis' },
      { value: 'ee201', label: 'EE201: Electronics' },
      { value: 'ee301', label: 'EE301: Signals and Systems' },
      { value: 'ee401', label: 'EE401: Power Systems' }
    ],
    'mechanical-engineering': [
      { value: 'me101', label: 'ME101: Engineering Mechanics' },
      { value: 'me201', label: 'ME201: Thermodynamics' },
      { value: 'me301', label: 'ME301: Fluid Mechanics' },
      { value: 'me401', label: 'ME401: Machine Design' }
    ],
    'civil-engineering': [
      { value: 'cv101', label: 'CV101: Structural Analysis' },
      { value: 'cv201', label: 'CV201: Geotechnical Engineering' },
      { value: 'cv301', label: 'CV301: Transportation Engineering' },
      { value: 'cv401', label: 'CV401: Environmental Engineering' }
    ],
    'business-administration': [
      { value: 'ba101', label: 'BA101: Principles of Management' },
      { value: 'ba201', label: 'BA201: Organizational Behavior' },
      { value: 'ba301', label: 'BA301: Strategic Management' },
      { value: 'ba401', label: 'BA401: Business Ethics' }
    ],
    'finance': [
      { value: 'fin101', label: 'FIN101: Financial Management' },
      { value: 'fin201', label: 'FIN201: Investment Analysis' },
      { value: 'fin301', label: 'FIN301: Financial Markets' },
      { value: 'fin401', label: 'FIN401: International Finance' }
    ],
    'accounting': [
      { value: 'acc101', label: 'ACC101: Financial Accounting' },
      { value: 'acc201', label: 'ACC201: Managerial Accounting' },
      { value: 'acc301', label: 'ACC301: Taxation' },
      { value: 'acc401', label: 'ACC401: Auditing' }
    ],
    'marketing': [
      { value: 'mkt101', label: 'MKT101: Marketing Principles' },
      { value: 'mkt201', label: 'MKT201: Consumer Behavior' },
      { value: 'mkt301', label: 'MKT301: Digital Marketing' },
      { value: 'mkt401', label: 'MKT401: Marketing Research' }
    ],
    'graphic-design': [
      { value: 'gd101', label: 'GD101: Typography' },
      { value: 'gd201', label: 'GD201: Visual Communication' },
      { value: 'gd301', label: 'GD301: Web Design' },
      { value: 'gd401', label: 'GD401: Branding and Identity' }
    ],
    'architecture': [
      { value: 'arch101', label: 'ARCH101: Architectural Design' },
      { value: 'arch201', label: 'ARCH201: Building Construction' },
      { value: 'arch301', label: 'ARCH301: Architectural History' },
      { value: 'arch401', label: 'ARCH401: Urban Planning' }
    ]
  };
  
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll simulate fetching reports for the specific internship
    const fetchReports = () => {
      // Simulate API delay
      setTimeout(() => {
        const filteredReports = mockReports.filter(
          report => report.internshipId === parseInt(internshipId)
        );
        setReports(filteredReports);
      }, 300);
    };
    
    fetchReports();
  }, [internshipId]);
  
  const handleGoBack = () => {
    navigate(`/internship-details/${internshipId}`);
  };
  
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          report.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || report.type === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  
  const handleViewReport = (report) => {
    setSelectedReport(report);
    setActiveTab('view');
  };
  
  const handleCreateReport = () => {
    setFormData({
      title: '',
      type: 'Weekly',
      content: '',
      relatedCourses: []
    });
    setSelectedCourses([]);
    setIsEditing(false);
    setActiveTab('create');
  };
  
  const handleEditReport = (report) => {
    // Find the course objects from the course values
    let relatedCourseObjects = [];
    if (report.relatedCourses && report.relatedCourses.length > 0) {
      // Find the major for these courses
      let foundMajor = '';
      for (const [major, courses] of Object.entries(coursesByMajor)) {
        if (courses.some(course => report.relatedCourses.includes(course.value))) {
          foundMajor = major;
          break;
        }
      }
      
      // Set the major and available courses
      if (foundMajor) {
        setSelectedMajor(foundMajor);
        setCourseOptions(coursesByMajor[foundMajor]);
        
        // Find the course objects
        relatedCourseObjects = coursesByMajor[foundMajor].filter(
          course => report.relatedCourses.includes(course.value)
        );
      }
    }
    
    setSelectedCourses(relatedCourseObjects);
    setFormData({
      id: report.id,
      title: report.title,
      type: report.type,
      content: report.content,
      relatedCourses: report.relatedCourses || []
    });
    setIsEditing(true);
    setActiveTab('create');
  };
  
  const handleDeleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      // In a real app, this would be an API call
      setReports(reports.filter(report => report.id !== reportId));
    }
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would be an API call
    if (isEditing) {
      // Update existing report
      setReports(reports.map(report => 
        report.id === formData.id ? { ...report, ...formData } : report
      ));
    } else {
      // Create new report
      const newReport = {
        id: Date.now(), // This would be created on the server in a real app
        ...formData,
        date: new Date().toLocaleDateString('en-GB'),
        submittedBy: 'John Smith', // This would be the current user
        status: 'submitted',
        feedback: '',
        internshipId: parseInt(internshipId)
      };
      
      setReports([...reports, newReport]);
    }
    
    // Reset form and go back to list view
    setActiveTab('list');
  };
  
  // Add handler for major selection
  const handleMajorChange = (e) => {
    const major = e.target.value;
    setSelectedMajor(major);
    
    // Update available courses based on selected major
    if (major && coursesByMajor[major]) {
      setCourseOptions(coursesByMajor[major]);
      // Reset the selected courses when major changes
      setSelectedCourses([]);
      setFormData(prev => ({ ...prev, relatedCourses: [] }));
    } else {
      setCourseOptions([]);
    }
  };
  
  // Add handler for course selection
  const handleCourseToggle = (course) => {
    const courseExists = selectedCourses.some(c => c.value === course.value);
    
    let updatedCourses;
    if (courseExists) {
      // Remove course if already selected
      updatedCourses = selectedCourses.filter(c => c.value !== course.value);
    } else {
      // Add course if not already selected
      updatedCourses = [...selectedCourses, course];
    }
    
    setSelectedCourses(updatedCourses);
    setFormData(prev => ({ ...prev, relatedCourses: updatedCourses.map(c => c.value) }));
  };
  
  // Remove a selected course
  const handleRemoveCourse = (courseValue) => {
    const updatedCourses = selectedCourses.filter(c => c.value !== courseValue);
    setSelectedCourses(updatedCourses);
    setFormData(prev => ({ ...prev, relatedCourses: updatedCourses.map(c => c.value) }));
  };
  
  const renderReportList = () => {
    if (filteredReports.length === 0) {
      return (
        <EmptyState>
          <EmptyStateIcon>
            <FaFileAlt />
          </EmptyStateIcon>
          <EmptyStateTitle>No reports found</EmptyStateTitle>
          <EmptyStateText>No reports match your search criteria or no reports have been created yet.</EmptyStateText>
          <Button
            variant="primary"
            icon={<FaPlus />}
            onClick={handleCreateReport}
          >
            Create New Report
          </Button>
        </EmptyState>
      );
    }
    
    return filteredReports.map(report => (
      <ReportCard key={report.id}>
        <ReportHeader>
          <ReportTitle>{report.title}</ReportTitle>
          <ReportActions>
            <ActionIcon onClick={() => handleViewReport(report)}>
              <FaEye />
            </ActionIcon>
            <ActionIcon onClick={() => handleEditReport(report)}>
              <FaEdit />
            </ActionIcon>
            <ActionIcon onClick={() => handleDeleteReport(report.id)}>
              <FaTrash />
            </ActionIcon>
          </ReportActions>
        </ReportHeader>
        <ReportContent>
          <ReportInfo>
            <ReportInfoItem>
              <FaCalendarAlt /> {report.date}
            </ReportInfoItem>
            <ReportInfoItem>
              <FaFile /> {report.type} Report
            </ReportInfoItem>
            <ReportInfoItem>
              <FaUser /> {report.submittedBy}
            </ReportInfoItem>
          </ReportInfo>
          <ReportDescription>
            {report.content.substring(0, 200)}...
          </ReportDescription>
          <Button
            variant="secondary"
            size="small"
            onClick={() => handleViewReport(report)}
          >
            Read Full Report
          </Button>
        </ReportContent>
      </ReportCard>
    ));
  };
  
  // Custom MultiSelect component for courses
  const MultiSelect = ({ label, options, selectedValues, onToggle }) => {
    return (
      <MultiSelectContainer>
        <MultiSelectLabel>{label}</MultiSelectLabel>
        <MultiSelectOptions>
          {options.map(option => (
            <MultiSelectOption key={option.value} onClick={() => onToggle(option)}>
              <input 
                type="checkbox" 
                id={`option-${option.value}`}
                checked={selectedValues.some(c => c.value === option.value)}
                onChange={() => {}}
              />
              <label htmlFor={`option-${option.value}`}>{option.label}</label>
            </MultiSelectOption>
          ))}
          {options.length === 0 && (
            <div style={{ padding: '8px', color: '#666', fontStyle: 'italic' }}>
              Please select a major to see available courses
            </div>
          )}
        </MultiSelectOptions>
        
        {selectedValues.length > 0 && (
          <SelectedCoursesContainer>
            {selectedValues.map(course => (
              <SelectedCourseTag key={course.value}>
                {course.label.split(':')[0]}
                <button onClick={() => handleRemoveCourse(course.value)}>
                  <FaTimes size={12} />
                </button>
              </SelectedCourseTag>
            ))}
          </SelectedCoursesContainer>
        )}
      </MultiSelectContainer>
    );
  };
  
  const renderCreateForm = () => (
    <CreateReportForm onSubmit={handleFormSubmit}>
      <div style={{ marginBottom: '2rem', backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <FaGraduationCap style={{ marginRight: '0.5rem', color: '#084B8A' }} />
          <h3 style={{ margin: 0, color: '#084B8A', fontSize: '1.2rem' }}>Academic Context</h3>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <Select
              label="Major"
              id="majorSelect"
              value={selectedMajor}
              onChange={handleMajorChange}
              options={majorOptions}
              placeholder="Select your major"
            />
          </div>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <MultiSelect
              label="Related Courses"
              options={courseOptions}
              selectedValues={selectedCourses}
              onToggle={handleCourseToggle}
            />
          </div>
        </div>
      </div>
      
      <FormGroup>
        <FormLabel htmlFor="title">Report Title</FormLabel>
        <FormInput
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleFormChange}
          placeholder="Enter report title"
          required
        />
      </FormGroup>
      
      <FormGroup>
        <FormLabel htmlFor="type">Report Type</FormLabel>
        <FilterSelect
          id="type"
          name="type"
          value={formData.type}
          onChange={handleFormChange}
          required
        >
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Final">Final</option>
          <option value="Special">Special</option>
        </FilterSelect>
      </FormGroup>
      
      <FormGroup>
        <FormLabel htmlFor="content">Report Content</FormLabel>
        <FormTextArea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleFormChange}
          placeholder="Write your report here..."
          required
        />
      </FormGroup>
      
      <FormActions>
        <Button
          variant="secondary"
          icon={<FaTimes />}
          onClick={() => setActiveTab('list')}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          icon={<FaSave />}
          type="submit"
        >
          {isEditing ? 'Update Report' : 'Submit Report'}
        </Button>
      </FormActions>
    </CreateReportForm>
  );
  
  const renderReportDetail = () => {
    if (!selectedReport) return null;
    
    return (
      <ReportDetailContent>
        <ReportDetailHeader>
          <ReportDetailTitle>{selectedReport.title}</ReportDetailTitle>
          <ReportActions>
            <Button
              variant="secondary"
              icon={<FaEdit />}
              onClick={() => handleEditReport(selectedReport)}
              style={{ marginRight: '0.5rem' }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              icon={<FaTrash />}
              onClick={() => {
                handleDeleteReport(selectedReport.id);
                setActiveTab('list');
              }}
            >
              Delete
            </Button>
          </ReportActions>
        </ReportDetailHeader>
        
        <ReportDetailMeta>
          <ReportInfo>
            <ReportInfoItem>
              <FaCalendarAlt /> Submitted on: {selectedReport.date}
            </ReportInfoItem>
            <ReportInfoItem>
              <FaFile /> {selectedReport.type} Report
            </ReportInfoItem>
            <ReportInfoItem>
              <FaUser /> Submitted by: {selectedReport.submittedBy}
            </ReportInfoItem>
          </ReportInfo>
        </ReportDetailMeta>
        
        <ReportDetailSection>
          <ReportDetailSectionTitle>
            <FaFileAlt /> Report Content
          </ReportDetailSectionTitle>
          <ReportDetailText>
            {selectedReport.content}
          </ReportDetailText>
        </ReportDetailSection>
        
        {selectedReport.feedback && (
          <ReportDetailSection>
            <ReportDetailSectionTitle>
              <FaUser /> Supervisor Feedback
            </ReportDetailSectionTitle>
            <ReportDetailText>
              {selectedReport.feedback}
            </ReportDetailText>
          </ReportDetailSection>
        )}
        
        <Button
          variant="secondary"
          icon={<FaArrowLeft />}
          onClick={() => setActiveTab('list')}
          style={{ marginTop: '1rem' }}
        >
          Back to Report List
        </Button>
      </ReportDetailContent>
    );
  };
  
  return (
    <PageContainer>
      <Navbar userType="student" />
      <ContentContainer>
        <BackButton onClick={handleGoBack}>
          <FaArrowLeft /> Back to Internship Details
        </BackButton>
        
        <PageHeader>
          <PageTitle>
            <FaFileAlt /> Internship Reports
          </PageTitle>
          <PageDescription>Create, view and manage your internship reports</PageDescription>
        </PageHeader>

        <TabContainer>
          <Tab
            active={activeTab === 'list'}
            onClick={() => setActiveTab('list')}
          >
            All Reports
          </Tab>
          <Tab
            active={activeTab === 'create'}
            onClick={handleCreateReport}
          >
            Create Report
          </Tab>
          {activeTab === 'view' && (
            <Tab active>
              View Report
            </Tab>
          )}
        </TabContainer>
        
        {activeTab === 'list' && (
          <>
            <ActionBar>
              <div style={{ display: 'flex' }}>
                <SearchInput
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <FilterSelect
                  value={filter}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Types</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Final">Final</option>
                  <option value="Special">Special</option>
                </FilterSelect>
              </div>
              <Button
                variant="primary"
                icon={<FaPlus />}
                onClick={handleCreateReport}
              >
                Create New Report
              </Button>
            </ActionBar>
            {renderReportList()}
          </>
        )}
        
        {activeTab === 'create' && renderCreateForm()}
        
        {activeTab === 'view' && renderReportDetail()}
      </ContentContainer>
    </PageContainer>
  );
};

export default ReportCRUD; 