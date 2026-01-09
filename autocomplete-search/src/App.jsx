import { useCallback, useEffect, useRef, useState } from "react";
import AutocompleteSearch from "./AutocompleteSearch";

const App = () => {
  const [input, setInput] = useState("");
  const [recipes, setRecipes] = useState([]);
  const cacheRef = useRef(new Map());

  const handleChange = useCallback(
    (e) => {
      setInput(e.target.value);
    },
    [setInput]
  );

  const fetchRecipes = async () => {
    if (cacheRef.current.has(input))
      return setRecipes(cacheRef.current.get(input));

    const res = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const data = await res.json();

    setRecipes(data.recipes ?? []);
    cacheRef.current.set(input, data.recipes ?? []);
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchRecipes(), 300);
    return () => clearTimeout(timer);
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
