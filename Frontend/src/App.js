import logo from './logo.svg';
import AdminStudent from './Campus Connect/components/AdminStudent';
import Home from './Campus Connect/components/Home';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Campus Connect/components/LoginPage';
import ProfilePage from './Campus Connect/components/ProfilePage';
import { UserProvider } from './Campus Connect/UserContext';
import RegisterPage from './Campus Connect/components/RegisterPage';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import AdminHome from './Campus Connect/admin/AdminHome';
import AdminLogin from './Campus Connect/admin/AdminLogin';
import AddAdmin from './Campus Connect/admin/AddAdmin';
import ClubsPage from './Campus Connect/components/ClubsPage';
import ClubDetailsPage from './Campus Connect/components/ClubDetailsPage';
import EventsPage from './Campus Connect/components/EventsPage';
import EventDetailsPage from './Campus Connect/components/EventDetailsPage';
import AdminClubDetails from './Campus Connect/admin/AdminClubDetails';
import EventDetails from './Campus Connect/admin/EventDetails';
import ReviewDetails from './Campus Connect/admin/ReviewDetails';
import AdminEvents from './Campus Connect/admin/AdminEvents';
import AdminClubMembers from './Campus Connect/admin/AdminClubMembers';
import ClubReviews from './Campus Connect/admin/ClubReviews';
import AdminAddClub from './Campus Connect/admin/AdminAddClub';
import AddEvent from './Campus Connect/admin/AddEvent';

const App = () => {
  return (
    <UserProvider>
      <ToastContainer 
        position="top-center" 
        autoClose={1000} 
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<AdminStudent />} />
        <Route path="/AdminHome" element={<AdminHome />} /> 
        <Route path="/Home" element={<Home />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/ClubsPage" element={<ClubsPage />} />
        <Route path="/EventsPage" element={<EventsPage />} />
        <Route path="/events/:eventId" element={<EventDetailsPage />} />
        <Route path="/clubs/:clubId" element={<ClubDetailsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/AdminLogin" element={<AdminLogin />} /> 
        <Route path="/AddAdmin" element={<AddAdmin />} />
        <Route path="/AdminClubDetails" element={<AdminClubDetails />} />
        <Route path="/EventDetails" element={<EventDetails />} />
        <Route path="/ReviewDetails" element={<ReviewDetails />} />
        <Route path="/AdminEvents" element={<AdminEvents />} />
        <Route path="/AdminClubMembers/:clubId" element={<AdminClubMembers />} />
        <Route path="/ClubReviews" element={<ClubReviews />} />
        <Route path="/AdminAddClub" element={<AdminAddClub />} />
        <Route path="/AddEvent" element={<AddEvent />} />
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </UserProvider>
  );
};

export default App;
