import { useEffect, useState } from "react";
import { SearchInputPropTypes } from "./types";

const SearchInput = (props: SearchInputPropTypes) => {
  const [inputValue, setInputValue] = useState<string>("");
  const { debounceDelay, onSearch } = props;
  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(inputValue);
    }, debounceDelay);
    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, debounceDelay, onSearch]);

  return (
    <div className="search-input-container">
      <div className="search-input-content">
        <div className="selected-item-container custom-scrollbar">
          {props.selectedOptions.map((option, index) => (
            <div key={index} className="selected-item">
              {option.label}
              <button
                className="item-delete-button"
                onClick={() => props.onDeleteOption(option)}
              >
                <span className="delete-icon">x</span>
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default SearchInput;
