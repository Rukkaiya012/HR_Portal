const mongoose = require("mongoose");

const jdSchema = new mongoose.Schema({
  role: String,
  requiredSkills: [String],
  experience: String,
});

module.exports = mongoose.model("JD", jdSchema);
