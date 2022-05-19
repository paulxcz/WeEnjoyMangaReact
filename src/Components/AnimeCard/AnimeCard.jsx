import { Text } from "@chakra-ui/react";
import React from "react";


export const AnimeCard = ({imgId, animeName ,animeDescription='kakakkaka'}) => {
 
  
  return (
    <div className="card-anime">
      <img src={`/src/assets/img/anime${imgId}.png`} />
      <div className="descriptions">
        <Text as={'h1'} fontWeight={'extrabold'} fontSize={'2xl'}>{animeName}</Text>
        <Text fontSize={"lg"} noOfLines={9} fontWeight={"bold"}>
          {animeDescription}
        </Text>
        <button>
          <i className="fab fa-youtube"></i>
          <a href="https://www.youtube.com/watch?v=t6QI3nNSfMA" target="blank">
            Ver trailer on YouTube
          </a>
        </button>
      </div>
    </div>
  );
};
