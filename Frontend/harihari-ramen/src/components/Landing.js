import React, { useState, useEffect, Component } from "react";
import tableService from "../services/table.service.js";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

//CSS
import "../css/page.css";
import "../css/text.css";
import "../css/page/Landing.css";
import "../css/element/languageBtn.css";

//Image
import RamenPic from "../images/ramen_main@2x.png";

const Landing = (props) => {
  const { t, i18n } = useTranslation();
  const { id, lgs } = useParams();

  useEffect(() => {
    i18n.changeLanguage(lgs);
    setLg(" " + lgs);
  }, [i18n, lgs]);

  const clickChangeLanguage = (lng) => {
    let web = "http://localhost:3000/";
    let path = "/table/";
    window.location = web + lng + path + id;
  };

  const [lg, setLg] = useState(" " + lgs);

  let numTable = useState(0);
  let haveTable = 0;

  for (const index in props.table) {
    if (props.table[index].guest_uid === id) {
      numTable = props.table[index].table_id;
      haveTable = 1;
    }
  }

  // if (haveTable === 0) {
  //   numTable = 0;
  //   window.location = "http://localhost:3000/invalid";
  // }

  return (
    <div id="landing" className="section">
      <div id="landing-container" className="section page-container">
        <div>
          <img id="ramen-pics" src={RamenPic} alt="" />
        </div>
        <div>
          {numTable !== 0 ? (
            <h1 className={"bg-text center-text table-text" + lg}>
              {t("table")} {numTable}
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
              {lg === " " + "en" ? (
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

let linkToHome = (value, lgs) => {
  let web = "http://localhost:3000/";
  let path = "/home/";
  window.location = web + lgs + path + value;
};

export default class MainLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: [],
    };
  }

  componentDidMount() {
    this.getLink();
  }

   async getLink() {
    return await tableService
      .getTables()
      .then((data) => this.setState({ link: data }));
  }

  render() {
    let linked = this.state.link;
    return (
      <div>
        <Landing table={linked} />
      </div>
    );
  }
}
