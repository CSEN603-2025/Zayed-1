import React from 'react';
import { FaSearch, FaPlusCircle } from 'react-icons/fa';
import Button from '../../../components/Button';
import * as Styles from '../Styles';

const InternshipActions = ({
  searchTerm,
  handleSearchChange,
  filterStatus,
  handleFilterChange,
  handleCreateClick
}) => {
  return (
    <Styles.ActionsContainer>
      <Button 
        variant="primary"
        icon={<FaPlusCircle />}
        onClick={handleCreateClick}
      >
        Create New Internship
      </Button>
      
      <div style={{ display: 'flex' }}>
        <Styles.SearchContainer>
          <Styles.SearchIcon>
            <FaSearch />
          </Styles.SearchIcon>
          <Styles.SearchInput 
            placeholder="Search internships..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Styles.SearchContainer>

        <Styles.FilterSelect value={filterStatus} onChange={handleFilterChange}>
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
          <option value="draft">Draft</option>
        </Styles.FilterSelect>
      </div>
    </Styles.ActionsContainer>
  );
};

export default InternshipActions; 