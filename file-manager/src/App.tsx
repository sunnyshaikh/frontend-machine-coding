import { useMemo } from "react";
import { file } from "./data";
import FileManager from "./FileManager";

const App = () => {
  const fileData = useMemo(() => file, [file]);
  return (
    <aside>
      <h2>File manager</h2>
      <div className="file-container">
        <FileManager file={fileData} />
      </div>
    </aside>
  );
};

export default App;
