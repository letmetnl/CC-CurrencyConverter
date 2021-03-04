import React, { useEffect } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

const API_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  return (
    <div className="App">
      <h1>Lets Convert</h1>
      <CurrencyRow />
      <div className="equals">=</div>
      <CurrencyRow />
    </div>
  );
}

export default App;
