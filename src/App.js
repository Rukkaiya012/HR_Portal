import React, { useState } from "react";
import CVUpload from "./components/CVUpload";
import CVDashboard from "./components/CVDashboard";
import JDForm from "./components/JDForm";
import MatchingPage from "./components/MatchingPage";
import TaskAssignment from "./components/TaskAssignment";
import AgentSimulator from "./components/AgentSimulator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [refreshCandidates, setRefreshCandidates] = useState(0);
  const [lastAddedCandidate, setLastAddedCandidate] = useState(null);

  const [lastAddedJD, setLastAddedJD] = useState(null);

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", fontSize: "36px", marginBottom: "20px", color: "#1E40AF" }}>
        Mini HR Portal
      </h1>

      {/* Upload Candidate CV */}
      <section style={cardStyle}>
        <h2 style={sectionTitle}>Upload Candidate CV</h2>
        <CVUpload onUploadSuccess={candidate => {
          setLastAddedCandidate(candidate);
          setRefreshCandidates(prev => prev + 1);
        }} />
      </section>

      {/* Candidate Dashboard */}
      <section style={cardStyle}>
        <h2 style={sectionTitle}>Candidate Dashboard</h2>
        <CVDashboard refresh={refreshCandidates} />
      </section>

      {/* Add Job Description */}
      <section style={cardStyle}>
        <h2 style={sectionTitle}>Add Job Description (JD)</h2>
        <JDForm onJDAdded={jd => setLastAddedJD(jd)} />
      </section>

      {/* Matching Page */}
      <section style={cardStyle}>
        <h2 style={sectionTitle}>Matching Page</h2>
        <MatchingPage
          refreshTrigger={refreshCandidates}
          autoSelectCandidate={lastAddedCandidate}
          autoAddJD={lastAddedJD}
        />
      </section>

      {/* Agent Simulator */}
      <section style={cardStyle}>
        <h2 style={sectionTitle}>Agent Simulator</h2>
        <AgentSimulator />
      </section>

      {/* Task Assignment */}
      <section style={cardStyle}>
        <h2 style={sectionTitle}>Task Assignment</h2>
        <TaskAssignment refreshTrigger={refreshCandidates} />
      </section>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  marginBottom: "30px"
};

const sectionTitle = {
  fontSize: "24px",
  marginBottom: "10px"
};

export default App;
