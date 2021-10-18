import React from "react";
import { useParams } from "react-router";

//CSS
import "../css/page.css";
import "../css/text.css";
import "../css/page/Home.css";
import "../css/element/progressBar.css";

//Image
import RamenPic from "../images/ramen_main@2x.png";

export default function Home() {
  const { id } = useParams();
  const { useState } = React;
  const [width, setWidth] = useState(0);
  const intermediaryBalls = 2;
  const calculatedWidth = (width / (intermediaryBalls + 1)) * 100;

  return (
    <div id="home" className="section">
      <div id="home-container" className="page-container">
        <div>
          <div id="table-box">
            <div className="lg-box">
              <div className="lg-text section">
                <p className="ssm-text">TH</p>
                <p className="ssm-text slash">|</p>
                <p className="ssm-text">JP</p>
              </div>
            </div>
            <div id="table-text-box" className="section">
              <div>
                <img id="ramen-icon" src={RamenPic} alt="" />
              </div>
              <div>
                <h1 className="title">TABLE {id}</h1>
                <h2 className="sm-text">Check-in time: 15:45:03</h2>
              </div>
            </div>
          </div>

          <div id="order-status">
            <h1 className="md-text">Order Status</h1>
            <p className="bracket">(1 order left)</p>

            <p className="sm-text order-p">
              We have received your order <br /> Please wait for your order to
              be prepare
            </p>

            <div className="timeline">
              <div
                className="timeline__progress"
                style={{ width: `${calculatedWidth}%` }}
              />
              {timeLineBalls(
                intermediaryBalls + 2,
                setWidth,
                width,
                "Received Order"
              )}
            </div>
          </div>
        </div>

        <div id="menu-section">
          <div class="menu-container">
            <div className="menu-box">
              <h1 className="md-text">
                Order <br />
                Food
              </h1>
            </div>
            <div className="menu-box">
              <h1 className="md-text">
                Order <br />
                History
              </h1>
            </div>
          </div>

          <div class="menu-container">
            <div className="menu-box">
              <h1 className="md-text">
                Call <br />
                Waiter
              </h1>
            </div>
            <div className="menu-box">
              <h1 className="md-text">
                Check <br />
                Out
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const timeLineBalls = (n, onClick, current, text) =>
  Array(n)
    .fill(0)
    //ใช้ index ในการเปลี่ยน bar
    .map((i, index) => (
      <div id="tl-ball">
        <div
          key={index}
          className={`timeline__ball ${current >= index ? "active" : null}`}
          onClick={() => onClick(1)}
        ></div>
        <h1 className="pg-text bracket">{text}</h1>
      </div>
    ));
