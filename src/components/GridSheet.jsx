import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import Select from "react-select";
import { type } from "@testing-library/user-event/dist/type";

function GridSheet({ Data, setData, setDataIndex, resData, setResData }) {
  const parentRef = React.useRef();
  const temp = [];

  const rowVirtualizer = useVirtualizer({
    count: Data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: Data[0].length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 5,
  });

  const HandleEditData = React.useCallback(
    (i, j) => (e) => {
      setData((prev) => {
        prev[i][j] = e.target.value;
        if (!temp.includes(prev.indexOf(prev[i]))) {
          temp.push(prev.indexOf(prev[i]));
        }
        // console.log(temp);
        setDataIndex(temp);

        return [...prev];
      });
    },
    [setData]
  );
  // console.log(selectedSingle);

  return (
    <React.Fragment>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: `${columnVirtualizer.totalSize}px`,
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: `${columnVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div key={virtualRow.index} className="listTable">
              {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
                const obj = resData[virtualRow.index - 1];
                let color = "white";
                for (const key in obj) {
                  if (
                    resData[virtualRow.index - 1][key].type === "singleselect"
                  ) {
                    color = resData[virtualRow.index - 1][key].value.value;
                    break;
                  }
                }
                return (
                  <div
                    key={virtualColumn.index}
                    className={
                      virtualColumn.index % 2
                        ? virtualRow.index % 2 === 0
                          ? "ListItemOdd"
                          : "ListItemEven"
                        : virtualRow.index % 2
                        ? "ListItemOdd"
                        : "ListItemEven"
                    }
                    style={{
                      position: "absolute",
                      border: "1px solid black",
                      top: 0,
                      left: 0,
                      backgroundColor:
                        virtualRow.index === 0 ? "#4caf50" : color,
                      width: `200px`,
                      height: `50px`,
                      transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                    }}
                  >
                    {virtualRow.index !== 0 &&
                    Data[virtualRow.index][virtualColumn.index] ===
                      "singleselect" ? (
                      <Select
                        menuPortalTarget={document.body}
                        styles={{
                          // menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          menu: (provided) => ({ ...provided, zIndex: 9999 }),
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
                        defaultValue={
                          resData[virtualRow.index - 1][
                            Object.keys(resData[virtualRow.index - 1])[
                              virtualColumn.index
                            ]
                          ].value
                        }
                        onChange={(e) => {
                          setResData((prev) => {
                            prev[virtualRow.index - 1][
                              Object.keys(prev[virtualRow.index - 1])[
                                virtualColumn.index
                              ]
                            ].value = e;
                            return [...prev];
                          });
                        }}
                      />
                    ) : virtualRow.index !== 0 &&
                      Data[virtualRow.index][virtualColumn.index] ===
                        "multiselect" ? (
                      <Select
                        menuPortalTarget={document.body}
                        styles={{
                          // menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          menu: (provided) => ({ ...provided, zIndex: 9999 }),
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
                        defaultValue={
                          resData[virtualRow.index - 1][
                            Object.keys(resData[virtualRow.index - 1])[
                              virtualColumn.index
                            ]
                          ].value
                        }
                        isMulti
                        onChange={(e) => {
                          setResData((prev) => {
                            prev[virtualRow.index - 1][
                              Object.keys(prev[virtualRow.index - 1])[
                                virtualColumn.index
                              ]
                            ].value = e;
                            return [...prev];
                          });
                        }}
                      />
                    ) : (
                      <EditText
                        style={{ width: "100%", height: "100%" }}
                        className="EditTextStyle"
                        value={Data[virtualRow.index][virtualColumn.index]}
                        onChange={HandleEditData(
                          virtualRow.index,
                          virtualColumn.index
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default GridSheet;
