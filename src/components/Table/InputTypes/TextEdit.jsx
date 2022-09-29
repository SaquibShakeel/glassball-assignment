import React, { useEffect } from "react";
import { EditText } from "react-edit-text";

function TextEdit({ value, onChange }) {
  const [text, setText] = React.useState(value);

  useEffect(() => {
    setText(value);
  }, []);

  return (
    <EditText
      style={{ width: "100%", height: "100%" }}
      className="EditTextStyle"
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
}

export default TextEdit;
