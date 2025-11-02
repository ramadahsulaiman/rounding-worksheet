# Rounding Worksheet (React)

---

## Features

✅ 12 rounding questions (auto-graded)  
✅ Responsive, modern 2025 UI design  
✅ Name input required before submission  
✅ Score display with animated pop effect  
✅ Reset button to start over  
✅ High Scoreboard (sorted by top marks)  
✅ Confetti animation based on performance  
✅ Backend logging using Express (Node.js)  
✅ Deployed-ready structure for Render / Vercel  

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React (Vite) |
| Styling | CSS3 (Custom, no frameworks) |
| Animation | CSS keyframes + canvas-confetti |
| Deployment | Netlify |

---

## Setup Guide

### 1️⃣ Clone this repository
```bash
git clone https://github.com/<your-username>/rounding-worksheet.git
cd rounding-worksheet

2️⃣ Install dependencies
npm install

3️⃣ Install backend dependencies
cd server
npm install

4️⃣ Run both frontend + backend together
Make sure you’re in the root folder, then run:
npm run dev

Project Structure
rounding-worksheet/
├── public/
├── src/
│   ├── components/
│   │   └── QuestionCard.jsx
│   ├── utils/
│   │   └── worksheetUtils.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── config.js
├── server/
│   ├── server.js
│   ├── package.json
│   └── scores.json
├── package.json
└── README.md

Usage
1. Enter your name.
2. Answer the 12 rounding questions.
3. Click Submit to calculate your score.
4. View your result & compare it on the Scoreboard.
5. Click Reset to allow a new player to try.