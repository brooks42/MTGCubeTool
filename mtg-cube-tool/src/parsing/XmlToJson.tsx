import * as XmlParser from 'fast-xml-parser'
import { Card, CardList, CockatriceCardDatabase, CockatriceV1Card, v1CardToInternalCard } from '../CardModels'
import {
    Input
} from '@chakra-ui/react'
import * as React from 'react'

// converts cockatrice XML files to JSON files 
export function xmlToCardList(xml: string): CardList | undefined {
    const jsonObject = XmlParser.parse(xml, {
        ignoreAttributes: false,
        parseNodeValue: true,
        parseAttributeValue: true,
    })

    // console.log(JSON.stringify(jsonObject))
    return jsonObjectToCardList(jsonObject)
}

function jsonObjectToCardList(jsonObject: any): CardList | undefined {
    console.log('loading CardList from json object')

    const v1Db = tryParsingV1CockatriceDBFileToCardList(jsonObject)

    if (v1Db) {
        console.log('found a v1 DB, returning it')
        return v1Db
    }

    console.log('could not infer type of DB, returning empty-handed')
    return undefined
}

function tryParsingV1CockatriceDBFileToCardList(jsonObject: any): CardList | undefined {

    const cockatriceDb = jsonObject as CockatriceCardDatabase

    console.log(`cast cockatriceDb: ${JSON.stringify(cockatriceDb)}`)

    if (cockatriceDb === undefined) {
        return undefined
    }

    const cardList = {
        default: {
            data: {
                [cockatriceDb.cockatrice_carddatabase.sets.set.name]: {
                    cards: Array<Card>()
                }
            }
        }
    }

    cockatriceDb.cockatrice_carddatabase.cards.card.forEach((v1Card) => {
        cardList.default.data[cockatriceDb.cockatrice_carddatabase.sets.set.name].cards.push(v1CardToInternalCard(v1Card))
    })

    console.log(`cast cockatriceDb: ${JSON.stringify(cockatriceDb)}`)

    return cardList
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
