import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const makeTableData = (w: number, h: number) => new Array(h).fill(0).map((_, row) =>
  new Array(w).fill(0).map((_, col) => row * 10 + col));

ReactDOM.render(
  <React.StrictMode>
    <App
      data={makeTableData(5, 10000)}
      rowHeight={40}
      visibleRows={3}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
