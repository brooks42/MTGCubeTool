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
import { SetDatasView } from './SetDataView'


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
                <SetDatasView />
            </TabPanel>
            <TabPanel>
                <p><ComparisonView /></p>
            </TabPanel>
        </TabPanels>
    </Tabs>)
}