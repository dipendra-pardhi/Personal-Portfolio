import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import Tilt from 'react-parallax-tilt';
import { fetchAboutMe, updateAboutMe } from "../services/aboutMeService";
import { toast } from "react-toastify";

const AdminAboutMe = () => {
  const [form, setForm] = useState({
    name: "",
    profession: "",
    resumeUrl: "",
    linkedin: "",
    github: "",
    leetcode: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchAboutMe();
      setForm({
        name: data.name || "",
        profession: data.profession || "",
        resumeUrl: data.resumeUrl || "",
        linkedin: data.socialLinks?.linkedin || "",
        github: data.socialLinks?.github || "",
        leetcode: data.socialLinks?.leetcode || "",
      });
      // Model mein description field nahi hai, isliye profession hi use kar rahe hain
      setPreview(data.profileImage);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("profession", form.profession); // Model ke hisab se profession
    formData.append("resumeUrl", form.resumeUrl);
    formData.append("socialLinks[linkedin]", form.linkedin);
    formData.append("socialLinks[github]", form.github);
    formData.append("socialLinks[leetcode]", form.leetcode);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      await updateAboutMe(formData);
      toast.success("About Me Updated Successfully 🔥");
      loadData(); // Refresh data after update
    } catch (err) {
      toast.error("Update Failed ❌");
    }
  };

  // Generate professions array from profession field
  const getProfessionsArray = () => {
    if (!form.profession) return [];
    // Split profession string by commas or other delimiters
    return form.profession.split(/[,|]/).map(p => p.trim()).filter(p => p.length > 0);
  };

  return (
    <section className="py-4 px-[5vw] md:px-[7vw] lg:px-[10vw] font-sans mt-8 md:mt-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Edit About Me
        </h2>
        <p className="text-gray-400 mt-2">Manage your personal information and preview live changes</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compact Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-700">
              <button
                className={`flex-1 py-4 text-lg font-semibold transition-all duration-300 ${activeTab === "basic" 
                  ? "bg-gradient-to-r from-purple-700/30 to-pink-700/30 text-white border-b-2 border-purple-500" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800"}`}
                onClick={() => setActiveTab("basic")}
              >
                Basic Info
              </button>
              <button
                className={`flex-1 py-4 text-lg font-semibold transition-all duration-300 ${activeTab === "links" 
                  ? "bg-gradient-to-r from-purple-700/30 to-pink-700/30 text-white border-b-2 border-purple-500" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800"}`}
                onClick={() => setActiveTab("links")}
              >
                Links & Media
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Basic Info Tab */}
              {activeTab === "basic" && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Profession/Description *</label>
                    <textarea
                      name="profession"
                      value={form.profession}
                      onChange={handleChange}
                      placeholder="Enter your profession or description (comma separated for multiple professions)"
                      rows="3"
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Tip: For typing effect, separate multiple professions with commas (e.g., Frontend Developer, React Specialist, UI/UX Designer)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image</label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500 flex-shrink-0">
                        {preview ? (
                          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <input
                          type="file"
                          onChange={handleImage}
                          accept="image/*"
                          className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Links Tab */}
              {activeTab === "links" && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Resume URL *</label>
                    <input
                      name="resumeUrl"
                      value={form.resumeUrl}
                      onChange={handleChange}
                      placeholder="https://drive.google.com/your-resume-link"
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                      <input
                        name="linkedin"
                        value={form.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
                      <input
                        name="github"
                        value={form.github}
                        onChange={handleChange}
                        placeholder="https://github.com/username"
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">LeetCode</label>
                    <input
                      name="leetcode"
                      value={form.leetcode}
                      onChange={handleChange}
                      placeholder="https://leetcode.com/username"
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-lg font-bold transition-all duration-300 hover:from-purple-700 hover:to-pink-700 hover:shadow-2xl hover:shadow-purple-500/30 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    SAVE CHANGES
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-purple-500/30 shadow-2xl p-6 h-full">
              <div className="text-center mb-6">
                <div className="inline-block p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Live Preview</h3>
                <p className="text-gray-400 text-sm">Real-time preview of your changes</p>
              </div>

              <div className="flex flex-col items-center text-center">
                {/* Profile Image Preview */}
                <Tilt
                  className="w-32 h-32 border-4 border-purple-500/50 rounded-full mb-6"
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  perspective={800}
                  scale={1.05}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full rounded-full object-cover shadow-2xl"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </Tilt>

                {/* Name Preview */}
                <h1 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {form.name || "Your Name"}
                </h1>

                {/* Profession Typewriter Preview */}
                <div className="h-12 mb-4 flex items-center justify-center">
                  {form.description ? (
                    <div className="text-lg font-semibold text-purple-300 min-h-[48px] flex items-center">
                      <Typewriter
                        words={getProfessionsArray()}
                        loop={true}
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                      />
                    </div>
                  ) : (
                    <span className="text-gray-500">Add profession in Basic Info tab</span>
                  )}
                </div>

                {/* Social Links Preview */}
                {(form.linkedin || form.github || form.leetcode) && (
                  <div className="w-full mb-4">
                    <h4 className="text-white font-medium mb-2">Connect with me:</h4>
                    <div className="flex justify-center gap-3">
                      {form.linkedin && (
                        <a href={form.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-900/30 text-blue-300 rounded-lg hover:bg-blue-800/50 transition">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      )}
                      {form.github && (
                        <a href={form.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                      {form.leetcode && (
                        <a href={form.leetcode} target="_blank" rel="noopener noreferrer" className="p-2 bg-yellow-900/30 text-yellow-300 rounded-lg hover:bg-yellow-800/50 transition">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Resume Link Preview */}
                {form.resumeUrl && (
                  <div className="w-full">
                    <a
                      href={form.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Resume
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminAboutMe;