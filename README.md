# Rounding Worksheet (React + Vite)

An interactive math worksheet web app built with **React + Vite**.  
Users can answer rounding questions, get instant scores with animations, and compare results on a live scoreboard.

---

## Features

✅ 12 rounding-off-to-10 questions (auto-graded)  
✅ Responsive, modern 2025 UI design  
✅ Name input required before submission  
✅ Animated score display (confetti & feedback)  
✅ Reset button to start over  
✅ Local **High Scoreboard** (sorted by top marks)  
✅ Auto-scroll to top on submission  
✅ Data saved in `localStorage` (persists after refresh)  
✅ Deploy-ready for **Netlify**

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React (Vite) |
| State Management | React Hooks (`useState`, `useEffect`, `useMemo`) |
| Styling | Custom CSS3 |
| Animations | CSS keyframes + `canvas-confetti` |
| Storage | Browser `localStorage` |
| Deployment | Netlify |

---

## Setup Guide

### 1 Clone the repository
```bash
git clone https://github.com/<your-username>/rounding-worksheet.git
cd rounding-worksheet

### 2 Install dependencies
npm install

### 3 Run the app locally
npm run dev

### Project Structure
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
├── package.json
└── README.md

### Usage

1. Enter your name.
2. Answer all 12 rounding questions.
3. Click Submit to calculate your score.
4. Your result appears instantly, with a confetti animation.
5. The Scoreboard ranks players (saved locally).
6. Click Reset to allow a new player to try.