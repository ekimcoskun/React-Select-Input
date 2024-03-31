import { useEffect, useRef, useState } from "react";
import { SearchInputPropTypes } from "./types";
import { useIcons } from "./icons/useIcons";

const SearchInput = (props: SearchInputPropTypes) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [initialMount, setInitialMount] = useState<boolean>(true);
  const { debounceDelay, onSearch } = props;
  const { MoreIcon, LessIcon, LoadingCircleIcon } = useIcons();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (text: string) => {
    props.setIsSearching(true);
    setInputValue(text);
    setInitialMount(false);
  };

  useEffect(() => {
    if (!initialMount) {
      const timer = setTimeout(() => {
        onSearch(inputValue);
      }, debounceDelay);
      return () => {
        clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, debounceDelay, initialMount]);

  return (
    <div
      className="search-input-container"
      onClick={() => {
        inputRef?.current?.focus();
        props.onFocus();
      }}
    >
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
        <div className="search-input">
          <input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e.target.value)
            }
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          cursor: "pointer",
          width: "1.6rem",
          height: "100%",
        }}
        onClick={(e) => {
          e.stopPropagation();
          props.dropdownVisible ? props.onBlur() : props.onFocus();
        }}
      >
        {props.loading ? (
          <LoadingCircleIcon />
        ) : props?.dropdownVisible ? (
          <LessIcon />
        ) : (
          <MoreIcon />
        )}
      </div>
    </div>
  );
};

export default SearchInput;
