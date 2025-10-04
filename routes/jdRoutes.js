const express = require("express");
const JD = require("../models/JD");
const Candidate = require("../models/Candidate");
const router = express.Router();

// Add JD
router.post("/", async (req, res) => {
  try {
    const { role, requiredSkills, experience } = req.body;
    const jd = new JD({ role, requiredSkills: requiredSkills.split(","), experience });
    await jd.save();
    res.status(201).json(jd);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all JD
router.get("/", async (req, res) => {
  try {
    const jd = await JD.find();
    res.json(jd);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Simple CV Matching Simulator
router.get("/match/:jdId", async (req, res) => {
  try {
    const jd = await JD.findById(req.params.jdId);
    const candidates = await Candidate.find();
    
    // Simple matching: count skills match
    const matched = candidates.map(c => {
      const matchScore = c.skills.filter(s => jd.requiredSkills.includes(s)).length;
      return { ...c.toObject(), matchScore };
    }).sort((a,b)=>b.matchScore-a.matchScore); // descending
    
    res.json(matched.slice(0, 3)); // top 3
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
