import React from 'react'
import SignIn from './pages/SignIn/index'
import SignUp from './pages/SignUp/index'
import GlobalStyle from './styles/global'

import { AuthProvider } from './context/AuthContext'

const App: React.FC = () => (
  <>
    <AuthProvider> {/* tudo que estiver aqui dentro tera acesso a esse context */}
      {/* <SignUp /> */}
      <SignIn />
    </AuthProvider>
    <GlobalStyle />
  </>
)


export default App