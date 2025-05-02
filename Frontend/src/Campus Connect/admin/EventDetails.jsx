
import React from 'react';
import { Calendar, Clock, Users } from 'lucide-react';

const EventDetails = ({ events }) => {
  return (
    <div className="details-section">
      <h2 className="section-title">Event Details</h2>
      <div className="details-grid">
        {events.map(event => (
          <div key={event.id} className="detail-card">
            <div className="card-header">
              <h3>{event.name}</h3>
              <span className={`status-badge ${event.status.toLowerCase()}`}>
                {event.status}
              </span>
            </div>
            <div className="card-content">
              <div className="info-row">
                <Calendar size={18} />
                <span>{event.date}</span>
              </div>
              <div className="info-row">
                <Users size={18} />
                <span>{event.club}</span>
              </div>
            </div>
            <div className="card-actions">
              <button className="action-btn primary">View Details</button>
              <button className="action-btn secondary">Manage Event</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDetails;
