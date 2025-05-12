import React from 'react';
import { FaSearch } from 'react-icons/fa';
import * as Styles from '../Styles';

const ApplicationActions = ({
  searchTerm,
  handleSearchChange,
  filterInternship,
  handleFilterChange,
  internships
}) => {
  return (
    <Styles.ActionsContainer>
      <Styles.SearchContainer>
        <Styles.SearchIcon>
          <FaSearch />
        </Styles.SearchIcon>
        <Styles.SearchInput 
          placeholder="Search applications..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Styles.SearchContainer>

      <Styles.FilterSelect value={filterInternship} onChange={handleFilterChange}>
        <option value="all">All Internships</option>
        {internships.map(internship => (
          <option key={internship.id} value={internship.title}>{internship.title}</option>
        ))}
      </Styles.FilterSelect>
    </Styles.ActionsContainer>
  );
};

export default ApplicationActions; 