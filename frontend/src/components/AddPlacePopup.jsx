import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  useEffect(() => {
    if (props.isOpen) {
      setName("");
      setLink("");
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="elements"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <input
        className="popup__field popup__field_input_name"
        type="text"
        name="name"
        placeholder="Название"
        required=""
        minLength={2}
        maxLength={30}
        onChange={handleNameChange}
        value={name}
      />
      <span className="name-error popup__field-error" />
      <input
        className="popup__field popup__field_input_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required=""
        onChange={handleLinkChange}
        value={link}
      />
      <span className="link-error popup__field-error" />
    </PopupWithForm>
  );
}
