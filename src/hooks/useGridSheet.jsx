import React, { useCallback, useState } from "react";
import axios from "axios";

export default function useGridSheet() {
  const [sheetData, setSheetData] = useState([[]]);
  const [sheetColumns, setSheetColumns] = useState([]);

  const fetchColumns = useCallback(() => {
    axios
      .get(
        `https://glassball-assignment-default-rtdb.firebaseio.com/sheets.json`
      )
      .then((res) => {
        //   Data to be rendered
        setSheetData(res.data);
        const _data = [];
        _data.push(Object.keys(res.data[0]));

        const col_map = res.data.reduce((col, item) => {
          Object.keys(item).forEach((obj) => {
            if (col[obj] === undefined) col[obj] = 1;
          });
          return col;
        }, {});

        setSheetColumns(Object.keys(col_map));
      });
  });
}
