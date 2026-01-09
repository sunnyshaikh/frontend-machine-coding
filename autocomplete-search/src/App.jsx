import { useCallback, useState } from "react";
import AutocompleteSearch from "./AutocompleteSearch";

const App = () => {
  const [input, setInput] = useState("");
  const [recipes, setRecipes] = useState();

  const handleChange = useCallback(
    (e) => {
      setInput(e.target.value);
    },
    [setInput]
  );
  return (
    <div className="app">
      <form>
        <AutocompleteSearch
          value={input}
          onChange={handleChange}
          options={recipes}
          placeholder="Search recipes..."
        />
      </form>
    </div>
  );
};

export default App;
