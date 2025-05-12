import React from 'react';
import { FaBriefcase, FaUsers } from 'react-icons/fa';
import * as Styles from '../Styles';

const StatCards = ({ internships, applications, currentInterns, navigate }) => {
  return (
    <Styles.StatCardsContainer>
      <Styles.StatCard>
        <Styles.StatIconContainer>
          <FaBriefcase />
        </Styles.StatIconContainer>
        <Styles.StatContent>
          <Styles.StatValue>{internships.length}</Styles.StatValue>
          <Styles.StatLabel>Active Internship Postings</Styles.StatLabel>
        </Styles.StatContent>
      </Styles.StatCard>
      
      <Styles.StatCard>
        <Styles.StatIconContainer>
          <FaUsers />
        </Styles.StatIconContainer>
        <Styles.StatContent>
          <Styles.StatValue>{applications.length}</Styles.StatValue>
          <Styles.StatLabel>Total Applications</Styles.StatLabel>
        </Styles.StatContent>
      </Styles.StatCard>
      
      <Styles.StatCard onClick={() => navigate('/company/interns')} style={{ cursor: 'pointer' }}>
        <Styles.StatIconContainer>
          <FaUsers />
        </Styles.StatIconContainer>
        <Styles.StatContent>
          <Styles.StatValue>{currentInterns}</Styles.StatValue>
          <Styles.StatLabel>Current Interns</Styles.StatLabel>
        </Styles.StatContent>
      </Styles.StatCard>
    </Styles.StatCardsContainer>
  );
};

export default StatCards; 