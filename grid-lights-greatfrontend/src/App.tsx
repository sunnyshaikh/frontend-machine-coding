import { useState } from "react";

const grid = [1, 1, 1, 1, 0, 1, 1, 1, 1];

const App = () => {
  const [boxIndexes, setBoxIndexes] = useState<number[]>([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleClick = (idx: number) => {
    if (boxIndexes.includes(idx)) return;
    const indexes = [...boxIndexes];
    indexes.push(idx);
    setBoxIndexes(indexes);

    const activeBoxLength = grid.filter(Boolean).length;
    if (indexes.length === activeBoxLength) deactiveGrids();
  };

  const deactiveGrids = () => {
    setIsDeactivating(true);
    let interval: number | undefined = undefined;
    interval = setInterval(() => {
      setBoxIndexes((prev) => {
        if (prev.length === 0) {
          clearInterval(interval);
          setIsDeactivating(false);
          return prev;
        }
        return prev.slice(0, -1);
      });
    }, 500);
  };

  return (
    <div className="app">
      <h1>Grid Lights</h1>
      <div className="grid-box">
        {grid.map((n, i) => (
          <div
            key={i}
            className={`box ${!n ? "inactive" : ""} ${
              boxIndexes.includes(i) ? "filled" : ""
            }`}
            onClick={() => {
              if (n && !isDeactivating) handleClick(i);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
