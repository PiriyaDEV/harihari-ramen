//Import
import React, { useState, useEffect } from "react";
import tableService from "../services/table.service.js";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

//CSS
import "../css/page.css";
import "../css/text.css";
import "../css/components/Landing.css";
import "../css/element/languageBtn.css";

//Image
import RamenPic from "../images/ramen_main@2x.png";

export default function Landing() {
  const { t, i18n } = useTranslation();
  const { id, lgs } = useParams();
  const [link, setLink] = useState();

  useEffect(() => {
    if (!link) {
      getLink();
    }
    i18n.changeLanguage(lgs);
    setLg(" " + lgs);
  }, [i18n, lgs, link]);

  const getLink = async () => {
    return await tableService.getTables().then((data) => setLink(data));
  };

  const clickChangeLanguage = (lng) => {
    let web = "http://localhost:3000/";
    let path = "/table/";
    window.location = web + lng + path + id;
  };

  const [lg, setLg] = useState(" " + lgs);

  let numTable = useState(0);

  numTable = CheckTable(link, id);
  CheckHaveTable(numTable, link);

  return (
    <div id="landing" className="section">
      <div id="landing-container" className="section page-container">
        <div>
          <img id="ramen-pics" src={RamenPic} alt="" />
        </div>
        <div>
          {numTable !== 0 ? (
            <h1
              id="table-title-box"
              className={"bg-text center-text table-text" + lg}
            >
              <span id="b-table">{t("table")}</span> <br className="mb-br" />{" "}
              <span id="table-number">{numTable}</span>
            </h1>
          ) : (
            <h1 className={"bg-text center-text table-text" + lg}>
              {t("invalide")}
            </h1>
          )}

          {numTable !== 0 ? (
            <p className={"nm-text center-text table-p" + lg}>
              {t("AskContinue.1")} <br /> {t("AskContinue.2")}
            </p>
          ) : (
            <p className={"nm-text center-text table-p" + lg}>
              {t("invalidePath.1")} <br /> {t("invalidePath.2")}
            </p>
          )}

          <div className="section">
            {numTable !== 0 && (
              <button
                onClick={() => linkToHome(id, lgs)}
                className={"red-btn center-text" + lg}
              >
                {t("continue")}
              </button>
            )}
          </div>
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
              <p className="ssm-text" onClick={() => clickChangeLanguage("jp")}>
                JP
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

let linkToHome = async (value, lgs) => {
  let web = "http://localhost:3000/";
  let path = "/home/";

  let result = await tableService.checkin(value);

  localStorage.setItem("checkin_time", JSON.stringify(result.checkin_at));

  if (result.success) {
    window.location = web + lgs + path + value;
  } else {
    window.location = web + "invalid";
  }
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
