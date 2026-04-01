import React from "react";
import { useNavigate } from "react-router-dom";
import AdminAboutMe from "./adminPages/AdminAboutMe";
import Navbar from "./components/Navbar";
import AdminSkills from "./adminPages/AdminSkills";
import AdminProjects from "./adminPages/AdminProject";
import AdminEducation from "./adminPages/AdminEducation";
import Contact from "./components/Contact";
import Footer from "./components/footer";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: 10 }}>
      <Navbar />
      <AdminAboutMe />
      <AdminSkills />
      <AdminProjects />
      <AdminEducation />
      <Contact />
      <Footer />
    </div>
  );
}

export default AdminDashboard;
