import api from "../api/api";  // Axios instance jisme baseURL + token interceptor hai

// Sabhi education entries leke aane ke liye
export const fetchEducation = () => api.get("/education").then(res => res.data);

// Nayi education entry create karne ke liye (formData with optional logo image)
export const createEducation = (formData) => api.post("/education", formData);

// Kisi particular education ko update karne ke liye (id ke saath formData)
export const updateEducation = (id, formData) => api.put(`/education/${id}`, formData);

// Kisi education entry ko delete karne ke liye
export const deleteEducation = (id) => api.delete(`/education/${id}`);
