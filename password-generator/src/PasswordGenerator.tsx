import { useState } from "react";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  return (
    <div className="container">
      <div className="result-box">
        <input type="text" value={password} readOnly />
        <button>Copy</button>
      </div>

      <div className="range">
        <div>
          <span>Characters: </span>
          <span>8</span>
        </div>
        <input type="range" min={4} max={16} />
      </div>

      <div className="checkbox-container">
        <div className="ucase">
          <input type="checkbox" id="ucase" />
          <label htmlFor="ucase">Include Uppercase</label>
        </div>
        <div className="lcase">
          <input type="checkbox" id="lcase" />
          <label htmlFor="lcase">Include Lowercase</label>
        </div>
        <div className="digits">
          <input type="checkbox" id="digits" />
          <label htmlFor="digits">Include Digits</label>
        </div>
        <div className="symbols">
          <input type="checkbox" id="symbols" />
          <label htmlFor="symbols">Include Symbols</label>
        </div>
      </div>

      <div className="cta">
        <div>
          <span>Strength:</span>
          <span>Medium</span>
        </div>
        <button>Generate Password</button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
