import React, { useEffect, useState } from "react";
import { AnimeCard } from "../Components/AnimeCard/AnimeCard";
import { Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import { getAnimes } from "../requests/Posts/PostRequests";

export const AnimesRoute = () => {
  const [dataAnimes, setDataAnimes] = useState(null);

  useEffect(() => {
    const body = {idState:1};
    getAnimes(body).then((animes) => {
      setDataAnimes(animes.data);
    });
  }, []);

  return (
    <SimpleGrid
      columns={dataAnimes ? 3 : 1}
      spacing={10}
      display={dataAnimes ? "grid" : "flex"}
      minH={"80vh"}
      justifyContent={dataAnimes ? "" : "center"}
      alignItems={dataAnimes ? "" : "center"}
    >
      {dataAnimes ? (
        dataAnimes.map((anime) => (
          <AnimeCard
            imgId={anime.animeId}
            animeName={anime.animeName}
            animeDescription={anime.sinopsis}
            key={anime.animeId}
          />
        ))
      ) : (
        <Spinner size={"xl"}></Spinner>
      )}
    </SimpleGrid>
  );
};
