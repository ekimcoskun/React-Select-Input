# React Select Input

Introducing a dynamic component packed with versatile features, including infinite scroll, debounce functionality, and multiselect input.

Currently live on https://react-select-input.vercel.app/

## Props

### SelectInputProps

-`options`: An array of `SelectInputOption` objects representing the selectable options in the dropdown.

-`onSelectedChange`: A callback function triggered when the selection changes. It receives an array of `SelectInputOption` objects representing the selected options.

-`onSearch` (optional): A callback function triggered when the user performs a search. It receives the search text as a parameter.

-`className` (optional): A string representing additional CSS classes to be applied to the component.

-`isMulti` (optional): A boolean indicating whether multiple selections are allowed.

-`isClearable` (optional): A boolean indicating whether the input can be cleared.

-`isLoading` (optional): A boolean indicating whether the component is in a loading state.

-`isDisabled` (optional): A boolean indicating whether the component is disabled.

-`isSearchable` (optional): A boolean indicating whether the component allows searching.

-`onMenuScrollToBottom` (optional): A callback function triggered when the user scrolls to the bottom of the dropdown menu. It receives the page number as a parameter.

-`debounceDelay` (optional): A number representing the delay in milliseconds for debouncing the search input.

-`hasNext` (optional): A boolean indicating whether there are more options available to load.

### SelectInputOption

-`value`: A string representing the value of the option.

-`label`: A string representing the label displayed for the option.

-`image` (optional): A string representing the URL of an image associated with the option.

-`description` (optional): A string representing additional descriptive information for the option.
