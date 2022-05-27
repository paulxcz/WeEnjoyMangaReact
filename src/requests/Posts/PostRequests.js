export const getAnimes = async (idState = {}) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(idState);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const url = "https://localhost:44328/api/Anime/GetAnimes";
  const response = await fetch(url, requestOptions);
  if (!response.ok) throw new Error("WARN", response.status);

  const data = await response.json();
  return data;
};

export const postAnime = async (body) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(body);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const url = "https://localhost:44328/api/Anime";
  const response = await fetch(url, requestOptions);
  if (!response.ok) throw new Error("WARN", response.status);

  const data = await response.json();

  return data;
};

export const postAccess = async (body) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(body);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const url = "https://localhost:44328/api/Access";
  const response = await fetch(url, requestOptions);
  if (!response.ok) throw new Error("WARN", response.status);

  const data = await response.json();
  return data;
};

export const confirmAnime = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ Id: id });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const url = "https://localhost:44328/api/Anime/ConfirmAnime";
  const response = await fetch(url, requestOptions);
  if (!response.ok) throw new Error("WARN", response.status);

  const data = await response.json();
  return data;
};

export const confirmMod = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ Id: id });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const url = "https://localhost:44328/api/Anime/ConfirmMod";
  const response = await fetch(url, requestOptions);
  if (!response.ok) throw new Error("WARN", response.status);

  const data = await response.json();
  return data;
};

export const desactivateAnimeByMod = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ Id: id });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const url = "https://localhost:44328/api/Anime/DesactivateAnime";
  const response = await fetch(url, requestOptions);
  if (!response.ok) throw new Error("WARN", response.status);

  const data = await response.json();
  return data;
};

export const desactivateModByUser = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ Id: id });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const url = "https://localhost:44328/api/Anime/DesactivateMod";
  const response = await fetch(url, requestOptions);
  if (!response.ok) throw new Error("WARN", response.status);

  const data = await response.json();
  return data;
};

export const deleteAnimeById = async (animeId) => {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  const url = `https://localhost:44328/api/Anime/DeleteAnimeById/${animeId}`;
  const response = await fetch(url, requestOptions);
  if (!response.ok) throw new Error("WARN", response.status);

  const data = await response.json();
  return data;
};

export const deleteModById = async (modId) => {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  const url = `https://localhost:44328/api/Anime/DeleteModById/${modId}`;
  const response = await fetch(url, requestOptions);
  if (!response.ok) throw new Error("WARN", response.status);

  const data = await response.json();
  return data;
};

export const uploadAnimeById = async (animeData) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(animeData);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const url = "https://localhost:44328/api/Anime/UpdateAnimeById";
  const response = await fetch(url, requestOptions);
  if (!response.ok) throw new Error("WARN", response.status);

  const data = await response.json();
  return data;
};

export const getModInfoByUsername = async (mod) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ username: mod });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const url = "https://localhost:44328/api/Anime/GetModData";

  const response = await fetch(url, requestOptions);
  if (!response.ok) throw new Error("WARN", response.status);
  const data = await response.json();
  return data;
};

export const updateUserData = async (mod) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(mod);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const url = "https://localhost:44328/api/Anime/UpdateUserData";

  const response = await fetch(url, requestOptions);
  if (!response.ok) throw new Error("WARN", response.status);
  const data = await response.json();
  return data;
};

export const registerMod = async (mod) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(mod);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const url = "https://localhost:44328/api/Anime/RegisterMod";
  const response = await fetch(url, requestOptions);
  if (!response.ok) throw new Error("WARN", response.status);
  const data = await response.json();
  return data;
};
