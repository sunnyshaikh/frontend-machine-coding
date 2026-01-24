import { useState } from "react";

const ROWS = 6;
const WORD_LENGTH = 5;
const WORD = "HELLO";

const App = () => {
  const [guesses, setGuesses] = useState(
    Array.from({ length: ROWS }).fill(null),
  );

  return (
    <div className="app">
      <div className="grid">
        {guesses.map((guess, i) => {
          return <Row key={i} guess={guess ?? ""} />;
        })}
      </div>
    </div>
  );
};

const Row = ({ guess }) => {
  return (
    <div className="row">
      {Array.from({ length: WORD_LENGTH }).map((_, i) => {
        return <div key={i} className="box"></div>;
      })}
    </div>
  );
};

export default App;
