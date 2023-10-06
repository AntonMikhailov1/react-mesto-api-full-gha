import React, { useState } from "react";
import AuthForm from "./AuthForm";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSignIn({ email, password });
  }

  return (
    <AuthForm
      email={email}
      password={password}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
      titleText="Вход"
      buttonText="Войти"
      isSignedUp={false}
    />
  );
}

export default Login;
