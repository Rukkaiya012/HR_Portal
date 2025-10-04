import React, { useState, useEffect } from "react";
import { API } from "../api";

export default function AgentSimulator() {
  const [candidates, setCandidates] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    API.get("/candidates").then(res => setCandidates(res.data));
  }, []);

  const simulateAgent = () => {
    
    const sorted = [...candidates].sort((a,b) => b.skills.length - a.skills.length).slice(0,3);
    setSuggestions(sorted);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      
      <button onClick={simulateAgent} style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#8B5CF6", color: "#fff", border: "none", cursor: "pointer" }}>
        Suggest Top 3 Candidates
      </button>
      {suggestions.length > 0 && (
        <ul style={{ paddingLeft: "20px" }}>
          {suggestions.map(c => <li key={c._id}>{c.name} - Skills: {c.skills.join(", ")}</li>)}
        </ul>
      )}
    </div>
  );
}
