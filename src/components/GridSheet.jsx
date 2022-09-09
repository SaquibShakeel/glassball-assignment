import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

function GridSheet({ Data, setData, setDataIndex }) {
  const parentRef = React.useRef();
  const temp = [];

  const rowVirtualizer = useVirtualizer({
    count: Data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: Data[0].length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 5,
  });

  const HandleEditData = React.useCallback(
    (i, j) => (e) => {
      setData((prev) => {
        prev[i][j] = e.target.value;
        if(!temp.includes(prev.indexOf(prev[i]))){
          temp.push(prev.indexOf(prev[i]));
        }
        setDataIndex(temp);

        return [...prev];
      });
    },
    [setData]
  );

  return (
    <React.Fragment>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: `${columnVirtualizer.totalSize}px`,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: `${columnVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <React.Fragment key={virtualRow.index}>
              {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
                return (
                  <div
                    key={virtualColumn.index}
                    className={
                      virtualColumn.index % 2
                        ? virtualRow.index % 2 === 0
                          ? 'ListItemOdd'
                          : 'ListItemEven'
                        : virtualRow.index % 2
                        ? 'ListItemOdd'
                        : 'ListItemEven'
                    }
                    style={{
                      position: 'absolute',
                      border: '1px solid black',
                      top: 0,
                      left: 0,
                      width: `200px`,
                      height: `100px`,
                      transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <EditText style={{width: '94%', height: '34%'}}
                      value={Data[virtualRow.index][virtualColumn.index]}
                      onChange={HandleEditData(
                        virtualRow.index,
                        virtualColumn.index
                      )}
                    />
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default GridSheet;
