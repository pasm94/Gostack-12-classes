import React from 'react'
import { useTransition } from 'react-spring'
import { FiAlertCircle, FiXCircle } from 'react-icons/fi'

import Toast from './Toast/index'

import { Container } from './styles'
import { ToastMessage } from '../../hooks/toast'

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messageWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0 }, // -100% fica fora, colocamos 20 a mais pra n mostra a sombra nem borda (garantia)
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 }
    }
  )

  return (
    <Container >
      {messageWithTransitions.map(({ item, key, props }) => ( // props eh a estilizacao acima
        <Toast key={key} message={item} style={props}>

        </Toast>
      ))}
    </Container >

  )
}

export default ToastContainer

  // const { removeToast } = useToast()
  // type={message.type} hasDescription={!!message.description}     