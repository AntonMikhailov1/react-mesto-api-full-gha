import React from "react";

export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-btn" onClick={props.onClose}/>
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={props.name}
          action="submit"
          className="popup__form"
          method="post"
          noValidate=""
          onSubmit={props.onSubmit}
        >
          {props.children}

          <button className="popup__submit-btn" type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  );
}