import React, { useEffect, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import "react-edit-text/dist/index.css";
import InputHandler from "./Table/InputHandler";
import useDebounceCallback from "../hooks/useDebounceCallback";
import IsCellVisible from "./Table/IsCellVisible";

function GridSheet({ Data, Columns, updateData, updateColumns }) {
  const parentRef = React.useRef();

  const rowVirtualizer = useVirtualizer({
    count: Data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: Columns.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 5,
  });

  const updateDataHandler = useDebounceCallback((row, col, value) => {
    const newData = [...Data];
    console.log("updateDataHandler", row, col, value);
    newData[row][col] = value;
    updateData(newData, row);
  }, 500);

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
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const _color = Data[virtualRow.index]?.Color?.value?.value;
            return (
              <div key={virtualRow.index} className="listTable">
                {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
                  console.log(_color);
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
                        width: `200px`,
                        backgroundColor: _color,
                        height: `50px`,
                        transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <IsCellVisible>
                        {virtualRow.index === 0 ? (
                          Columns[virtualColumn.index]
                        ) : (
                          <InputHandler
                            data={
                              Data[virtualRow.index][
                                Columns[virtualColumn.index]
                              ]
                            }
                            onChange={(value) => {
                              console.log("onChange", value);

                              updateDataHandler(
                                virtualRow.index,
                                Columns[virtualColumn.index],
                                value
                              );
                            }}
                            type={
                              Data[virtualRow.index][
                                Columns[virtualColumn.index]
                              ]?.type
                            }
                          />
                        )}
                      </IsCellVisible>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default GridSheet;
