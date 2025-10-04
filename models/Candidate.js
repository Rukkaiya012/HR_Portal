const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: String,
  candidateId: String,
  email: String,
  role: String,
  skills: [String],
  location: String,
  cvFile: String,
  rating: { type: Number, default: 0 }
});

module.exports = mongoose.model("Candidate", candidateSchema);
