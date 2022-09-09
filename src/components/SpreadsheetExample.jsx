import React, { useState, useEffect } from 'react'
import {CellSelector, Spreadsheet} from 'virtual-spreadsheet'
import axios from 'axios';

function SpreadsheetExample () {
  /*
   *  The csv prop passed to spreadsheet should use commas to delimit columns and
   *  newline to delimit rows. (TODO: add custom delimiters)
   */
  const [csv, setCSV] = useState("hi,mom\ni'm,on tv!")

  /* Do any state updates you need by passing a function to the onUpdate prop */
  const processUpdate = (coordinate, newVal, cells) => {
    console.log({newVal})
    console.log({cells})
    cells[coordinate.row][coordinate.col] = newVal
  }

  useEffect(() => {
    axios.get(`https://api.glassball.app/mediafiles/user_1/CDoc%201_6c1e50/1_XLSX_upload/USDINR_FY20152021.xlsx`).then(res => {
      console.log(res.data);
      setCSV(res.data);
    });
  }, []);

  return (
    <React.Fragment>
      <Spreadsheet
        csv={csv}
        height='70vh'
        width='95vw'
        firstRowHeaders={true}
        onCellUpdate={processUpdate}

        cellWidth='auto'
        cellHeight={25}
        cellFont='18px Arial'

        rowHeaderStyle={{ color: '#ffffff', background: '#0077cc' }}
        columnHeaderStyle={{ color: '#ffffff', background: '#0077cc' }}
        cellStyle={{ color: '#000000', background: '#ffffff' }}
        activeCellStyle={{ color: '#ffffff', background: '#33aaff' }}
      />
    </React.Fragment>
  )
}

export default SpreadsheetExample;