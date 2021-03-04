import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

const API_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  // console.log(currencyOptions);
  // will useEffect which takes function and array as params wherein any changes in elements of array cause rerendering
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        // console.log(data);
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
      });
  }, []); // [] means we only wanna call this for once at app loading

  return (
    <div className="App">
      <h1>Lets Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions} // passing as props
        preSelectedCurrency={fromCurrency}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        preSelectedCurrency={toCurrency}
      />
    </div>
  );
}

export default App;
