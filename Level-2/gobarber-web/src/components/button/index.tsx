import { type } from 'os'
import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
}
// type eh como criar uma interface mas sem definir propriedades especificas

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => ( // rest = restante das props
  <Container {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
)

export default Button