import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import tableService from "../services/table.service.js";
import orderService from "../services/order.service.js";
import ConfirmPopup from "./popup/ConfirmPopup.js";

//CSS
import "../css/page.css";
import "../css/text.css";
import "../css/components/Menu.css";
import "../css/components/History.css";
import "../css/element/languageBtn.css";

//JS
import { getDateTimes } from "../utilities/Time";

//Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function History() {
  const { t, i18n } = useTranslation();
  const { id, lgs } = useParams();
  const [link, setLink] = useState();
  const [lg, setLg] = useState(" " + lgs);
  const [orderHistory, setOrderHistory] = useState("");
  const [cancel, setCancel] = useState(false);
  const [orderSelect, setOrderSelect] = useState("");
  const [orderIndex, setOrderIndex] = useState("");

  useEffect(() => {
    if (!link && !orderHistory) {
      getLink();
      getAPIOrderHistory(id);
    }
    i18n.changeLanguage(lgs);
    setLg(" " + lgs);
  }, [i18n, lgs, link, orderHistory, id]);

  let numTable = useState(0);

  numTable = CheckTable(link, id);
  CheckHaveTable(numTable, link);

  const clickChangeLanguage = (lng) => {
    let web = "http://localhost:3000/";
    let path = "/history/";
    window.location = web + lng + path + id;
  };

  const getLink = async () => {
    await tableService.getTables().then((data) => setLink(data));
  };

  const getAPIOrderHistory = async (id) => {
    await orderService
      .getOrderHistory(id)
      .then((data) =>
        setOrderHistory(
          data.filter(
            (order) => order.status !== "served" && order.status !== "cancel"
          )
        )
      );
  };

  const subTotal = (order) => {
    var tempSum = 0;
    for (let i = 0; i < order.length; i++) {
      tempSum = tempSum + order[i].quantity * order[i].price;
    }
    return tempSum;
  };

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
              <h1 className={"menu-header" + lg}>
                {t("orderHistory.1")} {t("orderHistory.2")}
              </h1>
            </div>

            <div id="table-box">
              <h1 className="bracket">{t("table")}</h1>
              <h1 className="md-text">{numTable}</h1>
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
                <div key={order}>
                  <div className="history-header">
                    <div>
                      <h1 className={"md-text" + lg}>
                        {t("history.order")} {order + 1}
                      </h1>
                      <h1 className="sm-text k2d history-price">
                        ฿{" "}
                        {(
                          subTotal(history.menus) +
                          subTotal(history.menus) * 0.07
                        ).toFixed(2)}
                      </h1>
                    </div>
                    <div>
                      <h1 className="bracket header-blue-text">
                        {getDateTimes(history.created_at)}
                      </h1>
                      <h1 className="bracket header-blue-text status">
                        {history.status}
                      </h1>
                    </div>
                  </div>

                  <div className="history-info">
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
                    </div>
                    <hr className="hr-black"></hr>
                    <div className="history-price-menu">
                      <h1 className={"sm-text menu-name" + lg}>
                        {t("basket.subtotal")}
                      </h1>
                      <h1 className="sm-text k2d">
                        {subTotal(history.menus).toFixed(2)}
                      </h1>
                    </div>
                    <div className="history-price-menu">
                      <h1 className={"sm-text menu-name" + lg}>
                        {t("basket.VAT")} 7%
                      </h1>
                      <h1 className="sm-text k2d">
                        {(subTotal(history.menus) * 0.07).toFixed(2)}
                      </h1>
                    </div>
                    <div className="history-price-menu total">
                      <h1 className={"sm-text menu-name" + lg}>
                        {t("basket.total")}
                      </h1>
                      <h1 className="sm-text k2d">
                        ฿{" "}
                        {(
                          subTotal(history.menus) +
                          subTotal(history.menus) * 0.07
                        ).toFixed(2)}
                      </h1>
                    </div>

                    {history.status !== "ordered" ? (
                      <button
                        className={"cancel-btn disable section md-text" + lg}
                      >
                        <FontAwesomeIcon icon={faTimes} className="close-fa" />
                        <span>{t("history.cancel")}</span>
                      </button>
                    ) : (
                      <button
                        className={"cancel-btn section md-text" + lg}
                        onClick={() => {
                          cancelClick(true, history.order_id, order);
                        }}
                      >
                        <FontAwesomeIcon icon={faTimes} className="close-fa" />
                        <span>{t("history.cancel")}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

let linkToHome = (value, lgs) => {
  let web = "http://localhost:3000/";
  let path = "/home/";
  window.location = web + lgs + path + value;
};

function CheckTable(link, id) {
  for (const index in link) {
    if (link[index].guest_uid === id) {
      return link[index].table_id;
    }
  }
}

function CheckHaveTable(numTable, link) {
  if (!numTable && link) {
    window.location = "http://localhost:3000/invalid";
  }
}
