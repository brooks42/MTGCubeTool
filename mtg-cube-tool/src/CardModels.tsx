
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

export interface CardList {
    default: {
        data: {
            [setName: string]: {
                cards: Card[]
            }
        }
    }
}