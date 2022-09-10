import './App.css';
import React from 'react';
import ReactSheets from './components/ReactSheets';
import SpreadsheetExample from './components/SpreadsheetExample';
import { SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet";
import GridSheet from './components/GridSheet';
import axios from 'axios';


function App() {


  const [Data, setData] = React.useState([[]]);

  const [dataIndex, setDataIndex] = React.useState([]);
  // const temp = [];

  const saveHandler = async () => {
    for(let i = 0; i < dataIndex.length; i++){
      const response = await axios.patch(
        `https://glassball-assignment-default-rtdb.firebaseio.com/sheets/${dataIndex[i]-1}.json`,
        {
          Date: Data[dataIndex[i]][0].toString(),
          USD: Data[dataIndex[i]][1].toString(),
        }
      );
    }
    setDataIndex([]);
  }

  React.useEffect(() => {
    axios.get(`https://glassball-assignment-default-rtdb.firebaseio.com/sheets.json`).then(res => {

      const _data = [];
      _data.push(Object.keys(res.data[0]));

      res.data.forEach(innerArr => {
        const tahir = [];
        for(const key in innerArr){
          tahir.push(`${innerArr[key]}`)
        }
        _data.push(tahir);
      });
      
      setData(_data);
    });
  }, []);

  
  

  return (
    <div className="App">
      {/* <SpreadsheetExample /> */}
      <button className='saveDataBtn' onClick={saveHandler}>Save</button>
      <GridSheet Data={Data} setData={setData} setDataIndex={setDataIndex} />
      {/* <SpreadsheetComponent /> */}
      {/* <ReactSheets /> */}
    </div>
  );
}

export default App;
