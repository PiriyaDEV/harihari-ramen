import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export default function Payment() {
  const [data, setData] = useState("Not Found");

  function checkOut(value) {
    let web = "http://localhost:3001/";
    let path = web + "receipt/" + value;

    setData(value);
    window.location = path;
  }

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
