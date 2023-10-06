import React from "react";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_info-tooltip ${
        props.isOpen ? `popup_opened` : ""
      }`}
    >
      <div className="popup__container">
        <div
          className={`popup__info-tooltip ${
            props.isSuccess
              ? "popup__info-tooltip_success"
              : "popup__info-tooltip_fail"
          }`}
        ></div>
        <h2 className="popup__title popup__title_type_info-tooltip">
          {props.isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
        <button
          type="button"
          className="popup__close-btn"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}
export default InfoTooltip;
