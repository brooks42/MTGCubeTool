
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

export interface CardSet {
    name: string
    longname: string
}

// v1 cockatrice card database (no props)
export interface CockatriceCardDatabase {
    cockatrice_carddatabase: {
        sets: {
            set: CardSet
        },
        cards: {
            card: CockatriceV1Card[]
        }
    }
}

export interface CockatriceV1Card {

    name: string
    set: string
    color: string
    manacost: string
    type: string
    pt: string | undefined
    side: DFCSide
    text: string
}

// returns a `Card` object from the passed v1 card 
export function v1CardToInternalCard(v1Card: CockatriceV1Card): Card {

    // examples (TODO: unit tests haha)
    // Instant should return [Instant]
    // Tribal Instant - Goblin should return [Tribal, Instant]
    // Pokémon - Grass Poison should return [Pokémon]
    function parseSupertypes(v1cardtype: string): string[] {

        const typeSplit = v1cardtype.split(' - ')

        if (typeSplit.length > 0) {
            return typeSplit[0].split(' ')
        }
        return ['none']
    }

    // examples (TODO: unit tests haha)
    // Instant should return [none]
    // Tribal Instant - Goblin should return [Goblin]
    // Pokémon - Grass Poison should return [Grass, Poison]
    function parseSubtypes(v1cardtype: string): string[] {

        const typeSplit = v1cardtype.split(' - ')

        if (typeSplit.length > 1) {
            return typeSplit[1].split(' ')
        }
        return ['none']
    }

    // no clue how to do this yet
    function parseRarity(set: string): Rarity {
        return 'common'
    }

    function parsePower(pt: string | undefined) {
        return pt !== undefined ? pt.split('/')[0] : ''
    }

    function parseToughness(pt: string | undefined) {
        return pt !== undefined ? pt.split('/')[1] : ''
    }

    const card: Card = {
        name: v1Card.name,
        colorIdentity: v1Card.color.split(''),
        manaCost: v1Card.manacost,
        text: v1Card.text,
        type: v1Card.type,
        supertypes: parseSupertypes(v1Card.type),
        types: parseSubtypes(v1Card.type),
        colors: v1Card.color.split(''),
        rarity: parseRarity(v1Card.set),
        power: parsePower(v1Card.pt ?? ''),
        toughness: parseToughness(v1Card.pt ?? ''),
        identifiers: {
            scryfallId: '',
            scryfallIllustrationId: '',
            scryfallOracleId: ''
        }
    }

    return card
}