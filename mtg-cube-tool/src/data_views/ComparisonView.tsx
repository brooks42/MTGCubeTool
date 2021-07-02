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
import { xmlToJson } from '../parsing/XmlToJson'

export function ComparisonView() {

    function tryXmlParser(xml: string) {
        xmlToJson(xml)
    }

    function loadFile(element: React.ChangeEvent<HTMLInputElement>) {
        const fileList = element.target.files
        console.log(fileList)

        if (fileList && fileList?.length > 0) {
            const file = fileList[0]
            const reader = new FileReader()
            reader.addEventListener('load', (event) => {
                console.log('loaded')
                const fileContents = event.target?.result
                console.log(typeof fileContents)

                if (fileContents && typeof fileContents === 'string') {

                    console.log(fileContents.substr(0, 50))
                    tryXmlParser(fileContents)
                }
            })
            reader.readAsText(file)
        }
    }

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
                        <Input type='file' accept='.xml' onChange={loadFile} />
                        <Button>Try</Button>
                    </HStack>
                </VStack>
            </Box>
        </Center>)
}