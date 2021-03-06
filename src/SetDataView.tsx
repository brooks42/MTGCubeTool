import {
    VStack,
    Box,
    Button,
    Center,
    Text,
    HStack,
    SimpleGrid,
    Table,
    Tr,
    Td,
    Checkbox,
    Tooltip
} from '@chakra-ui/react'
import * as React from 'react'
import { SetInfoTable } from './data_views/SetInfoTable'
import { LoadSetButton } from './parsing/XmlToJson'
import { CardList, Card, CardColor, CardSide, CardColorType, cardColorTypeForCard } from './CardModels'
import { CardView } from './data_views/CardView'
import { ChevronUp, ChevronDown, QuestionMarkCircleOutline } from 'heroicons-react'
import { isEqual } from 'lodash'
import { v4 as uuidv4 } from 'uuid'

interface SearchTerms {
    colors?: CardColor[]
    cardColorType?: CardColorType
    cardSupertype?: string // type like "Land", "Creature" etc
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
},
{
    cardColorType: 'colorless'
},
{
    cardColorType: 'hybrid'
},
{
    cardColorType: 'multicolor'
},
{
    cardSupertype: 'land'
}]

export function SetDatasView() {
    const [cardList, setCardList] = React.useState<CardList | undefined>()
    const [searchTermList] = React.useState<SearchTerms[]>(defaultSearchTerms)
    const [excludeDfcs, setExcludeDfcs] = React.useState(true)
    const [colorExclusive, setColorExclusive] = React.useState(true)
    const [excludeLands, setExcludeLands] = React.useState(true)
    const [excludeTokens, setExcludeTokens] = React.useState(true)

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

    function shouldIncludeCardInGlobalSearch(card: Card) {

        // never show basic lands
        if (card.supertypes.includes('Basic') && card.supertypes.includes('Land')) {
            return false
        }

        if (excludeDfcs && card.side === CardSide.back) {
            return false
        }

        if (excludeLands && card.supertypes.includes('Land')) {
            return false
        }

        if (excludeTokens && card.supertypes.includes('Token')) {
            return false
        }

        return true
    }

    function cardListApplyingSearchTerms(searchTerms: SearchTerms | undefined, cardList: CardList): Card[] {

        let cards: Card[] = []

        for (let setName in cardList.default.data) {

            cards = cardList.default.data[setName].cards.flatMap((card) => {
                if (shouldIncludeCardInGlobalSearch(card)) {
                    if (card.rarity === 'common') {
                        return [card, card]
                    }
                    return card
                }
                return undefined
            }).filter((card) => {
                return card !== undefined
            }) as Card[]
        }

        // if no search terms are defined, return every card in the set
        if (searchTerms === undefined) {
            return cards
        }

        // else, prune cards out (yeah this is inefficient but whatever for now)
        if (searchTerms.colors) {
            let colorSearch = searchTerms.colors

            cards = cards.filter((card) => {
                if (colorExclusive) {
                    return isEqual(card.colors, colorSearch)
                } else {
                    return card.colors.filter(value => colorSearch.includes(value)).length > 0
                }
            })
        }

        // next prune cards that are the selected color type
        if (searchTerms.cardColorType) {
            let colorType = searchTerms.cardColorType

            cards = cards.filter((card) => {
                return cardColorTypeForCard(card) === colorType
            })
        }

        if (searchTerms.cardSupertype) {
            let superType = searchTerms.cardSupertype

            cards = cards.filter((card) => {
                return card.supertypes.map((value) => value.toLowerCase()).includes(superType.toLowerCase())
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
                        <HStack>
                            <VStack><Checkbox isChecked={excludeDfcs} onChange={(e) => setExcludeDfcs(e.target.checked)}>Exclude DFCs</Checkbox></VStack>
                            <VStack>
                                <HStack>
                                    <Checkbox isChecked={colorExclusive} onChange={(e) => setColorExclusive(e.target.checked)}>Nonexclusive Colors</Checkbox>
                                    <Tooltip label="If checked, searches for colored cards will get all cards that have that color in the cost, not just monocolor." aria-label="A tooltip">
                                        <QuestionMarkCircleOutline />
                                    </Tooltip>
                                </HStack>
                            </VStack>
                            <VStack><Checkbox isChecked={excludeLands} onChange={(e) => setExcludeLands(e.target.checked)}>Exclude Lands</Checkbox></VStack>
                            <VStack><Checkbox isChecked={excludeTokens} onChange={(e) => setExcludeTokens(e.target.checked)}>Exclude Tokens</Checkbox></VStack>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
            {cardList !== undefined && <Center>
                <Box bgColor="gray.500" p={4} m={4}>
                    <SetInfoTable cards={cardListApplyingSearchTerms(undefined, cardList)} title="Set overview" />
                </Box>
            </Center>}
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
            return <CardView card={card} key={`${card.name}+${uuidv4()}`} />
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

    function calculateCountsOfAllSupertypes() {

        const superTypesMap = new Map<string, number>()

        cards.forEach((card) => {
            card.supertypes.forEach((superType) => {
                const value = superTypesMap.get(superType) ?? 0
                superTypesMap.set(superType, value + 1)
            })
        })

        return superTypesMap
    }

    function rowsForAllSupertypes() {
        const trArray: JSX.Element[] = []

        calculateCountsOfAllSupertypes().forEach((value, key) => {
            trArray.push(<Td>{key}: {value}</Td>)
        })

        return trArray
    }

    function calculateTotalManaCost(): number {
        return cards.map((card) => { return card.convertedManaCost }).reduce(function (a, b) { return a + b }, 0)
    }

    function calculateAverageManaCost(): number {
        return calculateTotalManaCost() / cards.length
    }

    return (<Table>
        <Tr>
            <Td>Total cards: {cards.length}</Td>
            <Td>Total manacost: {calculateTotalManaCost()}</Td>
            <Td>Average manacost: {calculateAverageManaCost().toFixed(2)}</Td>
        </Tr>
        <Tr>
            <Td>type split: </Td>
            {rowsForAllSupertypes()}
        </Tr>
        <Tr><Td><SetInfoTable title="." cards={cards} /></Td></Tr>
    </Table>)
}