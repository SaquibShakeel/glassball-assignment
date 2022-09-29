import "./App.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import GridSheet from "./components/GridSheet";
import axios from "axios";
import AddColumn from "./components/AddColumn";
import Backdrop from "./components/Backdrop";
import HomePage from "./components/HomePage";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./firebase-config";
import { logout } from "./components/store/AuthSlice";
import { signOut } from "firebase/auth";
import useGridSheet from "./hooks/useGridSheet";

function App() {
  const [resData, setResData] = React.useState([]);
  const [GridSheetData, GridSheetHandler] = useGridSheet();
  const [openAddCol, setOpenAddCol] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const Email = useSelector((state) => state.auth.user.email);
  const dispatch = useDispatch();

  const addColumnHandler = () => {
    setOpenAddCol(true);
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
    console.log("User logged out");
  };

  React.useEffect(() => {
    setIsLoading(true);
    GridSheetHandler.fetchColumns().then(() => {
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GridSheetHandler.fetchColumns]);

  console.log(GridSheetData);

  if (!Email) {
    return (
      <div className="App">
        <HomePage />
      </div>
    );
  }

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
          }}>
          Loading...
        </h1>
      )}
      {openAddCol &&
        ReactDOM.createPortal(
          <AddColumn
            setOpenAddCol={setOpenAddCol}
            setIsLoading={setIsLoading}
            onSubmit={GridSheetHandler.addColumn}
          />,
          document.getElementById("modal-root")
        )}
      <div className="btn-container">
        <button className="saveDataBtn" onClick={addColumnHandler}>
          Add Column
        </button>
        <button className="saveDataBtn" onClick={GridSheetHandler.saveHandler}>
          Save
        </button>
        <button className="saveDataBtn" onClick={handleLogout}>
          Logout {`(${Email})`}
        </button>
      </div>
      <GridSheet
        Columns={GridSheetData.sheetColumns}
        Data={GridSheetData.sheetData}
        updateColumns={() => {}}
        updateData={GridSheetHandler.updateData}
      />
    </div>
  );
}

export default App;
