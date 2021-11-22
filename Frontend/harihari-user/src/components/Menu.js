//Import
import React, { useState, useEffect, useLayoutEffect } from "react";
import tableService from "../services/table.service.js";
import menuService from "../services/menu.service.js";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import DetailPopup from "./popup/DetailPopup.js";
import CustomRamen from "./popup/CustomRamen.js";
import ConfirmPopup from "./popup/ConfirmPopup.js";

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
  const [menuClick, setMenuClick] = useState(false);
  const [searchMenu, setSearchMenu] = useState();
  const [orderToggle, setOrderToggle] = useState(false);
  const [custom, setCustom] = useState(false);
  const [storedItems, setStoreItems] = useState(
    JSON.parse(localStorage.getItem("items"))
  );

  useEffect(() => {
    if (!link) {
      getLink(id);
    }
    i18n.changeLanguage(lgs);
    setLg(" " + lgs);
    getMainMenu();
  }, [i18n, lgs, link, id]);

  useLayoutEffect(() => {
    setMainMenu(tempMenu.filter((menu) => menu.en.category === "Appetizer"));
  }, [lgs, tempMenu]);

  function changeCategory(value) {
    setMainMenu(tempMenu.filter((menu) => menu.en.category === value));
    setCategory(value);
  }

  const getLink = async (id) => {
    await tableService.getTableById(id).then((data) => setLink(data));
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

  const findMenu = (menu) => {
    setStoreItems(JSON.parse(localStorage.getItem("items")));
    var tempLocal = [];
    menu.quantity = 1;
    menu.comment = "";
    setSearchMenu(menu);
    tempLocal = JSON.parse(localStorage.getItem("items")) || [];
    for (let i = 0; i < tempLocal.length; i++) {
      if (menu.product_id === tempLocal[i].product_id) {
        setSearchMenu(tempLocal[i]);
        break;
      }
    }
    setMenuClick(true);
  };

  const backMenu = () => {
    setSearchMenu("");
    setMenuClick(false);
    setCustom(false);
  };

  const orderClick = (value) => {
    setOrderToggle(value);
  };

  const checkCategory = (value) => {
    if (value === category) {
      return "md-text ";
    }
    return "md-text inactive";
  };

  //Basket

  const AddBasket = async (quantity, comment) => {
    setStoreItems(JSON.parse(localStorage.getItem("items")));
    setMenuClick(false);
    var tempLocal = [];
    let found = false;
    tempLocal = JSON.parse(localStorage.getItem("items")) || [];

    for (let i = 0; i < tempLocal.length; i++) {
      if (searchMenu.product_id === tempLocal[i].product_id && quantity !== 0) {
        tempLocal[i].quantity = quantity;
        tempLocal[i].comment = comment;
        localStorage.setItem("items", JSON.stringify(tempLocal));
        setStoreItems(tempLocal);
        found = true;
        break;
      } else if (
        searchMenu.product_id === tempLocal[i].product_id &&
        quantity === 0
      ) {
        tempLocal.splice(i, 1);
        localStorage.setItem("items", JSON.stringify(tempLocal));
        setStoreItems(tempLocal);
        break;
      }
    }
    if (found === false && quantity !== 0) {
      searchMenu.quantity = quantity;
      searchMenu.comment = comment;
      tempLocal.push(searchMenu);
      localStorage.setItem("items", JSON.stringify(tempLocal));
      setStoreItems(tempLocal);
    }
    await setSearchMenu("");
  };

  const RemoveBasket = (menu) => {
    var tempLocal = [];
    setStoreItems(JSON.parse(localStorage.getItem("items")));
    tempLocal = JSON.parse(localStorage.getItem("items")) || [];
    for (let i = 0; i < tempLocal.length; i++) {
      if (menu.product_id === tempLocal[i].product_id) {
        tempLocal.splice(i, 1);
        localStorage.setItem("items", JSON.stringify(tempLocal));
        setStoreItems(tempLocal);
        break;
      }
    }
  };

  const subTotal = () => {
    var tempLocal = [];
    tempLocal = JSON.parse(localStorage.getItem("items")) || [];
    var tempSum = 0;
    for (let i = 0; i < tempLocal.length; i++) {
      tempSum = tempSum + tempLocal[i].quantity * tempLocal[i].price;
    }
    return tempSum;
  };

  const totalOrder = () => {
    var tempLocal = [];
    tempLocal = JSON.parse(localStorage.getItem("items")) || [];
    var tempOrder = 0;
    for (let i = 0; i < tempLocal.length; i++) {
      tempOrder = tempOrder + tempLocal[i].quantity;
    }
    return tempOrder;
  };

  const checkItems = (menu, index) => {
    var tempLocal = [];
    tempLocal = JSON.parse(localStorage.getItem("items")) || [];
    for (let i = 0; i < tempLocal.length; i++) {
      if (menu.product_id === tempLocal[i].product_id) {
        mainMenu[index] = tempLocal[i];
        return true;
      }
    }
    return false;
  };

  return (
    <div>
      {orderToggle === true && (
        <ConfirmPopup cancel={orderClick} menuOrder={storedItems} page="menu" />
      )}
      {menuClick === true && (
        <DetailPopup menu={searchMenu} back={backMenu} addItem={AddBasket} />
      )}
      {custom === true && <CustomRamen back={backMenu} addItem={AddBasket} />}
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
              {link && <h1 className="md-text">{link.table_id}</h1>}
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

          <div id="menu-main-container">
            <div>
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
                  EatPlay
                </h1>
                <h1
                  className={checkCategory("Beverage") + lg}
                  onClick={() => changeCategory("Beverage")}
                >
                  {t("categortyMenu.beverage")}
                </h1>
              </div>
              <div id="menu-list-container">
                {/* Custom Ramen */}

                {category === "Ramen" && (
                  <div
                    onClick={() => setCustom(true)}
                    id="custom-ramen"
                    className="menu-box"
                  >
                    <img
                      className="menu-pics"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Shoyu_ramen%2C_at_Kasukabe_Station_%282014.05.05%29_1.jpg/1200px-Shoyu_ramen%2C_at_Kasukabe_Station_%282014.05.05%29_1.jpg"
                      alt=""
                      // onClick={() => findMenu(mainMenu[i])}
                    ></img>
                    <div className="menu-name-container">
                      {/* {checkItems(mainMenu[i], i) === true && (
                    <div className="vl"></div>
                  )} */}
                      <div>
                        <h1
                          className={
                            "sm-text menu-name" + lg
                            // (checkItems(mainMenu[i], i) === true ? " menu-no" : "")
                          }
                        >
                          Custom Ramen
                        </h1>
                        <h1 className="bracket menu-price k2d">฿ 290.00</h1>
                      </div>
                    </div>
                  </div>
                )}

                {mainMenu !== null &&
                  mainMenu.map((element, i) => (
                    <div className="menu-box" key={i}>
                      <img
                        className="menu-pics"
                        src={mainMenu[i].image_url}
                        alt=""
                        onClick={() => findMenu(mainMenu[i])}
                      ></img>
                      <div className="menu-name-container">
                        {checkItems(mainMenu[i], i) === true && (
                          <div className="vl"></div>
                        )}
                        <div>
                          <h1
                            className={
                              "sm-text menu-name" +
                              lg +
                              (checkItems(mainMenu[i], i) === true
                                ? " menu-no"
                                : "")
                            }
                          >
                            {checkItems(mainMenu[i], i) === true && (
                              <span>X{mainMenu[i].quantity} </span>
                            )}
                            {lgs === "th" && <span>{mainMenu[i].th.name}</span>}
                            {lgs === "en" && <span>{mainMenu[i].en.name}</span>}
                            {lgs === "jp" && <span>{mainMenu[i].jp.name}</span>}
                          </h1>
                          <h1 className="bracket menu-price k2d">
                            ฿ {mainMenu[i].price.toFixed(2)}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div id="basket-section">
              <div id="basket-container">
                <h1 className={"md-text" + lg}>{t("basket.yourBasket")}</h1>
                <div id="basket-item-box">
                  {storedItems !== null &&
                    storedItems.map((x, i) => (
                      <div className="basket-item" key={i}>
                        <div className="basket-name">
                          <h1 className="md-text basket-no">
                            X{storedItems[i].quantity}
                          </h1>
                          <div>
                            <h1 className={"sm-text menu-name" + lg}>
                              {lgs === "th" && (
                                <span>{storedItems[i].th.name}</span>
                              )}
                              {lgs === "en" && (
                                <span>{storedItems[i].en.name}</span>
                              )}
                              {lgs === "jp" && (
                                <span>{storedItems[i].jp.name}</span>
                              )}
                            </h1>
                            {storedItems[i].comment !== null && (
                              <h1 className="bracket">
                                {storedItems[i].comment}
                              </h1>
                            )}
                          </div>
                        </div>

                        <div>
                          <h1 className="sm-text k2d basket-price">
                            {(
                              storedItems[i].price * storedItems[i].quantity
                            ).toFixed(2)}
                          </h1>
                          <div className="section basket-edit">
                            <h1
                              className={"xm-text bracket-edit" + lg}
                              onClick={() => RemoveBasket(storedItems[i])}
                            >
                              {t("basket.delete")}
                            </h1>
                            <h1 className={"xm-text bracket-edit" + lg}>|</h1>
                            <h1
                              className={"xm-text bracket-edit" + lg}
                              onClick={() => findMenu(storedItems[i])}
                            >
                              {t("basket.edit")}
                            </h1>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <hr className="hr-black"></hr>
                <div className="price-box">
                  <h1 className={"bracket" + lg}>{t("basket.subtotal")}</h1>
                  <h1 className="bracket">{subTotal().toFixed(2)}</h1>
                </div>
                <div className="price-box">
                  <h1 className={"bracket" + lg}>{t("basket.VAT")} (7%)</h1>
                  <h1 className="bracket">{(subTotal() * 0.07).toFixed(2)}</h1>
                </div>
              </div>

              <div id="total-box">
                <div>
                  <h1 className={"sm-text menu-name" + lg}>
                    {t("basket.total")}
                  </h1>
                  <h1 className={"md-text k2d" + lg}>
                    ฿ {(subTotal() + subTotal() * 0.07).toFixed(2)}
                  </h1>
                </div>

                <div onClick={() => setOrderToggle(true)} id="order-box">
                  <h1 className={"md-text" + lg}>{t("basket.order")}</h1>
                  <h1 className={"bracket" + lg}>
                    {storedItems !== null ? (
                      <span>
                        {totalOrder()} {t("basket.item")}
                      </span>
                    ) : (
                      <span>0 {t("basket.item")}</span>
                    )}
                  </h1>
                </div>
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
