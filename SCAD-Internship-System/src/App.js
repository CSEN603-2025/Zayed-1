import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CompanyRegistration from './pages/CompanyRegistration';
import StudentProfile from './pages/StudentProfile';
import CompanyDashboard from './pages/CompanyDashboard/CompanyDashboard';
import ScadDashboard from './pages/ScadDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import FacultyFeedback from './pages/FacultyFeedback';
import InternshipListings from './pages/InternshipListings';
import MyInternships from './pages/MyInternships';
import InternshipDetails from './pages/InternshipDetails';
import InternshipDetailView from './pages/InternshipDetailView';
import InternshipPost from './pages/InternshipPost';
import ApplicationList from './pages/ApplicationList';
import InternList from './pages/InternList';
import ReportCreate from './pages/ReportCreate';
import ReportList from './pages/ReportList';
import ReportDetails from './pages/ReportDetails';
import EvaluationForm from './pages/EvaluationForm';
import EvaluationReport from './pages/EvaluationReport';
import Workshop from './pages/Workshop';
import WorkshopDetails from './pages/WorkshopDetails';
import WorkshopCall from './pages/WorkshopCall';
import WorkshopProposal from './pages/WorkshopProposal';
import WorkshopManagement from './pages/WorkshopManagement';
import CompanyDetails from './pages/CompanyDetails';
import CompanyList from './pages/CompanyList';
import InternProfilePreview from './pages/InternProfilePreview';
import MyReports from './pages/MyReports';
import CareerGuidance from './pages/CareerGuidance';
import VideoCall from './pages/VideoCall';
import Assessments from './pages/Assessments';
import AssessmentTaking from './pages/AssessmentTaking';
import AssessmentResults from './pages/AssessmentResults';
import ReportCRUD from './pages/ReportCRUD';
import CompanyEvaluation from './pages/CompanyEvaluation';
import ErrorPage from './pages/Error';

