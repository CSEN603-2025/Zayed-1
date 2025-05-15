import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import { FaArrowLeft, FaCloudUploadAlt } from 'react-icons/fa';

const RegistrationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.light};
  padding: 2rem;
`;

const RegistrationCard = styled.div`
  width: 100%;
  max-width: 700px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const BackButton = styled.div`
  margin-right: 1rem;
  cursor: pointer;
  color: ${props => props.theme.colors.primary};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 1.8rem;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FileUploadLabel = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

const FileUploadBox = styled.div`
  border: 2px dashed ${props => props.theme.colors.secondary};
  border-radius: 5px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.light};
  }
`;

const FileIcon = styled(FaCloudUploadAlt)`
  font-size: 2rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 1rem;
`;

const FileName = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.secondary};
`;

const HiddenInput = styled.input`
  display: none;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const CompanyRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    industry: '',
    companySize: '',
    logo: null,
    taxDocuments: null,
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  
  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'hospitality', label: 'Hospitality' },
    { value: 'media', label: 'Media & Entertainment' },
    { value: 'telecommunications', label: 'Telecommunications' },
    { value: 'other', label: 'Other' }
  ];
  
  const companySizeOptions = [
    { value: 'small', label: 'Small (50 employees or less)' },
    { value: 'medium', label: 'Medium (51-100 employees)' },
    { value: 'large', label: 'Large (101-500 employees)' },
    { value: 'corporate', label: 'Corporate (500+ employees)' }
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
      
      // Clear error when file is uploaded
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: null
        }));
      }
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }
    
    if (!formData.companySize) {
      newErrors.companySize = 'Company size is required';
    }
    
    if (!formData.logo) {
      newErrors.logo = 'Company logo is required';
    }
    
    if (!formData.taxDocuments) {
      newErrors.taxDocuments = 'Tax documents are required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create a new company object with pending status
      const newCompany = {
        id: Date.now(), // Use timestamp as a simple unique ID
        name: formData.companyName,
        industry: formData.industry,
        size: formData.companySize,
        email: formData.email,
        status: 'pending',
        applied: new Date().toLocaleDateString(),
        logo: null // Can't store the actual file, so just use null
      };
      
      // Get existing companies from localStorage or use empty array if none exist
      const existingCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
      
      // Add new company to the array
      const updatedCompanies = [...existingCompanies, newCompany];
      
      // Save back to localStorage
      localStorage.setItem('companies', JSON.stringify(updatedCompanies));
      
      alert('Registration successful! Please wait for approval from SCAD Office.');
      navigate('/');
    }
  };
  
  return (
    <RegistrationContainer>
      <RegistrationCard>
        <Header>
          <BackButton onClick={() => navigate('/')}>
            <FaArrowLeft size={18} />
          </BackButton>
          <Title>Company Registration</Title>
        </Header>
        
        <Form onSubmit={handleSubmit}>
          <Row>
            <Input
              label="Company Name"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              error={errors.companyName}
              required
            />
            
            <Input
              label="Official Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter company email"
              error={errors.email}
              required
            />
          </Row>
          
          <Row>
            <Select
              label="Industry"
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              options={industryOptions}
              placeholder="Select industry"
              error={errors.industry}
              required
            />
            
            <Select
              label="Company Size"
              id="companySize"
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              options={companySizeOptions}
              placeholder="Select company size"
              error={errors.companySize}
              required
            />
          </Row>
          
          <FileUploadContainer>
            <FileUploadLabel>
              Company Logo <span style={{ color: 'red' }}>*</span>
            </FileUploadLabel>
            <FileUploadBox onClick={() => document.getElementById('logo').click()}>
              <FileIcon />
              <div>Click or drag to upload company logo</div>
              {formData.logo && <FileName>{formData.logo.name}</FileName>}
              <HiddenInput
                type="file"
                id="logo"
                name="logo"
                accept="image/*"
                onChange={handleFileChange}
              />
            </FileUploadBox>
            {errors.logo && <span style={{ color: 'red', fontSize: '12px' }}>{errors.logo}</span>}
          </FileUploadContainer>
          
          <FileUploadContainer>
            <FileUploadLabel>
              Tax Documents <span style={{ color: 'red' }}>*</span>
            </FileUploadLabel>
            <FileUploadBox onClick={() => document.getElementById('taxDocuments').click()}>
              <FileIcon />
              <div>Click or drag to upload tax documents</div>
              {formData.taxDocuments && <FileName>{formData.taxDocuments.name}</FileName>}
              <HiddenInput
                type="file"
                id="taxDocuments"
                name="taxDocuments"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </FileUploadBox>
            {errors.taxDocuments && <span style={{ color: 'red', fontSize: '12px' }}>{errors.taxDocuments}</span>}
          </FileUploadContainer>
          
          <Row>
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              error={errors.password}
              required
            />
            
            <Input
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
              required
            />
          </Row>
          
          <FormActions>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => navigate('/')}
              style={{ marginRight: '1rem' }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Submit Registration
            </Button>
          </FormActions>
        </Form>
      </RegistrationCard>
    </RegistrationContainer>
  );
};

export default CompanyRegistration; 