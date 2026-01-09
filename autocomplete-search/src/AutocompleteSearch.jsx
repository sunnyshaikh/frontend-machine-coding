import { useEffect, useId, useRef, useState } from "react";

const AutocompleteSearch = ({
  value,
  onChange,
  onFocus,
  onBlur,
  options = [],
  id,
  label,
  placeholder = "",
  open,
}) => {
  const [isOpen, setIsOpen] = useState(open ?? false);
  const wrapperRef = useRef(null);

  const uid = id ?? useId();

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="form-group" ref={wrapperRef}>
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
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        id={uid}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={`${uid}-listbox`}
      />
      {isOpen && (
        <div className="popper" role="listbox">
          {options.length ? (
            <>
              {options.map((op) => (
                <span key={op} className="popper-item">
                  {op}
                </span>
              ))}
            </>
          ) : (
            <span className="no-item">Not found!</span>
          )}
        </div>
      )}
    </div>
  );
};

export default AutocompleteSearch;
