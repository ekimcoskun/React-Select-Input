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
  const [isSearching, setIsSearching] = useState<boolean>(false);

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
    if (e.key === "Escape") {
      setDropdownVisible(false);
    }
  };

  const handleSearch = async (searchText: string) => {
    setSearchText(searchText);
    props.onSearch?.(searchText);
    setIsSearching(false);
  };

  return (
    <div
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
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
        onDeleteOption={(option) => {
          handleDeleteOption(option);
        }}
      />
      <Dropdown
        visible={!props.isDisabled && dropdownVisible}
        currentOption={currentOption as SelectInputOption}
        options={props.options}
        loading={props.isLoading || false}
        searchText={searchText}
        selectedOptions={selectedOptions}
        handleSelectOption={(option) => handleSelectOption(option)}
        onMenuScrollToBottom={(page: number) =>
          props.onMenuScrollToBottom?.(page)
        }
        isSearching={isSearching}
        hasNext={props.hasNext}
      />
    </div>
  );
};

export default SelectInput;
