import React, { createContext, useCallback } from 'react'

import api from '../services/api'
// criamos o contexto para pegar informações de outro lugar da aplicacao


interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  // tudo que esse componente receber como child, repassaremos em algum lugar aqui dentro

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    })

    console.log(response.data);
    
  }, [])

  return (
    <AuthContext.Provider value={{ name: 'Paulo', signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }