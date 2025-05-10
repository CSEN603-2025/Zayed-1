import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.light};
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 450px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Logo = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Tagline = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: 1rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.darkGray};
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${props => props.error ? 'red' : props.theme.colors.tertiary};
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid ${props => props.error ? 'red' : props.theme.colors.tertiary};
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.tertiary};
    cursor: not-allowed;
  }
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
`;

const StyledLink = styled.span`
  color: ${props => props.theme.colors.secondary};
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    if (!userType) {
      newErrors.userType = 'Please select user type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await login(email, password, userType);
        
        // Redirect based on user type
        switch(userType) {
          case 'student':
          case 'proStudent':
            navigate('/dashboard');
            break;
          case 'company':
            navigate('/company/dashboard');
            break;
          case 'scadOffice':
            navigate('/scad/dashboard');
            break;
          case 'faculty':
            navigate('/faculty/dashboard');
            break;
          default:
            navigate('/dashboard');
        }
      } catch (error) {
        setErrors({ general: 'Login failed. Please check your credentials.' });
      }
    }
  };
  
  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <Logo>SCAD Internship</Logo>
          <Tagline>Connect. Apply. Succeed.</Tagline>
        </LoginHeader>
        
        <LoginForm onSubmit={handleSubmit}>
          {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="userType">Login As</Label>
            <Select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              error={errors.userType}
            >
              <option value="">Select user type</option>
              <option value="student">Student</option>
              <option value="proStudent">PRO Student</option>
              <option value="company">Company</option>
              <option value="scadOffice">SCAD Office</option>
              <option value="faculty">Faculty Member</option>
            </Select>
            {errors.userType && <ErrorMessage>{errors.userType}</ErrorMessage>}
          </FormGroup>
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          
          <RegisterLink>
            Don't have an account?{' '}
            <StyledLink onClick={() => navigate('/register/company')}>
              Register as Company
            </StyledLink>
          </RegisterLink>
        </LoginForm>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login; 