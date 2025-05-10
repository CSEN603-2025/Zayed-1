import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &.primary {
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.white};
    &:hover {
      background-color: ${props => props.theme.colors.primary};
    }
  }
  
  &.secondary {
    background-color: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary};
    &:hover {
      background-color: ${props => props.theme.colors.tertiary};
    }
  }
  
  &.danger {
    background-color: #f44336;
    color: ${props => props.theme.colors.white};
    &:hover {
      background-color: #d32f2f;
    }
  }
  
  &.success {
    background-color: #4caf50;
    color: ${props => props.theme.colors.white};
    &:hover {
      background-color: #388e3c;
    }
  }
  
  &.small {
    padding: 5px 10px;
    font-size: 0.8rem;
  }
  
  &.medium {
    padding: 10px 20px;
    font-size: 1rem;
  }
  
  &.large {
    padding: 15px 30px;
    font-size: 1.2rem;
  }
  
  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
`;

const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", 
  size = "medium", 
  disabled = false,
  icon,
  ...props 
}) => {
  return (
    <StyledButton 
      type={type} 
      onClick={onClick} 
      className={`${variant} ${size}`} 
      disabled={disabled}
      {...props}
    >
      {icon && icon}
      {children}
    </StyledButton>
  );
};

export default Button; 