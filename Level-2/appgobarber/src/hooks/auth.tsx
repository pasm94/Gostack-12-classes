import React, { createContext, useCallback, useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../services/api'
// criamos o contexto para pegar informações de outro lugar da aplicacao


interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)


export const AuthProvider: React.FC = ({ children }) => {
  // tudo que esse componente receber como child, repassaremos em algum lugar aqui dentro

  const [data, setData] = useState<AuthState>({} as AuthState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet(['@GoBarber:token', '@GoBarber:user'])

      if (token[1] && user[1]) { // [1] pois o multiGet retorna chave e valor
        setData({ token: token[1], user: JSON.parse(user[1]) })
      }

      setLoading(false)
    }

    loadStorageData()
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    })

    const { token, user } = response.data

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)]
    ])

    setData({ token, user })
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user'])

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) { // se o user utilizar useAuth sem o AuthProvider por volta, dispara erro
    throw new Error('useAuth must be user within an AuthProvider')
  }

  return context
}
