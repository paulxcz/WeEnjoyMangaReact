import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export const Header = () => {

    const TextBanner = {
        color: 'white'
    }

  return (
    <Flex
        h={'240px'}
        bg='black'
        margin={'0 -20px'}
        flexDir={'column'}
        alignItems={'center'}
        justifyContent={'center'}
    >
        <Heading sx={TextBanner}>We Enjoy Manga</Heading>
        <Text sx={TextBanner}>Las mejores recomendaciones de Manga y Anime en un solo lugar</Text>
    </Flex>
  )
}
