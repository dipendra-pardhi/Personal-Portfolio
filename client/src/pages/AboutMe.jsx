import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import Tilt from "react-parallax-tilt";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import api from "../api/api";

const AboutMe = () => {
  const [aboutMe, setAboutMe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAboutMe = async () => {
      try {
        const res = await api.get("/aboutme");
        setAboutMe(res.data);
      } catch (err) {
        setError("Failed to load About Me");
      }
    };
    fetchAboutMe();
  }, []);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!aboutMe) return <p className="text-center mt-10 text-white">Loading About_Me...</p>;

  return (
    <section
      id="about"
      className="py-4 px-[7vw] md:px-[7vw] lg:px-[12vw] font-sans mt-16 md:mt-24 lg:mt-32"
    >
      <div className="flex flex-col-reverse md:flex-row justify-between items-center">

        {/* LEFT SIDE */}
        <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-0">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            Hi, I am
          </h1>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            {aboutMe.name}
          </h2>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-[#8245ec]">
            <span className="text-white">I am a </span>
            <Typewriter
              words={[aboutMe.description || "Mern Stack Developer", "Web Developer", "Backend Developer", "Frontend Developer"]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h3>

          <p className="text-base sm:text-lg text-gray-400 mb-10 mt-8 leading-relaxed">
            {aboutMe.profession || "Passionate developer building modern web experiences."}
          </p>

          {/* 🔥 RESUME + SOCIAL LINKS */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">

            {/* Resume Button */}
            <a
              href={aboutMe.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white py-3 px-8 rounded-full text-lg font-bold transition duration-300 transform hover:scale-105"
              style={{
                background: "linear-gradient(90deg, #8245ec, #a855f7)",
                boxShadow: "0 0 2px #8245ec, 0 0 2px #8245ec, 0 0 40px #8245ec",
              }}
            >
              DOWNLOAD RESUME
            </a>

            {/* Social Icons */}
            <div className="flex gap-4">
              {aboutMe.socialLinks?.github && (
                <a
                  href={aboutMe.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white text-2xl hover:text-[#8245ec] transition transform hover:scale-125"
                >
                  <FaGithub />
                </a>
              )}

              {aboutMe.socialLinks?.linkedin && (
                <a
                  href={aboutMe.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white text-2xl hover:text-[#8245ec] transition transform hover:scale-125"
                >
                  <FaLinkedin />
                </a>
              )}

              {/* {aboutMe.socialLinks?.leetcode && (
                <a
                  href={aboutMe.socialLinks.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white text-2xl hover:text-[#8245ec] transition transform hover:scale-125"
                >
                  <FaCode />
                </a>
              )} */}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <Tilt
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-[30rem] md:h-[30rem] border-4 border-purple-700 rounded-full"
            tiltMaxAngleX={20}
            tiltMaxAngleY={20}
            perspective={1000}
            scale={1.05}
            transitionSpeed={1000}
            gyroscope
          >
            <img
              src={aboutMe.profileImage}
              alt={aboutMe.name}
              className="w-full h-full rounded-full object-cover drop-shadow-[0_10px_20px_rgba(130,69,236,0.5)]"
            />
          </Tilt>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
