import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";

const App = () => {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 300);

  useEffect(() => {
    console.log("debouncedInput", debouncedInput);
  }, [debouncedInput]);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default App;
