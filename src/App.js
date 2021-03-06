import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
// import CurrencyRow from "./components/CurrencyRow";
import AuthService from "./services/authService";

import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./components/Homepage";

// const API_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };
  // const [currencyOptions, setCurrencyOptions] = useState([]);
  // const [fromCurrency, setFromCurrency] = useState();
  // const [toCurrency, setToCurrency] = useState();
  // const [exchangeRate, setExchangeRate] = useState();
  // const [amount, setAmount] = useState(1);
  // const [amountFrom, setAmountFrom] = useState(true);
  // let fromAmount, toAmount;
  // if (amountFrom) {
  //   fromAmount = amount;
  //   toAmount = amount * exchangeRate;
  // } else {
  //   toAmount = amount;
  //   fromAmount = amount / exchangeRate;
  // }
  // // console.log(currencyOptions);
  // // will useEffect which takes function and array as params wherein any changes in elements of array cause rerendering
  // useEffect(() => {
  //   fetch(API_URL)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const firstCurrency = Object.keys(data.rates)[0];
  //       // console.log(data);
  //       setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
  //       setFromCurrency(data.base);
  //       setToCurrency(firstCurrency);
  //       setExchangeRate(data.rates[firstCurrency]);
  //     });
  // }, []); // [] means we only wanna call this for once at app loading
  // // useeffect for handling change in currency and in order to change exchange rates accordingly
  // useEffect(() => {
  //   if (fromCurrency != null && toCurrency != null) {
  //     fetch(`${API_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
  //       .then((res) => res.json())
  //       .then((data) => setExchangeRate(data.rates[toCurrency]));
  //   }
  // }, [fromCurrency, toCurrency]);

  // function handleChangeInFromAmount(e) {
  //   setAmount(e.target.value);
  //   setAmountFrom(true);
  // }
  // function handleChangeInToAmount(e) {
  //   setAmount(e.target.value);
  //   setAmountFrom(false);
  // }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          CC:Converter
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          {/* <Route exact path={["/", "/home"]} component={Home} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/homepage" component={Homepage} />
          {/* <Route path="/user" component={BoardUser} /> */}
        </Switch>
      </div>
    </div>
  );
}

export default App;
