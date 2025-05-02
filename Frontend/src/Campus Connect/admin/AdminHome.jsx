
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Home, Users, Calendar, ClipboardList, UserPlus, Star, PlusCircle, PieChart, Menu, X } from 'lucide-react';
import '../styles/AdminHome.css';

const AdminHome = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    
    const stats = [
        { title: "Clubs", count: 6, icon: <Users size={24} /> },
        { title: "Events", count: 5, icon: <Calendar size={24} /> },
        { title: "Registrations", count: 2, icon: <ClipboardList size={24} /> },
        { title: "Admins", count: 3, icon: <UserPlus size={24} /> }
    ];

    const recentEvents = [
        { name: "Tech Symposium", date: "April 15, 2024", status: "Upcoming" },
        { name: "Cultural Fest", date: "May 1, 2024", status: "Planning" },
        { name: "Sports Meet", date: "May 15, 2024", status: "Confirmed" }
    ];

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        // Add logout functionality here
        alert("Logged out successfully");
        navigate("/"); // Redirect to login page
    };

    return (
        <div className="admin-home">
            <button className="mobile-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <nav className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <h2>VVIT Admin</h2>
                </div>
                <ul>
  <li className="active" onClick={() => navigate("/AdminHome")}>
    <Home size={18} /> Home
  </li>
  <li onClick={() => navigate("/AdminClubDetails")}>
    <Users size={18} /> Clubs
  </li>
  <li onClick={() => navigate("/AdminEvents")}>
    <Calendar size={18} /> Events
  </li>
  
  <li onClick={() => navigate("/AddAdmin")}>
    <UserPlus size={18} /> Add Admin
  </li>
  <li onClick={() => navigate("/ClubReviews")}>
    <Star size={18} /> Reviews
  </li>
  <li onClick={() => navigate("/AdminAddClub")}>
    <PlusCircle size={18} /> Add Club
  </li>
  <li onClick={() => navigate("/AddEvent")}>
    <PlusCircle size={18} /> Add Event
  </li>
</ul>

            </nav>
            
            <main className="content">
                <header className="admin-header">
                    <h1>Dashboard</h1>
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={18} /> Logout
                    </button>
                </header>
                
                <div className="welcome-banner">
                    <h2>Welcome, Admin!</h2>
                    <p>Here's what's happening with your campus activities today.</p>
                </div>
                
                <div className="stats-container">
                    {stats.map((stat, index) => (
                        <div className="stat-box" key={index}>
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-details">
                                <h3>{stat.title}</h3>
                                <p className="stat-count">{stat.count}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="dashboard-grid">
                    <div className="chart-container">
                        <h3><PieChart size={20} /> Activity Distribution</h3>
                        <div className="chart">
                            <div className="chart-placeholder">
                                <div className="pie-chart-demo">
                                    <div className="pie-slice slice1"></div>
                                    <div className="pie-slice slice2"></div>
                                    <div className="pie-slice slice3"></div>
                                </div>
                            </div>
                            <div className="chart-legend">
                                <div className="legend-item"><span className="legend-color color1"></span> Clubs (45%)</div>
                                <div className="legend-item"><span className="legend-color color2"></span> Events (35%)</div>
                                <div className="legend-item"><span className="legend-color color3"></span> Registrations (20%)</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="recent-events">
                        <h3><Calendar size={20} /> Upcoming Events</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentEvents.map((event, index) => (
                                    <tr key={index}>
                                        <td>{event.name}</td>
                                        <td>{event.date}</td>
                                        <td><span className={`status ${event.status.toLowerCase()}`}>{event.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <footer className="admin-footer">
                    <p>© 2024 VVIT Campus Connect - Admin Portal</p>
                </footer>
            </main>
        </div>
    );
};

export default AdminHome;
