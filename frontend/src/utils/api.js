class Api {
  #url;
  #headers;
  #token;

  constructor(options) {
    this.#url = options.baseUrl;
    this.#headers = options.headers;
    this.#token = options.headers.authorization;
  }

  #checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.#url}/cards`, {
      headers: {
        authorization: this.#token,
      },
    }).then((res) => this.#checkResponse(res));
  }

  getProfileInfo() {
    return fetch(`${this.#url}/users/me`, {
      headers: {
        authorization: this.#token,
      },
    }).then((res) => this.#checkResponse(res));
  }

  setProfileInfo(userData) {
    return fetch(`${this.#url}/users/me`, {
      method: "PATCH",
      headers: this.#headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then((res) => this.#checkResponse(res));
  }

  setAvatar(userData) {
    return fetch(`${this.#url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.#headers,
      body: JSON.stringify({
        avatar: userData.avatar,
      }),
    }).then((res) => this.#checkResponse(res));
  }

  addCard(cardData) {
    return fetch(`${this.#url}/cards`, {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    }).then((res) => this.#checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this.#url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.#token,
      },
    }).then((res) => this.#checkResponse(res));
  }

  changeLikeCardStatus(cardId, likeStatus) {
    const methodName = likeStatus ? "PUT" : "DELETE";
    return fetch(`${this.#url}/cards/${cardId}/likes`, {
      method: methodName,
      headers: {
        authorization: this.#token,
      },
    }).then((res) => this.#checkResponse(res));
  }
}

const api = new Api({
  baseUrl: "https://api.antonmikhailov.nomoredomainsrocks.ru",
  headers: {
    // authorization: "31b1a0e8-a4ec-4528-867c-b08055bd3ffe",
    "Content-Type": "application/json",
  },
  credentials: 'include',
});

export default api;
