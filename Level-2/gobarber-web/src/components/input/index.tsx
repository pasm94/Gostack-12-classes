import React, { InputHTMLAttributes, useEffect, useRef } from 'react'
import { IconBaseProps } from 'react-icons'
import { useField } from '@unform/core'

import { Container } from './styles'


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string; // assim essa prop passa a ser obrigatoria
  icon: React.ComponentType<IconBaseProps>;
}

// abaixo foi passado Icon em maiuscuilo pq o react nao entende que eh componente se for minusculo
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, error, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField,])

  return (
    <Container>
      {Icon && <Icon size={20} />} {/*  se icone existir, entao exibe... */}
      <input defaultValue={defaultValue} ref={inputRef} {...rest} />
    </Container>
  )
}

export default Input