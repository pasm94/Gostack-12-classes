import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import GlobalStyle from './styles/global'
import AppProvider from './hooks/index'
import Routes from '../src/routes'

const App: React.FC = () => (
  <>
    <Router>
      <AppProvider> {/* tudo que estiver aqui dentro tera acesso a esse context */}
        <Routes />
      </AppProvider>
    </Router>

    <GlobalStyle />
  </>
)


export default App