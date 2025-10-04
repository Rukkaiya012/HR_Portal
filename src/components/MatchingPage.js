import React, { useState, useEffect } from "react";
import { API } from "../api";
import { toast } from "react-toastify";

export default function MatchingPage({ refreshTrigger, autoSelectCandidate, autoAddJD }) {
  const [candidates, setCandidates] = useState([]);
  const [jds, setJDs] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedJD, setSelectedJD] = useState("");
  const [loadingCandidates, setLoadingCandidates] = useState(true);
  const [loadingJDs, setLoadingJDs] = useState(true);

  
  useEffect(() => {
    setLoadingCandidates(true);
    setLoadingJDs(true);

    API.get("/candidates")
      .then(res => setCandidates(res.data || []))
      .catch(err => console.error("Candidates fetch error:", err))
      .finally(() => setLoadingCandidates(false));

    API.get("/jd")
      .then(res => setJDs(res.data || []))
      .catch(err => console.error("JDs fetch error:", err))
      .finally(() => setLoadingJDs(false));
  }, [refreshTrigger]);

 
  useEffect(() => {
    if (autoSelectCandidate && autoSelectCandidate._id) {
      setCandidates(prev => {
        const exists = prev.find(c => c._id === autoSelectCandidate._id);
        return exists ? prev : [...prev, autoSelectCandidate];
      });
    }
  }, [autoSelectCandidate]);


  useEffect(() => {
    if (autoAddJD && autoAddJD._id) {
      setJDs(prev => {
        const exists = prev.find(j => j._id === autoAddJD._id);
        return exists ? prev : [...prev, autoAddJD];
      });
    }
  }, [autoAddJD]);

  
  const matchCandidate = () => {
    if (!selectedCandidate || !selectedJD) {
      return toast.error("Select both Candidate and JD!");
    }

    const candidate = candidates.find(c => c._id === selectedCandidate);
    const jd = jds.find(j => j._id === selectedJD);

    if (!candidate || !jd) return;

    
    const matchedSkills = candidate.skills.filter(s => jd.requiredSkills.includes(s));

    if (matchedSkills.length > 0) {
      toast.success(`✅ ${candidate.name} matches JD ${jd.role}. Skills matched: ${matchedSkills.join(", ")}`);
    } else {
      toast.error(`❌ ${candidate.name} does not match JD ${jd.role}`);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
      {/* Candidate dropdown */}
      <select
        value={selectedCandidate}
        onChange={e => setSelectedCandidate(e.target.value)}
        disabled={loadingCandidates}
        style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
      >
        <option value="">Select Candidate</option>
        {candidates.map(c => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* JD dropdown */}
      <select
        value={selectedJD}
        onChange={e => setSelectedJD(e.target.value)}
        disabled={loadingJDs}
        style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
      >
        <option value="">Select Job Description</option>
        {jds.map(j => (
          <option key={j._id} value={j._id}>
            {j.role} ({j.experience} yrs exp)
          </option>
        ))}
      </select>

      {/* Button */}
      <button
        onClick={matchCandidate}
        disabled={loadingCandidates || loadingJDs || !selectedCandidate || !selectedJD}
        style={{
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#2563EB",
          color: "#fff",
          border: "none",
          cursor: "pointer"
        }}
      >
        Match Candidate
      </button>
    </div>
  );
}
