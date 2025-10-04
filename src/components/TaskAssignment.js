import React, { useState, useEffect } from "react";
import { API } from "../api";

export default function TaskAssignment({ refreshTrigger, autoSelectCandidate }) {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");

  
  useEffect(() => {
    API.get("/candidates")
      .then(res => setCandidates(res.data || []))
      .catch(err => console.error("Candidates fetch error:", err));
  }, [refreshTrigger]); 

  
  useEffect(() => {
    if (autoSelectCandidate) {
      const exists = candidates.find(c => c._id === autoSelectCandidate._id);
      if (!exists) {
        setCandidates(prev => [...prev, autoSelectCandidate]);
      }
    }
  }, [autoSelectCandidate, candidates]);

  const assignTask = () => {
    if (!selectedCandidate) return alert("Select a candidate!");
    alert(`Task assigned to candidate ID: ${selectedCandidate} (mock)`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <select
        value={selectedCandidate}
        onChange={e => setSelectedCandidate(e.target.value)}
        style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
      >
        <option value="">Select Candidate</option>
        {candidates.map(c => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <button
        onClick={assignTask}
        style={{
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#EF4444",
          color: "#fff",
          border: "none",
          cursor: "pointer"
        }}
      >
        Assign Task
      </button>
    </div>
  );
}
