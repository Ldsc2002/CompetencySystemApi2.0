import React from "react";
import Autorization from "./Autorization";
import Transfer from "./Transfer";

export default function Movimientos() {

  return (
    <React.Fragment>
        <Transfer />
        <Autorization />
    </React.Fragment>
  );
}
