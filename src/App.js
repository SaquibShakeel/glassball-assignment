import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import GridSheet from "./components/GridSheet";
import axios from "axios";
import AddColumn from "./components/AddColumn";
import Backdrop from "./components/Backdrop";

function App() {
  const [resData, setResData] = React.useState([]);
  const [sheetData, setSheetData] = React.useState([[]]);

  const [dataIndex, setDataIndex] = React.useState([]);
  const [openAddCol, setOpenAddCol] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const saveHandler = async () => {
    setIsLoading(true);
    for (let i = 0; i < dataIndex.length; i++) {
      const obj = resData[dataIndex[i] - 1];
      console.log(obj);
      await axios.patch(
        `https://glassball-assignment-default-rtdb.firebaseio.com/sheets/${
          dataIndex[i] - 1
        }.json`,
        obj
      );
    }
    setDataIndex([]);
    setIsLoading(false);
    alert("Data Saved");
  };
  // console.log(dataIndex);

  const addColumnHandler = () => {
    setOpenAddCol(true);
  };

  React.useEffect(() => {
    setIsLoading(true);
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
            if (typeof innerArr[key] === "object") {
              tahir.push(innerArr[key].type);
            } else {
              tahir.push(`${innerArr[key]}`);
            }
          }
          _data.push(tahir);
        });

        setSheetData(_data);
      });
    setIsLoading(false);
  }, []);

  return (
    <div className="App">
      {(openAddCol || isLoading) &&
        ReactDOM.createPortal(
          <Backdrop setOpenAddCol={setOpenAddCol} />,
          document.getElementById("backdrop-root")
        )}
      {isLoading && (
        <h1
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "yellow",
            fontWeight: "600",
            textAlign: "center",
            zIndex: "99999",
          }}
        >
          Loading...
        </h1>
      )}
      {openAddCol &&
        ReactDOM.createPortal(
          <AddColumn
            setResData={setResData}
            resData={resData}
            setOpenAddCol={setOpenAddCol}
            setIsLoading={setIsLoading}
          />,
          document.getElementById("modal-root")
        )}
      <div className="btn-container">
        <button className="saveDataBtn" onClick={addColumnHandler}>
          Add Column
        </button>
        <button className="saveDataBtn" onClick={saveHandler}>
          Save
        </button>
      </div>
      <GridSheet
        Data={sheetData}
        setData={setSheetData}
        resData={resData}
        setDataIndex={setDataIndex}
        setResData={setResData}
        dataIndex={dataIndex}
      />
    </div>
  );
}

export default App;
