import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import NotificationCenter from './NotificationCenter';
import { useAuth } from '../contexts/AuthContext';

const NavbarContainer = styled.nav`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 0 2rem;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.tertiary};
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    position: absolute;
    flex-direction: column;
    top: 70px;
    left: ${props => props.isOpen ? '0' : '-100%'};
    width: 100%;
    background-color: ${props => props.theme.colors.primary};
    transition: left 0.3s ease;
    height: calc(100vh - 70px);
    padding: 2rem;
  }
`;

const NavLink = styled(Link)`
  margin: 0 1rem;
  padding: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.tertiary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin: 1rem 0;
    width: 100%;
    text-align: center;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-left: 1.5rem;
  position: relative;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.tertiary};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.white};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { userType, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const getNavLinks = () => {
    switch(userType) {
      case 'student':
      case 'proStudent':
        return (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/internships">Internships</NavLink>
            <NavLink to="/profile">My Profile</NavLink>
            {userType === 'proStudent' && <NavLink to="/workshops">Workshops</NavLink>}
          </>
        );
      case 'company':
        return (
          <>
            <NavLink to="/company/dashboard">Dashboard</NavLink>
            <NavLink to="/internships">All Internships</NavLink>
            <NavLink to="/company/interns">Interns</NavLink>
          </>
        );
      case 'scadOffice':
        return (
          <>
            <NavLink to="/scad/dashboard">Dashboard</NavLink>
            <NavLink to="/scad/companies">Companies</NavLink>
            <NavLink to="/scad/students">Students</NavLink>
            <NavLink to="/scad/reports">Reports</NavLink>
            <NavLink to="/scad/statistics">Statistics</NavLink>
            <NavLink to="/workshops">Workshops</NavLink>
            <NavLink to="/workshops/calls">Workshop Calls</NavLink>
          </>
        );
      case 'faculty':
        return (
          <>
            <NavLink to="/faculty/dashboard">Dashboard</NavLink>
            <NavLink to="/faculty/reports">Reports</NavLink>
            <NavLink to="/faculty/feedback">Feedback</NavLink>
            <NavLink to="/faculty/statistics">Statistics</NavLink>
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <NavbarContainer>
      <Logo to={userType === 'student' || userType === 'proStudent' ? "/dashboard" : `/${userType}/dashboard`}>
        SCAD Internship
      </Logo>
      
      <MobileMenuButton onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>
      
      <NavLinks isOpen={isOpen}>
        {getNavLinks()}
        
        <IconContainer>
        {(userType === 'student' || userType === 'proStudent') && (
          <IconWrapper>
          <FaUser onClick={() => navigate("/profile")} />
        </IconWrapper>
          )}
          <IconWrapper>
            <NotificationCenter />
          </IconWrapper>
          
          <IconWrapper onClick={handleLogout}>
            <FaSignOutAlt />
          </IconWrapper>
        </IconContainer>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar; 