import React, { useEffect, useState } from "react";
import {
  fetchSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../services/skillService";
import { toast } from "react-toastify";
import Tilt from "react-parallax-tilt";

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [category, setCategory] = useState("");
  const [skillInputs, setSkillInputs] = useState([
    { _id: null, name: "", logo: null, existingLogo: "" },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      setIsLoading(true);
      const data = await fetchSkills();
      setSkills(data);
    } catch (error) {
      toast.error("Failed to load skills");
    } finally {
      setIsLoading(false);
    }
  };

  // Add new skill input
  const addSkillField = () => {
    setSkillInputs([
      ...skillInputs,
      { _id: null, name: "", logo: null, existingLogo: "" },
    ]);
  };

  // Remove skill input
  const removeSkillField = (index) => {
    if (skillInputs.length > 1) {
      const updated = [...skillInputs];
      updated.splice(index, 1);
      setSkillInputs(updated);
    }
  };

  // Handle change
  const handleSkillChange = (index, field, value) => {
    const updated = [...skillInputs];
    updated[index][field] = value;

    // Clear existingLogo if new logo is selected
    if (field === "logo" && value) {
      updated[index].existingLogo = "";
    }

    setSkillInputs(updated);
  };

  // Submit (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", category);

    // Prepare skills with _id and existing logo URLs
    const skillsPayload = skillInputs.map((s) => ({
      _id: s._id,
      name: s.name,
      logo: s.existingLogo,
    }));

    formData.append("skills", JSON.stringify(skillsPayload));

    // Append new logos only
    skillInputs.forEach((s) => {
      if (s.logo) {
        formData.append("logos", s.logo);
      }
    });

    try {
      if (editingId) {
        await updateSkill(editingId, formData);
        toast.success("Skills updated successfully! 🔥");
      } else {
        await createSkill(formData);
        toast.success("Skills created successfully! 🎉");
      }
      resetForm();
      loadSkills();
    } catch (error) {
      toast.error(editingId ? "Update failed! ❌" : "Creation failed! ❌");
    }
  };

  const resetForm = () => {
    setCategory("");
    setSkillInputs([{ _id: null, name: "", logo: null, existingLogo: "" }]);
    setEditingId(null);
  };

  const handleEdit = (skill) => {
    setEditingId(skill._id);
    setCategory(skill.category);

    setSkillInputs(
      skill.skills.map((s) => ({
        _id: s._id,
        name: s.name,
        logo: null,
        existingLogo: s.logo || "",
      }))
    );
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this skill category?")
    ) {
      try {
        await deleteSkill(id);
        toast.success("Skill category deleted! 🗑️");
        loadSkills();
      } catch (error) {
        toast.error("Delete failed! ❌");
      }
    }
  };

  return (
    <section
      id="admin-skills"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[12vw] font-sans bg-skills-gradient clip-path-custom"
    >
      {/* Section Title - Same as Skills page */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          ADMIN SKILLS
        </h2>
        <div className="w-24 h-1 bg-[#8245ec] mx-auto mt-2"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          Manage your technical skills and expertise
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-300px)]">
        {/* Left Side - Form */}
        <div className="lg:w-1/2 h-full">
          <div
            className="bg-gray-900 backdrop-blur-md px-6 sm:px-6 py-8 sm:py-12 rounded-2xl border border-white 
          shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] h-full flex flex-col"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-400 mb-4 text-center">
              {editingId ? "Edit Skill Category" : "Add New Skill Category"}
            </h3>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                {/* Category Input */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Category Name
                  </label>
                  <input
                    placeholder="e.g., Frontend, Backend, Tools"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                {/* Skill Inputs */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Skills
                  </label>
                  <div className="space-y-4">
                    {skillInputs.map((skill, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg"
                      >
                        {/* Skill Logo Preview */}
                        <div className="flex-shrink-0">
                          {skill.existingLogo && !skill.logo ? (
                            <img
                              src={skill.existingLogo}
                              alt="existing logo"
                              className="w-8 h-8 object-contain rounded"
                            />
                          ) : skill.logo ? (
                            <img
                              src={URL.createObjectURL(skill.logo)}
                              alt="preview"
                              className="w-8 h-8 object-contain rounded"
                            />
                          ) : (
                            <div className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded">
                              <span className="text-gray-500 text-xs">Logo</span>
                            </div>
                          )}
                        </div>

                        {/* Skill Name Input */}
                        <input
                          placeholder="Skill Name"
                          value={skill.name}
                          onChange={(e) =>
                            handleSkillChange(idx, "name", e.target.value)
                          }
                          required
                          className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded text-white 
                            focus:outline-none focus:border-purple-500"
                        />

                        {/* Logo Upload */}
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleSkillChange(idx, "logo", e.target.files[0])
                            }
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <button
                            type="button"
                            className="px-3 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded 
                              transition duration-300 text-sm"
                          >
                            Upload
                          </button>
                        </div>

                        {/* Remove Button */}
                        {skillInputs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSkillField(idx)}
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded 
                              transition duration-300"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add More Skills Button */}
                  <button
                    type="button"
                    onClick={addSkillField}
                    className="w-full mt-4 py-3 border-2 border-dashed border-gray-600 
                      text-gray-400 rounded-lg hover:bg-gray-800/50 transition duration-300"
                  >
                    + Add Another Skill
                  </button>
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
                    {editingId ? "UPDATE CATEGORY" : "CREATE CATEGORY"}
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

        {/* Right Side - Skills List */}
        <div className="lg:w-1/2 h-full">
          <div
            className="bg-gray-900 backdrop-blur-md px-6 sm:px-6 py-8 sm:py-12 rounded-2xl border border-white 
            shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] h-full flex flex-col"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-400 mb-4 text-center">
              Existing Skill Categories
            </h3>

            {isLoading ? (
              <div className="text-center py-10 flex-1 flex items-center justify-center">
                <div>
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                  <p className="text-gray-400 mt-4">Loading skills...</p>
                </div>
              </div>
            ) : skills.length === 0 ? (
              <div className="text-center py-10 flex-1 flex items-center justify-center">
                <p className="text-gray-400">
                  No skill categories yet. Add your first one!
                </p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                {skills.map((item) => (
                  <div
                    key={item._id}
                    className="bg-gray-800/50 rounded-2xl border border-gray-700 p-4"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xl font-bold text-gray-300">
                        {item.category}
                      </h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white 
                            rounded-lg transition duration-300 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white 
                            rounded-lg transition duration-300 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <Tilt
                      tiltMaxAngleX={20}
                      tiltMaxAngleY={20}
                      perspective={1000}
                      scale={1.05}
                      transitionSpeed={1000}
                      gyroscope={true}
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
                        {item.skills.map((skill, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-center space-x-2 bg-transparent border-2 border-gray-700 rounded-3xl py-2 px-2 sm:py-2 sm:px-3 text-center"
                          >
                            {skill.logo && (
                              <img
                                src={skill.logo}
                                alt={`${skill.name} logo`}
                                className="w-6 h-6 sm:w-8 sm:h-8"
                              />
                            )}
                            <span className="text-xs sm:text-sm text-gray-300">
                              {skill.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Tilt>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminSkills;