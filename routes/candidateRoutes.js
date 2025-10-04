const express = require("express");
const Candidate = require("../models/Candidate");
const router = express.Router();

// Create candidate
exports.createCandidate = async (req, res) => {
  try {
    const { name, candidateId, email, role, skills, location } = req.body;
    const cvFile = req.file ? req.file.filename : null;
    const candidate = new Candidate({
      name,
      candidateId,
      email,
      role,
      skills: skills.split(",").map(s => s.trim()),
      location,
      cvFile
    });
    await candidate.save();
    res.status(201).json(candidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all candidates
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

exports.router = router;
