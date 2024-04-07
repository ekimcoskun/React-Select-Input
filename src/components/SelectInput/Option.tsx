import { OptionPropTypes } from "./types";
import React from "react";
const Option: React.FC<OptionPropTypes> = (props) => {
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
    <>
      {
        props.isAboveMaxSelections && !props.selected ? (
          <div className="option disabled-option " style={{ cursor: "not-allowed", opacity: 0.5 }}>
            <input
              type="checkbox"
              readOnly
              onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                e.stopPropagation();
              }}
              checked={props.selected}
            />
            <img
              className="image"
              src={props.option.image}
              alt={props.option.label}
            />
            <div className="option-texts">
              <p className="title">{props.option.label}</p>
              <p className="description">{props.option.description}</p>
            </div>
          </div>
        ) : (
          <div
            className={`option ${props.isCurrent && "current-option"}`}
            onClick={() => handleSelectOption()}
          >
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
        )
      }
    </>


  );
};

export default Option;
