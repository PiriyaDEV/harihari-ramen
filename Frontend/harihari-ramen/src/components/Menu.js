//Import
import React, { useState, useEffect, useLayoutEffect } from "react";
import tableService from "../services/table.service.js";
import menuService from "../services/menu.service.js";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

//CSS
import "../css/page.css";
import "../css/text.css";
import "../css/components/Menu.css";
import "../css/element/languageBtn.css";

//Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function Menu() {
  const { t, i18n } = useTranslation();
  const { id, lgs } = useParams();
  const [link, setLink] = useState();
  const [category, setCategory] = useState("Appetizer");
  const [mainMenu, setMainMenu] = useState([]);
  const [tempMenu, setTempMenu] = useState([]);
  const [lg, setLg] = useState(" " + lgs);

  useEffect(() => {
    getLink();
    i18n.changeLanguage(lgs);
    setLg(" " + lgs);
    getMainMenu();
  }, [i18n, lgs]);

  useLayoutEffect(() => {
    setMainMenu(tempMenu.filter((menu) => menu.en.category === "Appetizer"));
  }, [lgs, tempMenu]);


  function changeCategory(value) {
    setMainMenu(tempMenu.filter((menu) => menu.en.category === value));
    setCategory(value);
  }

  const getLink = async () => {
    return await tableService.getTables().then((data) => setLink(data));
  };

  const getMainMenu = async () => {
    return await menuService.getMainMenus().then((data) => {
      setMainMenu(data);
      setTempMenu(data);
    });
  };

  const clickChangeLanguage = (lng) => {
    let web = "http://localhost:3000/";
    let path = "/menu/";
    window.location = web + lng + path + id;
  };

  const checkCategory = (value) => {
    if (value === category) {
      return "md-text ";
    }
    return "md-text inactive";
  };

  let numTable = useState(0);

  numTable = CheckTable(link, id);
  CheckHaveTable(numTable, link);

  return (
    <div id="menu" className="section">
      <div id="menu-container" className="page-container">
        <div id="menu-header-container" className="section">
          <div className="section">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="menu-header fa"
              onClick={() => linkToHome(id, lgs)}
            />
            <h1 className={"menu-header" + lg}>{t("orderFoodIn")}</h1>
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

        <div id="menu-choice-container">
          <h1
            className={checkCategory("Appetizer") + lg}
            onClick={() => changeCategory("Appetizer")}
          >
            {t("categortyMenu.appetizer")}
          </h1>
          <h1
            className={checkCategory("Ramen") + lg}
            onClick={() => changeCategory("Ramen")}
          >
            {t("categortyMenu.ramen")}
          </h1>
          <h1
            className={checkCategory("Dessert") + lg}
            onClick={() => changeCategory("Dessert")}
          >
            {t("categortyMenu.dessert")}
          </h1>
          <h1
            className={checkCategory("Beverage") + lg}
            onClick={() => changeCategory("Beverage")}
          >
            {t("categortyMenu.beverage")}
          </h1>
        </div>

        <div id="menu-main-container">
          <div id="menu-list-container">
            {mainMenu.map((element, i) => (
              <div className="menu-box" key={i}>
                <img
                  className="menu-pics"
                  src={mainMenu[i].image_url}
                  alt=""
                ></img>
                <div className="menu-name-container">
                  {/* <div className="vl"></div> */}
                  <div>
                    <h1 className={"sm-text menu-name" + lg}>
                      {/* <span>X1  </span> */}
                      {lgs === "th" && <span>{mainMenu[i].th.name}</span>}
                      {lgs === "en" && <span>{mainMenu[i].en.name}</span>}
                      {lgs === "jp" && <span>{mainMenu[i].jp.name}</span>}
                    </h1>
                    <h1 className="bracket menu-price k2d">
                      ฿ {mainMenu[i].price}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div id="basket-container">
              <h1 className="md-text">YOUR BASKET</h1>
              <div id="basket-item-box">
                {[...Array(10)].map((x, i) => (
                  <div className="basket-item" key={i}>
                    <div className="basket-name">
                      <h1 className="md-text basket-no">X1</h1>
                      <div>
                        <h1 className="sm-text menu-name">Karaage</h1>
                        <h1 className="bracket">Sweet 50%</h1>
                      </div>
                    </div>

                    <div>
                      <h1 className="sm-text k2d basket-price">160.00</h1>
                      <h1 className="bracket bracket-edit">Edit</h1>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="hr-black"></hr>
              <div className="price-box">
                <h1 className="bracket">Subtotal</h1>
                <h1 className="bracket">240.00</h1>
              </div>
              <div className="price-box">
                <h1 className="bracket">Service Charge (10%)</h1>
                <h1 className="bracket">24.00</h1>
              </div>
            </div>

            <div id="total-box">
              <div>
                <h1 className="sm-text menu-name">Total</h1>
                <h1 className="md-text k2d">฿ 264.00</h1>
              </div>

              <div id="order-box">
                <h1 className="md-text">Order</h1>
                <h1 className="bracket">2 items</h1>
              </div>
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
