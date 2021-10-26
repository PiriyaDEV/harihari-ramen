import React, { useState, useEffect } from "react";
import tableService from "../services/table.service.js";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

//CSS
import "../css/page.css";
import "../css/text.css";
import "../css/components/Menu.css";
import "../css/element/languageBtn.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

//Temp Img
import Pic1 from "../images/tempMenu/merlin_141075300_74569dec-9fc2-4174-931d-019dddef3bb8-articleLarge.jpeg";
import Pic2 from "../images/tempMenu/1c071b0eaa1158e766957d975e55748d.jpeg";
import Pic3 from "../images/tempMenu/char-siu-pork-and-noodle-salad-105414-1.jpeg";
import Pic4 from "../images/tempMenu/download.jpeg";
import Pic5 from "../images/tempMenu/iro-roll-spicy-tempura-ebi.jpeg";
import Pic6 from "../images/tempMenu/Kinders_Teriyaki_Chicken_Skewers_-_WEB_1024x1024.jpeg";
import Pic7 from "../images/tempMenu/Reheat-Edamame.png";
import Pic8 from "../images/tempMenu/unnamed_0fee512e-0c46-4966-a2cb-719614098063_3000x.jpeg";

export default function Menu() {
  const { t, i18n } = useTranslation();
  const { id, lgs } = useParams();
  const [link, setLink] = useState();

  useEffect(() => {
    getLink();
    i18n.changeLanguage(lgs);
    setLg(" " + lgs);
  }, [i18n, lgs ]);

  const getLink = async () => {
    return await tableService.getTables().then((data) => setLink(data));
  };

  const clickChangeLanguage = (lng) => {
    let web = "http://localhost:3000/";
    let path = "/menu/";
    window.location = web + lng + path + id;
  };

  const [lg, setLg] = useState(" " + lgs);

  let numTable = useState(0);
  let dataMenu = GetMainMenu();

  console.log([dataMenu])

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
            <h1 className={"menu-header" + lg}>Order Food</h1>
          </div>

          <div id="table-box">
            <h1 className="bracket">TABLE</h1>
            <h1 className="md-text">12</h1>
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
          <h1 className="md-text">Appetizer</h1>
          <h1 className="md-text inactive">Ramen</h1>
          <h1 className="md-text inactive">Dessert</h1>
          <h1 className="md-text inactive">Drink</h1>
        </div>

        <div id="menu-main-container">
          <div id="menu-list-container">
            {[...Array(4)].map((x, i) => (
              <div className="menu-box" key={i}>
                <img className="menu-pics" src={Pic1} alt=""></img>
                <div className="menu-name-container">
                  <div className="vl"></div>
                  <div>
                    <h1 className="sm-text menu-name">
                      <span>X1</span> Karaage EiEi za haha
                    </h1>
                    <h1 className="bracket menu-price k2d">฿ 160.00</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div id="basket-container">
              <h1 className="md-text">YOUR BASKET</h1>
              {[...Array(4)].map((x, i) => (
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

function GetMainMenu() {
  const [menu, setMenu] = useState();
  if (!menu) {
    setMenu([
      {
        description: "อร่อย",
        image_url: Pic1,
        price: "300",
      },
      {
        description: "อร่อย",
        image_url: Pic2,
        price: "400",
      },
      {
        description: "อร่อย",
        image_url: Pic3,
        price: "500",
      },
      {
        description: "อร่อย",
        image_url: Pic4,
        price: "600",
      },
      {
        description: "อร่อย",
        image_url: Pic5,
        price: "700",
      },
      {
        description: "อร่อย",
        image_url: Pic6,
        price: "800",
      },
      {
        description: "อร่อย",
        image_url: Pic7,
        price: "900",
      },
      {
        description: "อร่อย",
        image_url: Pic8,
        price: "1000",
      },
    ]);
  }
  return menu;
}
