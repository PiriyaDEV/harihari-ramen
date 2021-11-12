import React, { useState, useEffect, useLayoutEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import tableService from "../services/table.service.js";
import orderService from "../services/order.service.js";

//CSS
import "../css/page.css";
import "../css/text.css";
import "../css/components/Mainpage.css";

//Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function Mainpage() {
  const [link, setLink] = useState();
  const [order, setOrder] = useState();
  const [selectedTable, setCurrentTable] = useState(1);
  const [qrPopup, setQR] = useState(false);
  const [data, setData] = useState("Not Found");
  const [showCam, setShowCam] = useState(false);
  const [orderMenu, setOrderMenu] = useState();
  const [orderSelect, setOrderSelect] = useState(false);

  const checkOut = async (value) => {
    let web = "http://localhost:3001/";
    let path = web + "receipt/" + value;

    let id = value.split("$");

    let result = await tableService.checkout(id[0], id[1]);

    if (result.success) {
      window.location = path;
    }
  };

  useEffect(() => {
    getLink();
  }, []);

  useLayoutEffect(() => {
    if (link) getOrder(link[selectedTable - 1].guest_uid);
  }, [link, selectedTable]);

  function openQR(value) {
    let web = "http://localhost:3000/";
    let path = web + "en/table/" + value;
    window.open(path, "_blank");
  }

  const getLink = async () => {
    return await tableService.getTables().then((data) => {
      setLink(data);
    });
  };

  //   const currentUid = link[selectedTable - 1].guest_uid;

  const getOrder = async (value) => {
    return await orderService
      .getOrderHistory(value)
      .then((data) => setOrder(data));
  };

  const orderClick = (menu) => {
    setOrderMenu(menu);
    setOrderSelect(true);
  };

  return (
    <div>
      {qrPopup !== false && (
        <div id="qr-popup-section" className="section popup">
          <div id="qr-popup" className="page-container">
            {link && (
              <img
                className="qr-code"
                src={
                  "https://chart.googleapis.com/chart?cht=qr&chl=" +
                  "http://localhost:3000/" +
                  "en/" +
                  "table/" +
                  link[0].guest_uid +
                  "&chs=160x160&chld=L|0"
                }
                alt=""
                onClick={() => openQR(link[selectedTable - 1].guest_uid)}
              ></img>
            )}
            <button class="sm-text" onClick={() => setQR(!qrPopup)}>
              Close
            </button>
          </div>
        </div>
      )}

      {orderSelect && (
        <div id="order-info-popup" className="section popup">
          <div className="page-container">
            {orderMenu &&
              orderMenu.map((menu, id) => (
                <div id="order-info-table">
                  <h1>{menu.name}</h1>
                  {menu.comment ? <h1>{menu.comment}</h1> : <h1>-</h1>}
                  <h1>{menu.quantity}</h1>
                  <h1>{menu.price}</h1>
                </div>
              ))}
            <button
              onClick={() => {
                setOrderSelect(!orderSelect);
                setOrderMenu(null);
              }}
              className="sm-text"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div id="mainpage" className="section">
        <div className="page-container">
          <div className="mainpage-container">
            <div>
              <div id="staff-header">
                <h1 className="sm-text bold">HariHari Ramen</h1>
                <h1 className="sm-text">Staff</h1>
              </div>

              <hr className="gray-line"></hr>

              <div id="table-clr-section">
                {link &&
                  link.map((element, i) => (
                    <div
                      className={`table-clr section ${
                        selectedTable === i + 1 ? "table-clr-active" : null
                      }`}
                      key={i}
                      onClick={() => setCurrentTable(i + 1)}
                    >
                      <h1 className="sm-text">{link[i].table_id}</h1>
                    </div>
                  ))}
              </div>

              <div id="table-info" className="staff-box">
                <div id="table-info-header">
                  <div>
                    <h1 className="sm-text bold">Table {selectedTable}</h1>
                    <h1 className="sm-text">Check-in time: 15:45:03</h1>
                  </div>
                  <div>
                    <div>
                      <button
                        className="sm-text red-table-btn"
                        onClick={() => setQR(!qrPopup)}
                      >
                        View QR
                      </button>
                    </div>
                    <div>
                      <button className="sm-text gray-table-btn">
                        Send Waiter
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="status-box table-head">
                    <h1 className="sm-text">Order no.</h1>
                    <h1 className="sm-text">Status</h1>
                  </div>
                  <div id="table-info-container">
                    {order &&
                      order.map((x, i) => (
                        <div className="status-box table-list" key={i}>
                          <h1 className="sm-text section">
                            <FontAwesomeIcon
                              icon={faInfoCircle}
                              className="fa fa-info"
                              onClick={() => orderClick(order[i].menus)}
                            />
                            {i + 1}
                          </h1>
                          <select className="sm-text">
                            <option value="ordered" defaultValue>
                              Ordered
                            </option>
                            <option value="received">Received</option>
                            <option value="prepared">Prepared</option>
                            <option value="serving">Serving</option>
                            <option value="served">Served</option>
                          </select>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="staff-box">
              <div id="payment-header">
                <h1 className="sm-text bold">Scan to Checkout</h1>
                <div>
                  <button
                    className="sm-text red-table-btn"
                    onClick={() => setShowCam(!showCam)}
                  >
                    {showCam !== true ? (
                      <span>Show Cam</span>
                    ) : (
                      <span>Close Cam</span>
                    )}
                  </button>
                </div>
              </div>
              <div id="show-cam" className="staff-box ">
                {showCam && (
                  <BarcodeScannerComponent
                    //   width={500}
                    //   height={500}
                    onUpdate={(err, result) => {
                      if (result) checkOut(result.text);
                      else setData("Not Found");
                    }}
                  />
                )}
              </div>
              {/* <p className="sm-text">{data}</p> */}
              <h1 className="sm-text">Table 1 Check Out : Success {data}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
