import { formatNumber } from "../utils/worksheetUtils";

// Component to display a question card with options
export default function QuestionCard({ q, index, selected, onSelect, showResults }) {
  const letters = ["a.", "b.", "c."];
  
// Render the question card
  return (
    <fieldset className="card">
      <legend className="prompt">
        <span className="qno">{index + 1}</span> {q.prompt}
      </legend>
      <div className="options">
        {q.options.map((opt, i) => {
          const isCorrect = showResults && opt === q.answer;
          const isWrong = showResults && selected === opt && opt !== q.answer;
          return (
            <label
              key={i}
              className={`option ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
            >
              <input
                type="radio"
                name={`q${q.id}`}
                checked={selected === opt}
                onChange={() => onSelect(opt)}
              />
              <span className="letter">{letters[i]}</span>
              <span className="value">{formatNumber(opt)}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
