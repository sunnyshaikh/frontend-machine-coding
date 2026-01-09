import { useCallback, useEffect, useState } from "react";
import AutocompleteSearch from "./AutocompleteSearch";

const App = () => {
  const [input, setInput] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleChange = useCallback(
    (e) => {
      setInput(e.target.value);
    },
    [setInput]
  );

  const fetchRecipes = async () => {
    const res = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const data = await res.json();

    setRecipes(data.recipes ?? []);
  };

  useEffect(() => {
    fetchRecipes();
  }, [input]);

  return (
    <div className="app">
      <form>
        <AutocompleteSearch
          value={input}
          onChange={handleChange}
          options={recipes.map((r) => r.name)}
          placeholder="Search recipes..."
        />
      </form>
    </div>
  );
};

export default App;
