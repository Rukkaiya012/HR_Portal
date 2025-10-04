import React, { useState } from "react";
import JDForm from "./JDForm";
import MatchingPage from "./MatchingPage";

export default function JDManager() {
  const [refresh, setRefresh] = useState(false);

  const handleJDAdded = () => {
    setRefresh(prev => !prev); 
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#059669" }}>
        Job Description Management
      </h1>

      {/* JD Form */}
      <div style={{ marginBottom: "30px" }}>
        <JDForm onJDAdded={handleJDAdded} />
      </div>

      {/* Matching Panel */}
      <MatchingPage refresh={refresh} />
    </div>
  );
}
