import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {
  // Smooth scroll function
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Social links data
  const socialLinks = [
    {
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/in/lokesh-pardhi-2200fgh/",
      label: "LinkedIn",
    },
    {
      icon: <FaGithub />,
      link: "https://github.com/Tech-Lksh",
      label: "GitHub",
    },
    { icon: <FaTwitter />, link: "#", label: "Twitter" },
    { icon: <FaInstagram />, link: "https://www.instagram.com/lo_keshhh/", label: "Instagram" },
  ];

  // Navigation links
  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Education", id: "education" },
  ];

  return (
    <footer className="relative py-12 px-[5vw] md:px-[7vw] lg:px-[12vw] font-sans bg-gradient-to-t from-gray-900 to-gray-800 border-t border-purple-500/20">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110"
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>

      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Lokesh Pardhi
            </h2>
            <p className="text-gray-400 text-sm">
              Full Stack Developer & Problem Solver
              <br />
              Passionate about creating amazing web experiences
            </p>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navLinks.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleScroll(item.id)}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Get In Touch
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-900/30 rounded-full flex items-center justify-center">
                  <span className="text-purple-400">✉️</span>
                </div>
                <span>lokeshpardhi161@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-900/30 rounded-full flex items-center justify-center">
                  <span className="text-purple-400">📍</span>
                </div>
                <span>Nagpur, Maharashtra, India</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Connect With Me
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1"
                  aria-label={item.label}
                >
                  <span className="text-xl text-gray-300 group-hover:text-white transition-colors">
                    {item.icon}
                  </span>
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-6">
              Follow me for updates on my latest projects and tech insights.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © 2025 <span className="text-purple-400">Lokesh Pardhi</span>. All
            rights reserved.
            <span className="mx-2">•</span>
            Built with ❤️ using MERN STACK
          </p>

          {/* Additional Links */}
          {/* <div className="flex gap-6 text-sm">
            <button className="text-gray-400 hover:text-purple-400 transition-colors">
              Privacy Policy
            </button>
            <button className="text-gray-400 hover:text-purple-400 transition-colors">
              Terms of Service
            </button>
          </div> */}
        </div>

        {/* Made With Love */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            Made with <span className="text-red-500">♥</span> by Lokesh Pardhi
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
