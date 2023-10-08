const baseUrl = "https://localhost:3000";

export function request(url, method, body) {
  const headers = { "Content-Type": "application/json" };
  const config = { method, headers, credentials: "include" };
  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }
  return fetch(`${baseUrl}${url}`, config).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  });
}

export function signUpUser({ password, email }) {
  return request("/signup", "POST", { password, email });
}

export function signInUser({ password, email }) {
  return request("/signin", "POST", { password, email });
}

export function signOutUser() {
  return request("/users/me", "DELETE");
}

export function getContent() {
  return request("/users/me", "GET");
}

export function getProfileInfo() {
  return request("/users/me", "GET");
}

export function setProfileInfo({ name, about }) {
  return request("/users/me", "PATCH", { name, about });
}

export function setAvatar({ avatar }) {
  return request("/users/me/avatar", "PATCH", { avatar });
}

export function getInitialCards() {
  return request("/cards", "GET");
}

export function addCard({ name, link }) {
  return request("/cards", "POST", { name, link });
}

export function deleteCard(id) {
  return request(`/cards/${id}`, "DELETE");
}

export function changeLikeCardStatus(id, likeStatus) {
  const methodName = likeStatus ? "PUT" : "DELETE";
  return request(`/cards/${id}/likes`, methodName);
}
