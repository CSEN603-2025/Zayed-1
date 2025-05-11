import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: ${props => props.padding || '20px'};
  margin-bottom: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  ${props => props.hoverable && `
    cursor: pointer;
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
  `}
  
  ${props => props.variant === 'outlined' && `
    background-color: transparent;
    border: 1px solid ${props.theme.colors.tertiary};
    box-shadow: none;
  `}
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: ${props => props.divider ? `1px solid ${props.theme.colors.tertiary}` : 'none'};
  padding-bottom: ${props => props.divider ? '16px' : '0'};
`;

const CardTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin: 0;
  font-size: 1.25rem;
`;

const CardBody = styled.div`
  color: ${props => props.theme.colors.darkGray};
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: ${props => props.align || 'flex-end'};
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${props => props.theme.colors.tertiary};
`;

// Header component as a subcomponent
const Header = ({ children, divider = true }) => {
  return <CardHeader divider={divider}>{children}</CardHeader>;
};

// Body component as a subcomponent
const Body = ({ children }) => {
  return <CardBody>{children}</CardBody>;
};

// Footer component as a subcomponent
const Footer = ({ children, align }) => {
  return <CardFooter align={align}>{children}</CardFooter>;
};

const Card = ({
  children,
  title,
  headerAction,
  footer,
  footerAlign,
  variant,
  headerDivider = true,
  hoverable = false,
  padding,
  onClick,
  ...props
}) => {
  return (
    <CardContainer
      variant={variant}
      hoverable={hoverable}
      padding={padding}
      onClick={onClick}
      {...props}
    >
      {(title || headerAction) && (
        <CardHeader divider={headerDivider}>
          {title && <CardTitle>{title}</CardTitle>}
          {headerAction}
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
      {footer && <CardFooter align={footerAlign}>{footer}</CardFooter>}
    </CardContainer>
  );
};

// Add subcomponents as static properties of Card
Card.Footer = Footer;
Card.Header = Header;
Card.Body = Body;

export default Card; 