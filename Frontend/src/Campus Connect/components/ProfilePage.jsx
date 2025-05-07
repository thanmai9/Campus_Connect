
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, LogOut, Award, Bell, BookmarkPlus, Users, Calendar, Star, CheckCircle, Upload } from 'lucide-react';
import axios from 'axios';
import '../styles/Profile.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [activeEventTab, setActiveEventTab] = useState('upcoming');
  const [activeWishlistTab, setActiveWishlistTab] = useState('clubs');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userClubs, setUserClubs] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    rollno: '',
    branch: '',
    section: '',
    year: '',
	password: '',
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Mock data for development

        const response = await axios.get("${process.env.REACT_APP_API_BASE_URL}/api/users/profile", {
          withCredentials: true,
        });
        const userData = response.data;
        const mockUser = {
          id: 1,
          name: userData.name,
          email: userData.email,
          rollno: userData.rollno,
          branch: userData.branch,
          section: userData.section,
          year: userData.year,
          role: 'Student',
          password:userData.password,
           achievements: [
            { id: 1, title: 'First Place - Hackathon', description: 'Won first place in the annual hackathon', date: new Date(Date.now() - 7776000000) }
          ],
          savedClubs: [
            { id: 1, name: 'Photography Club', description: 'For photography enthusiasts', image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5' }
          ],
          savedEvents: [
            { id: 1, title: 'Annual Cultural Fest', description: 'Biggest cultural event of the year', date: new Date(Date.now() + 1209600000), clubName: 'Cultural Club' }
          ]
        };
        
        setUser(mockUser);
        setProfileForm({
          name: mockUser.name || '',
          email: mockUser.email || '',
          rollno: mockUser.rollno || '',
          branch: mockUser.branch || '',
          section: mockUser.section || '',
          year: mockUser.year || ''
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Fetch user clubs
  useEffect(() => {
    const fetchUserClubs = async () => {
      try {
        // Mock data for development
        const mockClubs = [
          { 
            id: 1, 
            name: 'Coding Club', 
            description: 'For coding enthusiasts',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
            role: 'Member',
            joinedDate: new Date(Date.now() - 7776000000),
            badge: 'Active Member'
          },
          { 
            id: 2, 
            name: 'Dance Club', 
            description: 'Express yourself through dance',
            image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad',
            role: 'Coordinator',
            joinedDate: new Date(Date.now() - 15552000000)
          }
        ];
        
        setUserClubs(mockClubs);
      } catch (error) {
        console.error('Error fetching user clubs:', error);
      }
    };

    fetchUserClubs();
  }, []);

  // Fetch user events
  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        // Mock data for development
        const today = new Date();
        const mockEvents = [
          { 
            id: 1, 
            title: 'Technical Workshop', 
            description: 'Learn new programming skills',
            date: new Date(today.getTime() + 604800000),
            clubId: 3,
            clubName: 'Coding Club'
          },
          { 
            id: 2, 
            title: 'Annual Coding Competition', 
            description: 'Test your skills against the best',
            date: new Date(today.getTime() - 604800000),
            clubId: 1,
            clubName: 'Coding Club',
            attended: true,
            rating: 4,
            feedbackText: ''
          },
          { 
            id: 3, 
            title: 'Dance Performance', 
            description: 'Annual dance showcase',
            date: new Date(today.getTime() - 1209600000), // 14 days in the past
            clubId: 2,
            clubName: 'Dance Club',
            attended: true,
            certificate: true
          }
        ];
        
        setUserEvents(mockEvents);
      } catch (error) {
        console.error('Error fetching user events:', error);
      }
    };

    fetchUserEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      // Send a POST request to update user profile
      const response = await axios.put('http://localhost:5000/api/users/profile', profileForm, {withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });      // Update user state with the new profile data
      setUser ({
        ...user,
        name: profileForm.name,
        email: profileForm.email,
        rollno: profileForm.rollno,
        branch: profileForm.branch,
        section: profileForm.section,
        year: profileForm.year,
        password: profileForm.password,
      });
      console.log('Profile updated:', response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="profile-loading-state">
        <p>Loading profile information...</p>
      </div>
    );
  }
  const handleLeaveClub = async (clubId) => {
    try {
      // Send a DELETE request to leave the club
      await axios.delete(`/api/clubs/${clubId}/leave`); 
      setUserClubs(userClubs.filter(club => club.id !== clubId));
    } catch (error) {
      console.error('Error leaving club:', error);
      alert('Failed to leave club. Please try again.');
    }
  };

  const handleRateEvent = async (eventId, rating) => {
    try {
      // Update event rating in the UI first for instant feedback
      setUserEvents(userEvents.map(event => 
        event.id === eventId ? { ...event, rating } : event
      ));
    } catch (error) {
      console.error('Error rating event:', error);
      alert('Failed to rate event. Please try again.');
    }
  };

  const handleEventFeedbackChange = (eventId, feedbackText) => {
    setUserEvents(userEvents.map(event => 
      event.id === eventId ? { ...event, feedbackText } : event
    ));
  };

  const handleSubmitEventFeedback = async (eventId) => {
    try {
      const event = userEvents.find(e => e.id === eventId);
      if (!event || !event.feedbackText) {
        alert('Please enter feedback before submitting.');
        return;
      }

      // Update events in the UI to show feedback was submitted
      setUserEvents(userEvents.map(e => 
        e.id === eventId ? { ...e, feedback: true } : e
      ));

      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    }
  };
  const handleRSVPEvent = async (eventId) => {
    try {
      // Send a POST request to RSVP for the event
      await axios.post(`/api/events/${eventId}/rsvp`);
      alert('RSVP successful! You will receive a reminder for this event.');
    } catch (error) {
      console.error('Error RSVPing for event:', error);
      alert('Failed to RSVP for event. Please try again.');
    }
  };
  const handleRemoveSavedClub = async (clubId) => {
    try {
      // Send a DELETE request to remove the saved club
      await axios.delete(`/api/clubs/${clubId}/remove`);
      setUser ({
        ...user,
        savedClubs: user.savedClubs.filter(club => club.id !== clubId)
      });
    } catch (error) {
      console.error('Error removing saved club:', error);
      alert('Failed to remove saved club. Please try again.');
    }
  };
  
  const handleRemoveSavedEvent = async (eventId) => {
    try {
      // Send a DELETE request to remove the saved event
      await axios.delete(`/api/events/${eventId}/remove`);
      setUser ({
        ...user,
        savedEvents: user.savedEvents.filter(event => event.id !== eventId)
      });
    } catch (error) {
      console.error('Error removing saved event:', error);
      alert('Failed to remove saved event. Please try again.');
    }
  };

  // Helper functions
  const getOrdinalSuffix = (num) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) {
      return 'st';
    }
    if (j === 2 && k !== 12) {
      return 'nd';
    }
    if (j === 3 && k !== 13) {
      return 'rd';
    }
    return 'th';
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'event':
        return <Calendar className="profile-icon" />;
      case 'club':
        return <Users className="profile-icon" />;
      case 'achievement':
        return <Award className="profile-icon" />;
      default:
        return <Bell className="profile-icon" />;
    }
  };

  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    }
    
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="profile-loading-state">
        <p>Loading profile information...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <header className="profile-header">
        <button className="profile-back-button" onClick={() => navigate('/Home')}>
          <ArrowLeft className="profile-icon" />
          Back to Clubs
        </button>
        <button className="profile-logout-btn"  onClick={()=>navigate('/')}>
          <LogOut className="profile-icon"/>
          Logout
        </button>
      </header>

      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-avatar-container">
            <div 
              className="profile-avatar" >
      <img src="/images/profile-icon.png" alt="Profile" style={{ width: '64px', height: '64px' }} />
            
                         </div>
            <h2 className="profile-name">{user?.name || 'Student Name'}</h2>
            <p className="profile-role">{user?.role || 'Student'}</p>
          </div>

          <nav className="profile-nav">
            <button 
              className={`profile-nav-item ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <Users className="profile-nav-icon" />
              <span>Personal Information</span>
            </button>
            <button 
              className={`profile-nav-item ${activeTab === 'clubs' ? 'active' : ''}`}
              onClick={() => setActiveTab('clubs')}
            >
              <Users className="profile-nav-icon" />
              <span>Clubs Membership</span>
            </button>
            <button 
              className={`profile-nav-item ${activeTab === 'events' ? 'active' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              <Calendar className="profile-nav-icon" />
              <span>Event Participation</span>
            </button>
            <button 
              className={`profile-nav-item ${activeTab === 'attendance' ? 'active' : ''}`}
              onClick={() => setActiveTab('attendance')}
            >
              <CheckCircle className="profile-nav-icon" />
              <span>Attendance</span>
            </button>
            <button 
              className={`profile-nav-item ${activeTab === 'achievements' ? 'active' : ''}`}
              onClick={() => setActiveTab('achievements')}
            >
              <Award className="profile-nav-icon" />
              <span>Achievements</span>
            </button>
            <button 
              className={`profile-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell className="profile-nav-icon" />
              <span>Notifications</span>
            </button>
            <button 
              className={`profile-nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              <BookmarkPlus className="profile-nav-icon" />
              <span>Saved Clubs & Events</span>
            </button>
          </nav>
        </div>

        <div className="profile-content">
          {activeTab === 'personal' && (
            <section className="profile-section">
              <div className="profile-section-header">
                <h3>Personal Information</h3>
                <button 
                  className="profile-edit-button"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="profile-icon" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {isEditing ? (
                <form className="profile-form" onSubmit={handleSubmit}>
                  <div className="profile-form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={profileForm.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="profile-form-group">
                    <label>Email ID</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={profileForm.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="profile-form-group">
                    <label>Roll Number</label>
                    <input 
                      type="text" 
                      name="rollno" 
                      value={profileForm.rollno}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="profile-form-row">
                    <div className="profile-form-group">
                      <label>Branch</label>
                      <input 
                        type="text" 
                        name="branch" 
                        value={profileForm.branch}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="profile-form-group">
                      <label>Section</label>
                      <input 
                        type="text" 
                        name="section" 
                        value={profileForm.section}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="profile-form-group">
                    <label>Year of Study</label>
                    <select 
                      name="year" 
                      value={profileForm.year}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </div>
                  <div className="profile-form-group">
                    <label>Password</label>
                    <input 
                      type="password" 
                      name="password" 
                      value={profileForm.password}
                      onChange={handleInputChange}
                      required
                    />
                    </div>
                  <div className="profile-form-actions">
                    <button type="submit" className="profile-save-button">Save Changes</button>
                    <button 
                      type="button" 
                      className="profile-cancel-button"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-info">
                  <div className="profile-info-row">
                    <div className="profile-info-label">Full Name</div>
                    <div className="profile-info-value">{user?.name || 'Not specified'}</div>
                  </div>
                  <div className="profile-info-row">
                    <div className="profile-info-label">Email ID</div>
                    <div className="profile-info-value">{user?.email || 'Not specified'}</div>
                  </div>
                  <div className="profile-info-row">
                    <div className="profile-info-label">Roll Number</div>
                    <div className="profile-info-value">{user?.rollno || 'Not specified'}</div>
                  </div>
                  <div className="profile-info-row">
                    <div className="profile-info-label">Branch & Section</div>
                    <div className="profile-info-value">
                      {user?.branch ? `${user.branch} - ${user.section || ''}` : 'Not specified'}
                    </div>
                  </div>
                  <div className="profile-info-row">
                    <div className="profile-info-label">Year of Study</div>
                    <div className="profile-info-value">
                      {user?.year ? `${user.year}${getOrdinalSuffix(user.year)} Year` : 'Not specified'}
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          {activeTab === 'clubs' && (
            <section className="profile-section">
              <div className="profile-section-header">
                <h3>Club Memberships</h3>
              </div>
              
              {userClubs.length > 0 ? (
                <div className="profile-clubs-list">
                  {userClubs.map(club => (
                    <div className="profile-membership-card" key={club.id}>
                      <div 
                        className="profile-membership-image" 
                        style={{ backgroundImage: `url(${club.image})` }}
                      ></div>
                      <div className="profile-membership-details">
                        <h4>{club.name}</h4>
                        <div className="profile-membership-meta">
                          <div className="profile-meta-item">
                            <Users className="profile-icon" />
                            <span>{club.role || 'Member'}</span>
                          </div>
                          <div className="profile-meta-item">
                            <Calendar className="profile-icon" />
                            <span>Joined on {new Date(club.joinedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="profile-membership-actions">
                          <button 
                            className="profile-view-club-btn"
                            onClick={() => navigate(`/clubs/${club.id}`)}
                          >
                            View Details
                          </button>
                          <button 
                            className="profile-leave-club-btn"
                            onClick={() => handleLeaveClub(club.id)}
                          >
                            Leave Club
                          </button>
                        </div>
                      </div>
                      {club.badge && (
                        <div className="profile-membership-badge">
                          <Award className="profile-badge-icon" />
                          <span>{club.badge}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="profile-empty-state">
                  <p>You haven't joined any clubs yet.</p>
                  <button 
                    className="profile-explore-clubs-btn"
                    onClick={() => navigate('/')}
                  >
                    Explore Clubs
                  </button>
                </div>
              )}
            </section>
          )}

          {activeTab === 'events' && (
            <section className="profile-section">
              <div className="profile-section-header">
                <h3>Event Participation</h3>
              </div>
              
              <div className="profile-events-tabs">
                <button 
                  className={`profile-event-tab ${activeEventTab === 'upcoming' ? 'active' : ''}`}
                  onClick={() => setActiveEventTab('upcoming')}
                >
                  Upcoming Events
                </button>
                <button 
                  className={`profile-event-tab ${activeEventTab === 'past' ? 'active' : ''}`}
                  onClick={() => setActiveEventTab('past')}
                >
                  Past Events
                </button>
              </div>
              
              {activeEventTab === 'upcoming' ? (
                userEvents.filter(event => new Date(event.date) > new Date()).length > 0 ? (
                  <div className="profile-events-list">
                    {userEvents
                      .filter(event => new Date(event.date) > new Date())
                      .map(event => (
                        <div className="profile-event-card" key={event.id}>
                          <div className="profile-event-date">
                            <span className="profile-date">{new Date(event.date).getDate()}</span>
                            <span className="profile-month">
                              {new Date(event.date).toLocaleString('default', { month: 'short' })}
                            </span>
                          </div>
                          <div className="profile-event-details">
                            <h4>{event.title}</h4>
                            <p>{event.description}</p>
                            <span className="profile-event-time">
                              {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <div className="profile-event-club">
                              <span>Organized by: {event.clubName}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="profile-empty-state">
                    <p>No upcoming events.</p>
                  </div>
                )
              ) : (
                userEvents.filter(event => new Date(event.date) <= new Date()).length > 0 ? (
                  <div className="profile-events-list">
                    {userEvents
                      .filter(event => new Date(event.date) <= new Date())
                      .map(event => (
                        <div className="profile-event-card profile-past" key={event.id}>
                          <div className="profile-event-date">
                            <span className="profile-date">{new Date(event.date).getDate()}</span>
                            <span className="profile-month">
                              {new Date(event.date).toLocaleString('default', { month: 'short' })}
                            </span>
                          </div>
                          <div className="profile-event-details">
                            <h4>{event.title}</h4>
                            <p>{event.description}</p>
                            <div className="profile-event-attendance">
                              <span className={`profile-attendance-badge ${event.attended ? 'attended' : 'absent'}`}>
                                {event.attended ? 'Attended' : 'Absent'}
                              </span>
                            </div>
                            {event.certificate && (
                              <button className="profile-download-certificate">
                                Download Certificate
                              </button>
                            )}
                          </div>
                          {!event.feedback && (
                            <div className="profile-event-feedback">
                              <div className="profile-rating-stars">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <Star 
                                    key={star}
                                    className={`profile-star ${event.rating >= star ? 'active' : ''}`}
                                    onClick={() => handleRateEvent(event.id, star)}
                                  />
                                ))}
                              </div>
                              <textarea 
                                placeholder="Share your feedback about this event..."
                                value={event.feedbackText || ''}
                                onChange={(e) => handleEventFeedbackChange(event.id, e.target.value)}
                                className="profile-feedback-textarea"
                              ></textarea>
                              <button 
                                className="profile-submit-feedback"
                                onClick={() => handleSubmitEventFeedback(event.id)}
                              >
                                Submit Feedback
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="profile-empty-state">
                    <p>No past events.</p>
                  </div>
                )
              )}
            </section>
          )}

          {activeTab === 'attendance' && (
            <section className="profile-section">
              <div className="profile-section-header">
                <h3>Attendance Record</h3>
              </div>
              
              <div className="profile-attendance-overview">
                <div className="profile-attendance-stats">
                  {userClubs.map(club => {
                    const clubEvents = userEvents.filter(event => event.clubId === club.id);
                    const attendedEvents = clubEvents.filter(event => event.attended).length;
                    const totalEvents = clubEvents.length;
                    const attendancePercentage = totalEvents > 0 ? (attendedEvents / totalEvents) * 100 : 0;
                    
                    return (
                      <div className="profile-attendance-card" key={club.id}>
                        <h4>{club.name}</h4>
                        <div className="profile-attendance-bar">
                          <div 
                            className="profile-attendance-progress" 
                            style={{ width: `${attendancePercentage}%` }}
                          ></div>
                        </div>
                        <div className="profile-attendance-info">
                          <span>{attendancePercentage.toFixed(0)}% Attendance</span>
                          <span>{attendedEvents}/{totalEvents} Events</span>
                        </div>
                        {attendancePercentage < 75 && (
                          <div className="profile-attendance-warning">
                            <span>⚠️ Low attendance warning</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {activeTab === 'achievements' && (
            <section className="profile-section">
              <div className="profile-section-header">
                <h3>Achievements & Awards</h3>
              </div>
              
              <div className="profile-achievements-list">
                {user?.achievements?.length > 0 ? (
                  user.achievements.map(achievement => (
                    <div className="profile-achievement-card" key={achievement.id}>
                      <div className="profile-achievement-icon">
                        <Award className="profile-award-icon" />
                      </div>
                      <div className="profile-achievement-details">
                        <h4>{achievement.title}</h4>
                        <p>{achievement.description}</p>
                        <span className="profile-achievement-date">
                          Awarded on {new Date(achievement.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="profile-empty-state">
                    <p>No achievements yet. Keep participating in club activities!</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {activeTab === 'notifications' && (
            <section className="profile-section">
              <div className="profile-section-header">
                <h3>Notifications</h3>
              </div>
              
              <div className="profile-notifications-list">
                {user?.notifications?.length > 0 ? (
                  user.notifications.map(notification => (
                    <div 
                      className={`profile-notification-item ${notification.read ? '' : 'unread'}`} 
                      key={notification.id}
                    >
                      <div className="profile-notification-icon">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="profile-notification-content">
                        <p>{notification.message}</p>
                        <span className="profile-notification-time">
                          {formatRelativeTime(notification.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="profile-empty-state">
                    <p>No notifications.</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {activeTab === 'wishlist' && (
            <section className="profile-section">
              <div className="profile-section-header">
                <h3>Saved Clubs & Events</h3>
              </div>
              
              <div className="profile-wishlist-tabs">
                <button 
                  className={`profile-wishlist-tab ${activeWishlistTab === 'clubs' ? 'active' : ''}`}
                  onClick={() => setActiveWishlistTab('clubs')}
                >
                  Saved Clubs
                </button>
                <button 
                  className={`profile-wishlist-tab ${activeWishlistTab === 'events' ? 'active' : ''}`}
                  onClick={() => setActiveWishlistTab('events')}
                >
                  Saved Events
                </button>
              </div>
              
              {activeWishlistTab === 'clubs' ? (
                user?.savedClubs?.length > 0 ? (
                  <div className="profile-saved-clubs-list">
                    {user.savedClubs.map(club => (
                      <div className="profile-saved-item" key={club.id}>
                        <div 
                          className="profile-saved-item-image" 
                          style={{ backgroundImage: `url(${club.image})` }}
                        ></div>
                        <div className="profile-saved-item-details">
                          <h4>{club.name}</h4>
                          <p>{club.description}</p>
                          <div className="profile-saved-item-actions">
                            <button 
                              className="profile-view-details-btn"
                              onClick={() => navigate(`/clubs/${club.id}`)}
                            >
                              View Details
                            </button>
                            <button 
                              className="profile-remove-saved-btn"
                              onClick={() => handleRemoveSavedClub(club.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="profile-empty-state">
                    <p>No saved clubs.</p>
                  </div>
                )
              ) : (
                user?.savedEvents?.length > 0 ? (
                  <div className="profile-saved-events-list">
                    {user.savedEvents.map(event => (
                      <div className="profile-saved-item" key={event.id}>
                        <div className="profile-saved-event-date">
                          <span className="profile-date">{new Date(event.date).getDate()}</span>
                          <span className="profile-month">
                            {new Date(event.date).toLocaleString('default', { month: 'short' })}
                          </span>
                        </div>
                        <div className="profile-saved-item-details">
                          <h4>{event.title}</h4>
                          <p>{event.description}</p>
                          <span className="profile-event-club">
                            Organized by: {event.clubName}
                          </span>
                          <div className="profile-saved-item-actions">
                            <button 
                              className="profile-rsvp-btn"
                              onClick={() => handleRSVPEvent(event.id)}
                            >
                              Join event!!
                            </button>
                            <button 
                              className="profile-remove-saved-btn"
                              onClick={() => handleRemoveSavedEvent(event.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="profile-empty-state">
                    <p>No saved events.</p>
                  </div>
                )
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
