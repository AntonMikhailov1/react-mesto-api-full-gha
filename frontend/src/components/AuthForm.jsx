import React from "react";
import { Link } from "react-router-dom";

function AuthForm(props) {
  return (
    <form className="auth__form" onSubmit={props.handleSubmit} noValidate>
      <h2 className="auth__title">{props.titleText}</h2>
      <input
        className="auth__field"
        type="email"
        name="email"
        value={props.email}
        placeholder="Email"
        required=""
        onChange={props.handleEmailChange}
        autoComplete="off"
      />

      <input
        className="auth__field"
        name="password"
        type="password"
        value={props.password}
        placeholder="Пароль"
        required=""
        onChange={props.handlePasswordChange}
        autoComplete="off"
      />

      <button className="auth__submit-btn" type="submit">
        {props.buttonText}
      </button>

      {props.isSignedUp && <Link to="/signin" className="auth__link">
        Уже зарегистрированы? Войти
      </Link>}
    </form>
  );
}

export default AuthForm;
