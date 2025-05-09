import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;
`;

const StyledLabel = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

const StyledInput = styled.input`
  padding: 10px 12px;
  border: 1px solid ${props => props.error ? 'red' : props.theme.colors.secondary};
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  width: 100%;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.tertiary};
  }
  
  &::placeholder {
    color: #aaa;
  }
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const Input = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  ...props
}) => {
  return (
    <InputContainer>
      {label && (
        <StyledLabel htmlFor={id}>
          {label}{required && <span style={{ color: 'red' }}> *</span>}
        </StyledLabel>
      )}
      <StyledInput
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        error={error}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input; 