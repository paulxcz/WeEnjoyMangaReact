import { Img, Text } from "@chakra-ui/react";
import React from "react";


export const AnimeCard = ({imgId, animeName ,animeDescription='kakakkaka'}) => {
 
  
  return (
    <div className="card-anime">
      <img src={`/src/assets/img/anime${imgId}.png` || `/src/assets/img/noImage.jpg` } />
      <div className="descriptions">
        <Text as={'h1'} fontWeight={'extrabold'} fontSize={'2xl'}>{animeName}</Text>
        <Text fontSize={"lg"} noOfLines={9} fontWeight={"bold"}>
          {animeDescription}
        </Text>
      </div>
    </div>
  );
};
