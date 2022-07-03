import React, { useRef, useState, useEffect } from 'react';
import './App.css';

interface Props {
  data: number[][],
  rowHeight: number,
  visibleRows: number,
}

const App = ({ data, rowHeight, visibleRows }: Props) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [start, setStart] = useState(0);


  const getTopHeight = () => rowHeight * start;

  const getBottomHeight = () => rowHeight * (data.length - (start + visibleRows + 1));

  useEffect(() => {
    const onScroll = (e: any) => {
      setStart(Math.min(
        data.length - visibleRows - 1,
        Math.floor(e.target.scrollTop / rowHeight)
      ));
    }
    rootRef.current?.addEventListener('scroll', onScroll);

    return () => {
      rootRef.current?.removeEventListener('scroll', onScroll);
    }
  }, [data.length, visibleRows, rowHeight]);

  return (
    <div style={{ height: rowHeight * visibleRows + 1, overflow: 'auto' }} ref={rootRef}>
      <div style={{ height: getTopHeight() }} />
      <table>
        <tbody>
          {data.slice(start, start + visibleRows + 1).map((row, rowIndex) => (
            <tr
              style={{ height: rowHeight }}
              key={start + rowIndex}
            >{row.map((text, colIndex) => (
              <td key={start + '' + rowIndex + colIndex}>{text}</td>
            ))}</tr>
          ))}
        </tbody>
      </table>
      <div style={{ height: getBottomHeight() }} />
    </div>
  )
}

export default App;
