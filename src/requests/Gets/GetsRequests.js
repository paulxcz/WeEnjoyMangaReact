export const getAnimesToCheck = async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const url = "https://localhost:44328/api/Anime/AnimesToCheck";
  const response = await fetch(url, requestOptions);
  if (!response.ok) throw new Error("WARN", response.status);

  const data = await response.json();
  return data;
};

export const getAnimeById = async (animeId) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const url = `https://localhost:44328/api/Anime/AnimeById/${animeId}`;
  const response = await fetch(url, requestOptions);
  if (!response.ok) throw new Error("WARN", response.status);

  const data = await response.json();
  return data;
};
