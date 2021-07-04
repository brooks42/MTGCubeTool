import {
    VStack,
    Box,
    Button,
    Center,
    Text,
    HStack,
    SimpleGrid,
    Table,
    Tr,
    Td,
    Thead,
    Th
} from '@chakra-ui/react'
import * as React from 'react'
import { CardList, Card, CardColor } from '../CardModels'

interface SetInfoTableProps {
    title: string
    cards: Card[]
}

export function SetInfoTable({ title, cards }: SetInfoTableProps) {

    function totalCreatures() {
        return cards.filter((card) => {
            return card.supertypes.includes('Creature') || card.supertypes.includes('Pokémon')
        }).length
    }

    function totalNoncreatures() {
        return cards.filter((card) => {
            return !card.supertypes.includes('Creature') && !card.supertypes.includes('Pokémon')
        }).length
    }

    function creatureCardsForCost(cost: number) {
        return cards.filter((card) => {
            if (card.supertypes.includes('Creature') || card.supertypes.includes('Pokémon')) {
                return card.convertedManaCost == cost || (cost === 6 && card.convertedManaCost >= 6)
            }
            return false
        }).length
    }

    function nonCreatureCardsForCost(cost: number) {
        return cards.filter((card) => {
            if (!card.supertypes.includes('Creature') && !card.supertypes.includes('Pokémon')) {
                return card.convertedManaCost == cost || (cost === 6 && card.convertedManaCost >= 6)
            }
            return false
        }).length
    }

    return <Table>

        <Thead>
            <Tr>
                <Th>CMC</Th>
                <Th>Creature</Th>
                <Th>Non-creature</Th>
            </Tr>
        </Thead>

        <Tr>
            <Td>1</Td>
            <Td>{creatureCardsForCost(1)}</Td>
            <Td>{nonCreatureCardsForCost(1)}</Td>
        </Tr>
        <Tr>
            <Td>2</Td>
            <Td>{creatureCardsForCost(2)}</Td>
            <Td>{nonCreatureCardsForCost(2)}</Td>
        </Tr>
        <Tr>
            <Td>3</Td>
            <Td>{creatureCardsForCost(3)}</Td>
            <Td>{nonCreatureCardsForCost(3)}</Td>
        </Tr>
        <Tr>
            <Td>4</Td>
            <Td>{creatureCardsForCost(4)}</Td>
            <Td>{nonCreatureCardsForCost(4)}</Td>
        </Tr>
        <Tr>
            <Td>5</Td>
            <Td>{creatureCardsForCost(5)}</Td>
            <Td>{nonCreatureCardsForCost(5)}</Td>
        </Tr>
        <Tr>
            <Td>6+</Td>
            <Td>{creatureCardsForCost(6)}</Td>
            <Td>{nonCreatureCardsForCost(6)}</Td>
        </Tr>
        <Tr>
            <Td>Total</Td>
            <Td>{totalCreatures()}</Td>
            <Td>{totalNoncreatures()}</Td>
        </Tr>
        <Tr>
            <Td>-</Td>
            <Td>{totalCreatures() + totalNoncreatures()}</Td>
        </Tr>
    </Table>
}