import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = currentUser._id === props.card.owner;
  const isLiked = props.card.likes.some((id) => id === currentUser._id);
  const cardLikeButtonClassName = `element__like-btn ${
    isLiked ? 'element__like-btn_active' : ''
  }`;

  function handleCardClick() {
    props.onCardClick(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <li className="element">
      {isOwn && (
        <button
          type="button"
          className="element__delete-btn"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="element__image"
        alt={props.card.name}
        src={props.card.link}
        onClick={handleCardClick}
      />
      <div className="element__group">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <span className="element__like-counter">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </li>
  );
}
