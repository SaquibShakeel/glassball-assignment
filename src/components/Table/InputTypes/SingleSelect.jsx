import React from "react";
import Select from "react-select";

function SingleSelect({ defaultValue, onChange }) {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div
      style={{
        height: 50,
        backgroundColor: value.value,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
      }}>
      <Select
        menuPortalTarget={document.body}
        styles={{
          // menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          menu: (provided) => ({ ...provided, zIndex: 9999 }),
          container: (provided) => ({
            ...provided,
            width: "100%",
            position: "absolute",
          }),
          control: (provided) => ({
            ...provided,
            width: "90%",
            margin: 10,
            height: "100%",
            backgroundColor: "#ffffff98",
            alignSelf: "center",
          }),
        }}
        options={[
          { value: "white", label: "White" },
          { value: "red", label: "Red" },
          { value: "blue", label: "Blue" },
          { value: "green", label: "Green" },
          { value: "yellow", label: "Yellow" },
          { value: "orange", label: "Orange" },
          { value: "purple", label: "Purple" },
          { value: "brown", label: "Brown" },
          { value: "grey", label: "Grey" },
        ]}
        defaultValue={value}
        onChange={(newValue) => {
          setValue(newValue);
          onChange(newValue);
        }}
      />
    </div>
  );
}

export default SingleSelect;
