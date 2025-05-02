import React, { useState } from 'react';
import '../styles/Club.css';
import { LogOut,  Search, Users, Calendar, Star, ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';
import { useNavigate } from 'react-router';
// ClubCard Component
const ClubCard = ({ club }) => {
  const [, setLocation] = useLocation();
  const navigate = useNavigate();
  const getCategoryColorClass = (category) => {
    const colors = {
      Sports: 'sports',
      Cultural: 'cultural',
      Technical: 'technical',
      Literary: 'literary',
      Arts: 'arts',
      Spiritual: 'spiritual',
      Fitness: 'fitness'
    };
    return `category-${colors[category] || 'default'}`;
  };
  

  return (
    <div className={`club-card ${getCategoryColorClass(club.category)}`}>
      <div 
        className="card-image" 
        style={{ backgroundImage: `url(${club.image})` }}
      >
        <div className="image-overlay">
          <span className="category-badge">{club.category}</span>
        </div>
      </div>

      <div className="card-header">
        <h3 className="card-title">{club.name}</h3>
      </div>

      <div className="card-content">
        <p className="card-description">{club.description}</p>

        <div className="card-stats">
          <div className="stat-item">
            <Users className="icon" />
            <span>{club.members}+ members</span>
          </div>
          <div className="stat-item">
            <Calendar className="icon" />
            <span>{club.frequency}</span>
          </div>
          <div className="stat-item">
            <Star className="icon" />
            <span>{club.rating}/5</span>
          </div>
        </div>
      </div>

      <div className="card-footer">
      <button className="view-details-btn" onClick={() => navigate(`/clubs/${club.id}`)}>
  <span>View Details</span>
  <ArrowRight className="arrow-icon" />
</button>

      </div>
    </div>
  );
};

// Main ClubsPage Component


  const clubs = [
    {
      id: 1,
      name: "VVIT Sports Club",
      description: "Join us for cricket, basketball, volleyball and more! Regular tournaments and training sessions.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
      category: "Sports",
      members: 150,
      frequency: "Daily practice",
      rating: 4.8
    },
    {
      id: 2,
      name: "Classical Dance Club",
      description: "Learn and perform various classical dance forms including Bharatanatyam and Kuchipudi.",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad",
      category: "Cultural",
      members: 75,
      frequency: "Weekly classes",
      rating: 4.9
    },
    {
      id: 3,
      name: "Coding Club",
      description: "Master programming through regular coding challenges, hackathons, and workshops.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Technical",
      members: 120,
      frequency: "Weekly meetups",
      rating: 4.7
    },
    {
      id: 4,
      name: "Martial Arts Academy",
      description: "Train in various martial arts forms under expert guidance. Regular competitions and gradings.",
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865",
      category: "Fitness",
      members: 80,
      frequency: "Thrice weekly",
      rating: 4.8
    },
    {
      id: 5,
      name: "Yoga & Meditation",
      description: "Find inner peace and physical wellness through yoga and meditation practices.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
      category: "Fitness",
      members: 60,
      frequency: "Daily sessions",
      rating: 4.9
    },
    {
      id: 6,
      name: "Bhagavad Gita Study Circle",
      description: "Weekly discussions and in-depth study of Bhagavad Gita and its teachings.",
      image: "https://images.unsplash.com/photo-1477240489935-6c96abea2aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Spiritual",
      members: 45,
      frequency: "Weekly meets",
      rating: 4.9
    },
    {
      id: 7,
      name: "Musical Instruments",
      description: "Learn various instruments including guitar, tabla, and keyboard. Regular performances.",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629",
      category: "Cultural",
      members: 65,
      frequency: "Weekly classes",
      rating: 4.7
    },
    {
      id: 8,
      name: "Singing Club",
      description: "Develop your vocal talents and perform in various college events and competitions.",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
      category: "Cultural",
      members: 55,
      frequency: "Twice weekly",
      rating: 4.6
    },
    {
      id: 9,
      name: "Drawing & Painting Club",
      description: "Express your creativity through various art forms and techniques in a supportive environment.",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
      category: "Arts",
      members: 50,
      frequency: "Weekly sessions",
      rating: 4.7
    }
  ];
  const ClubsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [newClubRequest, setNewClubRequest] = useState({
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
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleClubRequestSubmit = (e) => {
      e.preventDefault();
      const normalizedInput = newClubRequest.name.trim().toLowerCase();

      const clubExists = clubs.some((club) => {
        const normalizedClubName = club.name.trim().toLowerCase();
        return (
          normalizedInput === normalizedClubName ||         
          normalizedInput.includes(normalizedClubName) ||    
          normalizedClubName.includes(normalizedInput)      
        );
      });
      if (clubExists) {
        alert('A club with this name already exists. Please choose a different name.');
        return;
      }
      alert('Club request submitted successfully!');
      setNewClubRequest({
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

  const categories = Array.from(new Set(clubs.map(club => club.category)));

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLogout = () => {
    navigate('/Home'); 
  };

  return (
    <div className="clubs-page">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <img src="/images/college-logo.jpeg" alt="VVIT Logo" className="college-logo" />
            <div className="logo-text">
              <h1>Clubs</h1>
            </div>
          </div>
          <div className="header-actions">
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut className="icon" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h2>Discover & Join College Clubs</h2>
          <p>
            Explore our diverse range of student clubs. Find your passion,
            develop new skills, and make lasting connections.
          </p>

          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search clubs by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-filters">
            <button 
              className={`category-btn ${!selectedCategory ? 'active' : ''}`}
              onClick={() => setSelectedCategory(null)}
            >
              All Clubs
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="main-content">
        {filteredClubs.length === 0 ? (
          <div className="no-results">
            No clubs found matching your search criteria.
          </div>
        ) : (
          <div className="clubs-grid">
            {filteredClubs.map((club, index) => (
              <div 
                key={club.id} 
                className="club-card-container"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ClubCard club={club} />
              </div>
            ))}
          </div>
        )}
      </main>
      <div className="request-club-section">
        <h2>Request a New Club</h2>
        <form className="request-club-form" onSubmit={handleClubRequestSubmit}>
          <input
            type="text"
            placeholder="Proposed Club Name"
            value={newClubRequest.name}
            onChange={(e) => setNewClubRequest({ ...newClubRequest, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Category (e.g., Sports, Cultural, Technical)"
            value={newClubRequest.category}
            onChange={(e) => setNewClubRequest({ ...newClubRequest, category: e.target.value })}
            required
          />
          <textarea
            placeholder="Detailed description of club activities and goals"
            value={newClubRequest.description}
            onChange={(e) => setNewClubRequest({ ...newClubRequest, description: e.target.value })}
            required
          />
          <textarea
            placeholder="Why should this club be added? (Provide compelling reasons)"
            value={newClubRequest.reason}
            onChange={(e) => setNewClubRequest({ ...newClubRequest, reason: e.target.value })}
            
          />
           <input
            type="text"
            placeholder="Expected Number of Members"
            value={newClubRequest.expectedMembers}
            onChange={(e) => setNewClubRequest({ ...newClubRequest, expectedMembers: e.target.value })}
            
          />
          <input
            type="text"
            placeholder="Proposed Faculty Advisor (if any)"
            value={newClubRequest.facultyAdvisor}
            onChange={(e) => setNewClubRequest({ ...newClubRequest, facultyAdvisor: e.target.value })}
          />
          <input
            type="text"
            placeholder="Your Name"
            value={newClubRequest.requestedBy}
            onChange={(e) => setNewClubRequest({ ...newClubRequest, requestedBy: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Your Roll Number"
            value={newClubRequest.rollno}
            onChange={(e) => setNewClubRequest({ ...newClubRequest, rollno: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Your Branch"
            value={newClubRequest.branch}
            onChange={(e) => setNewClubRequest({ ...newClubRequest, branch: e.target.value })}
            required
          />
          <button type="submit" className="submit-request-btn">
            Submit Club Request
          </button>
        </form>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/images/college-logo.jpeg" alt="VVIT Logo" className="footer-college-logo" />
            <h3>VVIT Student Clubs</h3>
          </div>
          <p>© {new Date().getFullYear()} VVIT Student Clubs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ClubsPage;