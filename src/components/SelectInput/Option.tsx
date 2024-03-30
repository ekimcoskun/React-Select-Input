import { OptionPropTypes } from "./types";

const Option = (props: OptionPropTypes) => {
  const boldSearchText = (text: string, searchText: string) => {
    if (!searchText || searchText.trim() === "") return text;
    const regex = new RegExp(`(${searchText})`, "gi");
    return text.split(regex).map((part, index) => (
      <span
        key={index}
        style={
          part.toLowerCase() === searchText.toLowerCase()
            ? { fontWeight: "bold" }
            : {}
        }
      >
        {part}
      </span>
    ));
  };

  const handleSelectOption = () => {
    props.handleSelectOption(props.option);
  };

  return (
    <div className="option" onClick={() => handleSelectOption()}>
      <input
        type="checkbox"
        readOnly
        onClick={(e: React.MouseEvent<HTMLInputElement>) => {
          e.stopPropagation();
          handleSelectOption();
        }}
        checked={props.selected}
      />
      <img
        className="image"
        src={props.option.image}
        alt={props.option.label}
      />
      <div className="option-texts">
        <p className="title">
          {boldSearchText(props.option.label, props.searchText || "")}
        </p>
        <p className="description">{props.option.description}</p>
      </div>
    </div>
  );
};

export default Option;
