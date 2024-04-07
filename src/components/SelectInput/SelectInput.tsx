import Dropdown from "./Dropdown";
import { SelectInputOption, SelectInputProps } from "./types";
import "./style.css";
import React, { useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput";

const SelectInput: React.FC<SelectInputProps> = (props) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectInputOption[]>(
    []
  );
  const [currentOption, setCurrentOption] = useState<SelectInputOption>();
  const [searchText, setSearchText] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelectOption = (option: SelectInputOption) => {
    if (props.isMulti) {
      if (
        selectedOptions.find(
          (selectedOption) => selectedOption.value === option.value
        )
      ) {
        setSelectedOptions((prevSelections) => {
          const newSelectedOptions = prevSelections.filter(
            (selectedOption) => selectedOption.value !== option.value
          );
          props.onSelectedChange(newSelectedOptions);
          return newSelectedOptions;
        });
      } else {
        setSelectedOptions([...selectedOptions, option]);
        props.onSelectedChange([...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([option]);
      props.onSelectedChange([option]);
    }
  };

  const handleDeleteOption = (option: SelectInputOption) => {
    const newSelectedOptions = selectedOptions.filter(
      (selectedOption) => selectedOption.value !== option.value
    );
    setSelectedOptions(newSelectedOptions);
    props.onSelectedChange(newSelectedOptions);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const index = currentOption
        ? props.options.findIndex(
            (option) => option.value === currentOption.value
          )
        : -1;
      const nextIndex = e.key === "ArrowDown" ? index + 1 : index - 1;
      if (index < props.options.length - 1) {
        setCurrentOption(props.options[nextIndex]);
      }
    } else if (e.key === "Enter" && currentOption) {
      handleSelectOption(currentOption);
    } else if (e.key === "Escape") {
      setDropdownVisible(false);
    }
  };

  const handleSearch = async (searchText: string) => {
    setSearchText(searchText);
    props.onSearch?.(searchText);
    setIsSearching(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }
  , [containerRef]);

  return (
    <div
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
      ref={containerRef}
    >
      <SearchInput
        onSearch={(searchText) => handleSearch(searchText)}
        loading={props.isLoading || false}
        setIsSearching={setIsSearching}
        debounceDelay={props.debounceDelay || 500}
        selectedOptions={selectedOptions}
        isDisabled={props.isDisabled || false}
        dropdownVisible={dropdownVisible}
        onBlur={() => {
          setDropdownVisible(false);
        }}
        onFocus={() => {
          setDropdownVisible(true);
        }}
        onDeleteOption={handleDeleteOption}
        placeholder={props.placeholder}
        maxSelections={props.maxSelections}
      />
      <Dropdown
        visible={!props.isDisabled && dropdownVisible}
        currentOption={currentOption as SelectInputOption}
        options={props.options}
        loading={props.isLoading || false}
        searchText={searchText}
        selectedOptions={selectedOptions}
        handleSelectOption={handleSelectOption}
        onMenuScrollToBottom={props.onMenuScrollToBottom}
        isSearching={isSearching}
        hasNext={props.hasNext}
        maxSelections={props.maxSelections}
      />
    </div>
  );
};

SelectInput.defaultProps = {
  isMulti: false,
  options: [],
  isLoading: false,
  hasNext: false,
  isDisabled: false,
};

export default SelectInput;
