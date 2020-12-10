import { createContext } from 'react'
// criamos o contexto para pegar informações de outro lugar da aplicacao

interface AuthContextData {
  name: string;

}
const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export default AuthContext