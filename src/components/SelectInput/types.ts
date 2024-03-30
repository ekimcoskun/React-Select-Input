/**
 * @typedef {Object} SelectInputProps
 * @property {SelectInputOption[]} options - List of options
 * @property {string[]} value - The selected value(s). Should be an array if isMulti is true.
 * @property {(value: string[]) => void} onChange - Function triggered on change
 * @property {string} [className] - Additional CSS class
 * @property {boolean} [isMulti] - Can multiple selections be made?
 * @property {boolean} [isClearable] - Should a 'Clear' button be displayed to clear selected values?
 * @property {boolean} [isLoading] - Should a loading animation be displayed while options are loading?
 * @property {boolean} [isDisabled] - Is the component disabled?
 * @property {boolean} [isSearchable] - Can search be performed among the options?
 * @property {() => void} [onMenuScrollToBottom] - Function triggered when the bottom of the menu is reached during infinite scrolling of options
 * @property {number} [debounceDelay] - Debounce delay for search (in ms)
 */

/**
 * @typedef {Object} SelectInputOption
 * @property {string} value - Value of the option
 * @property {string} label - Displayed text of the option
 * @property {string} [image] - Optional image of the option
 * @property {string} [description] - Optional description of the option
 */

export type SelectInputProps = {
  options: SelectInputOption[];
  onSelectedChange: (value: SelectInputOption[]) => void;
  onSearch?: (searchText: string) => void;
  className?: string;
  isMulti?: boolean;
  isClearable?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  isSearchable?: boolean;
  onMenuScrollToBottom?: (page: number) => void;
  debounceDelay?: number;
  hasNext?: boolean;
};

export type SelectInputOption = {
  value: string;
  label: string;
  image?: string;
  description?: string;
};

export type DropdownPropTypes = {
  visible: boolean;
  options: SelectInputOption[];
  searchText?: string;
  loading: boolean;
  onMenuScrollToBottom?: (page: number) => void;
  handleSelectOption: (option: SelectInputOption) => void;
  selectedOptions: SelectInputOption[];
  currentOption?: SelectInputOption;
};

export type OptionPropTypes = {
  option: SelectInputOption;
  searchText?: string;
  handleSelectOption: (option: SelectInputOption) => void;
  selected: boolean;
  isCurrent: boolean;
};

export type SearchInputPropTypes = {
  onSearch: (searchText: string) => void;
  debounceDelay: number;
  selectedOptions: SelectInputOption[];
  isDisabled: boolean;
  isSearchable: boolean;
  onBlur: () => void;
  onFocus: () => void;
  onDeleteOption: (option: SelectInputOption) => void;
  dropdownVisible: boolean;
};
