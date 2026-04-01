import React, { useEffect, useState } from "react";
import {
  fetchEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../services/educationService";
import { toast } from "react-toastify";

function AdminEducation() {
  const [educationList, setEducationList] = useState([]);
  const [degree, setDegree] = useState("");
  const [institute, setInstitute] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grade, setGrade] = useState("");
  const [description, setDescription] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    try {
      setIsLoading(true);
      const data = await fetchEducation();
      setEducationList(data);
    } catch (error) {
      toast.error("Failed to load education data");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setDegree("");
    setInstitute("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setGrade("");
    setDescription("");
    setLogoFile(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!degree || !institute) {
      toast.error("Degree and Institute are required");
      return;
    }

    const formData = new FormData();
    formData.append("degree", degree);
    formData.append("institute", institute);
    formData.append("location", location);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("grade", grade);
    formData.append("description", description);
    if (logoFile) {
      formData.append("logoUrl", logoFile);
    }

    try {
      if (editingId) {
        await updateEducation(editingId, formData);
        toast.success("Education updated successfully 🔥");
      } else {
        await createEducation(formData);
        toast.success("Education added successfully 🎉");
      }
      resetForm();
      loadEducation();
    } catch (error) {
      toast.error("Operation failed ❌");
    }
  };

  const handleEdit = (edu) => {
    setEditingId(edu._id);
    setDegree(edu.degree);
    setInstitute(edu.institute);
    setLocation(edu.location || "");
    setStartDate(edu.startDate ? edu.startDate.slice(0, 10) : "");
    setEndDate(edu.endDate ? edu.endDate.slice(0, 10) : "");
    setGrade(edu.grade || "");
    setDescription(edu.description || "");
    setLogoFile(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this education entry?")) {
      try {
        await deleteEducation(id);
        toast.success("Education deleted successfully 🗑️");
        loadEducation();
      } catch (error) {
        toast.error("Failed to delete education");
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  // Combine dates for display
  const getDateDisplay = (start, end) => {
    const startStr = formatDate(start);
    const endStr = end ? formatDate(end) : "Present";
    return `${startStr} - ${endStr}`;
  };

  return (
    <section
      id="admin-education"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[12vw] font-sans bg-skills-gradient clip-path-custom"
    >
      {/* Section Title - Same as Skills page */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">ADMIN EDUCATION</h2>
        <div className="w-24 h-1 bg-[#8245ec] mx-auto mt-2"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          Manage your education details
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-300px)]">
        {/* Left Side - Form */}
        <div className="lg:w-1/2 h-full">
          <div className="bg-gray-900 backdrop-blur-md px-6 sm:px-6 py-8 sm:py-12 rounded-2xl border border-white 
          shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] h-full flex flex-col">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-400 mb-4 text-center">
              {editingId ? "Edit Education Entry" : "Add New Education Entry"}
            </h3>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                {/* Degree */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Degree *</label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    required
                    placeholder="e.g., Bachelor of Technology"
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                {/* Institute */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Institute *</label>
                  <input
                    type="text"
                    value={institute}
                    onChange={(e) => setInstitute(e.target.value)}
                    required
                    placeholder="e.g., University Name"
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., City, Country"
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                        focus:outline-none focus:border-purple-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                        focus:outline-none focus:border-purple-500 transition"
                    />
                  </div>
                </div>

                {/* Grade */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Grade/Score</label>
                  <input
                    type="text"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    placeholder="e.g., 8.5 CGPA"
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Description about your education..."
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      focus:outline-none focus:border-purple-500 transition resize-none"
                  />
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Institute Logo</label>
                  {logoFile && (
                    <div className="mb-4">
                      <img
                        src={URL.createObjectURL(logoFile)}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-xl border border-gray-700"
                      />
                    </div>
                  )}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setLogoFile(e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <button
                      type="button"
                      className="w-full py-3 border-2 border-dashed border-gray-600 
                        text-gray-400 rounded-lg hover:bg-gray-800/50 transition duration-300"
                    >
                      {logoFile ? "Change Logo" : "Upload Institute Logo"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Buttons - Fixed at bottom */}
              <div className="pt-4 mt-4 border-t border-gray-700">
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 bg-purple-700 hover:bg-purple-800 text-white 
                      rounded-lg transition duration-300 font-semibold"
                  >
                    {editingId ? "UPDATE ENTRY" : "ADD ENTRY"}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 py-3 px-6 bg-gray-700 hover:bg-gray-600 
                        text-white rounded-lg transition duration-300"
                    >
                      CANCEL
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Education List */}
        <div className="lg:w-1/2 h-full">
          <div className="bg-gray-900 backdrop-blur-md px-6 sm:px-6 py-8 sm:py-12 rounded-2xl border border-white 
            shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] h-full flex flex-col">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-400 mb-4 text-center">
              Existing Education Entries
            </h3>

            {isLoading ? (
              <div className="text-center py-10 flex-1 flex items-center justify-center">
                <div>
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                  <p className="text-gray-400 mt-4">Loading education data...</p>
                </div>
              </div>
            ) : educationList.length === 0 ? (
              <div className="text-center py-10 flex-1 flex items-center justify-center">
                <p className="text-gray-400">No education entries yet. Add your first one!</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                {educationList.map((edu) => (
                  <div key={edu._id} className="bg-gray-800/50 rounded-2xl border border-gray-700 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xl font-bold text-gray-300">{edu.degree}</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(edu)}
                          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white 
                            rounded-lg transition duration-300 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(edu._id)}
                          className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white 
                            rounded-lg transition duration-300 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      {edu.logoUrl && (
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-700">
                          <img
                            src={edu.logoUrl}
                            alt={edu.institute}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-lg font-medium text-gray-300">{edu.institute}</p>
                        {edu.location && (
                          <p className="text-gray-400 text-sm">{edu.location}</p>
                        )}
                        <p className="text-purple-400 text-sm mt-1">
                          {getDateDisplay(edu.startDate, edu.endDate)}
                        </p>
                      </div>
                    </div>

                    {edu.grade && (
                      <div className="mb-3">
                        <span className="inline-block bg-[#251f38] text-purple-400 px-3 py-1 rounded-full text-sm">
                          Grade: {edu.grade}
                        </span>
                      </div>
                    )}

                    {edu.description && (
                      <p className="text-gray-400 text-sm line-clamp-3">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminEducation;