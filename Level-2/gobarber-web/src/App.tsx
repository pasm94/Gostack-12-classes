import React from 'react'
import SignIn from './pages/SignIn/index'
import GlobalStyle from './styles/global'

import AppProvider from './hooks/index'


const App: React.FC = () => (
  <>
    <AppProvider> {/* tudo que estiver aqui dentro tera acesso a esse context */}
        <SignIn />
    </AppProvider>
    

    <GlobalStyle />
  </>
)


export default App