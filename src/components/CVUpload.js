import React, { useState } from "react";
import { API } from "../api";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

export default function CVUpload({ onUploadSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    candidateId: "",
    email: "",
    role: "",
    skills: "",
    location: ""
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a CV file!");

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    data.append("cv", file);

    try {
      setLoading(true);
      const res = await API.post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success("CV Uploaded Successfully!");

      
      setFormData({
        name: "",
        candidateId: "",
        email: "",
        role: "",
        skills: "",
        location: ""
      });
      setFile(null);

      
      if (onUploadSuccess) onUploadSuccess(res.data); 

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        margin: "0 auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        name="candidateId"
        placeholder="ID"
        value={formData.candidateId}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        name="role"
        placeholder="Role Applied"
        value={formData.role}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        name="skills"
        placeholder="Skills (comma separated)"
        value={formData.skills}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
        key={file ? file.name : "empty"}
        style={inputStyle}
      />
      {file && <small>Selected File: {file.name}</small>}
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#1E40AF",
          color: "#fff",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Uploading..." : "Upload CV"}
      </button>
    </form>
  );
}

const inputStyle = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};
