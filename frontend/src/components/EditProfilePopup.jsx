import { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      submitText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        className="popup__field popup__field_input_name"
        type="text"
        name="name"
        value={name}
        required=""
        minLength={2}
        maxLength={40}
        onChange={handleNameChange}
      />
      <span className="name-error popup__field-error" />
      <input
        className="popup__field popup__field_input_about"
        type="text"
        name="about"
        value={description}
        required=""
        minLength={2}
        maxLength={200}
        onChange={handleDescriptionChange}
      />
      <span className="about-error popup__field-error" />
    </PopupWithForm>
  );
}
