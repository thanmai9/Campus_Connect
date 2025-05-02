
import React, { useState } from 'react';
import { Users, Calendar, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminClubDetails = () => {
  const navigate = useNavigate();
  const [editingClub, setEditingClub] = useState(null);
  const [clubs, setClubs] = useState([
    {
      id: "1",
      name: "Basketball Club",
      status: "Active",
      members: 75,
      category: "Sports",
      description: "Join our basketball club to improve your skills and participate in tournaments.",
      schedule: "Monday, Wednesday, Friday",
      location: "College Sports Complex",
      coordinator: "John Smith",
      contact: "john.smith@vvit.edu"
    },
    {
      id: "2",
      name: "Coding Club",
      status: "Active",
      members: 50,
      category: "Technical",
      description: "Build and develop programs, participate in competitions and workshops.",
      schedule: "Tuesday, Thursday",
      location: "Tech Lab 101",
      coordinator: "Sarah Johnson",
      contact: "sarah.j@vvit.edu"
    },
    {
      id: "3",
      name: "Dance Club",
      status: "Active",
      members: 60,
      category: "Cultural",
      description: "Learn various dance forms including classical and contemporary.",
      schedule: "Monday, Thursday",
      location: "Cultural Center",
      coordinator: "Maya Patel",
      contact: "maya.p@vvit.edu"
    },
    {
      id: "4",
      name: "Singing Club",
      status: "Active",
      members: 45,
      category: "Cultural",
      description: "Develop your vocal skills and perform at college events.",
      schedule: "Wednesday, Friday",
      location: "Music Room",
      coordinator: "David Wilson",
      contact: "david.w@vvit.edu"
    },
    {
      id: "5",
      name: "Yoga Club",
      status: "Active",
      members: 40,
      category: "Wellness",
      description: "Practice yoga for physical and mental well-being.",
      schedule: "Tuesday, Friday",
      location: "Wellness Center",
      coordinator: "Priya Kumar",
      contact: "priya.k@vvit.edu"
    }
  ]);

  const handleEdit = (club) => {
    setEditingClub({ ...club });
  };

  const handleInputChange = (key, value) => {
    setEditingClub(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    setClubs(prev => prev.map(club => 
      club.id === editingClub.id ? editingClub : club
    ));
    setEditingClub(null);
  };

  const handleDelete = (clubId) => {
    if (window.confirm('Are you sure you want to delete this club?')) {
      setClubs(prev => prev.filter(club => club.id !== clubId));
    }
  };
  const handleDetails = (clubId) => {
    navigate(`/club-details/${clubId}`);
  };

  
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
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '2rem'
    },
    card: {
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      backgroundColor: 'white'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#111827'
    },
    status: (status) => ({
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      backgroundColor: status === 'Active' ? '#dcfce7' : '#fee2e2',
      color: status === 'Active' ? '#166534' : '#dc2626'
    }),
    detailRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.75rem'
    },
    label: {
      fontWeight: '500',
      color: '#4b5563',
      width: '100px'
    },
    value: {
      color: '#111827',
      flex: 1
    },
    input: {
      width: '100%',
      padding: '0.5rem',
      border: '1px solid #e5e7eb',
      borderRadius: '0.375rem',
      fontSize: '0.875rem'
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem'
    },
    button: {
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      fontSize: '0.875rem'
    },
    editButton: {
      backgroundColor: '#d57465',
      color: 'white'
    },
    deleteButton: {
      backgroundColor: '#d57465',
      color: 'white'
    },
    detailsButton:{
      backgroundColor: '#d57465',
      color: 'white'
    },
    saveButton: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    cancelButton: {
      backgroundColor: '#6b7280',
      color: 'white'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate('/AdminHome')}>
          <ArrowLeft size={18} />
          Back to AdminHome
        </button>
        <h2 style={styles.title}>Club Details</h2>
      </div>
      
      <div style={styles.grid}>
        {clubs.map(club => (
          <div key={club.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.title}>
                {editingClub?.id === club.id ? (
                  <input
                    style={styles.input}
                    value={editingClub.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                ) : club.name}
              </h3>
              <span style={styles.status(club.status)}>{club.status}</span>
            </div>
            
            {editingClub?.id === club.id ? (
              <>
                {Object.entries(editingClub).map(([key, value]) => {
                  if (key !== 'id' && key !== 'status') {
                    return (
                      <div key={key} style={styles.detailRow}>
                        <span style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                        <input
                          style={styles.input}
                          value={value}
                          onChange={(e) => handleInputChange(key, e.target.value)}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
                
                <div style={styles.buttonContainer}>
                  <button 
                    style={{ ...styles.button, ...styles.saveButton }}
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button 
                    style={{ ...styles.button, ...styles.cancelButton }}
                    onClick={() => setEditingClub(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {Object.entries(club).map(([key, value]) => {
                  if (key !== 'id' && key !== 'status') {
                    return (
                      <div key={key} style={styles.detailRow}>
                        <span style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                        <span style={styles.value}>{value}</span>
                      </div>
                    );
                  }
                  return null;
                })}
                
                <div style={styles.buttonContainer}>
                  <button 
                    style={{ ...styles.button, ...styles.editButton }}
                    onClick={() => handleEdit(club)}
                  >
                    Edit
                  </button>
                  <button 
                    style={{ ...styles.button, ...styles.deleteButton }}
                    onClick={() => handleDelete(club.id)}
                  >
                    Delete
                  </button>
                  <button style={{...styles.button,...styles.detailsButton}} onClick={() => navigate(`/AdminClubMembers/${club.id}`)}>
  <span>Members</span>
</button>
                  
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminClubDetails;
