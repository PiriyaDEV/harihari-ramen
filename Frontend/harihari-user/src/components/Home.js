//Import
import React, { useState, useEffect, useLayoutEffect } from "react";
import tableService from "../services/table.service.js";
import orderService from "../services/order.service.js";
import ConfirmPopup from "./popup/ConfirmPopup.js";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import socketIOClient from "socket.io-client";
import BillService from "../services/bill.service.js";

//CSS
import "../css/page.css";
import "../css/text.css";
import "../css/components/Home.css";
import "../css/element/progressBar.css";
import "../css/element/languageBtn.css";

//Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

//JS
import { getTimes } from "../utilities/Time"; //import function to get the date time format of the home page.

//Image
import RamenPic from "../images/Mini Logo.png";

export default function Home() {
  const { id, lgs } = useParams(); // received uid and languange from the param.
  const [width, setWidth] = useState(0); // used to set the width of the order status ball.
  const intermediaryBalls = 2; // used to initial the order status ball.
  const calculatedWidth = (width / (intermediaryBalls + 1)) * 100; // used to calculate a width of the order status ball.
  const { t, i18n } = useTranslation(); // used for i18n.
  const [link, setLink] = useState(); // received uid_table from API.
  const [orderHistory, setOrderHistory] = useState(""); // used to collect the order history information of the user.
  const [callWaiter, setWaiter] = useState(false); // used to set css button of call waiter
  const [lg, setLg] = useState(" " + lgs); // used for change the css of the text.
  const [alertPopup, setAlert] = useState(false); // used to check alert and close popup.
  const [checkOut, setCheckOut] = useState(""); // received uid_bill and information of the bill from API
  const [socket, setSocket] = useState(null); // used to set the socket.
  const [checkHistory, setChectHistory] = useState(); // used to collect all of the order history information.
  const [text, setText] = useState(); // used to set order text.

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
        setOrderHistory(
          orders.filter(
            (order) => order.status !== "served" && order.status !== "cancel"
          )
        );
        setChectHistory(orders);
      });
    }
  }, [socket]);

  // used to set callWaiter if socket on
  useEffect(() => {
    if (socket) {
      socket.on("call-waiter", (newValue) => {
        setLink((link) => ({ ...link, call_waiter: newValue }));
        setWaiter(newValue);
      });
    }
  }, [link, socket]);

  // used to call api and set uid_table
  const getLink = async (id) => {
    await tableService.getTableById(id).then((data) => setLink(data));
  };

  // used to get uid + bill id of the table to create a unique path that avoid user to entered this page.
  const getAPIBill = async (id) => {
    await BillService.summary(id).then((data) => setCheckOut(data));
  };

  // used to get the order list from the database.
  const getAPIOrderHistory = async (id) => {
    await orderService.getOrderHistory(id).then((data) => {
      setOrderHistory(
        data.filter(
          (order) => order.status !== "served" && order.status !== "cancel"
        )
      );
      setChectHistory(data);
    });
  };

  // used to call function and set change languange.
  useEffect(() => {
    if (!link && !orderHistory && !checkOut) {
      getLink(id);
      getAPIOrderHistory(id);
      getAPIBill(id);
    }
    i18n.changeLanguage(lgs);
    setLg(" " + lgs);
    if (link) {
      if (link.call_waiter) {
        setWaiter(true);
      }
    }
  }, [i18n, lgs, link, orderHistory, id, checkOut]);

  // used to set width before render.
  useLayoutEffect(() => {
    if (orderHistory.length > 0) {
      let oldestOrder = orderHistory[0];
      //Status Order: 0 is Order, 1 is Received Order, 2 is Prepare, 3 is Served
      if (oldestOrder.status === "ordered") setWidth(0);
      else if (oldestOrder.status === "received") setWidth(1);
      else if (oldestOrder.status === "preparing") setWidth(2);
      else if (oldestOrder.status === "serving") setWidth(3);
    } else {
      setWidth(-1);
    }
  }, [orderHistory]);

  // used to change the language of the website.
  const clickChangeLanguage = (lng) => {
    let web = "http://localhost:3000/";
    let path = "/home/";
    window.location = web + lng + path + id;
  };

  // used to change langauge of the order status in home page.
  const [orderStatusText] = useState({
    en: ["Ordered", "Received Order", "Preparing Order", "Serving"],
    th: ["สั่งอาหารแล้ว", "รับออร์เดอร์แล้ว", "กำลังทำอาหาร", "กำลังเสิร์ฟ"],
    jp: ["順序付けられました", "受注", "注文の準備", "サービング"],
  });

  // used to call a waiter.
  const callWaiterClick = async () => {
    if (!link.call_waiter) {
      await tableService.callWaiter(id);
    }
  };

  //used to show to alert box if user entered the choice with invalid condition.
  const getTextToAlert = (value) => {
    setText(value);
    setAlert(true);
  };

  //used to close the alert and confirmation popup.
  const cancelClick = (toggle) => {
    setAlert(toggle);
  };

  // this function used to show the order status ball in the order status section.
  const timeLineBalls = (n, current, text) =>
    Array(n)
      .fill(0)
      //use an index to change the bar.
      .map((i, index) => (
        <div id="tl-ball" key={index}>
          <div
            className={`timeline__ball ${current > index ? "active" : null} ${
              current === index ? "ongoing" : null
            }`}
          ></div>
          <h1 className={"pg-text bracket" + lg}>
            {lgs === "th" && <span>{text.th[index]}</span>}
            {lgs === "en" && <span>{text.en[index]}</span>}
            {lgs === "jp" && <span>{text.jp[index]}</span>}
          </h1>
        </div>
      ));

  return (
    <div>
      {alertPopup && (
        <ConfirmPopup cancel={cancelClick} text={text} page="home" />
      )}
      <div id="home" className="section">
        <div id="home-container" className="page-container">
          <div>
            <div id="table-box">
              <div className="lg-box">
                <div className="lg-text section">
                  {lg === " en" ? (
                    <p
                      className="ssm-text"
                      onClick={() => clickChangeLanguage("th")}
                    >
                      TH
                    </p>
                  ) : (
                    <p
                      className="ssm-text"
                      onClick={() => clickChangeLanguage("en")}
                    >
                      EN
                    </p>
                  )}
                  <p className="ssm-text slash">|</p>
                  <p
                    className="ssm-text"
                    onClick={() => clickChangeLanguage("jp")}
                  >
                    JP
                  </p>
                </div>
              </div>
              <div id="table-text-box" className="section">
                <div>
                  <img id="ramen-icon" src={RamenPic} alt="" />
                </div>
                <div id="home-title-box">
                  {link && (
                    <h1 className={"title" + lg}>
                      {t("table")} {link.table_id}
                    </h1>
                  )}
                  {link && (
                    <h2 className={"sm-text" + lg}>
                      {t("checkIn")}: {getTimes(link.checkin_at)}
                    </h2>
                  )}
                </div>
              </div>
            </div>

            <div id="order-status">
              <h1 className={"md-text" + lg}>{t("orderStatus")}</h1>
              <p className={"bracket" + lg}>
                {t("orderLeft.1")}{" "}
                {orderHistory !== null ? (
                  <span>{orderHistory.length} </span>
                ) : (
                  <span>0</span>
                )}
                {t("orderLeft.2")}
              </p>

              <p className={"sm-text order-p" + lg}>
                {orderHistory != null && orderHistory.length !== 0 ? (
                  <span>
                    {t("phaseOrder.1")} <br />
                    {t("phaseOrder.2")}
                  </span>
                ) : (
                  <span>
                    {t("noOrder.1")} <br />
                    {t("noOrder.2")}
                  </span>
                )}
              </p>

              <div className="timeline">
                <div
                  className={`timeline__progress ${
                    orderHistory &&
                    orderHistory.every((order) => order.status === "served" || order.status === "cancel")
                      ? "timeline_inactive"
                      : null
                  }`}
                  style={{ width: `${calculatedWidth}%` }}
                />

                {timeLineBalls(intermediaryBalls + 2, width, orderStatusText)}
              </div>
            </div>
          </div>

          <div id="menu-section">
            <div className="menu-container">
              <div
                className="menu-box"
                onClick={() => MenuSelect("menu", id, lgs)}
              >
                <h1 className={"md-text" + lg}>
                  {t("orderFood.1")} <br />
                  {t("orderFood.2")}
                </h1>
              </div>
              { checkOut &&
                <div
                  className="menu-box"
                  onClick={() =>
                    CheckValid(
                      "history",
                      id,
                      lgs,
                      checkHistory,
                      getTextToAlert,
                      checkOut.bill.items
                    )
                  }
                >
                  <h1 className={"md-text" + lg}>
                    {t("orderHistory.1")} <br />
                    {t("orderHistory.2")}
                  </h1>
                </div>
              }
            </div>

            <div className="menu-container">
              <div
                onClick={() => callWaiterClick()}
                className={`menu-box ${
                  callWaiter === true ? "waiter-box" : null
                }`}
              >
                {callWaiter === true && (
                  <FontAwesomeIcon icon={faBell} className="nm-text bell-fa" />
                )}
                <h1 className={"md-text" + lg}>
                  {t("callWaiter.1")} <br />
                  {t("callWaiter.2")}
                </h1>
              </div>
              { checkOut &&
              <div
                onClick={() =>
                  CheckValid(
                    "checkout",
                    id,
                    lgs,
                    checkHistory,
                    getTextToAlert,
                    checkOut.bill.items
                  )
                }
                className="menu-box"
              >
                <h1 className={"md-text" + lg}>
                  {t("checkOut.1")} <br />
                  {t("checkOut.2")}
                </h1>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// this function used to move the user into the choice that user select with the uid of the user.
function MenuSelect(page, value, lgs) {
  let web = "http://localhost:3000/";
  let path = "/" + page + "/";
  window.location = web + lgs + path + value;
}

// used to check the condition that user click the checkout and history page button
// with the invalid case or not and it will show the alert popup.
// checkout - user must order the item and every item must be served already.
// history - user must order the item.
function CheckValid(page, value, lgs, orderHistory, getTextToAlert, billItem) {
  let web = "http://localhost:3000/";
  let path = "/" + page + "/";

  
  //Case of the checkout page
  if (page === "checkout") {
    if (orderHistory) {
      if (
        orderHistory.every((order) => order.status === "served" || order.status === "cancel") 
      ) {
        window.location = web + lgs + path + value;
      } else {
        getTextToAlert("checkOut");
      }
    }
  }

  //Case of the history page
  if (page === "history") {
    if (orderHistory.length !== 0) {
      window.location = web + lgs + path + value;
    } else {
      getTextToAlert("orderHistory");
    }
  }
}
