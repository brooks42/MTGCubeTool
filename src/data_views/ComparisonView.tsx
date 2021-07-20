import {
    VStack,
    Box,
    Center,
    Text,
    HStack,
    Spacer,
    Select,
    SimpleGrid
} from '@chakra-ui/react'
import * as React from 'react'
import { LoadSetButton } from '../parsing/XmlToJson'
import { CardList, Card } from '../CardModels'
import { CardView } from './CardView'

interface SearchTerms {

}

export function ComparisonView() {
    const [leftCardList, setLeftCardList] = React.useState<CardList | undefined>()
    // const [rightCardList, setRightCardList] = React.useState<CardList | undefined>()
    const [searchTerms] = React.useState<SearchTerms | undefined>()

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

    function viewsForCardNames() {
        var objs: JSX.Element[] = []

        if (leftCardList) {
            cardListApplyingSearchTerms(searchTerms, leftCardList).forEach((card) => {
                objs.push(<CardView card={card} key={card.name} />)
            })
        }

        return objs
    }

    return (
        <>
            <Center>
                <Box bgColor="gray.500" p={4} m={4} width="50%">
                    <VStack>
                        <Text>
                            Comparison tool
                        </Text>
                        <HStack width="100%">
                            <Select>
                                <option value="KDH">Kaldheim</option>
                            </Select>
                            <Spacer />
                            <Select>
                                <option value="STX">Strixhaven</option>
                            </Select>
                            <LoadSetButton completion={setLeftCardList} />
                        </HStack>
                    </VStack>
                </Box>
            </Center>
            <SimpleGrid bgColor="gray.500" w="100%" p={4} m={4} columns={5}>
                {viewsForCardNames()}
            </SimpleGrid></>)
}