import { Box } from '@chakra-ui/layout'
import { Card, CardColor, CardColorHexes } from '../CardModels'
import { Bar } from 'react-chartjs-2'
import * as React from 'react'

export interface ManaCostSpreadProps {
    cardList: Card[]
}

export function ManaCostSpread({ cardList }: ManaCostSpreadProps) {
    // TODO: have a calculating status to show instead of the bar in onEffect until work is completed?

    function cardCountForColor(color: CardColor): number {
        var count = 0
        cardList.forEach((card) => {
            count += card.colors.includes(color) ? 1 : 0
        })
        console.log(`got ${count} cards out of ${cardList.length} for color ${color}`)
        return count
    }

    const labels = ['W', 'U', 'B', 'R', 'G']
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Color',
                data: [cardCountForColor('W'), cardCountForColor('U'), cardCountForColor('B'), cardCountForColor('R'), cardCountForColor('G')],
                backgroundColor: [CardColorHexes.W, CardColorHexes.U, CardColorHexes.B, CardColorHexes.R, CardColorHexes.G],
            }
        ]
    }

    return (
        <Box width="50%">
            <Bar data={data} type='line' />
        </Box>
    )
}
