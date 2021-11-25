//Import
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import menuService from "../../services/menu.service";

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

//Custom Ramen
import WoodenTable from "../../images/Custom Ramen Pic/woodentable.png";

//Choice Ramen Icon
import Chili from "../../images/icon/custom-ramen/icons8-chili-pepper-90@2x.png";
import Garlic from "../../images/icon/custom-ramen/icons8-garlic-90@2x.png";
import Note from "../../images/icon/custom-ramen/icons8-note-90@2x.png";
import Richness from "../../images/icon/custom-ramen/icons8-olive-oil-90@2x.png";
import SpringOnion from "../../images/icon/custom-ramen/icons8-onion-90@2x.png";
import Pork from "../../images/icon/custom-ramen/icons8-pork-leg-256@2x.png";
import Soup from "../../images/icon/custom-ramen/icons8-soup-plate-64-2@2x.png";
import Noodle from "../../images/icon/custom-ramen/noodle.svg";

//Choice Ramen Images

// Default
import Bowl from "../../images/Custom Ramen Pic/Bowl.png";

export default function CustomRamen(props) {
  const { t } = useTranslation();
  const { lgs } = useParams();
  const [lg, setLg] = useState(" " + lgs);
  const [amountNum, setAmount] = useState(1);
  const [continueClick, setContinue] = useState(false);
  const [lastChoice, setLastChoice] = useState(false);
  const [menuRamen, setMenuRamen] = useState("");
  const [categoryRamen, setCategoryRamen] = useState("");
  const [ramenIcon, setIcon] = useState(Soup);
  const [choiceIndex, setIndex] = useState(0);
  const [inputCategory, setInput] = useState({
    custom: {
      price: 169,
      quantity: 1,
      soup_type: null,
      noodle: null,
      spring_onion: null,
      garlic: null,
      spice: null,
      chashu: null,
      richness: null,
      comment: "",
      images: {
        soup_type: null,
        noodle: null,
        spring_onion: null,
        garlic: null,
        spice: null,
        chashu: null,
        richness: null,
      },
    },
  });

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
    const getDataRamen = async () => {
      await menuService.customRamen().then((data) => {
        setMenuRamen(data);
        setCategoryRamen(data.filter((menu) => menu.en.category === "Broth"));
      });
    };
    if (!menuRamen) {
      getDataRamen();
    }
  }, [menuRamen]);

  let category = [
    {
      name: "Broth",
      icon: Soup,
    },
    {
      name: "Noodle",
      icon: Noodle,
    },
    {
      name: "Spring Onion",
      icon: SpringOnion,
    },
    {
      name: "Garlic",
      icon: Garlic,
    },
    {
      name: "Spiciness Level",
      icon: Chili,
    },
    {
      name: "Chashu",
      icon: Pork,
    },
    {
      name: "Richness Level",
      icon: Richness,
    },
    {
      name: "Notes",
      icon: Note,
    },
  ];

  const setLocalCustom = () => {
    var tempCustom = [];
    tempCustom = JSON.parse(localStorage.getItem("customRamen")) || [];
    tempCustom.push(inputCategory.custom);

    localStorage.setItem("customRamen", JSON.stringify(tempCustom));
    window.location.reload();
  };

  function changeCategory(value) {
    if (value !== 7) {
      setLastChoice(false);
      setCategoryRamen(
        menuRamen.filter((menu) => menu.en.category === category[value].name)
      );
      setIcon(category[value].icon);
    } else {
      setLastChoice(true);
    }
    setIndex(value);
  }

  // console.log(categoryRamen);
  // console.log(menuRamen);

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
      setInput({
        ...inputCategory,
        custom: {
          ...inputCategory.custom,
          quantity: amountNum + 1,
        },
      });
    } else {
      if (amountNum !== 1) {
        setAmount(amountNum - 1);
        setInput({
          ...inputCategory,
          custom: {
            ...inputCategory.custom,
            quantity: amountNum - 1,
          },
        });
      }
    }
  }

  const clickBack = (value) => {
    if (value === 0) {
      setContinue(false);
    } else {
      changeCategory(value - 1);
    }
  };

  const clickNext = (value) => {
    changeCategory(value + 1);
  };

  const Request = (e) => {
    setInput({
      ...inputCategory,
      custom: {
        ...inputCategory.custom,
        comment: e.target.value,
      },
    });
  };

  const selectChoice = (e, images_url) => {
    if (categoryRamen[0].en.category === "Broth") {
      setInput({
        ...inputCategory,
        custom: {
          ...inputCategory.custom,
          soup_type: e.target.value,
          images: {
            ...inputCategory.custom.images,
            soup_type: images_url,
          },
        },
      });
      // { ...inputCategory.custom.images, soup_type: images_url },,
    } else if (categoryRamen[0].en.category === "Noodle") {
      setInput({
        ...inputCategory,
        custom: {
          ...inputCategory.custom,
          noodle: e.target.value,
          images: {
            ...inputCategory.custom.images,
            noodle: images_url,
          },
        },
      });
    } else if (categoryRamen[0].en.category === "Spring Onion") {
      setInput({
        ...inputCategory,
        custom: {
          ...inputCategory.custom,
          spring_onion: e.target.value,
          images: {
            ...inputCategory.custom.images,
            spring_onion: images_url,
          },
        },
      });
    } else if (categoryRamen[0].en.category === "Garlic") {
      setInput({
        ...inputCategory,
        custom: {
          ...inputCategory.custom,
          garlic: e.target.value,
          images: {
            ...inputCategory.custom.images,
            garlic: images_url,
          },
        },
      });
    } else if (categoryRamen[0].en.category === "Spiciness Level") {
      setInput({
        ...inputCategory,
        custom: {
          ...inputCategory.custom,
          spice: e.target.value,
          images: {
            ...inputCategory.custom.images,
            spice: images_url,
          },
        },
      });
    } else if (categoryRamen[0].en.category === "Chashu") {
      setInput({
        ...inputCategory,
        custom: {
          ...inputCategory.custom,
          chashu: e.target.value,
          images: {
            ...inputCategory.custom.images,
            chashu: images_url,
          },
        },
      });
    } else {
      setInput({
        ...inputCategory,
        custom: {
          ...inputCategory.custom,
          richness: e.target.value,
          images: {
            ...inputCategory.custom.images,
            richness: images_url,
          },
        },
      });
    }
  };

  // console.log(inputCategory);
  // console.log(props.menu);
  return (
    <div id="detail-popup-section" className="section popup">
      <div id="detail-popup" className="custom-width page-container">
        <img
          className="close-popup"
          src={closeIcon}
          alt=""
          onClick={props.back}
        ></img>

        <div
          id="custom-img-section"
          className="section"
          style={{
            backgroundImage: `url(${WoodenTable})`,
          }}
        >
          <img className="custom-img" src={Bowl} alt="" />

          {inputCategory && (
            <img
              className="custom-img custom-abs"
              src={inputCategory.custom.images.soup_type}
              alt=""
            />
          )}

          {inputCategory && (
            <img
              className="custom-img custom-abs"
              src={inputCategory.custom.images.noodle}
              alt=""
            />
          )}

          {inputCategory && (
            <img
              className="custom-img custom-abs"
              src={inputCategory.custom.images.spring_onion}
              alt=""
            />
          )}

          {inputCategory && (
            <img
              className="custom-img custom-abs"
              src={inputCategory.custom.images.garlic}
              alt=""
            />
          )}

          {inputCategory && (
            <img
              className="custom-img custom-abs"
              src={inputCategory.custom.images.chashu}
              alt=""
            />
          )}

          {inputCategory && (
            <img
              className="custom-img custom-abs"
              src={inputCategory.custom.images.richness}
              alt=""
            />
          )}

          {inputCategory && (
            <img
              className="custom-img custom-abs"
              src={inputCategory.custom.images.spice}
              alt=""
            />
          )}
        </div>

        {continueClick === false && (
          <div id="detail-popup-info" className="fixed-detail">
            <div className="info-padding">
              <h1 className={"md-text" + lg}>Custom Ramen</h1>
              <h1 className="sm-text k2d">฿ 169.00</h1>
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
        )}

        {continueClick === true && (
          <div id="detail-popup-info" className="fixed-detail">
            <div>
              <div>
                <div className="info-padding">
                  <div className="section">
                    <img className="custom-icon" src={ramenIcon} alt="" />
                    {categoryRamen && (
                      <h1 className={"md-text" + lg}>
                        {lastChoice !== true ? (
                          <span>
                            {lgs === "th" && (
                              <span>{categoryRamen[0].th.category}</span>
                            )}
                            {lgs === "en" && (
                              <span>{categoryRamen[0].en.category}</span>
                            )}
                            {lgs === "jp" && (
                              <span>{categoryRamen[0].jp.category}</span>
                            )}
                          </span>
                        ) : (
                          <span>Notes</span>
                        )}
                      </h1>
                    )}
                  </div>

                  {inputCategory && (
                    <div className="section choice-section">
                      <div
                        onClick={() => changeCategory(0)}
                        className={`choice-clr ${
                          inputCategory.custom.soup_type !== null
                            ? "choice-done"
                            : null
                        }`}
                      ></div>
                      <div
                        onClick={() => changeCategory(1)}
                        className={`choice-clr ${
                          inputCategory.custom.noodle !== null
                            ? "choice-done"
                            : null
                        }`}
                      ></div>
                      <div
                        onClick={() => changeCategory(2)}
                        className={`choice-clr ${
                          inputCategory.custom.spring_onion !== null
                            ? "choice-done"
                            : null
                        }`}
                      ></div>
                      <div
                        onClick={() => changeCategory(3)}
                        className={`choice-clr ${
                          inputCategory.custom.garlic !== null
                            ? "choice-done"
                            : null
                        }`}
                      ></div>
                      <div
                        onClick={() => changeCategory(4)}
                        className={`choice-clr ${
                          inputCategory.custom.spice !== null
                            ? "choice-done"
                            : null
                        }`}
                      ></div>
                      <div
                        onClick={() => changeCategory(5)}
                        className={`choice-clr ${
                          inputCategory.custom.chashu !== null
                            ? "choice-done"
                            : null
                        }`}
                      ></div>
                      <div
                        onClick={() => changeCategory(6)}
                        className={`choice-clr ${
                          inputCategory.custom.richness !== null
                            ? "choice-done"
                            : null
                        }`}
                      ></div>
                      <div
                        onClick={() => changeCategory(7)}
                        className={`choice-clr ${
                          lastChoice ? "choice-done" : null
                        }`}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
              <hr className="gray-line"></hr>

              {lastChoice === false ? (
                <div id="custom-choice">
                  {categoryRamen &&
                    categoryRamen.map((element, index) => (
                      <div className="radio-box" key={index}>
                        {categoryRamen &&
                          inputCategory &&
                          categoryRamen[0].en.category === "Broth" && (
                            <input
                              type="radio"
                              onChange={(e) =>
                                selectChoice(e, element.image_url)
                              }
                              value={element.choice_id}
                              checked={
                                parseInt(inputCategory.custom.soup_type) ===
                                parseInt(element.choice_id)
                              }
                              name={categoryRamen[0].en.category}
                            ></input>
                          )}
                        {categoryRamen &&
                          inputCategory &&
                          categoryRamen[0].en.category === "Noodle" && (
                            <input
                              type="radio"
                              onChange={(e) =>
                                selectChoice(e, element.image_url)
                              }
                              value={element.choice_id}
                              checked={
                                parseInt(inputCategory.custom.noodle) ===
                                parseInt(element.choice_id)
                              }
                              name={categoryRamen[0].en.category}
                            ></input>
                          )}
                        {categoryRamen &&
                          inputCategory &&
                          categoryRamen[0].en.category === "Spring Onion" && (
                            <input
                              type="radio"
                              onChange={(e) =>
                                selectChoice(e, element.image_url)
                              }
                              value={element.choice_id}
                              checked={
                                parseInt(inputCategory.custom.spring_onion) ===
                                parseInt(element.choice_id)
                              }
                              name={categoryRamen[0].en.category}
                            ></input>
                          )}
                        {categoryRamen &&
                          inputCategory &&
                          categoryRamen[0].en.category === "Garlic" && (
                            <input
                              type="radio"
                              onChange={(e) =>
                                selectChoice(e, element.image_url)
                              }
                              value={element.choice_id}
                              checked={
                                parseInt(inputCategory.custom.garlic) ===
                                parseInt(element.choice_id)
                              }
                              name={categoryRamen[0].en.category}
                            ></input>
                          )}
                        {categoryRamen &&
                          inputCategory &&
                          categoryRamen[0].en.category ===
                            "Spiciness Level" && (
                            <input
                              type="radio"
                              onChange={(e) =>
                                selectChoice(e, element.image_url)
                              }
                              value={element.choice_id}
                              checked={
                                parseInt(inputCategory.custom.spice) ===
                                parseInt(element.choice_id)
                              }
                              name={categoryRamen[0].en.category}
                            ></input>
                          )}
                        {categoryRamen &&
                          inputCategory &&
                          categoryRamen[0].en.category === "Chashu" && (
                            <input
                              type="radio"
                              onChange={(e) =>
                                selectChoice(e, element.image_url)
                              }
                              value={element.choice_id}
                              checked={
                                parseInt(inputCategory.custom.chashu) ===
                                parseInt(element.choice_id)
                              }
                              name={categoryRamen[0].en.category}
                            ></input>
                          )}
                        {categoryRamen &&
                          inputCategory &&
                          categoryRamen[0].en.category === "Richness Level" && (
                            <input
                              type="radio"
                              onChange={(e) =>
                                selectChoice(e, element.image_url)
                              }
                              value={element.choice_id}
                              checked={
                                parseInt(inputCategory.custom.richness) ===
                                parseInt(element.choice_id)
                              }
                              name={categoryRamen[0].en.category}
                            ></input>
                          )}
                        <div>
                          <h1 className={"bracket" + lg}>
                            {lgs === "th" && <span>{element.th.name}</span>}
                            {lgs === "en" && <span>{element.en.name}</span>}
                            {lgs === "jp" && <span>{element.jp.name}</span>}
                          </h1>
                          <p className={"xm-text description" + lg}>
                            {lgs === "th" && (
                              <span>{element.th.description}</span>
                            )}
                            {lgs === "en" && (
                              <span>{element.en.description}</span>
                            )}
                            {lgs === "jp" && (
                              <span>{element.jp.description}</span>
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div id="note-section">
                  <h1 className="bracket">Note to our cook</h1>
                  <textarea
                    className={"bracket comment-box custom-comment" + lg}
                    rows="6"
                    cols="50"
                    placeholder={placeHolderRequest()}
                    onChange={Request}
                    value={inputCategory.custom.comment}
                  ></textarea>
                </div>
              )}
            </div>

            {lastChoice === true && (
              <div>
                <hr className="gray-line"></hr>

                <div id="amount-box" className="section">
                  <div
                    className="num-icon section"
                    onClick={() => clickAmount("minus")}
                  >
                    <img src={minusIcon} alt=""></img>
                  </div>
                  {/* {amountNum && <h1>Test</h1>} */}
                  <h1 className="md-text od-amount">{amountNum}</h1>
                  <div
                    className="num-icon section"
                    onClick={() => clickAmount("plus")}
                  >
                    <img src={plusIcon} alt=""></img>
                  </div>
                </div>
              </div>
            )}

            <div id="continue-box-section" className="section">
              <div
                id="add-box"
                className="custom-padding continue-box black-box"
                onClick={() => clickBack(choiceIndex)}
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="sm-text fa-arrow-left"
                />
                <h1 className={"sm-text" + lg}>Back</h1>
              </div>
              {lastChoice === false ? (
                <div
                  id="add-box"
                  className="custom-padding continue-box black-box"
                  onClick={() => clickNext(choiceIndex)}
                >
                  <h1 className={"sm-text" + lg}>Next</h1>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="sm-text fa-arrow"
                  />
                </div>
              ) : inputCategory.custom.soup_type === null ||
                inputCategory.custom.noodle === null ||
                inputCategory.custom.spring_onion === null ||
                inputCategory.custom.garlic === null ||
                inputCategory.custom.spice === null ||
                inputCategory.custom.chashu === null ||
                inputCategory.custom.richness === null ? (
                <div
                  id="add-box"
                  className="custom-padding continue-box gray-box"
                >
                  <h1 className={"sm-text" + lg}>Order</h1>
                </div>
              ) : (
                <div
                  id="add-box"
                  className="custom-padding done-box section"
                  onClick={() => setLocalCustom()}
                >
                  <h1 className={"sm-text" + lg}>Order</h1>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
