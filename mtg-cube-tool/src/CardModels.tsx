
export interface Card {
    colorIdentity: CardColor[]
    colors: CardColor[]
    manaCost: string
    convertedManaCost: number
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
    side: CardSide
}

export function cardColorTypeForCard(card: Card): CardColorType {
    if (card.colors.length === 0) {
        return 'colorless'
    }

    if (card.colors.length === 1) {
        return 'monocolor'
    }

    // this is where it gets a little complicated
    // we have to introspect the colors in the mana cost
    // similar to how we do the mana value introspection
    // 
    // it can either have
    // - no { in which case it's multicolor
    // - {, but the bracket(s) are only {2 which is also multicolor
    // - or it has { and the { are colors

    // easy way out -- if it includes a hybrid mana symbol and doesn't cost phyrexian mana, it's a hybrid
    if ((card.manaCost.includes('{R') ||
        card.manaCost.includes('{W') ||
        card.manaCost.includes('{U') ||
        card.manaCost.includes('{B') ||
        card.manaCost.includes('{G')) &&
        !card.manaCost.includes('/P}')) {
        return 'hybrid'
    }

    return 'multicolor'
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
    color: CardColor,
    rarity: Rarity
    manacost: string
    power: string
    toughness: string
    text: string
    types: string[]
    supertypes: string[]
}

export enum CardSide {
    front = 'a',
    back = 'b'
}

export type DFCSide = 'front' | 'back'

export type Rarity = 'common' | 'uncommon' | 'rare' | 'mythic'

export type CardColor = 'W' | 'U' | 'R' | 'B' | 'G'

export type CardColorType = 'multicolor' | 'hybrid' | 'monocolor' | 'colorless'

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
    set: V1SetCode
    color: CardColor
    manacost: string
    type: string
    pt: string | undefined
    side: DFCSide
    text: string
}

interface V1SetCode {
    '@_rarity': Rarity
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
    function parseRarity(set: V1SetCode): Rarity {
        return set["@_rarity"] as Rarity
    }

    function parsePower(pt: string | undefined) {
        return pt !== undefined ? pt.split('/')[0] : ''
    }

    function parseToughness(pt: string | undefined) {
        return pt !== undefined ? pt.split('/')[1] : ''
    }

    function parseConvertedManaCost(manacost: string) {

        // TODO: improve logging

        if (manacost === undefined || manacost.length === 0) {
            return 0
        }

        // happens with JSON if the manacost is just a number, thanks javascript
        if (typeof manacost === 'number') {
            return manacost
        }

        // console.log(`parse mana cost ${manacost} ${typeof manacost}`)

        let cost = 0

        // mana costs are always of the form [number or blank][phyrexian mana | mana symbols]
        // hybrid mana doesn't have to be at the end of the cost like I thought so 
        // prune the number, add that to the total cost
        const splits = manacost.split(/[^0-9]/)
        // console.log(`numbers split off to ${JSON.stringify(splits)}`)

        if (splits.length >= 1 && splits[0] !== '') {
            cost += Number(splits[0])
            manacost = manacost.replace(splits[0], '')
        }

        // prune all hybrid mana or phyrexian mana {C/P} for phyrexian, add the number of symbols to the cost
        // this turns a cost like G{G/U}U into [G, {G/U}, U]
        const separateSymbols = manacost.replace('{', ' {').replace('}', '} ').split(' ')

        separateSymbols.filter((value) => {
            return value !== ''
        })

        // console.log(`separate symbols ${JSON.stringify(separateSymbols)}`)

        separateSymbols.forEach((symbol) => {
            if (symbol.startsWith('{')) {
                if (symbol.startsWith('{2/')) {
                    // this is a 2/C symbol and adds 2 to the cost
                    console.log('found a {2/C}, adds 2')
                    cost += 2
                } else {
                    cost += 1
                }
            } else {
                // this value is some number of mana symbols, which cost 1 each
                cost += symbol.length
            }
        })

        // console.log(`cost was ${cost}`)

        return cost
    }

    function parseDfcSide(side: DFCSide) {
        return side === 'back' ? CardSide.back : CardSide.front
    }

    const card: Card = {
        name: v1Card.name,
        colorIdentity: v1Card.color ? v1Card.color.split('') as CardColor[] : [], // this isn't technically correct but it's fine for now
        manaCost: v1Card.manacost,
        text: v1Card.text,
        type: v1Card.type,
        supertypes: parseSupertypes(v1Card.type),
        types: parseSubtypes(v1Card.type),
        colors: v1Card.color ? v1Card.color.split('') as CardColor[] : [],
        rarity: parseRarity(v1Card.set),
        power: parsePower(v1Card.pt ?? ''),
        toughness: parseToughness(v1Card.pt ?? ''),
        convertedManaCost: parseConvertedManaCost(v1Card.manacost),
        side: parseDfcSide(v1Card.side),
        identifiers: {
            scryfallId: '',
            scryfallIllustrationId: '',
            scryfallOracleId: ''
        }
    }

    return card
}