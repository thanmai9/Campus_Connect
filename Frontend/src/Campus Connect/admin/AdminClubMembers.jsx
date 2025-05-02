
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AdminClubMembers = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [members] = useState([
    {
      id: 1,
      name: "John Doe",
      rollNumber: "21B81A0501",
      branch: "CSE",
      year: "3rd Year",
      email: "john.doe@vvit.edu",
      phone: "9876543210",
      joinDate: "2023-08-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      rollNumber: "21B81A0502",
      branch: "ECE",
      year: "2nd Year",
      email: "jane.smith@vvit.edu",
      phone: "9876543211",
      joinDate: "2023-09-01"
    },
    {
      id: 3,
      name: "Bob Wilson",
      rollNumber: "21B81A0503",
      branch: "MECH",
      year: "4th Year",
      email: "bob.wilson@vvit.edu",
      phone: "9876543212",
      joinDate: "2023-07-20"
    }
  ]);

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '2rem'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      border: 'none',
      backgroundColor: '#f3f4f6',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      marginRight: '1rem'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      overflow: 'hidden'
    },
    th: {
      backgroundColor: '#f3f4f6',
      padding: '1rem',
      textAlign: 'left',
      fontWeight: '600',
      color: '#374151'
    },
    td: {
      padding: '1rem',
      borderTop: '1px solid #e5e7eb'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Back to Club Details
        </button>
        <h2>Club Members</h2>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Roll Number</th>
            <th style={styles.th}>Branch</th>
            <th style={styles.th}>Year</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Join Date</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id}>
              <td style={styles.td}>{member.name}</td>
              <td style={styles.td}>{member.rollNumber}</td>
              <td style={styles.td}>{member.branch}</td>
              <td style={styles.td}>{member.year}</td>
              <td style={styles.td}>{member.email}</td>
              <td style={styles.td}>{member.phone}</td>
              <td style={styles.td}>{member.joinDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminClubMembers;
