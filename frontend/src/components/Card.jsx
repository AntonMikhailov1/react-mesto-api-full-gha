import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  const handleCardClick = () => {
    props.onCardClick(props.card)
  }

  const handleLikeClick = () =>{
    props.onCardLike(props.card)
  }

  const handleDeleteClick = () => {
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
          <button type="button" className={`element__like-btn ${isLiked ? 'element__like-btn_active' : ''}`} onClick={handleLikeClick} />
          <span className="element__like-counter">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </li>
  );
}
