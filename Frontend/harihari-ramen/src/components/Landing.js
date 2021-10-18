import React from "react";
import { useParams } from "react-router";

//CSS
import "../css/page.css";
import "../css/text.css";
import "../css/page/Landing.css";

//Image
import RamenPic from "../images/ramen_main@2x.png";

export default function Landing() {
  const { id } = useParams();

  return (
    <div id="landing" className="section">
      <div id="landing-container" className="section page-container">
        <div>
          <img id="ramen-pics" src={RamenPic} alt="" />
        </div>
        <div>
          <h1 className="bg-text center-text table-text">TABLE {id}</h1>
          <p className="nm-text center-text table-p">
            Do you which to continue <br /> with this table number?
          </p>
          <div className="section">
            <button
              onClick={() => linkToHome(id)}
              className="red-btn center-text"
            >
              continue
            </button>
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
