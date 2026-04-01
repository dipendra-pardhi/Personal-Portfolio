import api from "../api/api";

// 🔓 Public
export const fetchSkills = async () => {
  const res = await api.get("/skills");
  return res.data;
};

// 🔒 Admin
export const createSkill = async (formData) => {
  const res = await api.post("/skills", formData);
  return res.data;
};

export const updateSkill = async (id, formData) => {
  const res = await api.put(`/skills/${id}`, formData);
  return res.data;
};

export const deleteSkill = async (id) => {
  const res = await api.delete(`/skills/${id}`);
  return res.data;
};
