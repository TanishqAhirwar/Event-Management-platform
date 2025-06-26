import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/signup";
import Eventform from "./pages/Eventform";
import EventsPage from "./pages/EventPage";
import AttendeeDashboard from "./pages/AttendeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EventDetails from "./pages/EventDetails";
import TicketBooking from "./pages/ticketbooking";
import ContactPage from "./pages/ContactPage";
import UserProfile from "./pages/userProfile";
import PublicRoute from "./routes/publicRoute";
import AdminRoute from "./routes/adminRoute";
import UserRoute from "./routes/userRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        {/* public Route */}
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<Homepage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="contact-us" element={<ContactPage />} />

          {/* admin Route */}
          <Route path="admin" element={<AdminRoute />}>
            <Route index element={<Homepage />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="event" element={<AdminRoute />}>
              <Route index element={<EventsPage />} />
              <Route path=":id" element={<EventDetails />} />
              <Route path="create-event" element={<Eventform />} />
            </Route>
          </Route>

          {/* user Route */}
          <Route path="user" element={<UserRoute />}>
            <Route index element={<Homepage />} />
            <Route path="dashboard" element={<AttendeeDashboard />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="event" element={<UserRoute />}>
              <Route index element={<EventsPage />} />
              <Route path=":id" element={<EventDetails />} />
              <Route path="book-ticket" element={<TicketBooking />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
