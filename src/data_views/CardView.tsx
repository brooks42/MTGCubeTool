
import {
    VStack,
    Box,
    Text,
    HStack,
    Spacer,
    AspectRatio
} from '@chakra-ui/react'
import * as React from 'react'
import { Card } from '../CardModels'

interface CardViewProps {
    card: Card
}

export function CardView(props: CardViewProps) {

    // TODO: art can be grabbed at https://api.scryfall.com/cards/${card.identifiers.scryfallId}?format=image

    function cardColorsToBackgroundColor() {
        let colors = props.card.colors

        if (colors.length === 0) {
            return "gray.300"
        }

        if (colors.length > 1) {
            return "yellow.500"
        }

        let cardColor = colors[0]

        switch (cardColor) {
            case "W":
                return "yellow.200"
            case "B":
                return "gray.800"
            case "U":
                return "teal.400"
            case "G":
                return "green.600"
            case "R":
                return "red.600"
        }

        return "green.500"
    }

    function powerToughnessBox() {
        return props.card.power ? (
            <Box bgColor="gray.100" p={3} borderRadius="md" textAlign="right" w="100%">
                <Text color="black">{props.card.power}/{props.card.toughness}</Text>
            </Box>) : null
    }

    return (
        <AspectRatio ratio={2.5 / 3.5} minW={25} minH={100} margin={3}>
            <Box bgColor={cardColorsToBackgroundColor()} borderRadius={2}>
                <VStack p={3} h="100%">
                    <HStack bgColor="gray.100" w="100%" p={3} borderRadius="md">
                        <Text color="black">{props.card.name}</Text>
                        <Spacer />
                        <Text color="black">{props.card.manaCost}</Text>
                    </HStack>
                    <Spacer />
                    <Box bgColor="gray.100" p={3} borderRadius="md" w="100%" minH="10%">
                        <Text color="black">{props.card.text}</Text>
                    </Box>
                    {powerToughnessBox()}
                </VStack>
            </Box>
        </AspectRatio>
    )
}