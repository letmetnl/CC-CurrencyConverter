import React, { useEffect, useState } from "react";
import AuthService from "../services/authService";
import CurrencyRow from "./CurrencyRow";

const API_URL = "https://api.exchangeratesapi.io/latest";

export default function Homepage() {
  const currentUser = AuthService.getCurrentUser();
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountFrom, setAmountFrom] = useState(true);
  let fromAmount, toAmount;
  if (amountFrom) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }
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
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []); // [] means we only wanna call this for once at app loading
  // useeffect for handling change in currency and in order to change exchange rates accordingly
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${API_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handleChangeInFromAmount(e) {
    setAmount(e.target.value);
    setAmountFrom(true);
  }
  function handleChangeInToAmount(e) {
    setAmount(e.target.value);
    setAmountFrom(false);
  }
  return (
    <div className="Homepage-wrapper">
      <h3>
        Ever Wondered ..? What would have been your worth <br /> if you were in
        different economical environment :) ok then,{" "}
      </h3>
      <h1>Lets Check</h1>
      <CurrencyRow
        currencyOptions={currencyOptions} // passing as props
        preSelectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleChangeInFromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        preSelectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleChangeInToAmount}
      />
    </div>
  );
}
