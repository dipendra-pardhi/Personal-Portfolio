import api from "../api/api";  // Your axios instance configured with baseURL and interceptors

export const fetchProjects = () => api.get("/projects").then(res => res.data);

export const createProject = (formData) => api.post("/projects", formData);

export const updateProject = (id, formData) => api.put(`/projects/${id}`, formData);

export const deleteProject = (id) => api.delete(`/projects/${id}`);
