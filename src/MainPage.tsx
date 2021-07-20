import {
    TabPanel,
    Tab,
    Tabs,
    TabPanels,
    TabList
} from '@chakra-ui/react'
import * as React from 'react'
import { SetDatasView } from './SetDataView'


export function MainPage() {
    return (<Tabs>
        <TabList>
            <Tab>Some Data</Tab>
        </TabList>

        <TabPanels>
            <TabPanel>
                <SetDatasView />
            </TabPanel>
        </TabPanels>
    </Tabs>)
}