import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';

const AdminAddClub = () => {
  const navigate = useNavigate();
  const [clubRequests, setClubRequests] = useState([
    {
      id: 1,
      name: "AI Research Club",
      requestedBy: "Kumari",
      rollno: "22BQ5A201",
      branch: "CSE",
      category: "Technical",
      description: "A club focused on artificial intelligence research and development",
      reason: "To explore and research latest AI developments and organize workshops",
      expectedMembers: "50",
      facultyAdvisor: "Dr. Rajesh Kumar",
      status: "pending",
    },
    {
      id: 2,
      name: "Photography Club",
      requestedBy: "Rakesh",
      rollno: "24BQ5A202",
      branch: "ECE",
      category: "Cultural",
      description: "Platform for photography enthusiasts to learn and grow",
      reason: "To develop photography skills and organize photo walks",
      expectedMembers: "30",
      facultyAdvisor: "Prof. Meena Sharma",
      status: "approved",
    },
  ]);

  const [newClub, setNewClub] = useState({
    name: '',
    category: '',
    description: '',
    reason: '',
    expectedMembers: '',
    facultyAdvisor: '',
    requestedBy: '',
    rollno: '',
    branch: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New club:', newClub);
    setClubRequests([...clubRequests, { ...newClub, id: clubRequests.length + 1, status: 'pending' }]);
    setNewClub({
      name: '',
      category: '',
      description: '',
      reason: '',
      expectedMembers: '',
      facultyAdvisor: '',
      requestedBy: '',
      rollno: '',
      branch: '',
    });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div style={{ display: 'grid', gap: '30px' }}>
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h2>Add New Club</h2>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'grid',
              gap: '15px',
            }}
          >
            <input
              type="text"
              placeholder="Name of Student"
              value={newClub.requestedBy}
              onChange={(e) => setNewClub({ ...newClub, requestedBy: e.target.value })}
              style={{
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
              required
            />
            <input
              type="text"
              placeholder="Roll Number"
              value={newClub.rollno}
              onChange={(e) => setNewClub({ ...newClub, rollno: e.target.value })}
              style={{
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
              required
            />
            <input
              type="text"
              placeholder="Branch"
              value={newClub.branch}
              onChange={(e) => setNewClub({ ...newClub, branch: e.target.value })}
              style={{
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
              required
            />
            <input
              type="text"
              placeholder="Club Name"
              value={newClub.name}
              onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
              style={{
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
              required
            />
            <textarea
              placeholder="Reason for Adding the Club"
              value={newClub.reason}
              onChange={(e) => setNewClub({ ...newClub, reason: e.target.value })}
              style={{
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                minHeight: '80px',
              }}
              required
            />
            <textarea
              placeholder="Description of Club"
              value={newClub.description}
              onChange={(e) => setNewClub({ ...newClub, description: e.target.value })}
              style={{
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                minHeight: '100px',
              }}
              required
            />
            <input
              type="text"
              placeholder="Advised Faculty"
              value={newClub.facultyAdvisor}
              onChange={(e) => setNewClub({ ...newClub, facultyAdvisor: e.target.value })}
              style={{
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
            />
            <input
              type="text"
              placeholder="Expected Members"
              value={newClub.expectedMembers}
              onChange={(e) => setNewClub({ ...newClub, expectedMembers: e.target.value })}
              style={{
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
              required
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#d57465',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                justifyContent: 'center',
              }}
            >
              <Plus size={16} /> Create Club
            </button>
          </form>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h2>Club Requests</h2>
          <div style={{ display: 'grid', gap: '15px' }}>
            {clubRequests.map((request) => (
              <div
                key={request.id}
                style={{
                  padding: '15px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <h3 style={{ margin: '0 0 10px 0' }}>{request.name}</h3>
                <p style={{ margin: '0 0 10px 0' }}>
                  <strong>Category:</strong> {request.category}
                </p>
                <p style={{ margin: '0 0 10px 0' }}>
                  <strong>Description:</strong> {request.description}
                </p>
                <p style={{ margin: '0 0 10px 0' }}>
                  <strong>Reason:</strong> {request.reason}
                </p>
                <p style={{ margin: '0 0 10px 0' }}>
                  <strong>Expected Members:</strong> {request.expectedMembers}
                </p>
                <p style={{ margin: '0 0 10px 0' }}>
                  <strong>Faculty Advisor:</strong> {request.facultyAdvisor}
                </p>
                <p style={{ margin: '0 0 10px 0' }}>
                  <strong>Requested by:</strong> {request.requestedBy}
                </p>
                <p style={{ margin: '0 0 10px 0' }}>
                  <strong>Roll No:</strong> {request.rollno}
                </p>
                <p style={{ margin: '0 0 10px 0' }}>
                  <strong>Branch:</strong> {request.branch}
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: request.status === 'approved' ? '#4CAF50' : '#FFA000',
                      color: 'white',
                      fontSize: '0.9rem',
                    }}
                  >
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                  {request.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        style={{
                          backgroundColor: '#4CAF50',
                          color: 'white',
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Approve
                      </button>
                      <button
                        style={{
                          backgroundColor: '#f44336',
                          color: 'white',
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddClub;