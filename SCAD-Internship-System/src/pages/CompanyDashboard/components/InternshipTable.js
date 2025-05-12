import React from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import * as Styles from '../Styles';

const InternshipTable = ({ 
  filteredInternships, 
  handleViewInternship, 
  handleEditInternship, 
  handleDeleteInternship 
}) => {
  return (
    <Styles.TableContainer>
      <Styles.Table>
        <Styles.TableHeader>
          <tr>
            <Styles.TableHeaderCell>Title</Styles.TableHeaderCell>
            <Styles.TableHeaderCell>Applications</Styles.TableHeaderCell>
            <Styles.TableHeaderCell>Posted Date</Styles.TableHeaderCell>
            <Styles.TableHeaderCell>Duration</Styles.TableHeaderCell>
            <Styles.TableHeaderCell>Paid/Unpaid</Styles.TableHeaderCell>
            <Styles.TableHeaderCell>Status</Styles.TableHeaderCell>
            <Styles.TableHeaderCell>Actions</Styles.TableHeaderCell>
          </tr>
        </Styles.TableHeader>
        <Styles.TableBody>
          {filteredInternships.map(internship => (
            <Styles.TableRow key={internship.id}>
              <Styles.TableCell>{internship.title}</Styles.TableCell>
              <Styles.TableCell>{internship.applications}</Styles.TableCell>
              <Styles.TableCell>{internship.posted}</Styles.TableCell>
              <Styles.TableCell>{internship.duration}</Styles.TableCell>
              <Styles.TableCell>{internship.paid ? 'Paid' : 'Unpaid'}</Styles.TableCell>
              <Styles.TableCell>
                <Styles.StatusBadge status={internship.status}>
                  {internship.status.charAt(0).toUpperCase() + internship.status.slice(1)}
                </Styles.StatusBadge>
              </Styles.TableCell>
              <Styles.TableCell>
                <Styles.ActionButtons>
                  <Styles.ActionButton title="View" onClick={() => handleViewInternship(internship.id)}>
                    <FaEye />
                  </Styles.ActionButton>
                  <Styles.ActionButton title="Edit" onClick={() => handleEditInternship(internship.id)}>
                    <FaEdit />
                  </Styles.ActionButton>
                  <Styles.ActionButton title="Delete" onClick={() => handleDeleteInternship(internship.id)}>
                    <FaTrash />
                  </Styles.ActionButton>
                </Styles.ActionButtons>
              </Styles.TableCell>
            </Styles.TableRow>
          ))}
          {filteredInternships.length === 0 && (
            <Styles.TableRow>
              <Styles.TableCell colSpan="7" style={{ textAlign: 'center' }}>
                No internships found. Create a new internship to get started.
              </Styles.TableCell>
            </Styles.TableRow>
          )}
        </Styles.TableBody>
      </Styles.Table>
    </Styles.TableContainer>
  );
};

export default InternshipTable; 