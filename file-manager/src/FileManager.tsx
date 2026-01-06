import { useState, type FC } from "react";
import type { FileType } from "./data";
import {
  VscNewFile,
  VscNewFolder,
  VscChevronRight,
  VscChevronDown,
} from "react-icons/vsc";

const FileManager: FC<{ file: FileType }> = ({ file }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {file.isFolder ? (
        <div>
          <div className="folder">
            <button
              className="folder-name"
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className="arrow">
                {open ? <VscChevronDown /> : <VscChevronRight />}
              </span>
              <span>{file.name}</span>
            </button>
            <div className="folder-create">
              <button title="new file">
                <VscNewFile />
              </button>
              <button title="new folder">
                <VscNewFolder />
              </button>
            </div>
          </div>
          {open ? (
            <div style={{ paddingLeft: "1.5rem" }}>
              {file.items?.map((f) => (
                <FileManager key={f.id} file={f} />
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <span>{file.name}</span>
      )}
    </div>
  );
};

export default FileManager;
