import styled from 'styled-components';
import Card from '../../components/Card';

export const SearchInput = styled.input`
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  width: 100%;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.light};
`;

export const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const DashboardHeader = styled.div`
  margin-bottom: 2rem;
`;

export const PageTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

export const PageDescription = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: 1rem;
`;

export const StatCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled(Card)`
  display: flex;
  align-items: center;
`;

export const StatIconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
`;

export const StatContent = styled.div`
  flex: 1;
`;

export const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.25rem;
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
`;

export const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 300px;
`;



export const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  color: ${props => props.theme.colors.secondary};
`;


export const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  margin-left: 1rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  background-color: white;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007bff%22%20d%3D%22M287%2C114.5L157.5%2C244.1c-4.5%2C4.5-12%2C4.5-16.5%2C0l-129.4-129.6c-4.5-4.5-4.5-12%2C0-16.5l22.2-22.2c4.5-4.5%2C12-4.5%2C16.5%2C0L149.2%2C178l115.5-115.5c4.5-4.5%2C12-4.5%2C16.5%2C0l22.2%2C22.2C291.5%2C102.5%2C291.5%2C110%2C287%2C114.5z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 12px;
  padding-right: 2.5rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

export const TableContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background-color: ${props => props.theme.colors.primary};
  color: white;
`;

export const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${props => props.theme.colors.light};
  }
`;

export const TableCell = styled.td`
  padding: 1rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => {
    switch(props.status) {
      case 'active': return '#e6f7e6';
      case 'closed': return '#f8d7da';
      case 'draft': return '#fff3cd';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#2e7d32';
      case 'closed': return '#c62828';
      case 'draft': return '#856404';
      default: return '#383d41';
    }
  }};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.secondary};
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

export const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border: 1px solid ${props => props.active ? props.theme.colors.secondary : props.theme.colors.tertiary};
  background-color: ${props => props.active ? props.theme.colors.secondary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.secondary};
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.colors.secondary : props.theme.colors.tertiary};
    color: ${props => props.active ? 'white' : props.theme.colors.primary};
  }
`;



// Modal Styles
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 600px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const ModalTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.darkGray};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

export const FormTextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const RadioOption = styled.div`
  display: flex;
  align-items: center;
`;

export const RadioInput = styled.input`
  margin-right: 0.5rem;
`;

export const RadioLabel = styled.label`
  color: ${props => props.theme.colors.darkGray};
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Toast = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: ${props => {
    switch (props.type) {
      case 'success': return '#e6f7e6';
      case 'error': return '#f8d7da';
      case 'warning': return '#fff3cd';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'success': return '#2e7d32';
      case 'error': return '#c62828';
      case 'warning': return '#856404';
      default: return '#383d41';
    }
  }};
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 300px;
  max-width: 500px;
  animation: slideIn 0.3s ease-out forwards;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const ToastIcon = styled.div`
  margin-right: 1rem;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
`;

export const ToastContent = styled.div`
  flex: 1;
`;

export const ToastMessage = styled.p`
  margin: 0;
  font-size: 0.95rem;
`;

export const ToastCloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`;