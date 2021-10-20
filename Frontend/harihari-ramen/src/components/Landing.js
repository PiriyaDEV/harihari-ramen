import React, { useState , Component } from "react";
import tableService from "../services/table.service.js";
import { useParams } from "react-router";
import { useTranslation } from 'react-i18next';

//CSS
import "../css/page.css";
import "../css/text.css";
import "../css/page/Landing.css";
import "../css/element/languageBtn.css";

//Image
import RamenPic from "../images/ramen_main@2x.png";

function Landing(props) {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
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
            <h1 className="bg-text center-text table-text">{t('table')} {numTable}</h1>
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
              <p className="ssm-text" onClick={() => changeLanguage('th')}>TH</p>
              <p className="ssm-text slash">|</p>
              <p className="ssm-text" onClick={() => changeLanguage('jp')}>JP</p>
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

export default class MainLanding extends Component {

  constructor(props) {
      super(props);
      this.state = {
        link: [{
          "table_id": '1',
          "guest_uid": 'aed1',
        },
        {
          "table_id": '2',
          "guest_uid": 'aed2',
        },
        {
          "table_id": '3',
          "guest_uid": 'aed3',
        },
        {
          "table_id": '4',
          "guest_uid": 'aed4',
        },
        {
          "table_id": '5',
          "guest_uid": 'aed5',
        },],
      };
    }

  // componentWillMount() {
  //     this.getLink(); 
  // }

  // async getLink() {
  //     return await tableService
  //       .getTables()
  //       .then((data) => this.setState({ link: data }));
  //   }

  render() {
    let linked = this.state.link
      return (
          <div>
              <Landing table={linked}/>
          </div>
      )
  }
}

