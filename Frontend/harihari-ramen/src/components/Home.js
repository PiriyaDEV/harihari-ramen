import React, { useState, useEffect } from "react";
import tableService from "../services/table.service.js";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

//CSS
import "../css/page.css";
import "../css/text.css";
import "../css/components/Home.css";
import "../css/element/progressBar.css";
import "../css/element/languageBtn.css";

//Image
import RamenPic from "../images/ramen_main@2x.png";

// import Invalid from "../components/Invalid";

export default function Home() {
  const { id, lgs } = useParams();
  const [width, setWidth] = useState(0);
  const intermediaryBalls = 2;
  const calculatedWidth = (width / (intermediaryBalls + 1)) * 100;
  const { t, i18n } = useTranslation();
  const [link, setLink] = useState();

  useEffect(() => {
    if (!link) {
      getLink();
    }
    i18n.changeLanguage(lgs);
    setLg(" " + lgs);
  }, [i18n, lgs , link]);


  const getLink = async () => {
    await tableService.getTables().then((data) => setLink(data));
  };

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

  // if (numTable === 0) {
  //   numTable = 0;
  //   window.location = "http://localhost:3000/invalid";
  // }

  const timeLineBalls = (n, onClick, current, text) =>
    Array(n)
      .fill(0)
      //ใช้ index ในการเปลี่ยน bar
      .map((i, index) => (
        <div id="tl-ball" key={index}>
          <div
            className={`timeline__ball ${current >= index ? "active" : null}`}
            onClick={() => onClick(1)}
          ></div>
          <h1 className={"pg-text bracket" + lg}>{text}</h1>
        </div>
      ));

  return (
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
                <h2 className={"sm-text" + lg}>{t("checkIn")}: 15:45:03</h2>
              </div>
            </div>
          </div>

          <div id="order-status">
            <h1 className={"md-text" + lg}>{t("orderStatus")}</h1>
            <p className={"bracket" + lg}>
              {t("orderLeft.1")} 1 {t("orderLeft.2")}
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
              {timeLineBalls(
                intermediaryBalls + 2,
                setWidth,
                width,
                "Received Order"
              )}
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
            <div className="menu-box">
              <h1 className={"md-text" + lg}>
                {t("orderHistory.1")} <br />
                {t("orderHistory.2")}
              </h1>
            </div>
          </div>

          <div className="menu-container">
            <div className="menu-box">
              <h1 className={"md-text" + lg}>
                {t("callWaiter.1")} <br />
                {t("callWaiter.2")}
              </h1>
            </div>
            <div className="menu-box">
              <h1 className={"md-text" + lg}>
                {t("checkOut.1")} <br />
                {t("checkOut.2")}
              </h1>
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
