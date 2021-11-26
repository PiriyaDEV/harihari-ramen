//Import
import React,{useState,useEffect} from "react";
// import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import OrderService from "../../services/order.service.js";
import { useTranslation } from "react-i18next";

//CSS
import "../../css/page.css";
import "../../css/text.css";
import "../../css/element/confirmPopup.css";

//Image
import closeImg from "../../images/icon/Cancel Icon.svg";
import checkImg from "../../images/icon/Check Icon.png";

export default function ConfirmOrder(props) {
  const { id, lgs } = useParams();
  const [lg, setLg] = useState(" " + lgs);
  const { t } = useTranslation();

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

  useEffect(() => {
    setLg(" " + lgs);
  }, [lgs]);

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
                <h1 className={"menu-header"+ lg }>{t("popup.history.header")}</h1>
              </div>
            ) :  props.page === "menu" ? (
              <div className="confirm-header">
                <img className="close-img" src={checkImg} alt="" />
                <h1 className={"menu-header"+ lg }>{t("popup.menu.header")}</h1>
              </div>
            ) : props.page === "checkout" ? (
              <div className="confirm-header">
                <img className="close-img" src={checkImg} alt="" />
                <h1 className={"menu-header"+ lg }>{t("popup.checkout.header")}</h1>
              </div>
            ) : (
              <div className="confirm-header">
                <img className="close-img" src={closeImg} alt="" />
                <h1 className={"menu-header"+ lg }>{t("popup.alert.header")}</h1>
              </div>
            )}
          </div>
          <p className={"sm-text popup-p"+ lg}>
          {props.page === "history" ? (
            <span>
              {t("popup.history.text.1")}{" "}
              <span className={"order-red" + lg}>{t("history.order")} {props.orderIndex + 1}</span>{t("popup.history.text.2")}
            </span> ) : props.page === "menu" ? (
            <span>
              {t("popup.menu.text")}
            </span> 
            ) : props.page === "checkout" ? (
            <span>
             {t("popup.checkout.text")}
            </span> ) : (
            <span>
              {t("popup.alert.text")}
            </span>
            )
          }
          </p>
          <div className="popup-btn-section section">
            <button
              className={"md-text popup-btn-white" + lg}
              onClick={() => props.cancel(false)}
            >
              {t("popup.button.back")}
            </button> 
            {props.page === "history" ? (
            <button className={"md-text popup-btn-red"+ lg} onClick={()=> cancelOrder(props.order)}>{t("popup.button.confirm")}</button> 
            ) : props.page === "menu" ? (
            <button className={"md-text popup-btn-red"+ lg} onClick={() => orderItem()}>{t("popup.button.confirm")}</button> 
            ) : props.page === "checkout" && (
            <button className={"md-text popup-btn-red"+ lg} onClick={() => linkToHome(id,props.uid, lgs, "/bill/")}>{t("popup.button.confirm")}</button> 
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