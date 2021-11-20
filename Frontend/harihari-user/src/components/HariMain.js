import React from "react";

//CSS
import "../css/components/HariMain.css";
import "../css/page.css";
import "../css/text.css";

//Image
import fullLogo from "../images/Full Logo.png";

export default function HariMain() {
  return (
    <div id="harimain" className="section">
      <div id="harimain-container" className="section page-container">
        <img id="harimain-logo" src={fullLogo} alt=""></img>
      </div>
    </div>
  );
}
