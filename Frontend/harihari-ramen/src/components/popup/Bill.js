//Import
import React from "react";
// import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
// import { useTranslation } from "react-i18next";
// import OrderService from "../../services/order.service.js";

//CSS
import "../../css/page.css";
import "../../css/text.css";
import "../../css/element/bill.css";

export default function ConfirmOrder(props) {
  const { id } = useParams();

  function confirmPayment() {
    window.location = "http://localhost:3000/success";
  }

  function makeQR(value) {
    let qrlink = "https://chart.googleapis.com/chart?cht=qr&chl=" + value + "&chs=160x160&chld=L|0";

    return qrlink;
  }

  return (
    <div id="bill-popup" className="section popup">
      <div className="page-container">
        <div className="section">
          <h1>This is Bill</h1>

          <img className="qr-code" src={makeQR(id)} alt=""></img>

          <button onClick={() => confirmPayment()} className="md-text">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
