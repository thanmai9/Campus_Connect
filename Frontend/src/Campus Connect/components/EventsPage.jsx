import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EventsPage.css';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaSearch, FaFilter, FaArrowLeft, FaCalendarCheck, FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    course: '',
    reason: ''
  });
  const navigate = useNavigate();

  // Example event data - replace with API call in production
  useEffect(() => {
    // Simulating API call to fetch events
    const fetchedEvents = [
      {
        id: 1,
        title: 'Sports Meet',
        description: 'Annual inter-college sports competition featuring cricket, basketball, volleyball, and athletics.',
        date: '2023-11-15',
        time: '09:00 AM - 06:00 PM',
        location: 'University Sports Complex',
        organizer: 'Sports Committee',
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        isFeatured: true,
        registrationClosingSoon: true,
        isPast: false
      },
      {
        id: 2,
        title: 'Fest',
        description: 'The biggest cultural event of the year with music, dance, and theatrical performances.',
        date: '2023-12-22',
        time: '9:00 AM - 10:00 PM',
        location: 'Main Auditorium',
        organizer: 'Cultural Committee',
        category: 'Culture',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        isFeatured: true,
        registrationClosingSoon: false,
        isPast: false
      },
      {
        id: 3,
        title: 'Mahasivaratri Celebrations',
        description: 'Special prayers, cultural programs and community service to celebrate Mahasivaratri.',
        date: '2023-12-05',
        time: '06:00 PM - 06:00 AM',
        location: 'Temple Grounds',
        organizer: 'Spiritual Club',
        category: 'Spiritual',
        image: 'https://images.unsplash.com/photo-1642774667024-e9e2f37914d2?q=80&w=2014&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        isFeatured: true,
        registrationClosingSoon: false,
        isPast: false
      },
      {
      id: 4,
        title: 'Spardha - ACM Fest',
        description: 'Annual technology and coding competition featuring hackathons, coding challenges, and tech talks by industry experts.',
        date: '2023-11-15',
        time: '09:00 AM - 06:00 PM',
        location: 'University Technology Complex',
        organizer: 'ACM Student Chapter',
        category: 'Tech',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        isFeatured: true,
        registrationClosingSoon: true,
        isPast: false
      },
      {
        id: 5,
        title: 'Orientation Day',
        description: 'Welcome ceremony for new students with campus tours, department introductions, and interactive sessions with faculty and seniors.',
        date: '2023-12-22',
        time: '9:00 AM - 10:00 PM',
        location: 'Main Auditorium',
        organizer: 'Student Affairs Committee',
        category: 'Campus',
        image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        isFeatured: true,
        registrationClosingSoon: false,
        isPast: false
      },
      {
        id: 6,
        title: 'Hackathon 2023',
        description: '24-hour coding competition where students develop innovative solutions to real-world problems with mentorship from industry professionals.',
        date: '2023-12-05',
        time: '08:00 AM - 08:00 AM (Next Day)',
        location: 'Computer Science Building',
        organizer: 'Tech Innovation Club',
        category: 'Tech',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80',
        isFeatured: true,
        registrationClosingSoon: false,
        isPast: false
      },
      {
        id: 7,
        title: 'Dargah to Durga Walk',
        description: 'Annual peace walk visiting local temples and promoting community harmony.',
        date: '2023-11-25',
        time: '07:00 AM - 11:00 AM',
        location: 'Starting from University Gate',
        organizer: 'Cultural Club',
        category: 'Culture',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlkJJSZq2UJzytzK8kwZicYQet1e6x-Ntgjg&s',
        isFeatured: false,
        registrationClosingSoon: true,
        isPast: true
      },
      {
        id: 8,
        title: "Theatre's Day",
        description: 'A day of theatrical performances, workshops, and interactive sessions by the Drama Club.',
        date: '2025-03-12',
        time: '10:00 AM - 08:00 PM',
        location: 'Drama Hall',
        organizer: 'Drama Club',
        category: 'Arts',
        image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
        isFeatured: false,
        registrationClosingSoon: false,
        isPast: true
      },
      {
        id: 9,
        title: 'Farewell Ceremony',
        description: 'A heartfelt send-off for the graduating batch with speeches, performances, and awards.',
        date: '2023-10-15',
        time: '03:00 PM - 09:00 PM',
        location: 'University Square',
        organizer: 'Student Council',
        category: 'Campus',
        image: 'https://staticlearn.shine.com/l/m/images/blog/mobile/farewell_message_to_colleagues.webp',
        isFeatured: false,
        registrationClosingSoon: false,
        isPast: false
      },
      {
        id: 10,
        title: 'Freshers Day',
        description: 'Welcome celebration for the new batch of students with performances, games and networking.',
        date: '2023-10-20',
        time: '09:00 AM - 05:00 PM',
        location: 'University Grounds',
        organizer: 'Student Union',
        category: 'Campus',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
        isFeatured: false,
        registrationClosingSoon: false,
        isPast: false
      }
    ];

    setEvents(fetchedEvents);
    setFilteredEvents(fetchedEvents);
  }, []);

  // Filter events based on search query and category filter
  useEffect(() => {
    let results = events;

    // Filter by search query
    if (searchQuery) {
      results = results.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (activeFilter !== 'all') {
      if (activeFilter === 'upcoming') {
        results = results.filter(event => !event.isPast);
      } else if (activeFilter === 'past') {
        results = results.filter(event => event.isPast);
      } else {
        results = results.filter(event => event.category.toLowerCase() === activeFilter.toLowerCase());
      }
    }

    setFilteredEvents(results);
  }, [searchQuery, activeFilter, events]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };

  const handleCloseModal = () => {
    setShowRegistrationModal(false);
    setSelectedEvent(null);
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
    console.log('Registration submitted:', { event: selectedEvent, form: registrationForm });
    
    // Show success message and close modal
    alert('Registration successful!!!');
    handleCloseModal();
  };

  const handleViewDetails = (eventId) => {
    // Navigate to event details page
    navigate(`/events/${eventId}`);
  };
  
  const handleBackToHome = () => {
    navigate('/Home');
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Get featured events
  const featuredEvents = filteredEvents.filter(event => event.isFeatured);
  
  // Get upcoming events (not past and not featured)
  const upcomingEvents = filteredEvents.filter(event => !event.isPast && !event.isFeatured);
  
  // Get past events
  const pastEvents = filteredEvents.filter(event => event.isPast);

  // Calendar data generation
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Check if a day has events
  const dayHasEvents = (day) => {
    if (!day) return false;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === currentYear && 
             eventDate.getMonth() === currentMonth && 
             eventDate.getDate() === day;
    });
  };

  return (
    <div className="events-page">
      {/* Header/Navbar Section */}
      <header className="events-navbar">
        <div className="navbar-content">
          <div className="logo">
            <img src="/images/college-logo.jpeg" alt="VVIT Logo" className="college-logo" />
            <div className="logo-text">
              <h1>Events</h1>
            </div>
          </div>
          <div className="header-actions">
            <button className="nav-btn" onClick={() => navigate('/Home')}>
              <FaHome className="icon" />
              Home
            </button>
            <button className="nav-btn" onClick={() => navigate('/ProfilePage')}>
              <FaUser className="icon" />
              Profile
            </button>
            <button className="logout-btn" onClick={() => navigate('/Home')}>
              <FaSignOutAlt className="icon" />
              Logout
            </button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="events-hero">
        <div className="ehero-content">
          <h2>Campus Events</h2>
          <p>Discover, participate, and make the most of your campus experience with these exciting events.</p>

          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search events by title, description, or organizer..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <div className="calendar-toggle-btn" onClick={toggleCalendar}>
            <FaCalendarCheck className="calendar-icon" /> 
            {showCalendar ? 'Hide Calendar' : 'Show Event Calendar'}
          </div>

          {showCalendar && (
            <div className="event-calendar">
              <div className="calendar-header">
                <h3>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}</h3>
              </div>
              <div className="calendar-weekdays">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>
              <div className="calendar-days">
                {calendarDays.map((day, index) => (
                  <div key={index} className={`calendar-day ${day ? '' : 'empty'} ${dayHasEvents(day) ? 'has-event' : ''}`}>
                    {day}
                    {dayHasEvents(day) && <span className="event-indicator"></span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="filter-container">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              <FaFilter /> All Events
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'upcoming' ? 'active' : ''}`}
              onClick={() => handleFilterChange('upcoming')}
            >
              Upcoming
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'past' ? 'active' : ''}`}
              onClick={() => handleFilterChange('past')}
            >
              Past
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'sports' ? 'active' : ''}`}
              onClick={() => handleFilterChange('sports')}
            >
              Sports
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'culture' ? 'active' : ''}`}
              onClick={() => handleFilterChange('culture')}
            >
              Culture
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'arts' ? 'active' : ''}`}
              onClick={() => handleFilterChange('arts')}
            >
              Arts
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'spiritual' ? 'active' : ''}`}
              onClick={() => handleFilterChange('spiritual')}
            >
              Spiritual
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'campus' ? 'active' : ''}`}
              onClick={() => handleFilterChange('campus')}
            >
              Campus
            </button>
          </div>
        </div>
      </section>

      <main className="main-content">
        {/* Featured Events Section */}
        {featuredEvents.length > 0 && (
          <section className="featured-events">
            <h2>Featured Events</h2>
            <div className="featured-events-container">
              {featuredEvents.map(event => (
                <div className="featured-event-card" key={event.id}>
                  <div className="event-image" style={{ backgroundImage: `url(${event.image})` }}>
                    <div className="event-category">{event.category}</div>
                    {event.registrationClosingSoon && !event.isPast && (
                      <div className="registration-closing-badge">Registration Closing Soon!</div>
                    )}
                    {event.isPast && (
                      <div className="past-event-badge">Past Event</div>
                    )}
                  </div>
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <p className="event-description">{event.description}</p>
                    <div className="event-date">
                      <FaCalendarAlt />
                      <span>{new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} • {event.time}</span>
                    </div>
                    <div className="event-location">
                      <FaMapMarkerAlt />
                      <span>{event.location}</span>
                    </div>
                    <div className="event-organizer">
                      <FaUsers />
                      <span>{event.organizer}</span>
                    </div>
                    <div className="event-actions">
                      <button 
                        className="view-details-btn"
                        onClick={() => handleViewDetails(event.id)}
                      >
                        View Details
                      </button>
                      {!event.isPast && (
                        <button 
                          className="register-btn"
                          onClick={() => handleRegisterClick(event)}
                        >
                          Register Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Events Section */}
        {upcomingEvents.length > 0 && (
          <section className="upcoming-events">
            <h2>Upcoming Events</h2>
            <div className="events-grid">
              {upcomingEvents.map(event => (
                <div className="event-card" key={event.id}>
                  <div className="event-image" style={{ backgroundImage: `url(${event.image})` }}>
                    <div className="event-category">{event.category}</div>
                    {event.registrationClosingSoon && (
                      <div className="registration-closing-badge">Registration Closing Soon!</div>
                    )}
                  </div>
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <p className="event-description">{event.description}</p> {/* Extended description */}
                    <div className="event-meta">
                      <span>{new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                      <span>{event.organizer}</span>
                    </div>
                    <div className="event-actions">
                      <div className="coming-soon-badge">
                        Details Revealing Soon!
                      </div>
                      <button 
                        className="register-btn"
                        onClick={() => handleRegisterClick(event)}
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <section className="past-events">
            <h2>Past Events</h2>
            <div className="events-grid">
              {pastEvents.map(event => (
                <div className="event-card past" key={event.id}>
                  <div className="event-image" style={{ backgroundImage: `url(${event.image})` }}>
                    <div className="event-category">{event.category}</div>
                    <div className="past-event-badge">Past Event</div>
                  </div>
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <p className="event-description">{event.description}</p> {/* Extended description */}
                    <div className="event-meta">
                      <span>{new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                      <span>{event.organizer}</span>
                    </div>
                    <div className="event-past-details">
                      <p>Event Highlights:</p>
                      <ul>
                        <li>Total Participants: {Math.floor(Math.random() * 200) + 100}</li>
                        <li>Duration: {event.time}</li>
                        <li>Location: {event.location}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* No Events Found Message */}
        {filteredEvents.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h3>No events found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </main>

      {/* Registration Modal */}
      {showRegistrationModal && selectedEvent && (
        <div className="registration-modal">
          <div className="registration-form-container">
            <button className="close-btn" onClick={handleCloseModal}>&times;</button>
            <h2>Register for {selectedEvent.title}</h2>
            <div className="event-info">
              <div>
                <FaCalendarAlt />
                <span>{new Date(selectedEvent.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} • {selectedEvent.time}</span>
              </div>
              <div>
                <FaMapMarkerAlt />
                <span>{selectedEvent.location}</span>
              </div>
              <div>
                <FaUsers />
                <span>Organized by {selectedEvent.organizer}</span>
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
                    <option value="alumni">Alumni</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="course">Branch *</label>
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
          <div className="footer-logo">
            
            <h3>VVIT Campus Events</h3>
          </div>
          <p>© {new Date().getFullYear()} VVIT Campus Events. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EventsPage;