
export interface Card {
    colorIdentity: string[]
    colors: string[]
    convertedManaCost: number
    manaCost: string
    name: string
    rarity: string
    type: string
    types: string[]
    supertypes: string[]
    power: string
    toughness: string
    text: string
    identifiers: {
        scryfallId: string
        scryfallIllustrationId: string
        scryfallOracleId: string
    }
}

export type CardColor = 'W' | 'U' | 'R' | 'B' | 'G'

// got these color codes from https://i.imgur.com/dMjPOq0.png
export enum CardColorHexes {
    W = 'rgb(248, 231, 185)',
    U = 'rgb(179, 206, 234)',
    R = 'rgb(235, 159, 130)',
    B = 'rgb(166, 159, 157)',
    G = 'rgb(196, 211, 202)'
}

export interface CardList {
    default: {
        data: {
            [setName: string]: {
                cards: Card[]
            }
        }
    }
}