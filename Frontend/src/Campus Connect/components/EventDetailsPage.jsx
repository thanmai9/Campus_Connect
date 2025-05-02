import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaArrowLeft, FaClock, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import '../styles/EventDetailsPage.css';

const EventDetailsPage = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    course: '',
    reason: ''
  });
  const [activeTab, setActiveTab] = useState('details');
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        // Mock events data
        const eventsData = [
          {
            id: 1,
            title: 'Spardha Sports Festival',
            description: 'Annual inter-college sports competition featuring cricket, basketball, volleyball, and athletics.',
            longDescription: 'Join us for the biggest sporting event of the year! The Spardha Sports Festival brings together athletes from colleges across the region to compete in various sports including cricket, basketball, volleyball, tennis, and track & field events. This three-day extravaganza features intense competition, live entertainment, and opportunities to network with fellow sports enthusiasts. Whether you\'re participating or cheering from the sidelines, this is an event you won\'t want to miss!',
            date: '2023-11-15',
            time: '09:00 AM - 06:00 PM',
            location: 'University Sports Complex',
            organizer: 'Sports Committee',
            category: 'Sports',
            image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            registrationClosingDate: '2023-11-10',
            maxCapacity: 500,
            currentRegistrations: 342,
            isPast: false,
            highlights: [
              'Inter-college competitions in 8 different sports',
              'Cash prizes worth ₹50,000',
              'Live DJ and entertainment',
              'Food stalls and refreshments',
              'Certificates for all participants'
            ],
            schedule: [
              { time: '09:00 AM - 10:00 AM', activity: 'Opening Ceremony' },
              { time: '10:00 AM - 01:00 PM', activity: 'Preliminary Rounds' },
              { time: '01:00 PM - 02:00 PM', activity: 'Lunch Break' },
              { time: '02:00 PM - 05:00 PM', activity: 'Quarter & Semi Finals' },
              { time: '05:00 PM - 06:00 PM', activity: 'Finals & Prize Distribution' }
            ],
            organizers: [
              { name: 'Rahul Sharma', role: 'Event Coordinator', contact: 'rahul@example.com' },
              { name: 'Priya Patel', role: 'Sports Director', contact: 'priya@example.com' }
            ]
          },
          {
            id: 2,
            title: 'Cultural Fest',
            description: 'The biggest cultural event of the year with music, dance, and theatrical performances.',
            longDescription: 'Experience the vibrant tapestry of cultures at our annual Cultural Fest! This spectacular event showcases the rich diversity of talent through music, dance, drama, and art. Watch mesmerizing performances from classical to contemporary, participate in exciting competitions, and immerse yourself in a celebration of creativity and expression. With professional sound and lighting, this event transforms our campus into a magical venue that brings together students, faculty, alumni, and the wider community for an unforgettable evening of entertainment and cultural appreciation.',
            date: '2023-11-20',
            time: '02:00 PM - 10:00 PM',
            location: 'Main Auditorium',
            organizer: 'Cultural Committee',
            category: 'Culture',
            image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            registrationClosingDate: '2023-11-15',
            maxCapacity: 1000,
            currentRegistrations: 678,
            isPast: false,
            highlights: [
              'Classical and contemporary dance performances',
              'Live music concert featuring college bands',
              'Theatrical plays and skits',
              'Art exhibition by students',
              'Food court with diverse cuisine'
            ],
            schedule: [
              { time: '02:00 PM - 03:00 PM', activity: 'Inauguration Ceremony' },
              { time: '03:00 PM - 05:00 PM', activity: 'Dance Performances' },
              { time: '05:00 PM - 06:30 PM', activity: 'Drama & Theatrical Acts' },
              { time: '06:30 PM - 07:30 PM', activity: 'Dinner Break' },
              { time: '07:30 PM - 10:00 PM', activity: 'Music Concert & Closing' }
            ],
            organizers: [
              { name: 'Ananya Desai', role: 'Festival Director', contact: 'ananya@example.com' },
              { name: 'Rohan Verma', role: 'Cultural Secretary', contact: 'rohan@example.com' }
            ]
          },
          {
            id: 3,
            title: 'Mahasivaratri Celebrations',
            description: 'Special prayers, cultural programs and community service to celebrate Mahasivaratri.',
            longDescription: 'Join us for a night of spiritual awakening and devotion as we celebrate Mahasivaratri, the great night of Lord Shiva. Our celebrations include traditional rituals, bhajans, cultural performances, and meditation sessions led by experienced practitioners. The all-night vigil represents overcoming darkness and ignorance in life. Participate in the Rudra Abhishekam ceremony, listen to enlightening discourses on Shiva philosophy, and experience the peace and tranquility of this sacred festival. A special prasadam will be distributed to all attendees, and there will be opportunities for community service and spiritual discussions.',
            date: '2023-12-05',
            time: '06:00 PM - 06:00 AM',
            location: 'Temple Grounds',
            organizer: 'Spiritual Club',
            category: 'Spiritual',
            image: 'https://images.unsplash.com/photo-1615042989860-76c104c25f56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            registrationClosingDate: '2023-12-03',
            maxCapacity: 300,
            currentRegistrations: 175,
            isPast: false,
            highlights: [
              'Special Rudra Abhishekam ritual',
              'Continuous chanting and bhajans',
              'Spiritual discourses by learned scholars',
              'Group meditation sessions',
              'Prasadam distribution at dawn'
            ],
            schedule: [
              { time: '06:00 PM - 07:00 PM', activity: 'Initial Prayers & Lamp Lighting' },
              { time: '07:00 PM - 09:00 PM', activity: 'Cultural Performances & Bhajans' },
              { time: '09:00 PM - 12:00 AM', activity: 'Main Abhishekam & Arati' },
              { time: '12:00 AM - 04:00 AM', activity: 'Night Vigil with Meditation & Chanting' },
              { time: '04:00 AM - 06:00 AM', activity: 'Morning Prayers & Prasadam Distribution' }
            ],
            organizers: [
              { name: 'Swami Dayananada', role: 'Spiritual Guide', contact: 'swami@example.com' },
              { name: 'Laxmi Narayan', role: 'Event Coordinator', contact: 'laxmi@example.com' }
            ]
          }
        ];

        // Parse the eventId to match with the events array
        const eventIdNumber = parseInt(eventId, 10);
        const foundEvent = eventsData.find(e => e.id === eventIdNumber);

        if (foundEvent) {
          setEvent(foundEvent);
          // Check if user is already registered (this would typically check against server data)
          const userRegisteredStatus = localStorage.getItem(`event_${eventIdNumber}_registered`);
          setIsRegistered(userRegisteredStatus === 'true');
        } else {
          console.error('Event not found with ID:', eventId);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleRegisterClick = () => {
    setShowRegistrationModal(true);
  };

  const handleCloseModal = () => {
    setShowRegistrationModal(false);
    // Reset form
    setRegistrationForm({
      name: '',
      email: '',
      phone: '',
      college: '',
      year: '',
      course: '',
      reason: ''
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setRegistrationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    // Here you would submit the registration data to your backend
    console.log('Registration submitted:', { event: event, form: registrationForm });
    
    // Set registration status in localStorage (this would typically be handled by server)
    localStorage.setItem(`event_${event.id}_registered`, 'true');
    setIsRegistered(true);
    
    // Close modal and show confirmation
    handleCloseModal();
    setShowConfirmationMessage(true);
    setTimeout(() => setShowConfirmationMessage(false), 5000);
  };

  const TabContent = () => {
    switch(activeTab) {
      case 'details':
        return (
          <div className="tab-content">
            <div className="event-details-section">
              <div className="detail-item">
                <h3>Event Description</h3>
                <p>{event.longDescription}</p>
              </div>
              
              <div className="detail-item">
                <h3>Event Highlights</h3>
                <ul className="highlights-list">
                  {event.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
              
              <div className="registration-info">
                <div className="info-card">
                  <h4>Registration Closes</h4>
                  <p>{new Date(event.registrationClosingDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
                <div className="info-card">
                  <h4>Capacity</h4>
                  <p>{event.currentRegistrations}/{event.maxCapacity}</p>
                </div>
                <div className="info-card">
                  <h4>Registration Status</h4>
                  <p className={`status ${event.currentRegistrations >= event.maxCapacity ? 'full' : 'open'}`}>
                    {event.currentRegistrations >= event.maxCapacity ? 'Full' : 'Open'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'schedule':
        return (
          <div className="tab-content">
            <h3>Event Schedule</h3>
            <div className="schedule-timeline">
              {event.schedule.map((item, index) => (
                <div className="timeline-item" key={index}>
                  <div className="timeline-time">{item.time}</div>
                  <div className="timeline-connector">
                    <div className="connector-dot"></div>
                    {index < event.schedule.length - 1 && <div className="connector-line"></div>}
                  </div>
                  <div className="timeline-content">
                    <h4>{item.activity}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'organizers':
        return (
          <div className="tab-content">
            <h3>Event Organizers</h3>
            <div className="organizers-list">
              {event.organizers.map((organizer, index) => (
                <div className="organizer-card" key={index}>
                  <div className="organizer-avatar">
                    <FaUsers className="avatar-icon" />
                  </div>
                  <div className="organizer-info">
                    <h4>{organizer.name}</h4>
                    <p className="organizer-role">{organizer.role}</p>
                    <a href={`mailto:${organizer.contact}`} className="organizer-contact">
                      <FaEnvelope className="contact-icon" /> {organizer.contact}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="event-details-loading-state">
        <p>Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="event-details-error-state">
        <p>Event not found</p>
        <button onClick={() => navigate('/events')}>Back to Events</button>
      </div>
    );
  }

  return (
    <div className="devent-details-page">
      {showConfirmationMessage && (
        <div className="registration-confirmation">
          <FaCheckCircle className="confirmation-icon" />
          <p>You have successfully registered for this event!</p>
        </div>
      )}
      
      <header className="details-header">
        <button className="back-button" onClick={() => navigate('/EventsPage')}>
          <FaArrowLeft className="icon" />
          Back to Events
        </button>
      </header>

      <div className="event-hero">
  <div 
    className="event-cover-image"
    style={{ backgroundImage: `url(${event.image})` }}
  >
    <div className="cover-overlay" />
    <div className="event-category-badge">{event.category}</div>
  </div>
</div>

<div className="devent-info-container" style={{ padding: "0 2rem" }}>
  <div className="devent-info-left">
    <h1>{event.title}</h1>
    <p className="devent-description">{event.description}</p>
    <div className="devent-meta">
      <div className="dmeta-item">
        <FaCalendarAlt className="icon" />
        <span>{new Date(event.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</span>
      </div>
      <div className="dmeta-item">
        <FaClock className="icon" />
        <span>{event.time}</span>
      </div>
      <div className="dmeta-item">
        <FaMapMarkerAlt className="icon" />
        <span>{event.location}</span>
      </div>
      <div className="dmeta-item">
        <FaUsers className="icon" />
        <span>Organized by {event.organizer}</span>
      </div>
    </div>
  </div>

  <div className="devent-info-right">
    {!event.isPast && !isRegistered && (
      <button className="dregister-now-btn" onClick={handleRegisterClick}>
        Register Now
      </button>
    )}
    {!event.isPast && isRegistered && (
      <div className="already-registered">
        <FaCheckCircle className="check-icon" />
        <span>You're registered for this event</span>
      </div>
    )}
    {event.isPast && (
      <div className="past-event-notice">
        This event has already taken place
      </div>
    )}
  </div>
</div>
      <nav className="details-nav">
        <button 
          className={`nav-btn ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
        <button 
          className={`nav-btn ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          Schedule
        </button>
        <button 
          className={`nav-btn ${activeTab === 'organizers' ? 'active' : ''}`}
          onClick={() => setActiveTab('organizers')}
        >
          Organizers
        </button>
      </nav>

      <main className="details-content">
        <TabContent />
      </main>

      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="registration-modal">
          <div className="registration-form-container">
            <button className="close-btn" onClick={handleCloseModal}>&times;</button>
            <h2>Register for {event.title}</h2>
            <div className="event-info-summary">
              <div className="info-item">
                <FaCalendarAlt className="icon" />
                <span>{new Date(event.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} • {event.time}</span>
              </div>
              <div className="info-item">
                <FaMapMarkerAlt className="icon" />
                <span>{event.location}</span>
              </div>
            </div>
            <form className="registration-form" onSubmit={handleSubmitRegistration}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={registrationForm.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={registrationForm.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={registrationForm.phone}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="college">College/University *</label>
                  <input
                    type="text"
                    id="college"
                    name="college"
                    value={registrationForm.college}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="year">Year of Study *</label>
                  <select
                    id="year"
                    name="year"
                    value={registrationForm.year}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="5+">5+ Year</option>
                    <option value="alumni">Alumni</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="course">Course/Program *</label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  value={registrationForm.course}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="reason">Why do you want to attend this event? *</label>
                <textarea
                  id="reason"
                  name="reason"
                  rows="4"
                  value={registrationForm.reason}
                  onChange={handleFormChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">Complete Registration</button>
            </form>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} VVIT Campus Events. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EventDetailsPage;