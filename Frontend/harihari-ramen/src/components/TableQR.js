import React, { Component } from "react";

//Service
import tableService from "../services/table.service.js";

//CSS
import "../css/page.css";
import "../css/page/TableQR.css";

export default class TableQR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: [],
    };
  }

  componentDidMount() {
    this.getLink();
  }

  makeQR(value) {
    let web = "http://localhost:3000/";
    let qrlink =
      "https://chart.googleapis.com/chart?cht=qr&chl=" +
      web +
      "en/" +
      "table/" +
      value +
      "&chs=160x160&chld=L|0";

    return qrlink;
  }

  openLink(value) {
    let web = "http://localhost:3000/";
    let path = web + "en/table/" + value;
    window.location = path;
  }

  async getLink() {
    return await tableService
      .getTables()
      .then((data) => this.setState({ link: data }));
  }

  render() {
    let link = this.state.link;

    return (
      <div id="table-qr" className="section">
        <div className="page-container">
          {link.map((index) => (
            <div key={index.guest_uid}>
              <h1 onClick={() => this.openLink(index.guest_uid)}>
                Table {index.table_id}
              </h1>
              <h1>Reserved: {index.reserve}</h1>
              <img
                className="qr-code"
                src={this.makeQR(index.guest_uid)}
                alt=""
              ></img>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
