import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CompanyRegistration from './pages/CompanyRegistration';
import StudentProfile from './pages/StudentProfile';
import CompanyDashboard from './pages/CompanyDashboard';
import ScadDashboard from './pages/ScadDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import FacultyFeedback from './pages/FacultyFeedback';
import InternshipListings from './pages/InternshipListings';
import InternshipDetails from './pages/InternshipDetails';
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
import CompanyDetails from './pages/CompanyDetails';
import CompanyList from './pages/CompanyList';
import InternProfilePreview from './pages/InternProfilePreview';
import MyReports from './pages/MyReports';

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
              
              {/* Student routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<StudentProfile />} />
              <Route path="/report/create" element={<ReportCreate />} />
              <Route path="/report/list" element={<ReportList />} />
              <Route path="/my-reports" element={<MyReports />} />
              
              {/* Routes for workshops */}
              <Route path="/workshops" element={<Workshop />} />
              <Route path="/workshops/calls" element={<WorkshopCall />} />
              <Route path="/workshops/calls/:id" element={<WorkshopCall />} />
              <Route path="/workshops/proposal/:id" element={<WorkshopProposal />} />
              <Route path="/workshops/:id" element={<WorkshopDetails />} />
              
              {/* Company routes */}
              <Route path="/company/dashboard" element={<CompanyDashboard />} />
              <Route path="/company/interns" element={<InternList />} />
              <Route path="/company/interns/evaluation/:id" element={<EvaluationForm />} />
              <Route path="/company/interns/:id" element={<InternProfilePreview />} />
              <Route path="/company/applicants/:id" element={<InternProfilePreview />} />
              
              {/* SCAD Office routes */}
              <Route path="/scad/companies" element={<CompanyList />} />
              <Route path="/scad/companies/:id" element={<CompanyDetails />} />
              <Route path="/scad/dashboard" element={<ScadDashboard />} />
              <Route path="/scad/studentPreview" element={<InternProfilePreview />} />
              <Route path="/scad/viewReport" element={<ReportDetails />} />
              
              {/* Faculty routes */}
              <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
              <Route path="/faculty/feedback" element={<FacultyFeedback />} />
              <Route path="/faculty/reports" element={<ReportList />} />
              
              {/* Shared routes - Order matters for routing! */}
              <Route path="/internships" element={<InternshipListings />} />
              <Route path="/internships/post" element={<InternshipPost />} />
              <Route path="/internships/edit/:id" element={<InternshipPost />} />
              <Route path="/internships/:id" element={<InternshipDetails />} />
              <Route path="/applications" element={<ApplicationList />} />
              <Route path="/interns" element={<InternList />} />
              <Route path="/report/:id" element={<ReportDetails />} />
              <Route path="/evaluation/create/:id" element={<EvaluationForm />} />
              <Route path="/evaluation/:id" element={<EvaluationReport />} />

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </AuthProvider>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
