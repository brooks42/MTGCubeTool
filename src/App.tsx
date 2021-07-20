import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { MainPage } from "./MainPage"

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={MainPage} />
      </Switch>
    </BrowserRouter>
  </ChakraProvider>
)
