import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, Star, CheckCircle } from 'lucide-react';
import '../styles/ClubDetails.css';

const ClubDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [showJoinMessage, setShowJoinMessage] = useState(false);
  const { clubId } = useParams();
  const navigate = useNavigate();
  const feedbackTextareaRef = useRef(null);

  // Fetch club data when component mounts
  useEffect(() => {
    const fetchClub = async () => {
      setLoading(true);
      try {
        // Mock clubs data - make sure it matches the format in ClubsPage
        const clubsData = [
          {
            id: 1,
            name: "VVIT Sports Club",
            description: "Join us for cricket, basketball, volleyball and more! Regular tournaments and training sessions.",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
            category: "Sports",
            members: 150,
            frequency: "Daily practice",
            rating: 4.8,
            events: [
              { id: 1, title: "Basketball Tournament", date: "2023-12-15", description: "Annual inter-college tournament" },
              { id: 2, title: "Cricket Match", date: "2023-11-05", description: "Friendly match with neighboring college" }
            ]
          },
          {
            id: 2,
            name: "Classical Dance Club",
            description: "Learn and perform various classical dance forms including Bharatanatyam and Kuchipudi.",
            image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad",
            category: "Cultural",
            members: 75,
            frequency: "Weekly classes",
            rating: 4.9,
            events: [
              { id: 1, title: "Dance Workshop", date: "2023-11-20", description: "Learn traditional dance forms" },
              { id: 2, title: "Annual Performance", date: "2023-12-10", description: "Showcase your skills" }
            ]
          },
          {
            id: 3,
            name: "Coding Club",
            description: "Master programming through regular coding challenges, hackathons, and workshops.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Technical",
            members: 120,
            frequency: "Weekly meetups",
            rating: 4.7,
            events: [
              { id: 1, title: "Hackathon", date: "2023-12-05", description: "24-hour coding competition" },
              { id: 2, title: "Web Dev Workshop", date: "2023-11-15", description: "Learn modern web development" }
            ]
          },
          {
            id: 4,
            name: "Martial Arts Academy",
            description: "Train in various martial arts forms under expert guidance. Regular competitions and gradings.",
            image: "https://images.unsplash.com/photo-1555597673-b21d5c935865",
            category: "Fitness",
            members: 80,
            frequency: "Thrice weekly",
            rating: 4.8,
            events: [
              { id: 1, title: "Karate Competition", date: "2023-12-20", description: "Inter-college karate tournament" },
              { id: 2, title: "Self-Defense Workshop", date: "2023-11-10", description: "Learn basic self-defense techniques" }
            ]
          },
          {
            id: 5,
            name: "Yoga & Meditation",
            description: "Find inner peace and physical wellness through yoga and meditation practices.",
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
            category: "Fitness",
            members: 60,
            frequency: "Daily sessions",
            rating: 4.9,
            events: [
              { id: 1, title: "Meditation Retreat", date: "2023-12-25", description: "One-day meditation retreat" },
              { id: 2, title: "Yoga Workshop", date: "2023-11-18", description: "Advanced yoga postures" }
            ]
          },
          {
            id: 6,
            name: "Bhagavad Gita Study Circle",
            description: "Weekly discussions and in-depth study of Bhagavad Gita and its teachings.",
            image: "https://images.unsplash.com/photo-1477240489935-6c96abea2aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Spiritual",
            members: 45,
            frequency: "Weekly meets",
            rating: 4.9,
            events: [
              { id: 1, title: "Guest Lecture", date: "2023-12-12", description: "Spiritual discourse by visiting scholar" },
              { id: 2, title: "Group Discussion", date: "2023-11-22", description: "Chapter 4 analysis and discussion" }
            ]
          },
          {
            id: 7,
            name: "Musical Instruments",
            description: "Learn various instruments including guitar, tabla, and keyboard. Regular performances.",
            image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629",
            category: "Cultural",
            members: 65,
            frequency: "Weekly classes",
            rating: 4.7,
            events: [
              { id: 1, title: "Music Concert", date: "2023-12-18", description: "Annual music night" },
              { id: 2, title: "Guitar Workshop", date: "2023-11-08", description: "Learn guitar basics" }
            ]
          },
          {
            id: 8,
            name: "Singing Club",
            description: "Develop your vocal talents and perform in various college events and competitions.",
            image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
            category: "Cultural",
            members: 55,
            frequency: "Twice weekly",
            rating: 4.6,
            events: [
              { id: 1, title: "Singing Competition", date: "2023-12-22", description: "College-wide singing contest" },
              { id: 2, title: "Vocal Training", date: "2023-11-12", description: "Professional vocal coach session" }
            ]
          },
          {
            id: 9,
            name: "Drawing & Painting Club",
            description: "Express your creativity through various art forms and techniques in a supportive environment.",
            image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
            category: "Arts",
            members: 50,
            frequency: "Weekly sessions",
            rating: 4.7,
            events: [
              { id: 1, title: "Art Exhibition", date: "2023-12-28", description: "Annual student art showcase" },
              { id: 2, title: "Painting Workshop", date: "2023-11-25", description: "Learn watercolor techniques" }
            ]
          }
        ];

        // Parse the clubId to match with the clubs array
        const clubIdNumber = parseInt(clubId, 10);
        const foundClub = clubsData.find(c => c.id === clubIdNumber);

        if (foundClub) {
          setClub(foundClub);
          // Fetch feedback data
          fetchFeedbacks();
        } else {
          console.error('Club not found with ID:', clubId);
        }
      } catch (error) {
        console.error('Error fetching club:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClub();
  }, [clubId]);

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    if (!feedbackText || feedbackText.trim() === '') {
      alert('Please enter your feedback');
      return;
    }

    try {
      // Mocking feedback submission for now
      const newFeedback = {
        id: Date.now(), // Use timestamp for unique ID
        rating: rating,
        content: feedbackText,
        createdAt: new Date().toLocaleDateString()
      };

      setFeedbacks([newFeedback, ...feedbacks]);

      // Reset form
      setRating(0);
      setFeedbackText('');

      // Show success message
      alert('Your feedback has been submitted successfully!');

    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  const fetchFeedbacks = async () => {
    try {
      // Mock feedback data
      const mockFeedbacks = [
        {
          id: 1,
          rating: 5,
          content: "This club has been an amazing experience! The mentors are very knowledgeable.",
          createdAt: "2023-11-15"
        },
        {
          id: 2,
          rating: 4,
          content: "Great atmosphere and friendly members. Could use more practice sessions.",
          createdAt: "2023-10-22"
        }
      ];

      setFeedbacks(mockFeedbacks);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const TabContent = () => {
    switch(activeTab) {
      case 'events':
        return (
          <div className="tab-content">
            <h3>Upcoming Events</h3>
            <div className="events-list">
              {club && club.events && club.events.map((event) => (
                <div className="event-card" key={event.id}>
                  <div className="event-details">
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                    <span className="event-time">{event.date}</span>
                  </div>
                </div>
              ))}
              {club && club.events.length === 0 && (
                <p className="no-events">No upcoming events at this time.</p>
              )}
            </div>
          </div>
        );

      case 'attendance':
        return (
          <div className="tab-content">
            <h3>Attendance Record</h3>
            <div className="attendance-section">
              <div className="attendance-stats">
                <div className="stat-box">
                  <span className="stat-number">85%</span>
                  <span className="stat-label">Average Attendance</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">24/28</span>
                  <span className="stat-label">Sessions Attended</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'feedback':
        return (
          <div className="tab-content">
            <h3>Member Feedback</h3>

            <div className="feedback-form">
              <h4>Leave Your Feedback</h4>
              <div className="rating-selector">
                <p>Your Rating:</p>
                <div className="stars-container">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      className={`star-btn ${rating >= star ? 'active' : ''}`}
                      onClick={() => setRating(star)}
                    >
                      <Star className="icon" fill={rating >= star ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                className="feedback-textarea"
                placeholder="Share your experience with this club..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                onFocus={(e) => e.target.select()}
                ref={feedbackTextareaRef}
              ></textarea>
              <button className="submit-feedback-btn" onClick={handleSubmitFeedback}>
                Submit Feedback
              </button>
            </div>

            <div className="feedback-list">
              {feedbacks.map((feedback, index) => (
                <div className="feedback-card" key={index}>
                  <div className="feedback-header">
                    <Star className="icon" />
                    <span className="rating">{feedback.rating}/5</span>
                  </div>
                  <p className="feedback-text">
                    "{feedback.content}"
                  </p>
                  <span className="feedback-date">{feedback.createdAt}</span>
                </div>
              ))}
              {feedbacks.length === 0 && (
                <p className="no-feedback">No feedback submitted yet. Be the first to share your experience!</p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    if (feedbackTextareaRef.current && activeTab === 'feedback') {
      feedbackTextareaRef.current.focus();
    }
  }, [activeTab]);

  if (loading) {
    return (
      <div className="club-details-loading-state">
        <p>Loading club details...</p>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="club-details-error-state">
        <p>Club not found</p>
        <button onClick={() => navigate('/ClubsPage')}>Back to Clubs</button>
      </div>
    );
  }

  return (
    <div className="club-details-page">
      <header className="details-header">
        <button className="back-button" onClick={() => navigate('/ClubsPage')}>
          <ArrowLeft className="icon" />
          Back to Clubs
        </button>
      </header>

      <div className="club-hero">
        <div 
          className="club-cover-image"
          style={{ backgroundImage: `url(${club.image})` }}
        >
          <div className="cover-overlay" />
        </div>
        <div className="club-info">
          <h1>{club.name}</h1>
          <p className="club-description">{club.description}</p>
          <div className="club-meta">
            <div className="meta-item">
              <Users className="icon" />
              <span>{club.members}+ members</span>
            </div>
            <div className="meta-item">
              <Calendar className="icon" />
              <span>{club.frequency}</span>
            </div>
            <div className="meta-item">
              <Star className="icon" />
              <span>{club.rating}/5</span>
            </div>
          </div>
          <button 
            className={`join-club-btn ${isJoined ? 'joined' : ''}`}
            onClick={() => {
              setIsJoined(!isJoined);
              setShowJoinMessage(true);
              setTimeout(() => setShowJoinMessage(false), 3000);
            }}
          >
            <CheckCircle className="icon" />
            {isJoined ? 'Leave Club' : 'Join Club'}
          </button>
          {showJoinMessage && (
            <div className="join-message">
              {isJoined ? 'Successfully joined the club!' : 'You have left the club.'}
            </div>
          )}
        </div>
      </div>

      <nav className="details-nav">
        <button 
          className={`nav-btn ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Events
        </button>
        <button 
          className={`nav-btn ${activeTab === 'attendance' ? 'active' : ''}`}
          onClick={() => setActiveTab('attendance')}
        >
          Attendance
        </button>
        <button 
          className={`nav-btn ${activeTab === 'feedback' ? 'active' : ''}`}
          onClick={() => setActiveTab('feedback')}
        >
          Feedback
        </button>
      </nav>

      <main className="details-content">
        <TabContent />
      </main>
    </div>
  );
};

export default ClubDetailsPage;