//Import
import React, { useState, useEffect } from "react";
// import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
// import { useTranslation } from "react-i18next";
import billService from "../../services/bill.service.js";

//CSS
import "../../css/page.css";
import "../../css/text.css";
import "../../css/element/bill.css";

export default function ConfirmOrder(props) {
  const { id } = useParams();
  const [billId, setBillId] = useState();

  useEffect(() => {
    if (!billId) getBill(id);
  }, [billId, id]);

  // function confirmPayment() {
  //   window.location = "http://localhost:3000/success";
  // }

  function makeQR(guest, bill) {
    let qrlink =
      "https://chart.googleapis.com/chart?cht=qr&chl=" +
      guest +
      "$" +
      bill +
      "&chs=160x160&chld=L|0";

    return qrlink;
  }

  const getBill = async (id) => {
    await billService.summary(id).then((data) => setBillId(data.bill.uid));
  };

  return (
    <div id="bill-popup" className="section popup">
      <div className="page-container">
        <div className="section">
          <h1>This is Bill</h1>

          {billId && (
            <img className="qr-code" src={makeQR(id, billId)} alt=""></img>
          )}

          <button onClick={() => props.toggle(false)} className="md-text">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
