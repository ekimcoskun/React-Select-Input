import Dropdown from "./Dropdown";
import { SelectInputOption, SelectInputProps } from "./types";
import "./style.css";
import { useState } from "react";
import SearchInput from "./SearchInput";

const SelectInput = (props: SelectInputProps) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectInputOption[]>(
    []
  );
  const [currentOption, setCurrentOption] = useState<SelectInputOption>();
  const [searchText, setSearchText] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const handleSelectOption = (option: SelectInputOption) => {
    if (props.isMulti) {
      const newSelectedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((selectedOption) => selectedOption !== option)
        : [...selectedOptions, option];
      setSelectedOptions(newSelectedOptions);
      props.onSelectedChange(newSelectedOptions);
    } else {
      setSelectedOptions([option]);
      props.onSelectedChange([option]);
    }
  };

  const handleDeleteOption = (option: SelectInputOption) => {
    const newSelectedOptions = selectedOptions.filter(
      (selectedOption) => selectedOption !== option
    );
    setSelectedOptions(newSelectedOptions);
    props.onSelectedChange(newSelectedOptions);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      const index = currentOption
        ? props.options.findIndex(
            (option) => option.value === currentOption.value
          )
        : -1;
      if (index < props.options.length - 1) {
        setCurrentOption(props.options[index + 1]);
      }
    }
    if (e.key === "ArrowUp") {
      const index = currentOption
        ? props.options.findIndex(
            (option) => option.value === currentOption.value
          )
        : -1;
      if (index > 0) {
        setCurrentOption(props.options[index - 1]);
      }
    }
    if (e.key === "Enter") {
      if (currentOption) {
        handleSelectOption(currentOption);
      }
    }
  };

  return (
    <div
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
    >
      <SearchInput
        onSearch={(searchText) => {
          setSearchText(searchText);
          props.onSearch?.(searchText);
        }}
        debounceDelay={props.debounceDelay || 500}
        selectedOptions={selectedOptions}
        isDisabled={props.isDisabled || false}
        dropdownVisible={dropdownVisible}
        isSearchable={props.isSearchable || false}
        onBlur={() => {
          setDropdownVisible(false);
        }}
        onFocus={() => {
          setDropdownVisible(true);
        }}
        onDeleteOption={(option) => {
          handleDeleteOption(option);
        }}
      />
      <Dropdown
        visible={dropdownVisible}
        currentOption={currentOption as SelectInputOption}
        options={props.options}
        loading={props.isLoading || false}
        searchText={searchText}
        selectedOptions={selectedOptions}
        handleSelectOption={(option) => handleSelectOption(option)}
        onMenuScrollToBottom={(page: number) =>
          props.onMenuScrollToBottom?.(page)
        }
      />
    </div>
  );
};

export default SelectInput;
