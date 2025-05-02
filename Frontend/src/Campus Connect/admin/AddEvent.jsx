import React, { useState } from "react";
import axios from "axios";

const AddEvent = () => {
  // Form state
  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    category: "",
    eventDate: "",
    eventTime: "",
    endTime: "",
    venue: "",
    organizer: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    capacity: "",
    registrationLink: "",
    registrationDeadline: "",
    imageUrl: "",
    isPublished: true,
    isFeatured: false,
    ticketPrice: "",
    ticketCurrency: "USD",
    additionalInfo: ""
  });

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      // API call to save event
      const response = await axios.post("/api/events", formData);
      setSubmitStatus({
        type: "success",
        message: "Event created successfully! Event ID: " + response.data.id
      });
      // Reset form after successful submission
      setFormData({
        ...formData,
        eventName: "",
        description: "",
        category: "",
        eventDate: "",
        eventTime: "",
        endTime: "",
        venue: "",
        organizer: "",
        contactPerson: "",
        contactEmail: "",
        contactPhone: "",
        capacity: "",
        registrationLink: "",
        registrationDeadline: "",
        imageUrl: "",
        isPublished: true,
        isFeatured: false,
        ticketPrice: "",
        ticketCurrency: "USD",
        additionalInfo: ""
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to create event"
      });
    } finally {
      setIsSubmitting(false);
      // Scroll to top to show status message
      window.scrollTo(0, 0);
    }
  };

  return (
    <div style={{
      maxWidth: "1300px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f9fafb",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}> <div style={{
        position: "relative", 
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
      }}>
        <button
          onClick={() => window.history.back()}
          style={{
            position: "absolute",
            top: "20px",
            left: "2px",
            backgroundColor: "white",
            color: "black",
            border: "1px solid black",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "18px",
            transition: "background-color 0.3s ease",
          }}
        >
          Back
        </button>
        <h1 style={{
          fontSize: "24px",
          fontWeight: "600",
          color: "#d57465",
          textAlign: "center",
          marginBottom: "24px",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "12px"
        }}>
          Add New Event
        </h1>

        {/* Status Messages */}
        {submitStatus.message && (
          <div style={{
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "4px",
            backgroundColor: submitStatus.type === "success" ? "#dcfce7" : "#fee2e2",
            color: submitStatus.type === "success" ? "#166534" : "#b91c1c",
            border: `1px solid ${submitStatus.type === "success" ? "#86efac" : "#fecaca"}`
          }}>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Form Sections */}
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ 
              fontSize: "18px", 
              fontWeight: "600", 
              marginBottom: "16px",
              color: "black" 
            }}>
              Basic Information
            </h2>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
              gap: "16px" 
            }}>
              {/* Event Name */}
              <div>
                <label style={labelStyle} htmlFor="eventName">
                  Event Name *
                </label>
                <input
                  id="eventName"
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="Enter event name"
                />
              </div>

              {/* Category */}
              <div>
                <label style={labelStyle} htmlFor="category">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value="">Select a category</option>
                  <option value="academic">Academic</option>
                  <option value="sports">Sports</option>
                  <option value="cultural">Cultural</option>
                  <option value="workshop">Workshop</option>
                  <option value="seminar">Seminar</option>
                  <option value="conference">Conference</option>
                  <option value="social">Social</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginTop: "16px" }}>
              <label style={labelStyle} htmlFor="description">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }}
                placeholder="Enter event description"
              />
            </div>
          </div>

          {/* Date and Time */}
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ 
              fontSize: "18px", 
              fontWeight: "600", 
              marginBottom: "16px",
              color: "black" 
            }}>
              Date and Time
            </h2>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
              gap: "16px" 
            }}>
              {/* Event Date */}
              <div>
                <label style={labelStyle} htmlFor="eventDate">
                  Event Date *
                </label>
                <input
                  id="eventDate"
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              {/* Start Time */}
              <div>
                <label style={labelStyle} htmlFor="eventTime">
                  Start Time *
                </label>
                <input
                  id="eventTime"
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              {/* End Time */}
              <div>
                <label style={labelStyle} htmlFor="endTime">
                  End Time
                </label>
                <input
                  id="endTime"
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ 
              fontSize: "18px", 
              fontWeight: "600", 
              marginBottom: "16px",
              color: "black" 
            }}>
              Location
            </h2>
            <div>
              <label style={labelStyle} htmlFor="venue">
                Venue *
              </label>
              <input
                id="venue"
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Enter venue name (Building, Room, etc.)"
              />
            </div>
          </div>

          {/* Organizer Information */}
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ 
              fontSize: "18px", 
              fontWeight: "600", 
              marginBottom: "16px",
              color: "black" 
            }}>
              Organizer Information
            </h2>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
              gap: "16px" 
            }}>
              {/* Organizer */}
              <div>
                <label style={labelStyle} htmlFor="organizer">
                  Organized By *
                </label>
                <input
                  id="organizer"
                  type="text"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="Department, Club, etc."
                />
              </div>

              {/* Contact Person */}
              <div>
                <label style={labelStyle} htmlFor="contactPerson">
                  Contact Person
                </label>
                <input
                  id="contactPerson"
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Name of contact person"
                />
              </div>
            </div>
            
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
              gap: "16px",
              marginTop: "16px" 
            }}>
              {/* Contact Email */}
              <div>
                <label style={labelStyle} htmlFor="contactEmail">
                  Contact Email
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="contact@example.com"
                />
              </div>

              {/* Contact Phone */}
              <div>
                <label style={labelStyle} htmlFor="contactPhone">
                  Contact Phone
                </label>
                <input
                  id="contactPhone"
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>
          </div>

          {/* Registration */}
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ 
              fontSize: "18px", 
              fontWeight: "600", 
              marginBottom: "16px",
              color: "black" 
            }}>
              Registration Details
            </h2>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
              gap: "16px" 
            }}>
              {/* Registration Link */}
              <div>
                <label style={labelStyle} htmlFor="registrationLink">
                  Registration Link
                </label>
                <input
                  id="registrationLink"
                  type="url"
                  name="registrationLink"
                  value={formData.registrationLink}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="https://example.com/register"
                />
              </div>

              {/* Registration Deadline */}
              <div>
                <label style={labelStyle} htmlFor="registrationDeadline">
                  Registration Deadline
                </label>
                <input
                  id="registrationDeadline"
                  type="date"
                  name="registrationDeadline"
                  value={formData.registrationDeadline}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              {/* Capacity */}
              <div>
                <label style={labelStyle} htmlFor="capacity">
                  Capacity
                </label>
                <input
                  id="capacity"
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Maximum number of participants"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Ticket Information */}
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ 
              fontSize: "18px", 
              fontWeight: "600", 
              marginBottom: "16px",
              color: "black" 
            }}>
              Ticket Information
            </h2>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
              gap: "16px" 
            }}>
              {/* Ticket Price */}
              <div>
                <label style={labelStyle} htmlFor="ticketPrice">
                  Ticket Price (leave empty if free)
                </label>
                <input
                  id="ticketPrice"
                  type="number"
                  name="ticketPrice"
                  value={formData.ticketPrice}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ 
              fontSize: "18px", 
              fontWeight: "600", 
              marginBottom: "16px",
              color: "black" 
            }}>
              Media
            </h2>
            <div>
              <label style={labelStyle} htmlFor="imageUrl">
                Image URL
              </label>
              <input
                id="imageUrl"
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                style={inputStyle}
                placeholder="https://example.com/image.jpg"
              />
              <p style={{ 
                fontSize: "12px", 
                color: "#6b7280", 
                marginTop: "4px" 
              }}>
                Recommended image size: 1200 x 630 pixels
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ 
              fontSize: "18px", 
              fontWeight: "600", 
              marginBottom: "16px",
              color: "black" 
            }}>
              Additional Information
            </h2>
            <div>
              <label style={labelStyle} htmlFor="additionalInfo">
                Additional Details
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
                placeholder="Any additional information about the event"
              />
            </div>
          </div>          

          {/* Form Actions */}
          <div style={{ 
            display: "flex", 
            justifyContent: "flex-end",
            gap: "12px",
            borderTop: "1px solid #e5e7eb",
            paddingTop: "20px"
          }}>
            <button
              type="button"
              onClick={() => window.history.back()}
              style={{ 
                padding: "10px 16px",
                backgroundColor: "white",
                color: "#4b5563",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ 
                padding: "10px 24px",
                backgroundColor: "#d57465",
                color: "black",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? "0.7" : "1",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              {isSubmitting ? (
                <>
                  <Spinner /> 
                  Processing...
                </>
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Spinner component
const Spinner = () => (
  <div style={{
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderRadius: "50%",
    borderTopColor: "white",
    animation: "spin 1s linear infinite"
  }}></div>
);

// Shared styles
const labelStyle = {
  display: "block",
  fontSize: "14px",
  fontWeight: "500",
  marginBottom: "6px",
  color: "#374151"
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "14px",
  backgroundColor: "white",
  color: "#111827",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s"
};

// Add CSS animation for spinner
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default AddEvent;