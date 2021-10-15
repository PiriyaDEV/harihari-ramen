import React from "react";

import "../css/page.css";
import "../css/TableQR.css"
// import { Link } from "react-router-dom";

export default function TableQR() {
  const link = [
    "table1uid",
    "table2uid",
    "table3uid",
    "table4uid",
    "table5uid",
    "table6uid",
  ];

  return (
    <div id="table-qr" className="section">
      <div className="page-container">
        <h1>Test</h1>
        {link.map((index) => (
          <div key={index}>
            <h1 onClick={() => openLink(index)}>{index}</h1>
            <img className="qr-code" src={makeQR(index)} alt=""></img>
          </div>
        ))}
      </div>
    </div>
  );
}

function makeQR(value) {
  let web = "http://localhost:3000/";
  let qrlink =
    "https://chart.googleapis.com/chart?cht=qr&chl=" +
    web +
    "order/" +
    value +
    "&chs=160x160&chld=L|0";

  return qrlink;
}

let openLink = (value) => {
  let web = "http://localhost:3000/";
  let path = web + "order/" + value;
  window.location = path;
};

// function clickQR(value) {
//   let web = "http://localhost:3000/";
//   let path = web + "order?table=" + value;
//   return window.location = path;
// }
