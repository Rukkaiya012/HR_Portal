const express = require("express");   // <-- express import hona chahiye
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const candidateRoutes = require("./routes/candidateRoutes");
const jdRoutes = require("./routes/jdRoutes");

require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== Add this root route here =====
app.get("/", (req, res) => {
  res.send("HR Portal Backend is running!");
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// File upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// API routes
app.post("/upload", upload.single("cv"), candidateRoutes.createCandidate);
app.use("/candidates", candidateRoutes.router);
app.use("/jd", jdRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
