import React, { useEffect, useState } from "react";
import { API } from "../api";

export default function CVDashboard({ refresh }) {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    API.get("/candidates")
      .then((res) => setCandidates(res.data))
      .catch((err) => console.error(err));
  }, [refresh]);

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      
      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          overflowX: "auto",
          border: "1px solid #ccc",
          borderRadius: "8px"
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#E0F2FE" }}>
              {["Name", "Email", "Role", "Skills", "Location"].map((h) => (
                <th
                  key={h}
                  style={{ padding: "8px", border: "1px solid #ccc" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {candidates.map((c) => (
              <tr
                key={c._id}
                style={{ textAlign: "left", backgroundColor: "#fff" }}
              >
                <td style={cellStyle}>{c.name}</td>
                <td style={cellStyle}>{c.email}</td>
                <td style={cellStyle}>{c.role}</td>
                <td style={cellStyle}>
                  {Array.isArray(c.skills) ? c.skills.join(", ") : c.skills}
                </td>
                <td style={cellStyle}>{c.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const cellStyle = { padding: "8px", border: "1px solid #ccc" };
