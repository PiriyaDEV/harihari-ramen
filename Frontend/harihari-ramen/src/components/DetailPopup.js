//Import
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

//CSS
import "../css/page.css";
import "../css/text.css";
import "../css/element/detailPopup.css";

//Icon
import closeIcon from "../images/icon/Union 12.svg";
import plusIcon from "../images/icon/Union 13.svg";
import minusIcon from "../images/icon/Union 14.svg";

export default function DetailPopup(props) {
  const { t } = useTranslation();
  const { lgs } = useParams();
  const [lg, setLg] = useState(" " + lgs);
  const [amountNum, setAmount] = useState(1);

  const placeHolderRequest = () => {
    if (lgs === "th") {
      return "กรอกความต้องการ";
    } else if (lgs === "en") {
      return "Add your request";
    } else {
      return "要件を記入してください";
    }
  };

  useEffect(() => {
    setLg(" " + lgs);
  }, [lgs]);

  function clickAmount(type) {
    if (type === "plus") {
      setAmount(amountNum + 1);
    } else {
      if (amountNum !== 0) {
        setAmount(amountNum - 1);
      }
    }
  }

  console.log(props.menu);
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
          <div className="info-padding">
            <h1 className={"md-text" + lg}>
              {lgs === "th" && <span>{props.menu.th.name}</span>}
              {lgs === "en" && <span>{props.menu.en.name}</span>}
              {lgs === "jp" && <span>{props.menu.jp.name}</span>}
            </h1>
            <h1 className="sm-text k2d">฿ {props.menu.price}</h1>
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

          <div id="add-box-section" onClick={props.back}>
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
