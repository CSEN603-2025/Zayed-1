import React from 'react';
import styled from 'styled-components';

const SelectContainer = styled.div`
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

const StyledSelect = styled.select`
  padding: 10px 12px;
  border: 1px solid ${props => props.error ? 'red' : props.theme.colors.secondary};
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  width: 100%;
  background-color: white;
  cursor: pointer;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.tertiary};
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

const Select = ({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  required = false,
  disabled = false,
  error,
  placeholder,
  ...props
}) => {
  return (
    <SelectContainer>
      {label && (
        <StyledLabel htmlFor={id}>
          {label}{required && <span style={{ color: 'red' }}> *</span>}
        </StyledLabel>
      )}
      <StyledSelect
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        error={error}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SelectContainer>
  );
};

export default Select; 