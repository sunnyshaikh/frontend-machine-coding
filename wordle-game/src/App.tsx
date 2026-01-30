import { useEffect, useState } from "react";

const ROWS = 6;
const WORD_LENGTH = 5;
const WORD = "HELLO";

const App = () => {
  const [guesses, setGuesses] = useState(Array.from({ length: ROWS }).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentRow, setCurrentRow] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // LETTERS
      if (/^[a-zA-Z]$/.test(e.key)) {
        setCurrentGuess((prev) =>
          prev.length < WORD_LENGTH ? prev + e.key.toUpperCase() : prev,
        );
        return;
      }

      // BACKSPACE
      if (e.key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      // ENTER
      if (
        e.key === "Enter" &&
        currentGuess.length === WORD_LENGTH &&
        currentRow < ROWS
      ) {
        setGuesses((prev) => {
          const next = [...prev];
          next[currentRow] = currentGuess;
          return next;
        });

        setCurrentGuess("");
        setCurrentRow((r) => r + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, currentRow]);

  return (
    <div className="app">
      <div className="grid">
        {guesses.map((guess, i) => (
          <Row
            key={i}
            guess={guess}
            isActive={i === currentRow}
            currentGuess={currentGuess}
          />
        ))}
      </div>
    </div>
  );
};

const Row = ({ guess, isActive, currentGuess }) => {
  const displayWord = isActive ? currentGuess : guess;

  return (
    <div className={`row ${isActive ? "active" : ""}`}>
      {Array.from({ length: WORD_LENGTH }).map((_, i) => (
        <div key={i} className="box">
          {displayWord[i] ?? ""}
        </div>
      ))}
    </div>
  );
};

export default App;
