import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import EmailContainer from "./EmailContainer";
import logo from "../images/logo.svg";

export default function Header({userEmail, onSignOut}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого Mesto" />

      <Routes>
        <Route
          exact path="/signin"
          element={
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
          }
        />

        <Route
          exact path="/signup"
          element={
            <Link to="/signin" className="header__link">
              Войти
            </Link>
          }
        />

        <Route exact path="/" element={<EmailContainer userEmail={userEmail} onSignOut={onSignOut}/>} />

      </Routes>
    </header>
  );
}
