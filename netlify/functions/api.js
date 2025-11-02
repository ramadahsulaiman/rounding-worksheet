import express from "express";
import serverless from "serverless-http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create Express app
const app = express();
app.use(express.json());

// Data file path
const DATA_FILE = path.join(__dirname, "scores.json");

// Helper functions to read and write scores
function readScores() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return [];
  }
}

function writeScores(scores) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(scores, null, 2));
}

app.get("/scores", (req, res) => {
  const scores = readScores()
    .sort((a, b) => b.score - a.score)
    .slice(0, 100);
  res.json(scores);
});

// Simple validation and sanitization
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

// Export the wrapped Express app
export const handler = serverless(app);
