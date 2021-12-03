//Import
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import tableService from "../services/table.service.js";
import BillService from "../services/bill.service.js";
import ConfirmPopup from "./popup/ConfirmPopup.js";

//CSS
import "../css/page.css";
import "../css/text.css";
import "../css/components/Menu.css";
import "../css/components/History.css";
import "../css/components/CheckOut.css";
import "../css/element/languageBtn.css";

//JS
import { numberWithCommas } from "../utilities/Number"; //import function to create a comma in the number variable.

//Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function CheckOut() {
  const { t, i18n } = useTranslation();          // used for i18n
  const { id, lgs } = useParams();               // received uid and languange from the param.
  const [link, setLink] = useState();            // received uid_table from API.
  const [lg, setLg] = useState(" " + lgs);       // used for change the css of the text.
  const [checkOut, setCheckOut] = useState("");  // received uid_bill and information of the bill from API
  const [cancel, setCancel] = useState(false);   // used for close popup

  // used to call function and set change languange.
  useEffect(() => {
    if (!link && !checkOut) {
      getLink(id);
      getAPIBill(id);
    }
    i18n.changeLanguage(lgs);
    setLg(" " + lgs);
  }, [i18n, lgs, link, checkOut, id]);

  // used to change the language of the website.
  const clickChangeLanguage = (lng) => {
    let web = "http://localhost:3000/";
    let path = "/checkout/";
    window.location = web + lng + path + id;
  };

  // used to call api and set uid_table
  const getLink = async (id) => {
    await tableService.getTableById(id).then((data) => setLink(data));
  };

  // used to get uid + bill id of the table to create a unique path that avoid user to entered this page.
  const getAPIBill = async (id) => {
    await BillService.summary(id).then((data) => setCheckOut(data));
  };

  // check that user entered the checkout page with the empty basket.
  // return user to the invalid page.
  if (checkOut) {
    if (checkOut.bill.items.length === 0) {
      window.location = "http://localhost:3000/invalid";
    }
  }

  // This function used to calculate a subtotal of the checkout page.
  // it will return the subtotal of the checkout page
  const subTotal = (order, custom) => {
    var tempSum = 0;
    if (order) {
      for (let i = 0; i < order.length; i++) {
        tempSum = tempSum + order[i].quantity * order[i].price;
      }
    }
    if (custom) {
      for (let i = 0; i < custom.length; i++) {
        tempSum = tempSum + custom[i].quantity * custom[i].price;
      }
    }
    return tempSum;
  };

  //used to close the confirmation popup
  const cancelClick = (toggle) => {
    setCancel(toggle);
  };

  return (
    <div>
      {cancel && (
        <ConfirmPopup
          cancel={cancelClick}
          uid={checkOut.bill.uid}
          page="checkout"
        />
      )}
      <div id="history" className="section">
        <div id="history-container" className="page-container">
          <div id="menu-header-container" className="section">
            <div className="section">
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="menu-header fa"
                onClick={() => linkToHome(id, lgs, "/home/")}
              />
              <h1 className={"menu-header" + lg}>
                {t("checkOut.checkOutFull")}
              </h1>
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

          <div>
            <div id="checkout-box">
              <div className="history-box">
                {checkOut.bill &&
                  checkOut.bill.items.map((element, i) => (
                    <div className="history-menu" key={i}>
                      <div className="basket-name">
                        <h1 className="md-text basket-no">
                          X{element.quantity}
                        </h1>
                        <div>
                          <h1 className={"sm-text menu-name" + lg}>
                            {lgs === "th" && <span>{element.th}</span>}
                            {lgs === "en" && <span>{element.en}</span>}
                            {lgs === "jp" && <span>{element.jp}</span>}
                          </h1>
                          <h1 className="bracket">{element.comment}</h1>
                        </div>
                      </div>
                      <div>
                        <h1 className="sm-text k2d">
                          {element.price.toFixed(2)}
                        </h1>
                      </div>
                    </div>
                  ))}

                {checkOut.bill &&
                  checkOut.bill.custom.map((element, i) => (
                    <div className="history-menu" key={i}>
                      <div className="basket-name">
                        <h1 className="md-text basket-no">
                          X{element.quantity}
                        </h1>
                        <div>
                          <h1 className={"sm-text menu-name" + lg}>
                            {lgs === "th" && <span>ราเมงตามใจท่าน</span>}
                            {lgs === "en" && <span>Custom Ramen</span>}
                            {lgs === "jp" && <span>カスタムラーメン</span>}
                          </h1>
                          <h1 className="bracket">{element.comment}</h1>
                          {element !== null && (
                            <h1 className="xm-text custom-gray">
                              {lgs === "en" ? (
                                <span>
                                  {element.en.soup_type},{element.en.noodle},
                                  {element.en.spring_onion},{element.en.garlic},
                                  {element.en.spice},{element.en.chashu},
                                  {element.en.richness}
                                </span>
                              ) : lgs === "th" ? (
                                <span>
                                  {element.th.soup_type},{element.th.noodle},
                                  {element.th.spring_onion},{element.th.garlic},
                                  {element.th.spice},{element.th.chashu},
                                  {element.th.richness}
                                </span>
                              ) : (
                                <span>
                                  {element.jp.soup_type},{element.jp.noodle},
                                  {element.jp.spring_onion},{element.jp.garlic},
                                  {element.jp.spice},{element.jp.chashu},
                                  {element.jp.richness}
                                </span>
                              )}
                            </h1>
                          )}
                        </div>
                      </div>
                      <div>
                        <h1 className="sm-text k2d">
                          {element.price.toFixed(2)}
                        </h1>
                      </div>
                    </div>
                  ))}
              </div>

              <div>
                <hr className="hr-black"></hr>
                <div className="history-price-menu">
                  <h1 className={"sm-text menu-name" + lg}>
                    {t("basket.subtotal")}
                  </h1>
                  {checkOut && (
                    <h1 className="sm-text k2d">
                      {subTotal(
                        checkOut.bill.items,
                        checkOut.bill.custom
                      ).toFixed(2)}
                    </h1>
                  )}
                </div>
                <div className="history-price-menu">
                  <h1 className={"sm-text menu-name" + lg}>
                    {t("basket.VAT")} 7%
                  </h1>
                  {checkOut && (
                    <h1 className="sm-text k2d">
                      {(
                        subTotal(checkOut.bill.items, checkOut.bill.custom) *
                        0.07
                      ).toFixed(2)}
                    </h1>
                  )}
                </div>
                <div id="checkout-btn-section">
                  <div>
                    <h1 className={"sm-text menu-name" + lg}>
                      {t("basket.total")}
                    </h1>
                    {checkOut && (
                      <h1 className="md-text k2d">
                        {" "}
                        ฿{" "}
                        {numberWithCommas(
                          (
                            subTotal(
                              checkOut.bill.items,
                              checkOut.bill.custom
                            ) +
                            subTotal(
                              checkOut.bill.items,
                              checkOut.bill.custom
                            ) *
                              0.07
                          ).toFixed(2)
                        )}
                      </h1>
                    )}
                  </div>
                  <button
                    className="md-text check-out-btn"
                    onClick={() => setCancel(true)}
                  >
                    {t("checkOut.checkOutFull")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//This function used to move the user to the Homepage with the user uid.
let linkToHome = (value, lgs, path) => {
  let web = "http://localhost:3000/";
  window.location = web + lgs + path + value;
};
