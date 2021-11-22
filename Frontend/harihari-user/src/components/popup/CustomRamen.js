//Import
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

//CSS
import "../../css/page.css";
import "../../css/text.css";
import "../../css/element/detailPopup.css";
import "../../css/element/customRamen.css";

//Icon
import closeIcon from "../../images/icon/Union 12.svg";
import plusIcon from "../../images/icon/Union 13.svg";
import minusIcon from "../../images/icon/Union 14.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

//Choice Pic
import Chili from "../../images/icon/custom-ramen/icons8-chili-pepper-90@2x.png";
import Garlic from "../../images/icon/custom-ramen/icons8-garlic-90@2x.png";
import Richness from "../../images/icon/custom-ramen/icons8-ketchup-64@2x.png";
import Note from "../../images/icon/custom-ramen/icons8-note-90@2x.png";
import Grease from "../../images/icon/custom-ramen/icons8-olive-oil-90@2x.png";
import SpingOnion from "../../images/icon/custom-ramen/icons8-onion-90@2x.png";
import Pork from "../../images/icon/custom-ramen/icons8-pork-leg-256@2x.png";
import Soup from "../../images/icon/custom-ramen/icons8-soup-plate-64-2@2x.png";
import Noodle from "../../images/icon/custom-ramen/noodle.svg";

export default function DetailPopup(props) {
  const { t } = useTranslation();
  const { lgs } = useParams();
  const [lg, setLg] = useState(" " + lgs);
  const [amountNum, setAmount] = useState(1);
  const [commentRequest, setCommentRequest] = useState("");
  const [continueClick, setContinue] = useState(false);
  const [lastChoice, setLastChoice] = useState(false);

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
    // if (props.menu.quantity) {
    //   setAmount(props.menu.quantity);
    // }
    // if (props.menu.comment) {
    //   setCommentRequest(props.menu.comment);
    // }
    //   }, [lgs, props.menu.quantity, props.menu.comment]);
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

  const BackFunction = () => {
    if(lastChoice === true) {
      setLastChoice(false)
    } else {
      setContinue(false)
    }
  }

  const Request = (e) => {
    setCommentRequest(e.target.value);
  };

  // console.log(props.menu);
  return (
    <div id="detail-popup-section" className="section popup">
      <div id="detail-popup" className="page-container">
        <img
          className="close-popup"
          src={closeIcon}
          alt=""
          onClick={props.back}
        ></img>
        <img
          className="detail-img"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Shoyu_ramen%2C_at_Kasukabe_Station_%282014.05.05%29_1.jpg/1200px-Shoyu_ramen%2C_at_Kasukabe_Station_%282014.05.05%29_1.jpg"
          alt=""
        ></img>
        {continueClick === false ? (
          <div id="detail-popup-info" className="fixed-detail">
            <div className="info-padding">
              <h1 className={"md-text" + lg}>Custom Ramen</h1>
              <h1 className="sm-text k2d">฿ 200.00</h1>
              <div id="detail-desc">
                <h1 className={"bracket" + lg}>
                  Our specialist dish, where you can pick how you want to eat on
                  your own from soup, noodle, type of pork, and more.
                </h1>
              </div>
              <h1 className={"bracket note" + lg}>
                Note: please pick at least one in all question
              </h1>
            </div>

            <div id="add-box-section">
              <div
                id="add-box"
                className="info-padding continue-box"
                onClick={() => setContinue(true)}
              >
                <h1 className={"sm-text" + lg}>Continue</h1>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="sm-text fa fa-arrow"
                />
              </div>
            </div>
          </div>
        ) : (
          <div id="detail-popup-info" className="fixed-detail">
            <div>
              <div>
                <div className="info-padding">
                  <div className="section">
                    <img className="custom-icon" src={Soup} alt="" />
                    <h1 className={"md-text" + lg}>Base Soup</h1>
                  </div>

                  <div className="section choice-section">
                    {Array(8)
                      .fill(0)
                      .map((index) => (
                        <div className="choice-clr"></div>
                      ))}
                  </div>
                </div>
              </div>
              <hr className="gray-line"></hr>

              {lastChoice === false ? (
                <div id="custom-choice">
                  {Array(8)
                    .fill(0)
                    .map((index) => (
                      <div className="radio-box">
                        <input type="radio"></input>
                        <div>
                          <h1 className="bracket">Shoyu Soup</h1>
                          <p className="xm-text">
                            Soybeans paste and dried fish stock
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div id="note-section">
                  <h1 className="bracket">Note to our cook</h1>
                  <textarea
                    className={"bracket comment-box" + lg}
                    rows="8"
                    cols="50"
                    placeholder={placeHolderRequest()}
                    value={commentRequest}
                    onChange={Request}
                  ></textarea>
                </div>
              )}
            </div>

            <div id="continue-box-section" className="section">
              <div
                id="add-box"
                className="custom-padding continue-box black-box"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="sm-text fa-arrow-left"
                />
                <h1 className={"sm-text" + lg} onClick={()=> BackFunction() }>Back</h1>
              </div>
              {lastChoice === false ? (
                <div
                  id="add-box"
                  className="custom-padding continue-box black-box"
                  onClick={() => setLastChoice(true)}
                >
                  <h1 className={"sm-text" + lg}>Next</h1>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="sm-text fa-arrow"
                  />
                </div>
              ) : (
                <div
                  id="add-box"
                  className="custom-padding continue-box gray-box"
                  onClick={() => setLastChoice(true)}
                >
                  <h1 className={"sm-text" + lg}>Order</h1>
                </div>
              )}
            </div>
          </div>
        )}
        ;
      </div>
    </div>
  );
}
