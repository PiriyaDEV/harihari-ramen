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
import { numberWithCommas } from "../utilities/Number";

//Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function CheckOut() {
  const { t, i18n } = useTranslation();
  const { id, lgs } = useParams();
  const [link, setLink] = useState();
  const [lg, setLg] = useState(" " + lgs);
  const [checkOut, setCheckOut] = useState("");
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    if (!link && !checkOut) {
      getLink(id);
      getAPIBill(id);
    }
    i18n.changeLanguage(lgs);
    setLg(" " + lgs);
  }, [i18n, lgs, link, checkOut, id]);

  const clickChangeLanguage = (lng) => {
    let web = "http://localhost:3000/";
    let path = "/checkout/";
    window.location = web + lng + path + id;
  };

  const getLink = async (id) => {
    await tableService.getTableById(id).then((data) => setLink(data));
  };

  const getAPIBill = async (id) => {
    await BillService.summary(id).then((data) => setCheckOut(data));
  };

  if (checkOut) {
    if (checkOut.bill.items.length === 0) {
      window.location = "http://localhost:3000/invalid";
    }
  }

  const subTotal = (order) => {
    var tempSum = 0;
    for (let i = 0; i < order.length; i++) {
      tempSum = tempSum + order[i].quantity * order[i].price;
    }
    return tempSum;
  };

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
              </div>

              <div>
                <hr className="hr-black"></hr>
                <div className="history-price-menu">
                  <h1 className={"sm-text menu-name" + lg}>
                    {t("basket.subtotal")}
                  </h1>
                  {checkOut && (
                    <h1 className="sm-text k2d">
                      {subTotal(checkOut.bill.items).toFixed(2)}
                    </h1>
                  )}
                </div>
                <div className="history-price-menu">
                  <h1 className={"sm-text menu-name" + lg}>
                    {t("basket.VAT")} 7%
                  </h1>
                  {checkOut && (
                    <h1 className="sm-text k2d">
                      {(subTotal(checkOut.bill.items) * 0.07).toFixed(2)}
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
                            subTotal(checkOut.bill.items) +
                            subTotal(checkOut.bill.items) * 0.07
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

let linkToHome = (value, lgs, path) => {
  let web = "http://localhost:3000/";
  window.location = web + lgs + path + value;
};

// function CheckTable(link, id) {
//   for (const index in link) {
//     if (link[index].guest_uid === id) {
//       return link[index].table_id;
//     }
//   }
// }

// function CheckHaveTable(numTable, link) {
//   if (!numTable && link) {
//     window.location = "http://localhost:3000/invalid";
//   }
// }
