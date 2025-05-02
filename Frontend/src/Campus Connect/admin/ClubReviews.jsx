import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, Send, MessageSquare } from 'lucide-react';

const ClubReviews = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [adminResponse, setAdminResponse] = useState('');
  const [respondingTo, setRespondingTo] = useState(null);
  const navigate = useNavigate();
  const isAdmin = true; // Replace with actual admin check

  // Static reviews data with responses
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      review: "The coding club has helped me grow my programming skills immensely. Would love more advanced workshops!",
      date: "2024-02-15",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      adminResponse: "Thank you for your feedback! We're planning advanced workshops for next month."
    },
    {
      id: 2,
      name: "Sarah Smith",
      rating: 4,
      review: "Great robotics workshops, but we need more equipment for hands-on practice.",
      date: "2024-02-10",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      adminResponse: null
    },
    {
      id: 3,
      name: "Mike Johnson",
      rating: 5,
      review: "The debate sessions are excellent. Could we have more inter-college competitions?",
      date: "2024-02-05",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      adminResponse: "We're coordinating with other colleges for upcoming competitions!"
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ feedback, rating });
    setFeedback('');
    setRating(0);
  };

  const handleAdminResponse = (reviewId) => {
    const updatedReviews = reviews.map(review => 
      review.id === reviewId 
        ? { ...review, adminResponse }
        : review
    );
    setReviews(updatedReviews);
    setAdminResponse('');
    setRespondingTo(null);
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
          marginBottom: '20px'
        }}
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <h1 style={{
        fontSize: '2rem',
        marginBottom: '30px',
        color: '#333'
      }}>Club Reviews & Feedback</h1>

      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Submit Your Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <div style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '10px'
            }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: rating >= star ? '#ffd700' : '#ddd'
                  }}
                >
                  <Star fill={rating >= star ? '#ffd700' : 'none'} />
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your experience..."
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              minHeight: '100px',
              marginBottom: '15px'
            }}
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
              gap: '8px'
            }}
          >
            Submit Feedback <Send size={16} />
          </button>
        </form>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {reviews.map((review) => (
          <div key={review.id} style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '15px'
            }}>
              <img src={review.avatar} alt={review.name} style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%'
              }} />
              <div>
                <h3 style={{ margin: '0' }}>{review.name}</h3>
                <div style={{
                  display: 'flex',
                  gap: '5px',
                  color: '#ffd700'
                }}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#ffd700" />
                  ))}
                </div>
              </div>
              <span style={{
                marginLeft: 'auto',
                color: '#666',
                fontSize: '0.9rem'
              }}>
                {review.date}
              </span>
            </div>
            <p style={{
              margin: '0 0 15px 0',
              color: '#444',
              lineHeight: '1.6'
            }}>
              {review.review}
            </p>

            {review.adminResponse && (
              <div style={{
                backgroundColor: '#f5f5f5',
                padding: '15px',
                borderRadius: '8px',
                marginTop: '10px'
              }}>
                <p style={{
                  margin: '0',
                  color: '#666',
                  fontSize: '0.9rem'
                }}>
                  <strong>Admin Response:</strong> {review.adminResponse}
                </p>
              </div>
            )}

            {isAdmin && !review.adminResponse && (
              <div style={{ marginTop: '10px' }}>
                {respondingTo === review.id ? (
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    marginTop: '10px'
                  }}>
                    <input
                      type="text"
                      value={adminResponse}
                      onChange={(e) => setAdminResponse(e.target.value)}
                      placeholder="Type your response..."
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ddd'
                      }}
                    />
                    <button
                      onClick={() => handleAdminResponse(review.id)}
                      style={{
                        backgroundColor: '#d57465',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Send
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setRespondingTo(review.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: 'none',
                      border: '1px solid #d57465',
                      color: '#d57465',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <MessageSquare size={16} /> Respond
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubReviews;