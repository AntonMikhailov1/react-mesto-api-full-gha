import React, { useState } from "react";
import AuthForm from "./AuthForm";

function Register(props) {
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
    props.onSignUp({ email, password });
  }

  return (
    <AuthForm
      email={email}
      password={password}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
      titleText="Регистрация"
      buttonText="Зарегистрироваться"
      isSignedUp={true}
    />
  );
}
export default Register;
