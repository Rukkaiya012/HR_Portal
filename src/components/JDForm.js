import React, { useState } from "react";
import { API } from "../api";

export default function JDForm({ onJDAdded }) {
  const [formData, setFormData] = useState({ role: "", requiredSkills: "", experience: "" });
  
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/jd", formData);
      alert("JD Added Successfully!");
      setFormData({ role: "", requiredSkills: "", experience: "" });
      if (onJDAdded) onJDAdded();
    } catch (err) {
      console.error(err);
      alert("Error adding JD.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
        required
        style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <input
        name="requiredSkills"
        placeholder="Required Skills (comma separated)"
        value={formData.requiredSkills}
        onChange={handleChange}
        required
        style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <input
        name="experience"
        placeholder="Experience"
        value={formData.experience}
        onChange={handleChange}
        style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <button type="submit" style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#059669", color: "#fff", border: "none", cursor: "pointer" }}>
        Add JD
      </button>
    </form>
  );
}
