import { useEffect, useState, useCallback } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import CurrentUserContext from "../contexts/CurrentUserContext.jsx";

import "../index.css";

import * as api from "../utils/api";

import Main from "./Main";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";

import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import AppLayout from "./AppLayout";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, seIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loggedIn &&
      Promise.all([api.getProfileInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
  }, [loggedIn]);

  const handleCardDelete = useCallback(async (card) => {
    try {
      const data = await api.deleteCard(card._id);
      if (data) {
        setCards((state) => state.filter((item) => item._id !== card._id));
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleCardLike = useCallback(
    async (card) => {
      const isLiked = card.likes.some((item) => item === currentUser._id);
      try {
        const data = await api.changeLikeCardStatus(card._id, !isLiked);
        if (data) {
          setCards((state) =>
            state.map((item) => (item._id === card._id ? data : item))
          );
        }
      } catch (err) {
        console.log(err);
      }
    },
    [currentUser._id]
  );

  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    seIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }, []);

  const handleUpdateUser = useCallback(
    async (userData) => {
      try {
        const data = await api.setProfileInfo(userData);
        if (data) {
          setCurrentUser(data);
          closeAllPopups();
        }
      } catch (err) {
        console.log(err);
      }
    },
    [closeAllPopups]
  );

  const handleUpdateAvatar = useCallback(
    async (avatarData) => {
      try {
        const data = await api.setAvatar(avatarData);
        if (data) {
          setCurrentUser(data);
          closeAllPopups();
        }
      } catch (err) {
        console.log(err);
      }
    },
    [closeAllPopups]
  );

  const handleAddPlace = useCallback(
    async (cardData) => {
      try {
        const data = await api.addCard(cardData);
        if (data) {
          setCards([data, ...cards]);
          closeAllPopups();
        }
      } catch (err) {
        console.log(err);
      }
    },
    [cards, closeAllPopups]
  );

  const handleEditProfileClick = useCallback(() => {
    setIsEditProfilePopupOpen(true);
  }, []);

  const handleEditAvatarClick = useCallback(() => {
    seIsEditAvatarPopupOpen(true);
  }, []);

  const handleAddPlaceClick = useCallback(() => {
    setIsAddPlacePopupOpen(true);
  }, []);

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }, []);

  const handleUserSignUp = useCallback(
    async (userData) => {
      try {
        const data = await api.signUpUser(userData);
        if (data) {
          setIsSignUpSuccess(true);
          navigate("/sign-in", { replace: true });
        }
      } catch (err) {
        setIsSignUpSuccess(false);
        console.log(err);
      } finally {
        setIsInfoTooltipOpen(true);
      }
    },
    [navigate]
  );

  const handleUserSignIn = useCallback(
    async (userData) => {
      try {
        const data = await api.signInUser(userData);
        if (data) {
          setLoggedIn(true);
          setUserEmail(userData.email);
          navigate("/", { replace: true });
        }
      } catch (err) {
        setIsSignUpSuccess(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      }
    },
    [navigate]
  );

  const handleUserSingOut = useCallback(async () => {
    try {
      const data = await api.signOutUser();
      if (data) {
        setLoggedIn(false);
        setUserEmail("");
        navigate("/sign-in", { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  }, [navigate]);

  useEffect(() => {
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    const userLoginCheck = async () => {
        await sleep(1000);

        const userData = await api.getProfileInfo();
        if (!userData) {
          throw new Error("Данные пользователя отсутствует");
        }
        setUserEmail(userData.email);
        setLoggedIn(true);
        navigate("/", { replace: true });
      };

      userLoginCheck().catch(err => {console.error(err)});
  }, [navigate]);

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout userEmail={userEmail} onSignOut={handleUserSingOut} />
            }
          >
            <Route
              index
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              }
            />

            <Route
              path="/sign-up"
              element={<Register onSignUp={handleUserSignUp} />}
            />

            <Route
              path="/sign-in"
              element={<Login onSignIn={handleUserSignIn} />}
            />

            <Route path="*" element={<Navigate to="/sign-in" />} />
          </Route>
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <ImagePopup
          selectedCard={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSignUpSuccess}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}
