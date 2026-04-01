const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 PASTE YOUR CONNECTION STRING HERE
// ⚠️ Replace <db_password> with your actual database password
const mongoURI = "mongodb+srv://lofyx:Bhopal1123@cluster0.4xomnec.mongodb.net/kamgaarDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI)
  .then(() => console.log("Cloud Database Connected! ☁️✅"))
  .catch(err => console.error("Cloud Connection Error: ❌", err));

// 1. Worker Skill Schema
const jobSchema = new mongoose.Schema({
  title: String,
  locationName: String,
  wage: String,
  phone: String,
  lat: Number,
  lng: Number,
  createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);

// 2. GET API (Fetching workers)
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3. POST API (Broadcasting a skill)
app.post('/api/jobs', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.json(newJob);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(5000, () => console.log("Server running on port 5000 🚀"));