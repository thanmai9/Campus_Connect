
import React from 'react';
import { Star, User } from 'lucide-react';

const ReviewDetails = ({ reviews }) => {
  return (
    <div className="details-section">
      <h2 className="section-title">Review Details</h2>
      <div className="details-grid">
        {reviews.map(review => (
          <div key={review.id} className="detail-card review-card">
            <div className="card-header">
              <div className="user-info">
                <User size={18} />
                <span>{review.studentName}</span>
              </div>
              <div className="rating">
                <Star size={18} fill="currentColor" />
                <span>{review.rating}</span>
              </div>
            </div>
            <div className="card-content">
              <p className="review-text">{review.comment}</p>
              <div className="review-meta">
                <span className="club-name">{review.club}</span>
              </div>
            </div>
            <div className="card-actions">
              <button className="action-btn danger">Remove</button>
              <button className="action-btn secondary">Reply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewDetails;
