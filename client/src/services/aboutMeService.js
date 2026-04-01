import api from "../api/api";

// Public
export const fetchAboutMe = async () => {
  const res = await api.get("/aboutme");
  return res.data;
};

// 🔥 Admin Update
export const updateAboutMe = async (formData) => {
  const res = await api.put("/aboutme", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
