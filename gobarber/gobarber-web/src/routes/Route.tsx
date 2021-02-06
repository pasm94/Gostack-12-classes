import React from 'react'
import { RouteProps as ReactDOMRouteProps, Route as ReactDOMRoute, Redirect } from 'react-router-dom'

import { useAuth } from '../hooks/auth'

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType; // sobrescrevemos pra receber um {dashboard}, inves de {<dashboard></dashboard>}
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth()

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => { // location mantem o historico de rotas no navegador quando for redirecionado
        return isPrivate == !!user ? ( // existir user da na mesma que ver se esta logado 
          <Component />
        ) : (
            <Redirect to={{ pathname: isPrivate ? '/' : '/dashboard', state: { from: location } }} />
          )
      }}
    />
    // render permite modificar a logista que o Route faz pra mostrar a rota/componente em tela
  )
}

export default Route