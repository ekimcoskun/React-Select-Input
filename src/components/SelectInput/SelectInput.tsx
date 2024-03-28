import Dropdown from "./Dropdown";
import { SelectInputProps } from "./types";
import "./style.css";

const SelectInput = (props: SelectInputProps) => {
  return (
    <div>
      <Dropdown options={props.options} loading />
    </div>
  );
};

export default SelectInput;
