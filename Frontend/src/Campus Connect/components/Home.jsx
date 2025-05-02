import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import '../styles/Home.css';
import useEmblaCarousel from 'embla-carousel-react';
import { useNavigate } from 'react-router-dom';
export default function HomePage() {
  // Slider state
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "center",
    skipSnaps: false
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  
  // Reviews pagination state
  const [reviewPage, setReviewPage] = useState(0);
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    // Register the onSelect callback
    emblaApi.on('select', onSelect);
    onSelect();
    
    // Auto-scroll every 2 seconds
    const autoplayInterval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 2000);
    
    return () => {
      emblaApi.off('select', onSelect);
      clearInterval(autoplayInterval);
    };
  }, [emblaApi, onSelect]);

  // Scroll to a specific slide when clicking a dot
  const scrollTo = (index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  };

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1505527385992-63e06a393342?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Dance Club",
      description: "Express yourself through rhythm and movement"
    },
    {
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
      title: "Singing Club",
      description: "Let your voice create harmony"
    },
    {
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865",
      title: "Martial Arts Club",
      description: "Discipline meets strength"
    },
    {
      image: "https://images.unsplash.com/photo-1623479322729-28b25c16b011",
      title: "Coding Club",
      description: "Innovate through technology"
    }
  ];

  const clubReviews = [
    // Page 1
    {
        club: "Dance Club",
        image: "https://images.unsplash.com/photo-1537365587684-f490102e1225?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Priya Sharma",
        rating: 5,
        review: "The dance club helped me discover my passion for classical dance and modern choreography."
    },
    {
        club: "Martial Arts Club",
        image: "https://images.unsplash.com/photo-1555597673-b21d5c935865",
        name: "Arun Reddy",
        rating: 5,
        review: "Great environment to learn self-defense and build discipline."
    },
    {
        club: "Coding Club",
        image: "https://images.unsplash.com/photo-1623479322729-28b25c16b011",
        name: "Anjali Gupta",
        rating: 5,
        review: "Perfect place to collaborate on innovative projects and learn new technologies."
    },
    // Page 2
    {
        club: "Singing Club",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
        name: "Rahul Kumar",
        rating: 4,
        review: "Improved my vocal range and met amazing people with similar interests."
    },
    {
        club: "Painting Club",
        image: "https://images.unsplash.com/photo-1456086272160-b28b0645b729?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Neha Patel",
        rating: 5,
        review: "Painting club gave me a space to express my creativity through colors and brushes."
    },
    {
        club: "Instruments",
        image: "https://images.unsplash.com/photo-1556379118-7034d926d258?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Vikram Singh",
        rating: 5,
        review: "Learned how to play the guitar and met some amazing musicians in the club."
    },
    // Page 3
    {
        club: "Bhagavad Gita Club",
        image: "https://media.istockphoto.com/id/1270180186/photo/hindu-holy-book-bhagvad-gita-kept-on-a-wooden-base-with-other-spiritual-props.jpg?s=2048x2048&w=is&k=20&c=_mLU3yM5s0itFhPqt_G58q00qy7cmD-6nquJ3gDulyA=",
        name: "Shreya Gupta",
        rating: 5,
        review: "Found immense spiritual wisdom and practical life lessons through the club sessions."
    },
    {
        club: "Literature Club",
        image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe",
        name: "Arjun Nair",
        rating: 4,
        review: "Fantastic discussions about classic and contemporary literature."
    },
    {
        club: "Yoga Club",
        image: "https://images.unsplash.com/photo-1588286840104-8957b019727f",
        name: "Meera Shah",
        rating: 5,
        review: "Found peace and improved flexibility through the excellent instruction."
    }
];

  
  // Get current page of reviews (3 per page)
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(clubReviews.length / reviewsPerPage);
  const indexOfLastReview = (reviewPage + 1) * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = clubReviews.slice(indexOfFirstReview, indexOfLastReview);
  
  const nextReviewPage = () => {
    setReviewPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevReviewPage = () => {
    setReviewPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will get back to you soon.');
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/LoginPage');
  };

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">Campus Connect</Link>
          <div className="nav-links">
            <Link to="/Home">Home</Link>
            <Link to="/ClubsPage">Clubs</Link>
            <Link to="/EventsPage">Events</Link>
            {/* Profile Icon */}
            <div
              className="profileh-container"
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => setIsProfileHovered(false)}
              onClick={() => navigate("/ProfilePage")}
            >
              <img src="/images/profile-icon.png" alt="Profile" className="profileh-icon" />
              {isProfileHovered && <div className="profile-tooltip">My Profile</div>}
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
              <span className="logout-hover"></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="#clubs" onClick={() => setIsMenuOpen(false)}>Clubs</Link>
            <Link to="#events" onClick={() => setIsMenuOpen(false)}>Events</Link>
            <button className="logout-button" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
              Logout
              <span className="logout-hover"></span>
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-text">
            <h1>Welcome to Campus Connect</h1>
            <p>
              Join our vibrant community and explore a world of opportunities 
              through our diverse clubs. From dance to coding, discover your 
              passion and connect with like-minded individuals.
            </p>
          </div>
          <div className="hero-slider">
            <div className="embla" ref={emblaRef}>
              <div className="embla__container">
                {slides.map((slide, index) => (
                  <div className="embla__slide" key={index}>
                    <div className="slide-content">
                      <img src={slide.image} alt={slide.title} loading="lazy" />
                      <div className="slide-overlay">
                        <h3>{slide.title}</h3>
                        <p>{slide.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="slider-controls">
              {/* <button className="slider-button prev" onClick={() => emblaApi && emblaApi.scrollPrev()}>❮</button>
              <button className="slider-button next" onClick={() => emblaApi && emblaApi.scrollNext()}>❯</button> */}
            </div>
            <div className="dots-container">
              {slides.map((_, index) => (
                <button 
                  key={index} 
                  className={`dot ${selectedIndex === index ? 'active' : ''}`}
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="section-container">
          <h2>About Us</h2>
          <div className="about-content">
            <p>
              Campus Connect is your gateway to an enriching student life. Our platform 
              brings together diverse clubs that cater to various interests and talents. 
              Whether you're passionate about performing arts, martial arts, or technology, 
              we provide the perfect platform to nurture your skills and build lasting 
              connections. We bring together all the exciting
              clubs at our college every Friday for college students to
              discover and register for various events organized by SAC
              within the college. Whether you’re into music, art, sports, or
              tech, there’s something here for everyone. Join us to connect,
              learn, and have fun with like-minded people. Let’s make every
              Friday an adventure!
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section reviews-section">
        <div className="section-container">
          <h2>Club Reviews</h2>
          <div className="reviews-container">
            <button 
              className="review-nav-button prev" 
              onClick={prevReviewPage}
              aria-label="Previous reviews"
            >
              &lt;
            </button>
            <div className="reviews-gridst">
              {currentReviews.map((review, index) => (
                <div 
                  className={`review-cardst page-${reviewPage}`} 
                  key={index}
                  style={{backgroundColor: reviewPage % 2 === 0 ? '#fff' : '#f9f9f9'}}
                >
                  <div 
                    className="review-headerst"
                    style={{backgroundColor: reviewPage % 2 === 0 ? 'var(--primary-color)' : 'var(--primary-dark)'}}
                  >
                    <h3>{review.club}</h3>
                    <div className="rating">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                  <img 
                    src={review.image} 
                    alt={review.club} 
                    className="review-image" 
                    loading="lazy" 
                  />
                  <div className="review-content">
                    <p>{review.review}</p>
                    <div className="reviewer">
                      <span>{review.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="review-nav-button next" 
              onClick={nextReviewPage}
              aria-label="Next reviews"
            >
              &gt;
            </button>
          </div>
          <div className="review-pagination">
            Page {reviewPage + 1} of {totalPages}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section">
        <div className="section-container">
          <h2>Get In Touch</h2>
          <div className="contact-container">
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" rows="5" required></textarea>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>📧 connect@campusconnect.com</p>
              <p>📞 +91 XXX XXX XXXX</p>
              <p>📍 Student Activity Center</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="hfooter">
        <div className="hfooter-container">
          <div className="hfooter-section">
            <h3>Campus Connect</h3>
            <p>Connecting Students Through Activities</p>
          </div>
          <div className="hfooter-section">
            <h3>Popular Clubs</h3>
            <ul>
              <li>Dance Club</li>
              <li>Singing Club</li>
              <li>Martial Arts Club</li>
              <li>Coding Club</li>
            </ul>
          </div>
          <div className="hfooter-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="#clubs">Join Clubs</Link></li>
              <li><Link to="#contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>© 2024 Campus Connect | Empowering Student Communities</p>
        </div>
      </footer>
    </div>
  );
}