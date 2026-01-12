import { useReducer, useState } from "react";

interface StateType {
  ucase: boolean;
  lcase: boolean;
  digits: boolean;
  symbols: boolean;
  length: number;
}

const initConfig: StateType = {
  ucase: false,
  lcase: false,
  digits: false,
  symbols: false,
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

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [state, dispatch] = useReducer(reducer, initConfig);

  console.table(state);

  return (
    <div className="container">
      <div className="result-box">
        <input type="text" value={password} readOnly />
        <button>Copy</button>
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
            dispatch({ type: "length", payload: Number(e.target.value) })
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
              dispatch({ type: "includeUppercase", payload: e.target.checked })
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
              dispatch({ type: "includeLowercase", payload: e.target.checked })
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
              dispatch({ type: "includeDigits", payload: e.target.checked })
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
              dispatch({ type: "includeSymbols", payload: e.target.checked })
            }
          />
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
