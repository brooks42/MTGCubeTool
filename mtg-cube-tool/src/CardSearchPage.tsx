import {
    VStack,
    Box,
    Text,
    Input,
    HStack,
    Button,
    SimpleGrid,
} from '@chakra-ui/react'
import * as React from 'react'
import { CardView } from './data_views/CardView'
import * as cardlist from './Standard.json'
import { Card, CardList } from './CardModels'


export function CardSearchPage() {
    const [searchString, setSearchString] = React.useState<string | undefined>()
    const [cardNameDict, setCardNameDict] = React.useState(new Map<string, number>())
    const [cardsDict, setCardsDict] = React.useState(new Map<string, Card>())

    var loaded = false

    const handleChange = (event: any) => setSearchString(event.target.value)

    React.useEffect(() => {
        console.log(`searchString: ${searchString}`)

        if (!loaded) {
            loadAllCards()
        }
    })

    function loadAllCards() {

        let listOfAllCards = cardlist as CardList

        let kldSetCards = listOfAllCards.default.data['KHM'].cards

        kldSetCards.map((card) => {
            cardNameDict.set(card.name, 1)
            cardsDict.set(card.name, card)
        })

        setCardNameDict(cardNameDict)
        setCardsDict(cardsDict)
        loaded = true
    }

    function viewsForCardNames() {
        var objs = new Array()

        cardNameDict.forEach((value, key) => {
            if (searchString !== undefined && searchString !== "") {
                if (key.toLowerCase().includes(searchString)) {
                    let card = cardsDict.get(key)
                    if (card) {
                        objs.push(<CardView card={card} />)
                    }
                }
            }
        })

        console.log(`viewsForCardNames() returning ${objs.length} of ${cardsDict.size}`)
        return objs
    }

    return (
        <VStack bgColor="gray.700">
            <Box bgColor="gray.500" p={4} m={4}>
                Search box
                <Text>Hello search</Text>
                <HStack>
                    <Input
                        placeholder="Enter a card name..."
                        onChange={handleChange}
                    />
                    <Button>Search</Button>
                </HStack>
            </Box>
            <SimpleGrid bgColor="gray.500" w="100%" p={4} m={4} columns={5}>
                {viewsForCardNames()}
            </SimpleGrid>
        </VStack>
    )
}
