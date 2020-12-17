import React from 'react'
import SignIn from './pages/SignIn/index'
import GlobalStyle from './styles/global'
import { AuthProvider } from './hooks/AuthContext'


const App: React.FC = () => (
  <>
    <AuthProvider> {/* tudo que estiver aqui dentro tera acesso a esse context */}
      <SignIn />
    </AuthProvider>
    <GlobalStyle />
  </>
)


export default App