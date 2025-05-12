import React from 'react';
import { FaEye } from 'react-icons/fa';
import * as Styles from '../Styles';

const ApplicationsTable = ({ 
  filteredApplications, 
  handleViewApplication, 
  handleStatusChange 
}) => {
  return (
    <Styles.TableContainer>
      <Styles.Table>
        <Styles.TableHeader>
          <tr>
            <Styles.TableHeaderCell>Student</Styles.TableHeaderCell>
            <Styles.TableHeaderCell>Position</Styles.TableHeaderCell>
            <Styles.TableHeaderCell>Applied Date</Styles.TableHeaderCell>
            <Styles.TableHeaderCell>Status</Styles.TableHeaderCell>
            <Styles.TableHeaderCell>Actions</Styles.TableHeaderCell>
            <Styles.TableHeaderCell>Update Status</Styles.TableHeaderCell>
          </tr>
        </Styles.TableHeader>
        <Styles.TableBody>
          {filteredApplications.map(application => (
            <Styles.TableRow key={application.id}>
              <Styles.TableCell>{application.student}</Styles.TableCell>
              <Styles.TableCell>{application.position}</Styles.TableCell>
              <Styles.TableCell>{application.applied}</Styles.TableCell>
              <Styles.TableCell>
                <Styles.StatusBadge status={application.status}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </Styles.StatusBadge>
              </Styles.TableCell>
              <Styles.TableCell>
                <Styles.ActionButtons>
                  <Styles.ActionButton title="View" onClick={() => handleViewApplication(application.id)}>
                    <FaEye />
                  </Styles.ActionButton>
                </Styles.ActionButtons>
              </Styles.TableCell>
              <Styles.TableCell>
                <Styles.FilterSelect 
                  value={application.status} 
                  onChange={(e) => handleStatusChange(application.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="finalized">Finalized</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </Styles.FilterSelect>
              </Styles.TableCell>
            </Styles.TableRow>
          ))}
        </Styles.TableBody>
      </Styles.Table>
    </Styles.TableContainer>
  );
};

export default ApplicationsTable; 