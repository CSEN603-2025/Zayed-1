import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaUsers, FaHistory } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Card from '../../components/Card';
import * as Styles from './Styles';
import useToast from './hooks/useToast';
import { mockInternships, mockInterns, initialApplications } from './data/mockData';
import {
  StatCards,
  StatusNotification,
  InternshipActions,
  InternshipTable,
  ApplicationActions,
  ApplicationsTable,
  CreateInternshipModal,
  ViewInternshipModal,
  EditInternshipModal,
  ToastNotifications
} from './components';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('internships');
  const [internshipSearchTerm, setInternshipSearchTerm] = useState('');
  const [applicationSearchTerm, setApplicationSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterInternship, setFilterInternship] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentInternship, setCurrentInternship] = useState(null);
  const [internships, setInternships] = useState(mockInternships);
  const [applications, setApplications] = useState(initialApplications);
  const [prevInternshipSearchTerm, setPrevInternshipSearchTerm] = useState('');
  
  const { toasts, showToast, removeToast } = useToast();
  
  const [newInternship, setNewInternship] = useState({
    title: '',
    description: '',
    requirements: '',
    duration: '',
    isPaid: false,
    salary: '',
    location: '',
    startDate: '',
    endDate: '',
    status: 'draft'
  });
  
  const handleInternshipSearchChange = (e) => {
    setInternshipSearchTerm(e.target.value);
  };
  
  const handleApplicationSearchChange = (e) => {
    setApplicationSearchTerm(e.target.value);
  };
  
  const handlePrevInternshipSearchChange = (e) => {
    setPrevInternshipSearchTerm(e.target.value);
  };
  
  const filteredInternships = internships.filter(internship => 
    internship.title.toLowerCase().includes(internshipSearchTerm.toLowerCase())
    && (filterStatus === 'all' || internship.status === filterStatus)
  );
  
  const filteredApplications = applications.filter(application => 
    (application.student.toLowerCase().includes(applicationSearchTerm.toLowerCase()) ||
    application.position.toLowerCase().includes(applicationSearchTerm.toLowerCase()))
    && (filterInternship === 'all' || application.position === filterInternship)
  );
  
  const filteredInterns = mockInterns.filter(intern => 
    intern.name.toLowerCase().includes(applicationSearchTerm.toLowerCase()) ||
    intern.position.toLowerCase().includes(applicationSearchTerm.toLowerCase())
  );
  
  const previousInternships = internships.filter(internship => 
    internship.status === 'closed' && 
    internship.title.toLowerCase().includes(prevInternshipSearchTerm.toLowerCase())
  );
  
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewInternship({
      title: '',
      description: '',
      requirements: '',
      duration: '',
      isPaid: false,
      salary: '',
      location: '',
      startDate: '',
      endDate: '',
      status: 'draft'
    });
  };
  
  const handleCreateInternship = () => {
    const createdInternship = {
      ...newInternship,
      id: internships.length > 0 ? Math.max(...internships.map(i => i.id)) + 1 : 1,
      applications: 0,
      posted: new Date().toLocaleDateString('en-US'),
      paid: newInternship.isPaid
    };
    
    setInternships(prev => [...prev, createdInternship]);
    
    closeCreateModal();
    
    showToast('Internship created successfully!', 'success');
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewInternship(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleViewInternship = (id) => {
    const internship = internships.find(item => item.id === id);
    setCurrentInternship(internship);
    setIsViewModalOpen(true);
  };
  
  const handleEditInternship = (id) => {
    const internship = internships.find(item => item.id === id);
    
    setCurrentInternship({
      ...internship,
      description: internship.description || 'This is a mock description for the internship.',
      requirements: internship.requirements || 'These are mock requirements for the internship.',
      location: internship.location || 'Remote',
      startDate: internship.startDate || '2023-06-01',
      endDate: internship.endDate || '2023-09-01',
      salary: internship.salary || (internship.paid ? '1000 AED/month' : ''),
      isPaid: internship.paid
    });
    
    setIsEditModalOpen(true);
  };
  
  const handleUpdateInternship = () => {
    setInternships(prevInternships => 
      prevInternships.map(internshipItem => 
        internshipItem.id === currentInternship.id 
          ? {
              ...internshipItem,
              title: currentInternship.title,
              description: currentInternship.description,
              requirements: currentInternship.requirements,
              duration: currentInternship.duration,
              paid: currentInternship.isPaid,
              status: currentInternship.status,
              location: currentInternship.location,
              startDate: currentInternship.startDate,
              endDate: currentInternship.endDate,
              salary: currentInternship.salary
            } 
          : internshipItem
      )
    );
    
    setIsEditModalOpen(false);
    
    showToast('Internship updated successfully!', 'success');
  };
  
  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentInternship(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleDeleteInternship = (id) => {
    setInternships(prevInternships => 
      prevInternships.filter(internship => internship.id !== id)
    );
    
    showToast('Internship deleted successfully!', 'success');
  };
  
  const handleViewApplication = (id) => {
    navigate(`/company/applicants/${id}`);
  };
  
  const handleStatusChange = (id, newStatus) => {
    setApplications(prevApps => 
      prevApps.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
    
    showToast(`Application status updated to ${newStatus}`, 'success');
  };
  
  return (
    <Styles.PageContainer>
      <Navbar userType="company" />
      
      <Styles.ContentContainer>
        <Styles.DashboardHeader>
          <Styles.PageTitle>Company Dashboard</Styles.PageTitle>
          <Styles.PageDescription>Manage your internships, applications, and interns</Styles.PageDescription>
        </Styles.DashboardHeader>
        
        <StatusNotification />
        
        <StatCards 
          internships={internships} 
          applications={applications} 
          currentInterns={mockInterns.filter(intern => intern.status === 'current').length}
          navigate={navigate}
        />
        
        <Styles.SectionTitle>
          <FaBriefcase /> Internship Listings
        </Styles.SectionTitle>
        
        <InternshipActions
          searchTerm={internshipSearchTerm}
          handleSearchChange={handleInternshipSearchChange}
          filterStatus={filterStatus}
          handleFilterChange={(e) => setFilterStatus(e.target.value)}
          handleCreateClick={openCreateModal}
        />
        
        <InternshipTable 
          filteredInternships={filteredInternships}
          handleViewInternship={handleViewInternship}
          handleEditInternship={handleEditInternship}
          handleDeleteInternship={handleDeleteInternship}
        />
        
        <Styles.SectionTitle>
          <FaUsers /> Recent Applications
        </Styles.SectionTitle>
        
        <ApplicationActions
          searchTerm={applicationSearchTerm}
          handleSearchChange={handleApplicationSearchChange}
          filterInternship={filterInternship}
          handleFilterChange={(e) => setFilterInternship(e.target.value)}
          internships={internships}
        />
        
        <ApplicationsTable
          filteredApplications={filteredApplications}
          handleViewApplication={handleViewApplication}
          handleStatusChange={handleStatusChange}
        />
      </Styles.ContentContainer>
      
      <CreateInternshipModal
        isOpen={isCreateModalOpen}
        newInternship={newInternship}
        handleInputChange={handleInputChange}
        closeModal={closeCreateModal}
        handleCreateInternship={handleCreateInternship}
      />
      
      <ViewInternshipModal
        isOpen={isViewModalOpen}
        internship={currentInternship}
        closeModal={() => setIsViewModalOpen(false)}
        handleEditInternship={handleEditInternship}
      />
      
      <EditInternshipModal
        isOpen={isEditModalOpen}
        internship={currentInternship}
        handleInputChange={handleEditInputChange}
        closeModal={() => setIsEditModalOpen(false)}
        handleUpdateInternship={handleUpdateInternship}
      />
      
      <ToastNotifications toasts={toasts} removeToast={removeToast} />
    </Styles.PageContainer>
  );
};

export default CompanyDashboard;