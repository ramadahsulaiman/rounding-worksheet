const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// Simple Express server to handle score submissions and retrievals
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "scores.json");

// Helper functions to read and write scores
function readScores() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return [];
  }
}
// Write scores to the data file
function writeScores(scores) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(scores, null, 2));
}
// API endpoint to get top 100 scores and to submit a new score
app.get("/scores", (req, res) => {
  const scores = readScores()
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .slice(0, 100);
  res.json(scores);
});

app.post("/scores", (req, res) => {
  let { name, score } = req.body;
  if (typeof name !== "string" || typeof score !== "number") {
    return res.status(400).json({ error: "Invalid data" });
  }
  name = name.trim().slice(0, 50);
  score = Math.max(0, Math.min(12, Math.round(score)));

  const entry = { name, score, createdAt: new Date().toISOString() };
  const scores = readScores();
  scores.push(entry);
  writeScores(scores);
  res.json({ ok: true, entry });
});

app.listen(port, () =>
  console.log(`Score API running on http://localhost:${port}`)
);
