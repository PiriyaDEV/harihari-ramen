//Import
import React, { useState, useEffect, useLayoutEffect } from "react";
import tableService from "../services/table.service.js";
import orderService from "../services/order.service.js";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import Bill from "./popup/Bill.js";
import socketIOClient from "socket.io-client";

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
import RamenPic from "../images/ramen_main@2x.png";

export default function Home() {
  const { id, lgs } = useParams();
  const [width, setWidth] = useState(0);
  const intermediaryBalls = 2;
  const calculatedWidth = (width / (intermediaryBalls + 1)) * 100;
  const { t, i18n } = useTranslation();
  const storedTimes = JSON.parse(localStorage.getItem("checkin_time"));
  const [checkBill, setCheckBill] = useState(false);

  const [link, setLink] = useState();
  const [orderHistory, setOrderHistory] = useState("");

  const [callWaiter, setWaiter] = useState(false);

  useEffect(() => {
    const socket = socketIOClient("ws://localhost:3030", { auth: { id: id } });

    socket.on("order-history", (orders) => {
      setOrderHistory(
        orders.filter(
          (order) => order.status !== "served" && order.status !== "cancel"
        )
      );
    });
  }, [id]);

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

  useEffect(() => {
    if (!link && !orderHistory) {
      getLink();
      getAPIOrderHistory(id);
    }
    i18n.changeLanguage(lgs);
    setLg(" " + lgs);
  }, [i18n, lgs, link, orderHistory, id]);

  useLayoutEffect(() => {
    if (orderHistory.length > 0) {
      let lastestOrder = orderHistory[0];
      //Status Order: 0 is Order, 1 is Received Order, 2 is Prepare, 3 is Served
      if (lastestOrder.status === "ordered") setWidth(0);
      else if (lastestOrder.status === "received") setWidth(1);
      else if (lastestOrder.status === "preparing") setWidth(2);
      else if (lastestOrder.status === "serving") setWidth(3);
    } else {
      setWidth(-1);
    }
  }, [orderHistory]);

  const clickChangeLanguage = (lng) => {
    let web = "http://localhost:3000/";
    let path = "/home/";
    window.location = web + lng + path + id;
  };

  // alert(lgs);

  const [lg, setLg] = useState(" " + lgs);
  let numTable = useState(0);

  numTable = CheckTable(link, id);
  CheckHaveTable(numTable, link);

  const [orderStatusText] = useState([
    "Ordered",
    "Received Order",
    "Preparing Order",
    "Serving",
  ]);

  const callWaiterClick = async() => {
    setWaiter(true)
    await tableService.callWaiter(id);
  }

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
          <h1 className={"pg-text bracket" + lg}>{text[index]}</h1>
        </div>
      ));

  return (
    <div>
      {checkBill === true && <Bill toggle={() => setCheckBill()} />}
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
                <div>
                  <h1 className={"title" + lg}>
                    {t("table")} {numTable}
                  </h1>
                  <h2 className={"sm-text" + lg}>
                    {t("checkIn")}: {getTimes(storedTimes)}
                  </h2>
                </div>
              </div>
            </div>

            <div id="order-status">
              <h1 className={"md-text" + lg}>{t("orderStatus")}</h1>
              <p className={"bracket" + lg}>
                {t("orderLeft.1")}{" "}
                {orderHistory !== null ? (
                  <span>{orderHistory.length}</span>
                ) : (
                  <span>0</span>
                )}
                {t("orderLeft.2")}
              </p>

              <p className={"sm-text order-p" + lg}>
                {t("phaseOrder.1")} <br />
                {t("phaseOrder.2")}
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
                onClick={() => MenuSelect("history", id, lgs)}
              >
                <h1 className={"md-text" + lg}>
                  {t("orderHistory.1")} <br />
                  {t("orderHistory.2")}
                </h1>
              </div>
            </div>

            <div className="menu-container">
              <div
                onClick={()=> callWaiterClick()}
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
              <div onClick={() => setCheckBill(true)} className="menu-box">
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

function CheckTable(link, id) {
  for (const index in link) {
    if (link[index].guest_uid === id) {
      return link[index].table_id;
    }
  }
}

function MenuSelect(page, value, lgs) {
  let web = "http://localhost:3000/";
  let path = "/" + page + "/";
  window.location = web + lgs + path + value;
}

function CheckHaveTable(numTable, link) {
  if (!numTable && link) {
    window.location = "http://localhost:3000/invalid";
  }
}
