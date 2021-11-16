//Import
import React from "react";
import { useParams } from "react-router";
// import { useTranslation } from "react-i18next";
import OrderService from "../../services/order.service.js";

//CSS
import "../../css/page.css";
import "../../css/text.css";

export default function ConfirmOrder(props) {
  const { id, lgs } = useParams();

  const orderItem = async () => {
    let web = "http://localhost:3000/";
    let path = "/home/";

    let items = [];
    items = props.menuOrder.map((item) => {
      return {
        product_id: item.product_id,
        quantity: item.quantity,
        comment: item.comment ? item.comment : null,
      };
    });

    let result = await OrderService.createOrder(items, id);

    if (result.success) {
      localStorage.removeItem("items");
      window.location = web + lgs + path + id;
    } else {
      window.location = web + "invalid";
    }
  };

  return (
    <div id="confirm-order-popup" className="section popup">
      <div className="page-container">
        <div className="section">
          <button onClick={props.back} className="md-text">
            Close
          </button>
          <button className="md-text" onClick={() => orderItem()}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
