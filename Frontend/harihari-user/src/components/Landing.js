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
import RamenPic from "../images/Mini Logo.png";

export default function Landing() {
  const { t, i18n } = useTranslation(); // used for i18n
  const { id, lgs } = useParams(); // received uid and languange from the param.
  const [link, setLink] = useState(); // received uid_table from API.
  const [lg, setLg] = useState(" " + lgs); // used for change the css of the text.

  // used to call function and set change languange.
  useEffect(() => {
    if (!link) {
      getLink(id);
    }
    i18n.changeLanguage(lgs);
    setLg(" " + lgs);
  }, [i18n, lgs, link, id]);

  // used to call api and set uid_table
  const getLink = async (id) => {
    await tableService.getTableById(id).then((data) => setLink(data));
  };

  // used to change the language of the website.
  const clickChangeLanguage = (lng) => {
    let web = "http://localhost:3000/";
    let path = "/table/";
    window.location = web + lng + path + id;
  };

  return (
    <div id="landing" className="section">
      <div id="landing-container" className="section page-container">
        <div>
          <img id="ramen-pics" src={RamenPic} alt="" />
        </div>
        <div>
          <h1
            id="table-title-box"
            className={"bg-text center-text table-text" + lg}
          >
            <span id="b-table">{t("table")}</span> <br className="mb-br" />{" "}
            {link && <span id="table-number">{link.table_id}</span>}
          </h1>

          <p className={"nm-text center-text table-p" + lg}>
            {t("AskContinue.1")} <br /> {t("AskContinue.2")}
          </p>

          <div className="section">
            <button
              onClick={() => linkToHome(id, lgs)}
              className={"red-btn center-text" + lg}
            >
              {t("continue")}
            </button>
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

// This function used to move the user to the Homepage with the user uid.
// if ther user entered the page with the invalid uid it will send the user to invalid page.
async function linkToHome(value, lgs) {
  let web = "http://localhost:3000/";
  let path = "/home/";

  let result = await tableService.checkin(value);

  if (result.success) {
    localStorage.setItem("customRamen", JSON.stringify([]));
    localStorage.setItem("items", JSON.stringify([]));
    window.location = web + lgs + path + value;
  } else {
    window.location = web + "invalid";
  }
}
