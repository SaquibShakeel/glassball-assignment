import React from "react";
import Select from "react-select";

function MultiSelect({ defaultValue, onChange }) {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div
      style={{
        height: 50,
        overflow: "auto",
      }}>
      <Select
        menuPortalTarget={document.body}
        styles={{
          // menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          menu: (provided) => ({ ...provided, zIndex: 9999 }),
          container: (provided) => ({
            ...provided,
            width: "100%",
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
          { value: "apple", label: "Apple" },
          { value: "mango", label: "Mango" },
          { value: "banana", label: "Banana" },
          { value: "grapes", label: "Grapes" },
          { value: "strawberry", label: "Strawberry" },
          { value: "watermelon", label: "Watermelon" },
          { value: "pineapple", label: "Pineapple" },
          { value: "cherry", label: "Cherry" },
        ]}
        defaultValue={value}
        isMulti
        onChange={(newValue) => {
          setValue(newValue);
          onChange(newValue);
        }}
      />
    </div>
  );
}

export default MultiSelect;
