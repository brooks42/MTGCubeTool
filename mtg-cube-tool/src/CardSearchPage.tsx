import {
    VStack,
    Box,
    Text,
    Input,
    HStack,
    Button,
    Grid,
} from '@chakra-ui/react';
import * as React from 'react';
import * as cardlist from './Standard.json';

interface CardList {
    default: {
        data: {
            [setName: string]: {
                baseSetSize: number;
            };
        };
    };
}

export function CardSearchPage() {
    const [searchString, setSearchString] = React.useState<
        string | undefined
    >();

    const handleChange = (event: any) => setSearchString(event.target.value);

    React.useEffect(() => {
        console.log(`searchString: ${searchString}`);
    });

    function search() {
        let listOfAllCards = cardlist as CardList;

        let eldSetSize = listOfAllCards.default.data['ELD'].baseSetSize;
        let kldSetSize = listOfAllCards.default.data['KHM'].baseSetSize;
        // let SetSize = listOfAllCards.default.data['KLD'].baseSetSize;
        console.log(
            `searching for: ${searchString} in ${eldSetSize}, ${kldSetSize}`
        );
    }

    function grabCockatriceXml() {}

    function parseCockatriceDom() {}

    // TODO: art can be grabbed at https://api.scryfall.com/cards/${card.identifiers.scryfallId}?format=image

    return (
        <VStack bgColor="gray.700">
            <Box bgColor="gray.500" p={4} m={4}>
                Search box
                <Text>Hello search</Text>
                <HStack>
                    <Input
                        placeholder="Enter a card name..."
                        value={searchString}
                        onChange={handleChange}
                    />
                    <Button onClick={search}>Search</Button>
                </HStack>
            </Box>
            <Grid bgColor="gray.500" w="100%" p={4} m={4}>
                Cards go here
            </Grid>
        </VStack>
    );
}
