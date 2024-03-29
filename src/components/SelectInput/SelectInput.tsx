import Dropdown from "./Dropdown";
import { SelectInputProps } from "./types";
import "./style.css";

const SelectInput = (props: SelectInputProps) => {
  return (
    <div>
      <Dropdown
        options={props.options}
        loading={props.isLoading || false}
        onMenuScrollToBottom={(page: number) =>
          props.onMenuScrollToBottom?.(page)
        }
      />
    </div>
  );
};

export default SelectInput;
