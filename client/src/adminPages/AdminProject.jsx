import React, { useEffect, useState } from "react";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";
import { toast } from "react-toastify";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [description, setDescription] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const data = await fetchProjects();
      setProjects(data);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  // Add tech stack item from input
  const addTechStack = () => {
    if (techStackInput.trim() && !techStack.includes(techStackInput.trim())) {
      setTechStack([...techStack, techStackInput.trim()]);
      setTechStackInput("");
    }
  };

  // Remove tech stack item by index
  const removeTechStack = (index) => {
    const updated = techStack.filter((_, i) => i !== index);
    setTechStack(updated);
  };

  // Reset form fields
  const resetForm = () => {
    setTitle("");
    setTechStack([]);
    setTechStackInput("");
    setDescription("");
    setLiveLink("");
    setGithubLink("");
    setImageFile(null);
    setExistingImage("");
    setEditingId(null);
  };

  // Handle form submit (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || techStack.length === 0 || !description) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("techStack", JSON.stringify(techStack));
    formData.append("description", description);
    formData.append("liveLink", liveLink);
    formData.append("githubLink", githubLink);

    // Only append new image file if selected
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (editingId) {
        await updateProject(editingId, formData);
        toast.success("Project updated successfully! 🔥");
      } else {
        await createProject(formData);
        toast.success("Project created successfully! 🎉");
      }
      resetForm();
      loadProjects();
    } catch (error) {
      toast.error(editingId ? "Update failed! ❌" : "Creation failed! ❌");
    }
  };

  // Handle edit click: populate form with existing project data
  const handleEdit = (project) => {
    setEditingId(project._id);
    setTitle(project.title);
    setTechStack(project.techStack || []);
    setDescription(project.description);
    setLiveLink(project.liveLink || "");
    setGithubLink(project.githubLink || "");
    setExistingImage(project.image || "");
    setImageFile(null);
  };

  // Handle delete project
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        toast.success("Project deleted successfully! 🗑️");
        loadProjects();
      } catch (error) {
        toast.error("Delete failed! ❌");
      }
    }
  };

  return (
    <section
      id="admin-projects"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[12vw] font-sans bg-skills-gradient clip-path-custom"
    >
      {/* Section Title - Same as Skills page */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">ADMIN PROJECTS</h2>
        <div className="w-24 h-1 bg-[#8245ec] mx-auto mt-2"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          Manage your portfolio projects
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-300px)]">
        {/* Left Side - Form */}
        <div className="lg:w-1/2 h-full">
          <div className="bg-gray-900 backdrop-blur-md px-6 sm:px-6 py-8 sm:py-12 rounded-2xl border border-white 
          shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] h-full flex flex-col">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-400 mb-4 text-center">
              {editingId ? "Edit Project" : "Add New Project"}
            </h3>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                {/* Project Title */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Project Title *</label>
                  <input
                    type="text"
                    placeholder="Enter project title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Tech Stack *</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Add technology (e.g., React, Node.js)"
                      value={techStackInput}
                      onChange={(e) => setTechStackInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTechStack())}
                      className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                        focus:outline-none focus:border-purple-500 transition"
                    />
                    <button
                      type="button"
                      onClick={addTechStack}
                      className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-lg 
                        transition duration-300"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-[#251f38] text-sm font-semibold text-purple-500 
                          rounded-full px-4 py-2 cursor-pointer hover:bg-[#2a2438] transition"
                        onClick={() => removeTechStack(idx)}
                        title="Click to remove"
                      >
                        {tech} ×
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Description *</label>
                  <textarea
                    placeholder="Describe your project..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      focus:outline-none focus:border-purple-500 transition resize-none"
                  />
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Live Link</label>
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={liveLink}
                      onChange={(e) => setLiveLink(e.target.value)}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                        focus:outline-none focus:border-purple-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">GitHub Link</label>
                    <input
                      type="url"
                      placeholder="https://github.com/username/repo"
                      value={githubLink}
                      onChange={(e) => setGithubLink(e.target.value)}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                        focus:outline-none focus:border-purple-500 transition"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Project Image</label>
                  {existingImage && !imageFile && (
                    <div className="mb-4">
                      <img
                        src={existingImage}
                        alt="Existing project"
                        className="w-full h-48 object-cover rounded-xl border border-gray-700"
                      />
                    </div>
                  )}
                  {imageFile && (
                    <div className="mb-4">
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl border border-gray-700"
                      />
                    </div>
                  )}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <button
                      type="button"
                      className="w-full py-3 border-2 border-dashed border-gray-600 
                        text-gray-400 rounded-lg hover:bg-gray-800/50 transition duration-300"
                    >
                      {imageFile ? "Change Image" : "Upload Project Image"}
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
                    {editingId ? "UPDATE PROJECT" : "CREATE PROJECT"}
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

        {/* Right Side - Projects List */}
        <div className="lg:w-1/2 h-full">
          <div className="bg-gray-900 backdrop-blur-md px-6 sm:px-6 py-8 sm:py-12 rounded-2xl border border-white 
            shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] h-full flex flex-col">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-400 mb-4 text-center">
              Existing Projects
            </h3>

            {isLoading ? (
              <div className="text-center py-10 flex-1 flex items-center justify-center">
                <div>
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                  <p className="text-gray-400 mt-4">Loading projects...</p>
                </div>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-10 flex-1 flex items-center justify-center">
                <p className="text-gray-400">No projects yet. Add your first one!</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                {projects.map((project) => (
                  <div key={project._id} className="bg-gray-800/50 rounded-2xl border border-gray-700 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xl font-bold text-gray-300">{project.title}</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white 
                            rounded-lg transition duration-300 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white 
                            rounded-lg transition duration-300 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {project.image && (
                      <div className="mb-4">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover rounded-xl"
                        />
                      </div>
                    )}

                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {project.techStack && project.techStack.slice(0, 6).map((tech, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center space-x-2 bg-transparent border-2 border-gray-700 rounded-3xl py-2 px-2 sm:py-2 sm:px-3 text-center"
                        >
                          <span className="text-xs sm:text-sm text-gray-300">
                            {tech}
                          </span>
                        </div>
                      ))}
                      {project.techStack && project.techStack.length > 6 && (
                        <div className="flex items-center justify-center space-x-2 bg-transparent border-2 border-gray-700 rounded-3xl py-2 px-2 sm:py-2 sm:px-3 text-center">
                          <span className="text-xs sm:text-sm text-gray-300">
                            +{project.techStack.length - 6} more
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 mt-4">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-gray-300 text-center rounded-lg transition duration-300 text-sm"
                        >
                          Code
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-4 bg-purple-700 hover:bg-purple-800 text-white text-center rounded-lg transition duration-300 text-sm"
                        >
                          Live
                        </a>
                      )}
                    </div>
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

export default AdminProjects;