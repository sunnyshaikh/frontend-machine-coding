import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

const App = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (value >= 100) return;

    const id = setInterval(() => {
      setValue((v) => v + 1);
    }, 100);

    return () => clearInterval(id);
  }, [value]);

  return (
    <div className="app">
      <ProgressBar value={value} />
    </div>
  );
};

export default App;
