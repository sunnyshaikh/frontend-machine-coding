import { useEffect, useReducer, useState } from "react";

interface StateType {
  ucase: boolean;
  lcase: boolean;
  digits: boolean;
  symbols: boolean;
  length: number;
}

const initConfig: StateType = {
  ucase: true,
  lcase: true,
  digits: true,
  symbols: true,
  length: 6,
};

const cases = {
  INCLUDEUPPERCASE: "includeUppercase",
  INCLUDELOWERCASE: "includeLowercase",
  INCLUDEDIGITS: "includeDigits",
  INCLUDESYMBOLS: "includeSymbols",
  LENGTH: "length",
} as const;

type Action =
  | { type: typeof cases.INCLUDEUPPERCASE; payload: boolean }
  | { type: typeof cases.INCLUDELOWERCASE; payload: boolean }
  | { type: typeof cases.INCLUDEDIGITS; payload: boolean }
  | { type: typeof cases.INCLUDESYMBOLS; payload: boolean }
  | { type: typeof cases.LENGTH; payload: number };

const reducer = (state: StateType, action: Action): StateType => {
  switch (action.type) {
    case cases.INCLUDEUPPERCASE:
      return { ...state, ucase: action.payload };
    case cases.INCLUDELOWERCASE:
      return { ...state, lcase: action.payload };
    case cases.INCLUDEDIGITS:
      return { ...state, digits: action.payload };
    case cases.INCLUDESYMBOLS:
      return { ...state, symbols: action.payload };
    case cases.LENGTH:
      return { ...state, length: action.payload };
    default:
      return state;
  }
};

const getCharacters = (low: number, high: number): string => {
  let str = "";
  for (let i = low; i <= high; i++) {
    str += String.fromCharCode(i);
  }
  return str;
};

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState("");
  const [state, dispatch] = useReducer(reducer, initConfig);

  const generatePassword = () => {
    if (!state.lcase && !state.ucase && !state.digits && !state.symbols) {
      alert("Atleast one checkbox required");
      return;
    }

    let finalChars = "";

    if (state.ucase) {
      const uppercase = getCharacters(65, 90);
      finalChars += uppercase;
    }

    if (state.lcase) {
      const lowercase = getCharacters(97, 122);
      finalChars += lowercase;
    }

    if (state.digits) {
      const digits = getCharacters(48, 57);
      finalChars += digits;
    }

    if (state.symbols) {
      const symbols = "`~!@#$%^&*()[]{};':,.<>/?\"";
      finalChars += symbols;
    }

    let password = "";
    for (let i = 0; i < state.length; i++) {
      let index = Math.floor(Math.random() * finalChars.length);
      password += finalChars.charAt(index);
    }

    setPassword(password);
    setStrength(
      state.length >= 12 ? "Strong" : state.length >= 8 ? "Medium" : "Weak"
    );
  };

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Unable to copy password:", e);
    }
  };

  useEffect(() => {
    generatePassword();
  }, [state]);

  return (
    <div className="container">
      <h1 className="title  ">Password Generator</h1>
      <div className="result-box">
        <input type="text" value={password} readOnly />
        <button onClick={() => copyPassword()} disabled={copied}>
          {!copied ? "Copy" : "Copied :)"}
        </button>
      </div>

      <div className="range">
        <div>
          <span>Characters: </span>
          <span>{state.length}</span>
        </div>
        <input
          type="range"
          min={4}
          max={16}
          value={state.length}
          onChange={(e) =>
            dispatch({ type: cases.LENGTH, payload: Number(e.target.value) })
          }
        />
      </div>

      <div className="checkbox-container">
        <div className="ucase">
          <input
            type="checkbox"
            id="ucase"
            checked={state.ucase}
            onChange={(e) =>
              dispatch({
                type: cases.INCLUDEUPPERCASE,
                payload: e.target.checked,
              })
            }
          />
          <label htmlFor="ucase">Include Uppercase</label>
        </div>
        <div className="lcase">
          <input
            type="checkbox"
            id="lcase"
            checked={state.lcase}
            onChange={(e) =>
              dispatch({
                type: cases.INCLUDELOWERCASE,
                payload: e.target.checked,
              })
            }
          />
          <label htmlFor="lcase">Include Lowercase</label>
        </div>
        <div className="digits">
          <input
            type="checkbox"
            id="digits"
            checked={state.digits}
            onChange={(e) =>
              dispatch({ type: cases.INCLUDEDIGITS, payload: e.target.checked })
            }
          />
          <label htmlFor="digits">Include Digits</label>
        </div>
        <div className="symbols">
          <input
            type="checkbox"
            id="symbols"
            checked={state.symbols}
            onChange={(e) =>
              dispatch({
                type: cases.INCLUDESYMBOLS,
                payload: e.target.checked,
              })
            }
          />
          <label htmlFor="symbols">Include Symbols</label>
        </div>
      </div>

      <div className="cta">
        <div>
          <span>Strength:</span>
          <span>{strength}</span>
        </div>
        <button onClick={() => generatePassword()}>Generate Password</button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
