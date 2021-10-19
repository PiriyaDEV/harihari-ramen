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

  componentWillMount() {
    this.getLink();
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
      .then((data) => this.setState({ link: data }));
  }

  render() {
    let link = this.state.link;

    return (
      <div id="table-qr" className="section">
        <div className="page-container">
          {/* <button onClick={() => this.getLink()}>Click Get Link</button> */}
          {link.map((table) => (
            <div key={table.guest_uid}>
              <h1 onClick={() => this.openLink(table.guest_uid)}>
                {" "}
                Table {table.table_id}
              </h1>
              <img
                className="qr-code"
                src={this.makeQR(table.guest_uid)}
                alt=""
              ></img>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
