export default function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image-container ${props.isOpen ? 'popup_opened' : ''}`}>
      <figure className="popup__image-container">
        <button type="button" className="popup__close-btn" onClick={props.onClose} />
        <img className="popup__image" src={props.selectedCard.link} alt={props.selectedCard.name} />
        <figcaption className="popup__image-caption">{props.selectedCard.name}</figcaption>
      </figure>
    </div>
  );
}