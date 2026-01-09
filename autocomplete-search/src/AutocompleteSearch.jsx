import { useId } from "react";

const AutocompleteSearch = ({
  value,
  onChange,
  onFocus,
  onBlur,
  options = [],
  id,
  label,
  placeholder = "",
}) => {
  const uid = id ?? useId();
  return (
    <div className="form-group">
      {!!label && (
        <label htmlFor={uid} className="form-label">
          {label}
        </label>
      )}
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={uid}
      />
      <div className="popper">
        {options.map((op) => (
          <span key={op} className="popper-item">
            {op}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AutocompleteSearch;
