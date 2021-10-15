import React from "react";
import { useParams } from "react-router";

import "../css/page.css";

const OrderMenu = () => {
  const { id } = useParams();

  return (
    <div className="section">
      <div className="page-container">
        <h1>Welcome, Table {id}</h1>
      </div>
    </div>
  );
};

export default OrderMenu;

// import React from "react";

// export default function OrderMenu() {
//   return (
//     <div className="section">
//       <div className="page-container">
//         <h1>Welcome, Table #1</h1>
//       </div>
//     </div>
//   );
// }
