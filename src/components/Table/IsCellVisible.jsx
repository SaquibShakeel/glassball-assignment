import React, { useRef } from "react";
import useOnScreen from "../../hooks/useOnScreen";

function IsCellVisible({ children }) {
  const cellRef = useRef(null);
  const isIntersecting = useOnScreen(cellRef);

  return <div ref={cellRef}>{isIntersecting && children}</div>;
}

export default IsCellVisible;
