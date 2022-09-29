import React from "react";
import MultiSelect from "./InputTypes/MultiSelect";
import SingleSelect from "./InputTypes/SingleSelect";
import TextEdit from "./InputTypes/TextEdit";

function InputHandler({ type, data, onChange }) {
  //   console.log(type, data);
  switch (type) {
    case "singleselect":
      return (
        <SingleSelect
          defaultValue={data?.value}
          onChange={(value) =>
            onChange({
              type: "singleselect",
              value: value,
            })
          }
        />
      );
    case "multiselect":
      return (
        <MultiSelect
          defaultValue={data?.value}
          onChange={(value) =>
            onChange({
              type: "multiselect",
              value: value,
            })
          }
        />
      );
    default:
      return <TextEdit value={data || ""} onChange={onChange} />;
  }
}

export default InputHandler;
