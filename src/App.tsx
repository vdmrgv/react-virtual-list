import React from 'react';
import './App.css';

interface Props {
  data: number[][],
  rowHeight: number,
  visibleRows: number,
}

const App = ({ data, rowHeight, visibleRows }: Props) => {
  const rootRef = React.useRef();
  const [start, setStart] = React.useState(0);


  const getTopHeight = () => rowHeight * start;

  const getBottomHeight = () => rowHeight * (data.length - (start + visibleRows + 1));

  React.useEffect(() => {
    const onScroll = (e: any) => {
      setStart(Math.min(
        data.length - visibleRows - 1,
        Math.floor(e.target.scrollTop / rowHeight)
      ));
    }
    //@ts-ignore
    rootRef.current.addEventListener('scroll', onScroll);

    return () => {
      //@ts-ignore
      rootRef.current.removeEventListener('scroll', onScroll);
    }
  }, [data.length, visibleRows, rowHeight]);

  return (
    //@ts-ignore
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
