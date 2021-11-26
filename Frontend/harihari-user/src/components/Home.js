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
import { getTimes } from "../utilities/Time";

//Image
import RamenPic from "../images/Mini Logo.png";

export default function Home() {
  const { id, lgs } = useParams();
  const [width, setWidth] = useState(0);
  const intermediaryBalls = 2;
  const calculatedWidth = (width / (intermediaryBalls + 1)) * 100;
  const { t, i18n } = useTranslation();
  const [link, setLink] = useState();
  const [orderHistory, setOrderHistory] = useState("");
  const [callWaiter, setWaiter] = useState(false);
  const [lg, setLg] = useState(" " + lgs);
  const [alertPopup, setAlert] = useState(false);
  const [checkOut, setCheckOut] = useState("");
  const [socket, setSocket] = useState(null);
  const [checkHistory, setChectHistory] = useState();
  const [text, setText] = useState();

  useEffect(() => {
    const socketInput = socketIOClient(
      "http://localhost:3030/harihari-customer",
      {
        auth: { id: id },
      }
    );
    setSocket(socketInput);
  }, [id]);

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

  useEffect(() => {
    if (socket) {
      socket.on("call-waiter", (newValue) => {
        setLink((link) => ({ ...link, call_waiter: newValue }));
        setWaiter(newValue);
      });
    }
  }, [link, socket]);

  const getLink = async (id) => {
    await tableService.getTableById(id).then((data) => setLink(data));
  };

  const getAPIBill = async (id) => {
    await BillService.summary(id).then((data) => setCheckOut(data));
  };

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

  const clickChangeLanguage = (lng) => {
    let web = "http://localhost:3000/";
    let path = "/home/";
    window.location = web + lng + path + id;
  };

  const [orderStatusText] = useState({
    en: ["Ordered", "Received Order", "Preparing Order", "Serving"],
    th: ["สั่งอาหารแล้ว", "รับออร์เดอร์แล้ว", "กำลังทำอาหาร", "กำลังเสิร์ฟ"],
    jp: ["順序付けられました", "受注", "注文の準備", "サービング"],
  });

  const callWaiterClick = async () => {
    if (!link.call_waiter) {
      await tableService.callWaiter(id);
    }
  };

  const getTextToAlert = (value) => {
    console.log(value)
    setText(value);
    setAlert(true);
  };

  const cancelClick = (toggle) => {
    setAlert(toggle);
  };

  const timeLineBalls = (n, current, text) =>
    Array(n)
      .fill(0)
      //ใช้ index ในการเปลี่ยน bar
      .map((i, index) => (
        <div id="tl-ball" key={index}>
          <div
            className={`timeline__ball ${current > index ? "active" : null} ${
              current === index ? "ongoing" : null
            }`}
            // onloadd={() => onClick(3)}
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
      {alertPopup && <ConfirmPopup cancel={cancelClick} text={text} page="home" />}
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
                  className="timeline__progress"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuSelect(page, value, lgs) {
  let web = "http://localhost:3000/";
  let path = "/" + page + "/";
  window.location = web + lgs + path + value;
}

function CheckValid(page, value, lgs, orderHistory, getTextToAlert, billItem) {
  let web = "http://localhost:3000/";
  let path = "/" + page + "/";
  if (page === "checkout") {
    if (orderHistory.length === 0 && billItem.length !== 0) {
      window.location = web + lgs + path + value;
    } else {
      getTextToAlert("checkOut");
    }
  }
  // console.log(orderHistory);
  if (page === "history") {
    if (orderHistory.length !== 0) {
      window.location = web + lgs + path + value;
    } else {
      getTextToAlert("orderHistory");
    }
  }
}

// function CheckHaveTable(numTable, link) {
//   if (!numTable && link) {
//     window.location = "http://localhost:3000/invalid";
//   }
// }
