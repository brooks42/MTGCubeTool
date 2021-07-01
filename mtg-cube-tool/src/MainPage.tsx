import {
    TabPanel,
    Tab,
    Tabs,
    TabPanels,
    TabList
} from '@chakra-ui/react'
import { CardSearchPage } from './CardSearchPage'
import * as React from 'react'
import { ComparisonView } from './data_views/ComparisonView'


export function MainPage() {
    return (<Tabs>
        <TabList>
            <Tab>Search</Tab>
            <Tab>Some Data</Tab>
            <Tab>Comparison</Tab>
        </TabList>

        <TabPanels>
            <TabPanel>
                <CardSearchPage />
            </TabPanel>
            <TabPanel>
                <p>two!</p>
            </TabPanel>
            <TabPanel>
                <p><ComparisonView /></p>
            </TabPanel>
        </TabPanels>
    </Tabs>)
}