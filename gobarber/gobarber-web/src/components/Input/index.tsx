import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { useField } from '@unform/core'

import { Container, Error } from './styles'

import Tooltip from '../Tooltip'


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string; // assim essa prop passa a ser obrigatoria
  containerStyle?: object;
  icon: React.ComponentType<IconBaseProps>;
}

// abaixo foi passado Icon em maiuscuilo pq o react nao entende que eh componente se for minusculo
const Input: React.FC<InputProps> = ({ name, containerStyle = {}, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null) // inputRef da acesso direto ao input

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const { fieldName, defaultValue, error, registerField } = useField(name)

  const handleInputFocused = useCallback(() => {
    setIsFocused(true)
  }, [])

  // function handleInputBlur() {
  //   setIsFocused(false)
  // }
  // a diferenca entre a function comentada acima e essa, eh que useCallback armazena a function
  // na memoria, assim ela nao eh recriada cada vez que const Input for recriado
  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsFilled(!!inputRef.current?.value) // usar inputRef, ja que ele da acesso direto ao input
  }, []) // cria a funciton, e soh recria quando alguma dessas variaveis em [] for alterada
  // ou seja, se ficar vazio, nunca sera recriada

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField,])

  return (
    <Container style={containerStyle} isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />} {/*  se icone existir, entao exibe... */}
      <input
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#C53030" size={20} />
        </Error>
      )}
    </Container>
  )
}

export default Input