import {
    VStack,
    Box,
    Button,
    Center,
    Text,
    HStack,
    SimpleGrid
} from '@chakra-ui/react'
import * as React from 'react'
import { LoadSetButton } from './parsing/XmlToJson'
import { CardList, Card, CardColor } from './CardModels'
import { CardView } from './data_views/CardView'
import { ChevronUp, ChevronDown } from 'heroicons-react'
import { isEqual } from 'lodash'

interface SearchTerms {
    colors?: CardColor[]
}

const defaultSearchTerms: SearchTerms[] = [{
    colors: ['W']
},
{
    colors: ['U']
},
{
    colors: ['B']
},
{
    colors: ['R']
},
{
    colors: ['G']
}]

export function SetDatasView() {
    const [cardList, setCardList] = React.useState<CardList | undefined>()
    const [searchTermList, setSearchTermList] = React.useState<SearchTerms[]>(defaultSearchTerms)

    function searchViewsForEachTerm() {
        if (cardList === undefined) {
            return <></>
        }

        console.log('getting all search terms')
        return searchTermList.map((searchTerm) => {
            console.log(`search term is ${JSON.stringify(searchTerm)}`)
            return <SearchSegment cards={cardListApplyingSearchTerms(searchTerm, cardList)} searchDescription={`${JSON.stringify(searchTerm)}`} />
        })
    }

    function cardListApplyingSearchTerms(searchTerms: SearchTerms | undefined, cardList: CardList): Card[] {

        let cards: Card[] = []

        for (let setName in cardList.default.data) {
            cards.push(...cardList.default.data[setName].cards)
        }

        // if no search terms are defined, return every card in the set
        if (searchTerms === undefined) {
            return cards
        }

        // else, prune cards out (yeah this is inefficient but whatever for now)
        if (searchTerms.colors) {
            let colorSearch = searchTerms.colors

            cards = cards.filter((card) => {
                return isEqual(card.colors, colorSearch)
            })
        }

        return cards
    }

    return (
        <>
            <Center>
                <Box bgColor="gray.500" p={4} m={4} width="50%">
                    <VStack>
                        <Text>
                            Set Introspection
                        </Text>
                        <HStack width="100%">
                            <LoadSetButton completion={setCardList} />
                        </HStack>
                    </VStack>
                </Box>
            </Center>
            {searchViewsForEachTerm()}
        </>)
}

interface SearchSegmentProps {
    cards: Card[]
    searchDescription: string
}

function SearchSegment({ cards, searchDescription }: SearchSegmentProps) {

    // view has 3 modes: 
    // collapsed, which shows just the search terms 
    // cardsCollapsed, which shows the search terms and data
    // neither, which shows the search terms, the data and all of the card views
    const [collapsed, setCollapsed] = React.useState(true)
    const [cardsCollapsed, setCardsCollapsed] = React.useState(true)

    function collapseView() {
        setCollapsed(true)
    }
    function expandView() {
        setCollapsed(false)
    }

    function collapseCards() {
        setCardsCollapsed(true)
    }

    function expandCards() {
        setCardsCollapsed(false)
    }

    function cardGridIfNotHidden() {
        return cardsCollapsed ? <></> : <CardSearchResultsGrid cards={cards} />
    }

    return (<VStack w="100%" bgColor="gray.600" m={3}>
        <Box w="100%" borderRadius={30}>
            <HStack w="100%" borderRadius={10} m={2}>
                <Button>{collapsed ? <ChevronUp onClick={expandView} /> : <ChevronDown onClick={collapseView} />}</Button>
                <Text>{searchDescription}</Text>
            </HStack>

            {collapsed ? <></> :
                <Box m={3} borderRadius={30}>
                    <VStack>
                        <CardDataHeader cards={cards} />
                        <HStack w="100%" borderRadius={10} m={2}>
                            <Button>{cardsCollapsed ? <ChevronUp onClick={expandCards} /> : <ChevronDown onClick={collapseCards} />}</Button>
                            <Text>Cards</Text>
                        </HStack>
                        {cardGridIfNotHidden()}
                    </VStack>
                </Box>
            }
        </Box>
    </VStack>)
}

interface CardSearchResultsGridProps {
    cards: Card[]
}

function CardSearchResultsGrid({ cards }: CardSearchResultsGridProps) {

    function viewsForCardNames() {

        if (cards === undefined) {
            return <></>
        }

        return cards.map((card) => {
            return <CardView card={card} key={card.name} />
        })
    }

    return <SimpleGrid bgColor="gray.500" w="100%" p={4} m={4} columns={8} fontSize={12}>
        {viewsForCardNames()}
    </SimpleGrid>
}

interface CardDataHeaderProps {
    cards: Card[]
}

function CardDataHeader({ cards }: CardDataHeaderProps) {
    return (<></>)
}