import "../css/page.css";
import "../css/TableQR.css";
// import { Link } from "react-router-dom";

function TableQR() {
  const link = ["www.google.com", "www.youtube.com" , "https://sebastiandedeyne.com/react-for-vue-developers/", "www.youtube.com" ,"www.google.com", "www.youtube.com"];
  return (
    <div id="table-qr" class="section">
      <div class="page-container">
        <h1>Test</h1>
        {link.map((index) => (
          <div>
            <h1>{index}</h1>
            <img class="qr-code" src={makeQR(index)} alt=""></img>
          </div>
        ))}
      </div>
    </div>
  );
}

function makeQR(value) {
  let qrlink =
    "https://chart.googleapis.com/chart?cht=qr&chl=" +
    value +
    "&chs=160x160&chld=L|0";

  return qrlink;
}

export default TableQR;
