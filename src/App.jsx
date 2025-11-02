import { useMemo, useState, useEffect, useRef } from "react";
import { QUESTIONS, useSelections } from "./utils/worksheetUtils.js";
import QuestionCard from "./components/QuestionCard.jsx";
import { API_BASE } from "./config.js";
import confetti from "canvas-confetti";
import "./index.css";

// Main application component
export default function WorksheetApp() {
  const { selections, set, clear } = useSelections();
  const [name, setName] = useState("");
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [shakeName, setShakeName] = useState(false);
  const [scoreboard, setScoreboard] = useState([]);
  const nameInputRef = useRef(null);
  const [nameWarning, setNameWarning] = useState(false);

  // Count of answered questions
  const answeredCount = useMemo(() => Object.keys(selections).length, [selections]);

  // Reset quiz when new player enters name after submit
  useEffect(() => {
    if (submitted && name.trim()) {
      clear();
      setScore(null);
      setSubmitted(false);
      nameInputRef.current?.focus();
    }
  }, [name]);

  // Load scores from backend
  useEffect(() => {
    fetch(`${API_BASE}/scores`)
      .then((r) => r.json())
      .then((list) => setScoreboard(list))
      .catch(() => {});
  }, []);

  // Handle submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setNameWarning("Please enter your name before submit.");
      setShakeName(true);
      setTimeout(() => setShakeName(false), 600);
      window.scrollTo({ top: 0, behavior: "smooth" }); // scrolls up to show warning
      return;
    }
    setNameWarning(null);
// Calculate score
    const totalScore = QUESTIONS.reduce(
      (acc, q) => acc + (selections[q.id] === q.answer ? 1 : 0),
      0
    );

    setScore(totalScore);
    setSubmitted(true);
    setScore(totalScore);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" }); // scrolls up to show score

    // Score-based confetti
    if (totalScore >= 9) {
      confetti({ particleCount: 150, spread: 100, colors: ["#00ff9d", "#00d4ff", "#007aff"], origin: { y: 0.6 } });
    } else if (totalScore >= 5) {
      confetti({ particleCount: 80, spread: 60, colors: ["#ffd700", "#ffb300", "#fff176"], origin: { y: 0.6 } });
    } else {
      confetti({ particleCount: 50, spread: 50, colors: ["#ff4d4d", "#ff9999", "#ff6666"], origin: { y: 0.6 }, scalar: 0.8 });
    }

    // Save to backend
    try {
      await fetch(`${API_BASE}/scores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, score: totalScore }),
      });
    } catch {}

    // Refresh scoreboard
    try {
      const res = await fetch(`${API_BASE}/scores`);
      const list = await res.json();
      setScoreboard(list);
    } catch {
      setScoreboard((prev) =>
        [...prev, { name, score: totalScore }].sort((a, b) => b.score - a.score)
      );
    }
  }

  function handleReset() {
    clear();
    setScore(null);
    setSubmitted(false);
  }

  return (
    <main className="page">
      <header className="header-card">
        <div className="status-top">
          <strong>Status:</strong> {answeredCount}/12 answered
        </div>

        <div className="title-pill">Rounding Off to Nearest 10</div>

        <div className="meta">
          <div className={`name-field ${shakeName ? "shake" : ""}`}>
            <label htmlFor="studentName">Name:</label>
            <input
              ref={nameInputRef}
              id="studentName"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameWarning && <span className="warning">{nameWarning}</span>}
          </div>

          {score !== null && (
            <div className="score-badge">
              <span>Score:</span>
              <strong className="pop">{score}/12</strong>
            </div>
          )}
        </div>

        {submitted && (
          <p className="feedback">
            {score < 5 && "Don't worry, try again — practice makes perfect!"}
            {score >= 5 && score < 9 && "Good job! Keep it up!"}
            {score >= 9 && "🎉 Excellent work!"}
          </p>
        )}
      </header>

      <div className="layout">
        <form className="grid" onSubmit={handleSubmit}>
          {QUESTIONS.map((q, i) => (
            <QuestionCard
              key={q.id}
              q={q}
              index={i}
              selected={selections[q.id]}
              onSelect={(val) => set(q.id, val)}
              showResults={submitted}
            />
          ))}

          <div className="actions">
            <button type="button" className="btn secondary" onClick={handleReset}>Reset</button>
            <button type="submit" className="btn primary">Submit</button>
          </div>

          <div className="tiny-note">
            Copyright: <a href="https://www.mathinenglish.com" target="_blank">www.mathinenglish.com</a>
          </div>
        </form>

        <aside className="scoreboard">
          <h3><span>🏆</span> Scoreboard</h3>
          <ul>
            {scoreboard.map((entry, i) => {
              const isTopScorer = i === 0;
              return (
                <li key={i} className={`board-item ${isTopScorer ? "top-scorer" : ""}`}>
                  <div className={`avatar ${isTopScorer ? "crowned" : ""}`}>
                    {isTopScorer ? "👑" : entry.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="board-info">
                    <span className="board-name">{entry.name}</span>
                    <span className="board-score">{entry.score}/12</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </main>
  );
}
