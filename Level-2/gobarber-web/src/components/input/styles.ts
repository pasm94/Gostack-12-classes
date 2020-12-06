import styled from 'styled-components'

export const Container = styled.div`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  color: #666360;

  display: flex;
  align-items: center;

  & + div { // todo input que seja precedido de outro input
    margin-top: 8px;
  }

  input {
    background: transparent;
    flex: 1; // vai ocupar todo espaco na div de cima
    border: 0;
    color: #F4EDE8;

    &::placeholder {
      color: #666360;
    }

  }

  svg {
    margin-right: 16px;
  }
`