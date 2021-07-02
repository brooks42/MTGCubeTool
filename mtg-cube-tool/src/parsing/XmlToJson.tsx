import * as XmlParser from 'fast-xml-parser'
import { CardList } from '../CardModels'
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

// converts cockatrice XML files to JSON files 
export function xmlToCardList(xml: string): CardList | undefined {
    const jsonObject = XmlParser.parse(xml, {
        ignoreAttributes: false,
        parseNodeValue: true,
        parseAttributeValue: true,
    })

    console.log(JSON.stringify(jsonObject))
    return jsonObjectToCardList(jsonObject)
}

function jsonObjectToCardList(jsonObject: any): CardList | undefined {
    console.log('loading CardList from json object')



    return undefined
}

export interface LoadSetButtonProps {
    completion: (list: CardList | undefined) => void
}

export function LoadSetButton({ completion }: LoadSetButtonProps) {

    function getAndLoadFile(element: React.ChangeEvent<HTMLInputElement>) {
        loadFile(element, completion)
    }

    function loadFile(element: React.ChangeEvent<HTMLInputElement>, completion: (list: CardList | undefined) => void) {
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
                    const jsonObject = xmlToCardList(fileContents)
                    completion(jsonObject)
                }
            })
            reader.readAsText(file)
        }
    }

    return <Input type='file' accept='.xml' onChange={getAndLoadFile} />
}
