import { OptionPropTypes } from "./types";

const Option = (props: OptionPropTypes) => {
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
        <p className="title">{props.option.label}</p>
        <p className="description">{props.option.description}</p>
      </div>
    </div>
  );
};

export default Option;
