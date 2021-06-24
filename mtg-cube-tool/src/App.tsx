import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CardSearchPage } from "./CardSearchPage"

export const App = () => (
  <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={CardSearchPage} />
        </Switch>
      </BrowserRouter>
  </ChakraProvider>
)
