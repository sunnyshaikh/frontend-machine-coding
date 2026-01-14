import { useRef, useState } from "react";

const ROWS = 6;
const COLS = 8;

const App = () => {
  const [cells, setCells] = useState(new Set());
  const isDragging = useRef(false);
  const dragMode = useRef("");

  const applyDragMode = (prev, id) => {
    const next = new Set(prev);

    if (dragMode.current === "select") {
      next.add(id);
    } else if (dragMode.current === "unselect") {
      next.delete(id);
    }

    return next;
  };

  const handleMouseDown = (id) => {
    isDragging.current = true;
    setCells((prev) => {
      dragMode.current = !prev.has(id) ? "select" : "unselect";
      return applyDragMode(prev, id);
    });
  };

  const handleMouseEnter = (id) => {
    if (!isDragging.current) return;
    setCells((prev) => applyDragMode(prev, id));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    dragMode.current = "";
  };
  return (
    <div className="app">
      <h1>Drag to select</h1>
      <div
        className="grid"
        style={{ "--rows": ROWS, "--cols": COLS }}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {Array.from({ length: ROWS }).map((_, r) =>
          Array.from({ length: COLS }).map((_, c) => {
            const id = `${r}_${c}`;
            return (
              <div
                key={id}
                className={`cell ${cells.has(id) ? "selected" : ""}`}
                onMouseEnter={() => handleMouseEnter(id)}
                onMouseDown={() => handleMouseDown(id)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default App;
