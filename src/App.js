import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

const API_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  console.log(currencyOptions);
  // will useEffect which takes function and array as params wherein any changes in elements of array cause rerendering
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
      });
  }, []); // [] means we only wanna call this for once at app loading

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
