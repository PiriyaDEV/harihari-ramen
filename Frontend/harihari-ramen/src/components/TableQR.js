import React, { Component } from "react";

//Service
import tableService from "../services/table.service.js";

//CSS
import "../css/page.css";
import "../css/page/TableQR.css";

const link = ["2", "3", "4", "1", "10", "20"];

export default class TableQR extends Component {

    constructor(props) {
        super(props);
        this.state = {
            link : [],
        }
    }

  makeQR(value) {
    let web = "http://localhost:3000/";
    let qrlink =
      "https://chart.googleapis.com/chart?cht=qr&chl=" +
      web +
      "table/" +
      value +
      "&chs=160x160&chld=L|0";

    return qrlink;
  }

  openLink(value) {
    let web = "http://localhost:3000/";
    let path = web + "table/" + value;
    window.location = path;
  }

  async getLink() {
    return await tableService
      .getTables()
      .then((data) => this.setState( {link: data} ));
  }
  
  render() {
      
    // let linked = this.state.link;
    // console.log(this.state.link)
    return (
      <div id="table-qr" className="section">
        <div className="page-container">
          {link.map((index) => (
            <div key={index}>
              <h1 onClick={() => this.openLink(index)}>{index}</h1>
              <img className="qr-code" src={this.makeQR(index)} alt=""></img>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
