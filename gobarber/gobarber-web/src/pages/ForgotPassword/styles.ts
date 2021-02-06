import styled, { keyframes } from 'styled-components'
import signInBackgroundImg from '../../assets/sign-in-background.png'
import { shade } from 'polished'

export const Container = styled.div`
  height: 100vh; // vai ocupar toda tela
  
  display: flex;

  align-items: stretch; // os elementos dentro do Container (Content e Background) se esticarao para ocupar toda page
`
export const Content = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;

  place-content: center; // todo conteudo desse Content fica no center 

  width: 100%; // nao sera menor que o conteudo
  max-width: 700px; // e nao sera maior que 700px

`

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    
    h1 {
      margin-bottom: 24px;
    }
    
    a {
      color: #F4EDE8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      
      &:hover {
        color: ${shade(0.2, '#F4EDE8')}
      }
    }
  }

  > a { // somente os a diretamente dentro do Content
      color: #FF9000;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      display: flex; // ISSO
      align-items: center; // MAIS ISSO deixa os elementos alinhados (o icone mais texto)

      svg {
        margin-right: 16px;
      }

      &:hover {
        color: ${shade(0.2, '#FF9000')};
      }
    }
`

export const Background = styled.div`
  flex: 1; // vai fazer o Background ocupar todo espaco, menos os 700px acima
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover; // vai ocupar tudo se adaptando ao tamanho da page
`