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
import { CardList, Card } from './CardModels'
import { CardView } from './data_views/CardView'
import { ChevronUp, ChevronDown } from 'heroicons-react'

interface SearchTerms {

}

export function SetDatasView() {
    const [cardList, setCardList] = React.useState<CardList | undefined>()
    const [searchTerms, setSearchTerms] = React.useState<SearchTerms[] | undefined>()

    function cardListApplyingSearchTerms(searchTerms: SearchTerms | undefined, cardList: CardList): Card[] {

        const cards: Card[] = []

        // if no search terms are defined, return every card in the set
        if (searchTerms === undefined) {

            for (let setName in cardList.default.data) {
                cards.push(...cardList.default.data[setName].cards)
            }
        } else {
            // TODO: complicated searching...
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
            {cardList ? <SearchSegment cards={cardListApplyingSearchTerms(undefined, cardList)} /> : <></> /* default card view */}
        </>)
}

interface SearchSegmentProps {
    cards: Card[]
}

function SearchSegment({ cards }: SearchSegmentProps) {

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

    return (<VStack w="100%" bgColor="gray.600">
        <Box w="100%" borderRadius={10}>
            <HStack w="100%" borderRadius={10}>
                <Button>{collapsed ? <ChevronUp onClick={expandView} /> : <ChevronDown onClick={collapseView} />}</Button>
                <Text>Search details haha</Text>
            </HStack>

            {collapsed ? <></> :
                <VStack>
                    <CardDataHeader cards={cards} />
                    <HStack w="100%" borderRadius={10}>
                        <Button>{cardsCollapsed ? <ChevronUp onClick={expandCards} /> : <ChevronDown onClick={collapseCards} />}</Button>
                        <Text>Cards</Text>
                    </HStack>
                    {cardGridIfNotHidden()}
                </VStack>
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

        var objs = new Array()

        cards.forEach((card) => {
            objs.push(<CardView card={card} key={card.name} />)
        })

        return objs
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