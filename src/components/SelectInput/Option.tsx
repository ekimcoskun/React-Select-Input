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

  return (
    <div className="option">
      <input type="checkbox" />
      <img
        className="image"
        src={props.option.image}
        alt={props.option.label}
        width={50}
        height={50}
      />
      <div>
        <p className="title">
          {boldSearchText(props.option.label, props.searchText || "")}
        </p>
        <p className="description">{props.option.description}</p>
      </div>
    </div>
  );
};

export default Option;
