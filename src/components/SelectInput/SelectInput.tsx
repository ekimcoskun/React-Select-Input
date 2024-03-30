import Dropdown from "./Dropdown";
import { SelectInputOption, SelectInputProps } from "./types";
import "./style.css";
import { useState } from "react";
import SearchInput from "./SearchInput";

const SelectInput = (props: SelectInputProps) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectInputOption[]>(
    []
  );

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

  return (
    <div>
      <SearchInput
        onSearch={(searchText) => props.onSearch?.(searchText)}
        debounceDelay={props.debounceDelay || 500}
        selectedOptions={selectedOptions}
        isDisabled={props.isDisabled || false}
        isSearchable={props.isSearchable || false}
        onBlur={() => {}}
        onFocus={() => {}}
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
          console.log(e);
        }}
        onDeleteOption={(option) => {
          handleDeleteOption(option);
        }}
      />
      <Dropdown
        options={props.options}
        loading={props.isLoading || false}
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
