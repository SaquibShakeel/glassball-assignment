import React, { useCallback, useState } from "react";
import axios from "axios";

function RowData(type, name) {
  switch (type) {
    case "singleselect":
      return {
        [name]: {
          type: "singleselect",
          value: {
            value: "",
            label: "",
          },
        },
      };
    case "multiselect":
      return {
        [name]: {
          type: "multiselect",
          value: [],
        },
      };
    default:
      return {
        [name]: "",
      };
  }
}

export default function useGridSheet() {
  const [sheetData, setSheetData] = useState([[]]);
  const [sheetColumns, setSheetColumns] = useState([]);
  const [dirtyRows, setDirtyRows] = useState([]);

  const fetchColumns = useCallback(async () => {
    const res = await axios.get(
      `https://glassball-assignment-default-rtdb.firebaseio.com/sheets.json`
    );
    //   Data to be rendered
    setSheetData([{}, ...res.data]);
    const _data = [];
    _data.push(Object.keys(res.data[0]));

    const col_map = res.data.reduce((col, item) => {
      Object.keys(item).forEach((obj) => {
        if (col[obj] === undefined) col[obj] = 1;
      });
      return col;
    }, {});

    setSheetColumns(Object.keys(col_map));
  }, []);

  const updateData = useCallback(
    (newData, row) => {
      console.log(newData, row);
      setSheetData(newData);
      setDirtyRows([...new Set([...dirtyRows, row])]);
    },
    [dirtyRows]
  );

  const saveHandler = useCallback(async () => {
    console.log({ dirtyRows });
    await Promise.all(
      dirtyRows.map(async (item) => {
        await axios.patch(
          `https://glassball-assignment-default-rtdb.firebaseio.com/sheets/${
            item - 1
          }.json`,
          sheetData[item]
        );

        return item;
      })
    );

    alert("Data Saved");
  }, [dirtyRows, sheetData]);

  const addColumn = useCallback(
    async (type, name) => {
      const prev = RowData(type, name);
      const _data = sheetData.slice(1).map((item) => ({
        ...item,
        ...prev,
      }));
      console.log(_data);
      await axios.put(
        `https://glassball-assignment-default-rtdb.firebaseio.com/sheets.json`,
        _data
      );

      window.location.reload();
    },
    [sheetData]
  );

  return [
    {
      sheetData,
      sheetColumns,
    },
    {
      fetchColumns,
      updateData,
      saveHandler,
      addColumn,
    },
  ];
}
