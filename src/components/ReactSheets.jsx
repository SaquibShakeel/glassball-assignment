import { useState } from "react";
import Spreadsheet from "react-spreadsheet";

const ReactSheets = () => {
  const [data, setData] = useState([
    [{ value: "Vanilla", id: "1" }, { value: "Chocolate" , id: "2" }, {}, {}],
    [{ value: "Strawberry", id: "3" }, { value: "Cookies" , id: "4" }],
  ]);
  return <Spreadsheet data={data} onChange={setData} />;
};

export default ReactSheets;