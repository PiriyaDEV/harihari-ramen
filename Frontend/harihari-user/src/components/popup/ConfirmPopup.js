//Import
import React from "react";
// import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import OrderService from "../../services/order.service.js";

//CSS
import "../../css/page.css";
import "../../css/text.css";
import "../../css/element/confirmPopup.css";

//Image
import closeImg from "../../images/icon/Cancel Icon.svg";
import checkImg from "../../images/icon/Check Icon.png";

export default function ConfirmOrder(props) {
  const { id, lgs } = useParams();

  const orderItem = async () => {
    let web = "http://localhost:3000/";
    let path = "/home/";

    let items = [];
    if(props.menuOrder) {
      items = props.menuOrder.map((item) => {
        return {
          product_id: item.product_id,
          quantity: item.quantity,
          comment: item.comment ? item.comment : null,
        };
      });
    }
    
    props.menuCustom.forEach(custom => {
      delete custom.images
    });

    let result = await OrderService.createOrder(items, props.menuCustom, id);

    if (result.success) {
      localStorage.removeItem("items");
      localStorage.removeItem("customRamen");
      window.location = web + lgs + path + id;
    } else {
      window.location = web + "invalid";
    }
  };

  const cancelOrder = async(orderId) => {
    let web = "http://localhost:3000/";
    let path = "/history/";

    let result = await OrderService.cancelOrder(orderId ,id);

    if (result.success) {
      window.location = web + lgs + path + id;
    } else {
      window.location = web + "invalid";
    }
  }

  return (
    <div id="confirm-popup" className="section popup">
      <div className="page-container section">
        <div id="confirm-box">
          <div>
            {props.page === "history" ? (
              <div className="confirm-header">
                <img className="close-img" src={closeImg} alt="" />
                <h1 className="menu-header">Cancel Order</h1>
              </div>
            ) :  props.page === "menu" ? (
              <div className="confirm-header">
                <img className="close-img" src={checkImg} alt="" />
                <h1 className="menu-header">Confirm Order</h1>
              </div>
            ) : props.page === "checkout" ? (
              <div className="confirm-header">
                <img className="close-img" src={checkImg} alt="" />
                <h1 className="menu-header">Check Out</h1>
              </div>
            ) : (
              <div className="confirm-header">
                <img className="close-img" src={closeImg} alt="" />
                <h1 className="menu-header">Alert</h1>
              </div>
            )}
          </div>
          <p className="sm-text popup-p">
          {props.page === "history" ? (
            <span>
              Do you confirm to cancel{" "}
              <span className="order-red">order {props.orderIndex + 1}</span>? You cannot undo this
              action.
            </span> ) : props.page === "menu" ? (
            <span>
              Do you want to confirm basket or not? You cannot undo this action.
            </span> 
            ) : props.page === "checkout" ? (
            <span>
              Do you want to check out or not?
            </span> ) : (
            <span>
              You can't check out, because the food has not yet been served
            </span>
            )
          }
          </p>
          <div className="popup-btn-section section">
            <button
              className="md-text popup-btn-white"
              onClick={() => props.cancel(false)}
            >
              Back
            </button> 
            {props.page === "history" ? (
            <button className="md-text popup-btn-red" onClick={()=> cancelOrder(props.order)}>Confirm</button> 
            ) : props.page === "menu" ? (
            <button className="md-text popup-btn-red" onClick={() => orderItem()}>Confirm</button> 
            ) : props.page === "checkout" && (
            <button className="md-text popup-btn-red" onClick={() => linkToHome(id,props.uid, lgs, "/bill/")}>Confirm</button> 
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

let linkToHome = (id,uid, lgs, path) => {
  let web = "http://localhost:3000/";
  window.location = web + lgs + path + id + "$" + uid;
};
