import React, { useState } from "react";
import { useParams } from "react-router";

//CSS
import "../css/page.css";
import "../css/text.css";
import "../css/page/Landing.css";
import "../css/element/languageBtn.css";

//Image
import RamenPic from "../images/ramen_main@2x.png";

export default function Landing(props) {
  const { id } = useParams();
  let numTable = useState(0);
  let haveTable = 0;

  for (const index in props.table) {
    if (props.table[index].guest_uid === id) {
      numTable = props.table[index].table_id;
      haveTable = 1;
    }
  }

  if (haveTable === 0) {
    numTable = 0;
  }

  return (
    <div id="landing" className="section">
      <div id="landing-container" className="section page-container">
        <div>
          <img id="ramen-pics" src={RamenPic} alt="" />
        </div>
        <div>
          {numTable !== 0 ? (
            <h1 className="bg-text center-text table-text">TABLE {numTable}</h1>
          ) : (
            <h1 className="bg-text center-text table-text">INVALID</h1>
          )}

          {numTable !== 0 ? (
            <p className="nm-text center-text table-p">
              Do you which to continue <br /> with this table number?
            </p>
          ) : (
            <p className="nm-text center-text table-p">
              Do you come to wrong site? <br /> contact the waiter
            </p>
          )}

          <div className="section">
            {numTable !== 0 && (
              <button
                onClick={() => linkToHome(id)}
                className="red-btn center-text"
              >
                continue
              </button>
            )}
          </div>
          <div className="lg-box">
            <div className="lg-text section">
              <p className="ssm-text">TH</p>
              <p className="ssm-text slash">|</p>
              <p className="ssm-text">JP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

let linkToHome = (value) => {
  let web = "http://localhost:3000/";
  let path = "home/" + value;
  window.location = web + path;
};
