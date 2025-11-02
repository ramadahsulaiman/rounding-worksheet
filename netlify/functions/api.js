import express from "express";
import serverless from "serverless-http";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());

const DATA_FILE = path.join(process.cwd(), "netlify/functions/scores.json");

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

export const handler = serverless(app);
