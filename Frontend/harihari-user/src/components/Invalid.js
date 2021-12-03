//Import
import React from "react";

//CSS
import "../css/components/HariMain.css";
import "../css/page.css";
import "../css/text.css";

//Image
import fullLogo from "../images/Full Logo.png";

export default function Invalid() {
  return (
    <div id="invalid" className="section">
      <div id="invalid-container" className="page-container">
        <div>
          <div className="section">
            <img id="harimain-logo" src={fullLogo} alt=""></img>
          </div>
          <h1 className="title">Oops! Something went wrong!</h1>
          <h1 className="nm-text">
            Don't worry! You may try scanning the QR code again <br class="br-mobile"/>
            or just ask for our staff to help you.
          </h1>
        </div>
      </div>
    </div>
  );
}
