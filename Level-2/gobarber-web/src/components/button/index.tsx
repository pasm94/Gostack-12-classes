import { type } from 'os'
import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
// type eh como criar uma interface mas sem definir propriedades especificas

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => ( // rest = restante das props
  <Container {...rest}>
    {children}
  </Container>
)

export default Button