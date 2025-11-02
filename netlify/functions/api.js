import express from "express";
import serverless from "serverless-http";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());

// Use process.cwd() safely
const DATA_FILE = path.join(process.cwd(), "netlify/functions/scores.json");

function ensureFile() {
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf8");
}
function readScores() {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return [];
  }
}
function writeScores(scores) {
  ensureFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(scores, null, 2), "utf8");
}

// Create router and mount under '/.netlify/functions/api'
const router = express.Router();

router.get("/scores", (req, res) => {
  const scores = readScores().sort((a, b) => b.score - a.score).slice(0, 100);
  res.json(scores);
});

router.post("/scores", (req, res) => {
  const { name, score } = req.body;
  if (typeof name !== "string" || typeof score !== "number") {
    return res.status(400).json({ error: "Invalid data" });
  }

  const entry = {
    name: name.trim().slice(0, 50),
    score: Math.max(0, Math.min(12, Math.round(score))),
    createdAt: new Date().toISOString(),
  };

  const scores = readScores();
  scores.push(entry);
  writeScores(scores);

  res.json({ ok: true, entry });
});

app.use("/.netlify/functions/api", router);

// Export wrapped handler
export const handler = serverless(app);
