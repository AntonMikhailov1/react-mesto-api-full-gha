import React from "react";
import { Link } from "react-router-dom";

function EmailContainer(props) {
  return (
    <div className="header__email-container">
      <p className="header__email-text">{props.userEmail}</p>
      <Link to="signin" className="header__sign-out" onClick={props.onSignOut}>
        Выйти
      </Link>
    </div>
  );
}

export default EmailContainer;
