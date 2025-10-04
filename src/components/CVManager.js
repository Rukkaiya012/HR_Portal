import React, { useState } from "react";
import CVUpload from "./CVUpload";
import CVDashboard from "./CVDashboard";
import MatchingPage from "./MatchingPage";
import TaskAssignment from "./TaskAssignment";

export default function CVManager() {
  const [refresh, setRefresh] = useState(false);

 
  const handleUploadSuccess = () => setRefresh(prev => !prev);

  return (
    <div style={{ padding: "20px", backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
     
      {/* Upload Form */}
      <div style={{ marginBottom: "30px" }}>
        <CVUpload onUploadSuccess={handleUploadSuccess} />
      </div>

      {/* Dashboard */}
      <CVDashboard refresh={refresh} />

      {/* Matching */}
      <MatchingPage refresh={refresh} />

      {/* Task assignment */}
      <TaskAssignment refresh={refresh} />
    </div>
  );
}
