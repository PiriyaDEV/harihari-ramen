//Import
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

//CSS
import "../../css/page.css";
import "../../css/text.css";
import "../../css/element/detailPopup.css";

//Icon
import closeIcon from "../../images/icon/Union 12.svg";
import plusIcon from "../../images/icon/Union 13.svg";
import minusIcon from "../../images/icon/Union 14.svg";

export default function DetailPopup(props) {
  const { t } = useTranslation();                           // used for i18n
  const { lgs } = useParams();                              // received languange from the param.
  const [lg, setLg] = useState(" " + lgs);                  // used for change the css of the text.
  const [amountNum, setAmount] = useState(1);               // used to set the amount of the custom ramen.
  const [commentRequest, setCommentRequest] = useState(""); //used to collect the request / comment of the order.

  // This function used to set the language of the place holder.
  const placeHolderRequest = () => {
    if (lgs === "th") {
      return "กรอกความต้องการ";
    } else if (lgs === "en") {
      return "Add your request";
    } else {
      return "要件を記入してください";
    }
  };

  // Used to recieved and set the information of the order from the parent
  // and used to recieved an languages from the param.
  useEffect(() => {
    setLg(" " + lgs);
    if (props.menu.quantity) {
      setAmount(props.menu.quantity);
    }
    if (props.menu.comment) {
      setCommentRequest(props.menu.comment);
    }
  }, [lgs, props.menu.quantity, props.menu.comment]);

  //This function used to add or the minus the amount of the order.
  function clickAmount(type) {
    if (type === "plus") {
      setAmount(amountNum + 1);
    } else {
      if (amountNum !== 0) {
        setAmount(amountNum - 1);
      }
    }
  }

  //This function used to collect the user inputed request / comment of the order.
  const Request = (e) => {
    setCommentRequest(e.target.value);
  };

  return (
    <div id="detail-popup-section" className="section popup">
      <div id="detail-popup" className="page-container">
        <img
          className="close-popup"
          src={closeIcon}
          alt=""
          onClick={props.back}
        ></img>

        <img className="detail-img" src={props.menu.image_url} alt=""></img>

        <div id="detail-popup-info">
          <div>
            <div className="info-padding">
              <div id="detail-menu-header">
                <h1 className={"md-text" + lg}>
                  {lgs === "th" && <span>{props.menu.th.name}</span>}
                  {lgs === "en" && <span>{props.menu.en.name}</span>}
                  {lgs === "jp" && <span>{props.menu.jp.name}</span>}
                </h1>
                <h1 className="sm-text k2d menu-price bold">
                  ฿ {props.menu.price}
                </h1>
              </div>

              <div id="detail-desc">
                <h1 className={"bracket" + lg}>
                  {lgs === "th" && <span>{props.menu.th.description}</span>}
                  {lgs === "en" && <span>{props.menu.en.description}</span>}
                  {lgs === "jp" && <span>{props.menu.jp.description}</span>}
                </h1>
              </div>
            </div>

            <hr className="gray-line"></hr>

            <div className="info-padding">
              <h1 className={"sm-text comment" + lg}>{t("basket.request")}</h1>
              <textarea
                className={"bracket comment-box" + lg}
                rows="3"
                cols="50"
                placeholder={placeHolderRequest()}
                value={commentRequest}
                onChange={Request}
              ></textarea>
            </div>

            <hr className="gray-line"></hr>

            <div id="amount-box" className="section">
              <div
                className="num-icon section"
                onClick={() => clickAmount("minus")}
              >
                <img src={minusIcon} alt=""></img>
              </div>
              <h1 className="md-text od-amount">{amountNum}</h1>
              <div
                className="num-icon section"
                onClick={() => clickAmount("plus")}
              >
                <img src={plusIcon} alt=""></img>
              </div>
            </div>
          </div>

          <div
            id="add-box-section"
            onClick={() => props.addItem(amountNum, commentRequest)}
          >
            <div id="add-box" className="info-padding">
              <h1 className={"sm-text" + lg}>{t("basket.addBasket")}</h1>
              <h1 className={"bracket" + lg}>
                + {amountNum} {t("basket.item")}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
