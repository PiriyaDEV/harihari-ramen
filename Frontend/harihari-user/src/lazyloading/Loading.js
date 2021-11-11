import React, { Component } from "react";
import LottieAnimation from "./Lottie";
import home from "./loading.json";
import "../css/page.css";
import "./lottie.css"

export default class Loading extends Component {
  render() {
    return (
      <div id="lottie-container">
        <div>
          <LottieAnimation lotti={home} height={300} width={300} />
        </div>
      </div>
    );
  }
}
