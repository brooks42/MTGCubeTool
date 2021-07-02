import {
    VStack,
    Box,
    Center,
    Text,
    HStack,
    Button,
    Spacer,
    Select,
    Input
} from '@chakra-ui/react'
import * as React from 'react'
import { LoadSetButton } from '../parsing/XmlToJson'
import { CardList } from '../CardModels'

export function ComparisonView() {
    const [cardList, setCardList] = React.useState<CardList | undefined>()

    return (
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
                        <LoadSetButton completion={setCardList} />
                    </HStack>
                </VStack>
            </Box>
        </Center>)
}