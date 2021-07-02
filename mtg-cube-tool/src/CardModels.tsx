
export interface Card {
    colorIdentity: string[]
    colors: string[]
    manaCost: string
    name: string
    rarity: Rarity
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

// version 1 cards are ones that don't use props, like from the SW TCG or this example:
/*		<card>
            <name>Bulbasaur</name>
            <set picURL="https://raw.githubusercontent.com/brooks42/ptcg/main/cards/Bulbasaur.png" rarity="common">PTCG</set>
            <color>G</color>
            <manacost>1G</manacost>
            <type>Pokémon - Grass Poison</type>
            <pt>1/2</pt>
            <tablerow>2</tablerow>
            <side>front</side>
            <related attach="attach">Ivysaur (DFC)</related>
            <text>{1}{G}: Evolve to Ivysaur
{T}: Add {G}.</text>
        </card>*/
export interface NoPropsCard {
    name: string,
    color: string,
    rarity: Rarity
    manacost: string
    power: string
    toughness: string
    text: string
    types: string[]
    supertypes: string[]
}

export type DFCSide = 'front' | 'back'

export type Rarity = 'common' | 'uncommon' | 'rare' | 'mythic'

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

// v1 cockatrice card database (no props)
export interface CockatriceCardDatabase {
    sets: {

    },
    cards: {
        card: {
            name: string
            // set: string
            color: string
            manacost: string
            type: string
            pt: string
            side: DFCSide
            text: string
        }
    }
}