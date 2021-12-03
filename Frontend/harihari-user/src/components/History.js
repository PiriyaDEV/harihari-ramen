//Import
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import tableService from "../services/table.service.js";
import orderService from "../services/order.service.js";
import ConfirmPopup from "./popup/ConfirmPopup.js";
import socketIOClient from "socket.io-client";

//CSS
import "../css/page.css";
import "../css/text.css";
import "../css/components/Menu.css";
import "../css/components/History.css";
import "../css/element/languageBtn.css";

//JS
import { getDateTimes, getTimes } from "../utilities/Time"; //import function to get the date time format of the order history.

//Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function History() {
  const { t, i18n } = useTranslation();                 // used for i18n.
  const { id, lgs } = useParams();                      // received uid and languange from the param.
  const [link, setLink] = useState();                   // received uid_table from API.
  const [lg, setLg] = useState(" " + lgs);              // used for change the css of the text.
  const [orderHistory, setOrderHistory] = useState(""); // used to collect the order history information of the user.
  const [cancel, setCancel] = useState(false);          // used for close popup.
  const [orderSelect, setOrderSelect] = useState("");   // used to identify the order information.
  const [orderIndex, setOrderIndex] = useState("");     // used to identify the order that user selected to cancel the order.
  const [socket, setSocket] = useState(null);           // used to set the socket.

  // used to call socket
  useEffect(() => {
    const socketInput = socketIOClient(
      "http://localhost:3030/harihari-customer",
      {
        auth: { id: id },
      }
    );
    setSocket(socketInput);
  }, [id]);

  // used to set orderHistory if socket on
  useEffect(() => {
    if (socket) {
      socket.on("order-history", (orders) => {
        setOrderHistory(orders);
      });
    }
  }, [socket]);

  // used to call function and set change languange.
  useEffect(() => {
    if (!link && !orderHistory) {
      getLink(id);
      getAPIOrderHistory(id);
    }
    i18n.changeLanguage(lgs);
    setLg(" " + lgs);
  }, [i18n, lgs, link, orderHistory, id]);

  // used to change the language of the website.
  const clickChangeLanguage = (lng) => {
    let web = "http://localhost:3000/";
    let path = "/history/";
    window.location = web + lng + path + id;
  };

  // used to change langauge of the order status in history page.
  const orderStatusText = (value) => {
    console.log(lgs)
    if(value === "ordered") {
      if(lgs === "en") {
        return "Ordered"
      }else if(lgs === "th") {
        return "สั่งอาหารแล้ว"
      } else {
        return "順序付けられました"
      }
    }
    if(value === "received") {
      if(lgs === "en") {
        return "Received Ordered"
      } else if(lgs === "th") {
        return "รับออร์เดอร์แล้ว"
      } else {
        return "受注"
      }
    }
    if(value === "cancel") {
      if(lgs === "en") {
        return "Cancel"
      }else if(lgs === "th") {
        return "ยกเลิกอาหาร"
      } else {
        return "食べ物をキャンセルする"
      }
    }
    if(value === "served") {
      if(lgs === "en") {
        return "Served"
      }else if(lgs === "th") {
        return "เสิร์ฟแล้ว"
      } else {
        return "提供"
      }
    }
    if(value === "preparing") {
      if(lgs === "en") {
        return "Preparing Order"
      }else if(lgs === "th") {
        return "กำลังทำอาหาร"
      } else {
        return "注文の準備"
      }
    }
    if(value === "serving") {
      if(lgs === "en") {
        return "Serving"
      }else if(lgs === "th") {
        return "กำลังเสิร์ฟ"
      } else {
        return "サービング"
      }
    }
  };

  // This function used to call api and set uid_table
  const getLink = async (id) => {
    await tableService.getTableById(id).then((data) => setLink(data));
  };

  // This function used to call api and set information of orderHistory
  const getAPIOrderHistory = async (id) => {
    await orderService
      .getOrderHistory(id)
      .then((data) => setOrderHistory(data));
  };

  // This function used to calculate a subtotal of the order.
  // it will return the subtotal of the order.
  const subTotal = (order, custom) => {
    var tempSum = 0;
    if (order) {
      for (let i = 0; i < order.length; i++) {
        tempSum = tempSum + order[i].quantity * order[i].price;
      }
    }
    if (custom) {
      for (let i = 0; i < custom.length; i++) {
        tempSum = tempSum + custom[i].quantity * custom[i].price;
      }
    }
    return tempSum;
  };

  //used to close the confirmation popup and cancel the selected order.
  const cancelClick = (toggle, orderId, index) => {
    setCancel(toggle);
    setOrderSelect(orderId);
    setOrderIndex(index);
  };

  return (
    <div>
      {cancel && (
        <ConfirmPopup
          cancel={cancelClick}
          order={orderSelect}
          orderIndex={orderIndex}
          page="history"
        />
      )}
      <div id="history" className="section">
        <div id="history-container" className="page-container">
          <div id="menu-header-container" className="section">
            <div className="section">
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="menu-header fa"
                onClick={() => linkToHome(id, lgs)}
              />
              <h1 className={"menu-header" + lg}>{t("history.title")}</h1>
            </div>

            <div id="table-box">
              <h1 className="bracket">{t("table")}</h1>
              {link && <h1 className="md-text">{link.table_id}</h1>}
              <div className="lg-box">
                <div className="lg-text section">
                  {lg === " en" ? (
                    <p
                      className="bracket"
                      onClick={() => clickChangeLanguage("th")}
                    >
                      TH
                    </p>
                  ) : (
                    <p
                      className="bracket"
                      onClick={() => clickChangeLanguage("en")}
                    >
                      EN
                    </p>
                  )}
                  <p className="bracket slash">|</p>
                  <p
                    className="bracket"
                    onClick={() => clickChangeLanguage("jp")}
                  >
                    JP
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div id="history-list">
            {orderHistory &&
              orderHistory.map((history, order) => (
                <div>
                  <div className="history-header">
                    <div>
                      <h1 className={"md-text" + lg}>
                        {t("history.order")} {history.order_id}
                      </h1>
                      <h1 className="sm-text k2d history-price">
                        ฿{" "}
                        {(
                          subTotal(history.menus, history.custom) +
                          subTotal(history.menus, history.custom) * 0.07
                        ).toFixed(2)}
                      </h1>
                    </div>
                    <div>
                      <h1 className="bracket header-blue-text date-pc">
                        {getDateTimes(history.created_at)}
                      </h1>
                      <h1 className="bracket header-blue-text date-mb">
                        {getTimes(history.created_at)}
                      </h1>
                      <h1 className="bracket header-blue-text status">
                        {orderStatusText(history.status)}
                      </h1>
                    </div>
                  </div>

                  <div className="history-info">
                    <div>
                      <div className="history-box">
                        {history &&
                          history.menus.map((element, i) => (
                            <div className="history-menu" key={i}>
                              <div className="basket-name">
                                <h1 className="md-text basket-no">
                                  X{element.quantity}
                                </h1>
                                <div>
                                  <h1 className={"sm-text menu-name" + lg}>
                                    {lgs === "th" && <span>{element.th}</span>}
                                    {lgs === "en" && <span>{element.en}</span>}
                                    {lgs === "jp" && <span>{element.jp}</span>}
                                  </h1>
                                  <h1 className="bracket">{element.comment}</h1>
                                </div>
                              </div>
                              <div>
                                <h1 className="sm-text k2d">
                                  {element.price.toFixed(2)}
                                </h1>
                              </div>
                            </div>
                          ))}
                        {history &&
                          history.custom.map((element, i) => (
                            <div className="history-menu" key={i}>
                              <div className="basket-name">
                                <h1 className="md-text basket-no">
                                  X{element.quantity}
                                </h1>
                                <div>
                                  <h1 className={"sm-text menu-name" + lg}>
                                    {lgs === "th" && (
                                      <span>ราเมงตามใจท่าน</span>
                                    )}
                                    {lgs === "en" && <span>Custom Ramen</span>}
                                    {lgs === "jp" && <span>Japanese Name</span>}
                                  </h1>
                                  <h1 className="bracket">{element.comment}</h1>
                                  {element !== null && (
                                    <h1 className="xm-text custom-gray">
                                      {lgs === "en" ? (
                                        <span>
                                          {element.en.soup_type},
                                          {element.en.noodle},
                                          {element.en.spring_onion},
                                          {element.en.garlic},{element.en.spice}
                                          ,{element.en.chashu},
                                          {element.en.richness}
                                        </span>
                                      ) : lgs === "th" ? (
                                        <span>
                                          {element.th.soup_type},
                                          {element.th.noodle},
                                          {element.th.spring_onion},
                                          {element.th.garlic},{element.th.spice}
                                          ,{element.th.chashu},
                                          {element.th.richness}
                                        </span>
                                      ) : (
                                        <span>
                                          {element.jp.soup_type},
                                          {element.jp.noodle},
                                          {element.jp.spring_onion},
                                          {element.jp.garlic},{element.jp.spice}
                                          ,{element.jp.chashu},
                                          {element.jp.richness}
                                        </span>
                                      )}
                                    </h1>
                                  )}
                                </div>
                              </div>
                              <div>
                                <h1 className="sm-text k2d">
                                  {element.price.toFixed(2)}
                                </h1>
                              </div>
                            </div>
                          ))}
                      </div>
                      <hr className="hr-black"></hr>
                      <div className="history-price-menu">
                        <h1 className={"sm-text menu-name" + lg}>
                          {t("basket.subtotal")}
                        </h1>
                        {history && (
                          <h1 className="sm-text k2d">
                            {subTotal(history.menus, history.custom).toFixed(2)}
                          </h1>
                        )}
                      </div>
                      <div className="history-price-menu">
                        <h1 className={"sm-text menu-name" + lg}>
                          {t("basket.VAT")} 7%
                        </h1>
                        {history && (
                          <h1 className="sm-text k2d">
                            {(
                              subTotal(history.menus, history.custom) * 0.07
                            ).toFixed(2)}
                          </h1>
                        )}
                      </div>
                      <div className="history-price-menu total">
                        <h1 className={"sm-text menu-name" + lg}>
                          {t("basket.total")}
                        </h1>
                        {history && (
                          <h1 className="sm-text k2d">
                            ฿{" "}
                            {(
                              subTotal(history.menus, history.custom) +
                              subTotal(history.menus, history.custom) * 0.07
                            ).toFixed(2)}
                          </h1>
                        )}
                      </div>

                      {history && history.status !== "ordered" ? (
                        <button
                          className={"cancel-btn disable section md-text" + lg}
                        >
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="close-fa"
                          />
                          <span>{t("history.cancel")}</span>
                        </button>
                      ) : (
                        <button
                          className={"cancel-btn section md-text" + lg}
                          onClick={() => {
                            cancelClick(true, history.order_id, order);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="close-fa"
                          />
                          <span>{t("history.cancel")}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

//This function used to move the user to the Homepage with the user uid.
let linkToHome = (value, lgs) => {
  let web = "http://localhost:3000/";
  let path = "/home/";
  window.location = web + lgs + path + value;
};
