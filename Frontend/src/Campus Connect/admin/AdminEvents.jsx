
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminEvents = () => {
  const navigate = useNavigate();
  const [editingEvent, setEditingEvent] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Spardha - ACM Fest",
      type: "Upcoming",
      date: "2024-03-15",
      time: "09:00 AM - 06:00 PM",
      venue: "University Technology Complex",
      organizer: "ACM Student Chapter",
      description: "Annual technology and coding competition"
    },
    {
      id: 2,
      title: "Freshers Day",
      type: "Past",
      date: "2023-10-20",
      time: "09:00 AM - 05:00 PM",
      venue: "University Grounds",
      organizer: "Student Union",
      description: "Welcome celebration for new students"
    },
    {
      id: 3,
      title: "Hackathon 2024",
      type: "Upcoming",
      date: "2024-04-05",
      time: "08:00 AM - 08:00 AM",
      venue: "Computer Science Building",
      organizer: "Tech Innovation Club",
      description: "24-hour coding competition"
    }
  ]);

  const handleEdit = (event) => {
    setEditingEvent({ ...event });
  };

  const handleInputChange = (key, value) => {
    setEditingEvent(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    setEvents(prev => prev.map(event => 
      event.id === editingEvent.id ? editingEvent : event
    ));
    setEditingEvent(null);
  };

  const handleDelete = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
    }
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
    type: (type) => ({
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      backgroundColor: type === 'Upcoming' ? '#dcfce7' : '#fee2e2',
      color: type === 'Upcoming' ? '#166534' : '#dc2626'
    }),
    detailRow: {
      marginBottom: '0.75rem'
    },
    label: {
      fontWeight: '500',
      color: '#4b5563',
      marginBottom: '0.25rem'
    },
    input: {
      width: '100%',
      padding: '0.5rem',
      border: '1px solid #e5e7eb',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      marginBottom: '0.5rem'
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
      backgroundColor: '#ef4444',
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
        <h2>Event Management</h2>
      </div>

      <div style={styles.grid}>
        {events.map(event => (
          <div key={event.id} style={styles.card}>
            {editingEvent?.id === event.id ? (
              <>
                <div style={styles.detailRow}>
                  <label style={styles.label}>Title:</label>
                  <input
                    style={styles.input}
                    value={editingEvent.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                <div style={styles.detailRow}>
                  <label style={styles.label}>Type:</label>
                  <select
                    style={styles.input}
                    value={editingEvent.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Past">Past</option>
                  </select>
                </div>
                {Object.entries(editingEvent).map(([key, value]) => {
                  if (!['id', 'title', 'type'].includes(key)) {
                    return (
                      <div key={key} style={styles.detailRow}>
                        <label style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
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
                    onClick={() => setEditingEvent(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={styles.cardHeader}>
                  <h3 style={styles.title}>{event.title}</h3>
                  <span style={styles.type(event.type)}>{event.type}</span>
                </div>
                <div style={styles.detailRow}>
                  <p style={styles.label}>Date & Time:</p>
                  <p>{event.date} • {event.time}</p>
                </div>
                <div style={styles.detailRow}>
                  <p style={styles.label}>Venue:</p>
                  <p>{event.venue}</p>
                </div>
                <div style={styles.detailRow}>
                  <p style={styles.label}>Organizer:</p>
                  <p>{event.organizer}</p>
                </div>
                <div style={styles.detailRow}>
                  <p style={styles.label}>Description:</p>
                  <p>{event.description}</p>
                </div>
                <div style={styles.buttonContainer}>
                  <button 
                    style={{ ...styles.button, ...styles.editButton }}
                    onClick={() => handleEdit(event)}
                  >
                    Edit
                  </button>
                  <button 
                    style={{ ...styles.button, ...styles.deleteButton }}
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
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

export default AdminEvents;
