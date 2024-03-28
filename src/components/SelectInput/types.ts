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
  onChange: (value: string[]) => void;
  className?: string;
  isMulti?: boolean;
  isClearable?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  isSearchable?: boolean;
  onMenuScrollToBottom?: () => void;
  debounceDelay?: number;
};

export type SelectInputOption = {
  value: string;
  label: string;
  image?: string;
  description?: string;
};

export type DropdownPropTypes = {
  options: SelectInputOption[];
  loading: boolean;
  onMenuScrollToBottom: () => void;
};

export type OptionPropTypes = {
  option: SelectInputOption;
  searchText?: string;
};