const AppContainer = styled.div`
  font-family: ${props => props.theme.fonts.main};
  min-height: 100vh;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Login />} />
              <Route path="/register/company" element={<CompanyRegistration />} />
              <Route path="/error" element={<ErrorPage />} />
              
              {/* Student routes */}
              <Route path="/report-management/:id" element={
                <ProtectedRoute 
                  element={<ReportCRUD />} 
                  allowedUserTypes={['student', 'proStudent']} 
                />
              } />
              <Route path="/internship-details/:id" element={
                <ProtectedRoute 
                  element={<InternshipDetailView />} 
                  allowedUserTypes={['student', 'proStudent']} 
                />
              } />
              <Route path="/student/internships/:id" element={
                <ProtectedRoute 
                  element={<MyInternships />} 
                  allowedUserTypes={['student', 'proStudent']} 
                />
              } />
              <Route path="/student/companies/:id/evaluate" element={
                <ProtectedRoute 
                  element={<CompanyEvaluation />} 
                  allowedUserTypes={['student', 'proStudent']} 
                />
              } />


              <Route path="/dashboard" element={
                <ProtectedRoute 
                  element={<Dashboard />} 
                  allowedUserTypes={['student', 'proStudent']} 
                />
              } />
              <Route path="/profile" element={
                <ProtectedRoute 
                  element={<StudentProfile />} 
                  allowedUserTypes={['student', 'proStudent']} 
                />
              } />
              <Route path="/report/create" element={
                <ProtectedRoute 
                  element={<ReportCreate />} 
                  allowedUserTypes={['student', 'proStudent']} 
                />
              } />
              <Route path="/report/list" element={
                <ProtectedRoute 
                  element={<ReportList />} 
                  allowedUserTypes={['student', 'proStudent']} 
                />
              } />
              <Route path="/my-reports" element={
                <ProtectedRoute 
                  element={<MyReports />} 
                  allowedUserTypes={['student', 'proStudent']} 
                />
              } />
              <Route path="/student/companies/:id" element={
                <ProtectedRoute 
                  element={<CompanyDetails />} 
                  allowedUserTypes={['student', 'proStudent']} 
                />
              } />

              
              {/* Routes for workshops */}
              <Route path="/workshops" element={
                <ProtectedRoute 
                  element={<Workshop />} 
                  allowedUserTypes={['student', 'proStudent']} 
                />
              } />
              <Route path="/workshops/calls" element={
                <ProtectedRoute 
                  element={<WorkshopCall />} 
                  allowedUserTypes={['scadOffice']} 
                />
              } />
              <Route path="/workshops/calls/:id" element={
                <ProtectedRoute 
                  element={<WorkshopCall />} 
                  allowedUserTypes={['scadOffice']} 
                />
              } />
              <Route path="/workshops/proposal/:id" element={
                <ProtectedRoute 
                  element={<WorkshopProposal />} 
                  allowedUserTypes={['company']} 
                />
              } />
              <Route path="/workshops/:id" element={
                <ProtectedRoute 
                  element={<WorkshopDetails />} 
                  allowedUserTypes={['student', 'proStudent', 'scadOffice']} 
                />
              } />
              
              {/* Company routes */}
              <Route path="/company/dashboard" element={
                <ProtectedRoute 
                  element={<CompanyDashboard />} 
                  allowedUserTypes={['company']} 
                />
              } />
              <Route path="/company/interns" element={
                <ProtectedRoute 
                  element={<InternList />} 
                  allowedUserTypes={['company']} 
                />
              } />
              <Route path="/company/interns/evaluation/:id" element={
                <ProtectedRoute 
                  element={<EvaluationForm />} 
                  allowedUserTypes={['company']} 
                />
              } />
              <Route path="/company/interns/:id" element={
                <ProtectedRoute 
                  element={<InternProfilePreview />} 
                  allowedUserTypes={['company']} 
                />
              } />
              <Route path="/company/applicants/:id" element={
                <ProtectedRoute 
                  element={<InternProfilePreview />} 
                  allowedUserTypes={['company']} 
                />
              } />
              
              {/* SCAD Office routes */}
              <Route path="/scad/companies" element={
                <ProtectedRoute 
                  element={<CompanyList />} 
                  allowedUserTypes={['scadOffice']} 
                />
              } />
              <Route path="/scad/companies/:id" element={
                <ProtectedRoute 
                  element={<CompanyDetails />} 
                  allowedUserTypes={['scadOffice']} 
                />
              } />
              <Route path="/scad/dashboard" element={
                <ProtectedRoute 
                  element={<ScadDashboard />} 
                  allowedUserTypes={['scadOffice']} 
                />
              } />
              <Route path="/scad/workshops" element={
                <ProtectedRoute 
                  element={<WorkshopManagement />} 
                  allowedUserTypes={['scadOffice']} 
                />
              } />
              <Route path="/scad/studentPreview" element={
                <ProtectedRoute 
                  element={<InternProfilePreview />} 
                  allowedUserTypes={['scadOffice']} 
                />
              } />
              <Route path="/scad/viewReport" element={
                <ProtectedRoute 
                  element={<ReportDetails />} 
                  allowedUserTypes={['scadOffice']} 
                />
              } />
              
              {/* Faculty routes */}
              <Route path="/faculty/dashboard" element={
                <ProtectedRoute 
                  element={<FacultyDashboard />} 
                  allowedUserTypes={['faculty']} 
                />
              } />
              <Route path="/faculty/feedback" element={
                <ProtectedRoute 
                  element={<FacultyFeedback />} 
                  allowedUserTypes={['faculty']} 
                />
              } />
              <Route path="/faculty/reports" element={
                <ProtectedRoute 
                  element={<ReportList />} 
                  allowedUserTypes={['faculty']} 
                />
              } />
              
              {/* Career Guidance routes */}
              <Route path="/career-guidance" element={
                <ProtectedRoute 
                  element={<CareerGuidance />} 
                  allowedUserTypes={['student', 'proStudent', 'scadOffice']} 
                />
              } />
              <Route path="/career-guidance/call/:appointmentId" element={
                <ProtectedRoute 
                  element={<VideoCall />} 
                  allowedUserTypes={['student', 'proStudent', 'scadOffice']} 
                />
              } />
              
              {/* PRO Student routes */}
              <Route path="/internships" element={
                <ProtectedRoute 
                  element={<InternshipListings />} 
                  allowedUserTypes={['proStudent']} 
                />
              } />
              <Route path="/internships/post" element={
                <ProtectedRoute 
                  element={<InternshipPost />} 
                  allowedUserTypes={['company', 'scadOffice']} 
                />
              } />
              <Route path="/internships/edit/:id" element={
                <ProtectedRoute 
                  element={<InternshipPost />} 
                  allowedUserTypes={['company', 'scadOffice']} 
                />
              } />
              <Route path="/internships/:id" element={
                <ProtectedRoute 
                  element={<InternshipDetails />} 
                  allowedUserTypes={['proStudent', 'company', 'scadOffice']} 
                />
              } />
              <Route path="/applications" element={
                <ProtectedRoute 
                  element={<ApplicationList />} 
                  allowedUserTypes={['proStudent', 'company', 'scadOffice']} 
                />
              } />
              <Route path="/interns" element={
                <ProtectedRoute 
                  element={<InternList />} 
                  allowedUserTypes={['company', 'scadOffice']} 
                />
              } />
              <Route path="/report/:id" element={
                <ProtectedRoute 
                  element={<ReportDetails />} 
                  allowedUserTypes={['student', 'proStudent', 'faculty', 'scadOffice']} 
                />
              } />
              <Route path="/evaluation/create/:id" element={
                <ProtectedRoute 
                  element={<EvaluationForm />} 
                  allowedUserTypes={['company']} 
                />
              } />
              <Route path="/evaluation/:id" element={
                <ProtectedRoute 
                  element={<EvaluationReport />} 
                  allowedUserTypes={['company', 'proStudent', 'scadOffice']} 
                />
              } />
              <Route path="/assessments" element={
                <ProtectedRoute 
                  element={<Assessments />} 
                  allowedUserTypes={['proStudent']} 
                />
              } />
              <Route path="/assessments/take/:id" element={
                <ProtectedRoute 
                  element={<AssessmentTaking />} 
                  allowedUserTypes={['proStudent']} 
                />
              } />
              <Route path="/assessments/results/:id" element={
                <ProtectedRoute 
                  element={<AssessmentResults />} 
                  allowedUserTypes={['proStudent']} 
                />
              } />

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/error" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
