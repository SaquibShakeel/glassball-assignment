import "./App.css";
import React from "react";
import GridSheet from "./components/GridSheet";
import axios from "axios";
import AddColumn from "./components/AddColumn";

function App() {
  const [resData, setResData] = React.useState([]);
  const [Data, setData] = React.useState([[]]);

  const [dataIndex, setDataIndex] = React.useState([]);
  const [openAddCol, setOpenAddCol] = React.useState(false);

  const saveHandler = async () => {
    let header = Object.keys(resData[0]);
    console.log(header);
    for (let i = 0; i < dataIndex.length; i++) {
      const obj = {};
      for (let j = 0; j < header.length; j++) {
        obj[header[j]] = Data[dataIndex[i]][j].toString();
      }
      console.log(obj);
      await axios.patch(
        `https://glassball-assignment-default-rtdb.firebaseio.com/sheets/${
          dataIndex[i] - 1
        }.json`,
        obj
      );
    }
    setDataIndex([]);
  };

  const addColumnHandler = () => {
    setOpenAddCol(true);
  };

  React.useEffect(() => {
    axios
      .get(
        `https://glassball-assignment-default-rtdb.firebaseio.com/sheets.json`
      )
      .then((res) => {
        setResData(res.data);
        const _data = [];
        _data.push(Object.keys(res.data[0]));

        res.data.forEach((innerArr) => {
          const tahir = [];
          for (const key in innerArr) {
            tahir.push(`${innerArr[key]}`);
          }
          _data.push(tahir);
        });

        setData(_data);
      });
  }, []);

  return (
    <div className="App">
      {openAddCol && (
        <AddColumn
          setResData={setResData}
          resData={resData}
          setOpenAddCol={setOpenAddCol}
        />
      )}
      <div className="btn-container">
        <button className="saveDataBtn" onClick={addColumnHandler}>
          Add Column
        </button>
        <button className="saveDataBtn" onClick={saveHandler}>
          Save
        </button>
      </div>
      <GridSheet Data={Data} setData={setData} setDataIndex={setDataIndex} />
    </div>
  );
}

export default App;
