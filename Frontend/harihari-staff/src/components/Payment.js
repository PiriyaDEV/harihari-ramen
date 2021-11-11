import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import tableService from "../services/table.service.js";

export default function Payment() {
  const [data, setData] = useState("Not Found");

  const checkOut = async (value) => {
    let web = "http://localhost:3001/";
    let path = web + "receipt/" + value;

    let result = await tableService.checkout(value);

    if (result.success) {
      setData(value);
      window.location = path;
    } else {
      window.location = web + "invalid";
    }
  };

  return (
    <div>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) checkOut(result.text);
          else setData("Not Found");
        }}
      />
      <p>{data}</p>
    </div>
  );
}
