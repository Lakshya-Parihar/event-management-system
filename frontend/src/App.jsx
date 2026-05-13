import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedUserRoute from "./Components/ProtectedUserRoute";
import ProtectedAdminRoute from "./Components/ProtectedAdminRoute";

// Global (Common)
import Main from "./Main";
import Pricing from "./Pages/Pricing";
import Contact from "./Pages/Contact";
import Team from "./Pages/Team";
import ScrollToHash from "./Components/ScrollToHash";

// Users
import Home from "./Users/Home";
import Events from "./Users/pages/Events";
import Login from "./Users/Login";
import Register from "./Users/Register";
import UsersTeam from "./Users/pages/users_team";
import UsersContact from "./Users/pages/users_contact";
import UsersPricing from "./Users/pages/users_pricing";
import UserProfile from "./Users/pages/user_profile";
import AnimatedTicketCard from "./Users/pages/ticket";
import TicketView from "./Users/pages/TicketView";

// Organizer
import OrgLogin from "./Organizer/org_login";
import OrgRegister from "./Organizer/org_register";
import OrgDashboard from "./Organizer/org_dashboard";
import AddEvent from "./Organizer/pages/add_events";
import OrgUsers from "./Organizer/pages/org_users";
import EditEvents from "./Organizer/pages/edit_events";
import OrgEditProfile from "./Organizer/pages/org_settings";
import OrgContacts from "./Organizer/pages/org_contacts";

// Admin
import AdminLogin from "./Admin/AdminLogin";
import Dashboard from "./Admin/AdminDashboard";
import AdminSettings from "./Admin/Pages/AdminSettings";
import AdminManageUsers from "./Admin/Pages/AdminManageUsers";
import AdminManageOrgs from "./Admin/Pages/AdminManageOrgs";
import AdminManageEvents from "./Admin/Pages/AdminManageEvents";
import AdminContactSupport from "./Admin/Pages/AdminContactSupport";

const App = () => {
  return (
    <>
      <Router>
        {/* <Navbar />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes> */}

        <ScrollToHash />
        <Routes>
          {/* Index Routes : Common for User and Index(Landing)  */}
          <Route path="/" element={<Main />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />

          {/* User Routes  */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/home"
            element={
              <ProtectedUserRoute>
                <Home />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedUserRoute>
                <Events />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/users-team"
            element={
              <ProtectedUserRoute>
                <UsersTeam />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/users-contact"
            element={
              <ProtectedUserRoute>
                <UsersContact />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/users-pricing"
            element={
              <ProtectedUserRoute>
                <UsersPricing />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <ProtectedUserRoute>
                <UserProfile />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/ticket"
            element={
              <ProtectedUserRoute>
                <AnimatedTicketCard />
              </ProtectedUserRoute>
            }
          />
          <Route path="/ticket/view" element={<TicketView />} />

          {/* Organizer Routes */}
          <Route path="/org/login" element={<OrgLogin />} />
          <Route path="/org/register" element={<OrgRegister />} />
          <Route path="/org/dashboard" element={<OrgDashboard />} />
          <Route path="/org/add-events" element={<AddEvent />} />
          <Route path="/org/edit-events" element={<EditEvents />} />
          <Route path="/org/users" element={<OrgUsers />} />
          <Route path="/org/contacts" element={<OrgContacts />} />
          <Route path="/org/edit-profile" element={<OrgEditProfile />} />

          {/* Admin Routes  */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <Dashboard />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <ProtectedAdminRoute>
                <AdminSettings />
              </ProtectedAdminRoute>
            }
          />
 
          <Route
            path="/admin/manage-users"
            element={
              <ProtectedAdminRoute>
                <AdminManageUsers />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/manage-orgs"
            element={
              <ProtectedAdminRoute>
                <AdminManageOrgs />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/manage-events"
            element={
              <ProtectedAdminRoute>
                <AdminManageEvents />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/support-contact"
            element={
              <ProtectedAdminRoute>
                <AdminContactSupport />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
