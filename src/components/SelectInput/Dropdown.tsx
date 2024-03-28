import { useIcons } from "./icons/useIcons";
import Option from "./Option";
import { DropdownPropTypes } from "./types";

const Dropdown = (props: DropdownPropTypes) => {
  const { LoadingIcon } = useIcons();
  return (
    <div className="dropdown-container">
      {props.options.map((option, index) => (
        <Option key={index} option={option} />
      ))}
      {props.loading && (
        <div className="loading-container">
          <LoadingIcon />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
