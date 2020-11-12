import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles'

// function Dashboard() { } // é a mesma coisa que fazer em const
const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form>
        <input type="text" placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>

        <a href="teste">
          <img src="https://avatars0.githubusercontent.com/u/57308117?s=460&u=6e5fe4402d0dd14a75f2e3be371c97cd52aa9ff5&v=4"
            alt="pasm94"
          />
          <div>
            <strong>rocketseat/unform</strong>
            <p>Easy peasy highly scalable ReactJS & React Native forms!</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="teste">
          <img src="https://avatars0.githubusercontent.com/u/57308117?s=460&u=6e5fe4402d0dd14a75f2e3be371c97cd52aa9ff5&v=4"
            alt="pasm94"
          />
          <div>
            <strong>rocketseat/unform</strong>
            <p>Easy peasy highly scalable ReactJS & React Native forms!</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="teste">
          <img src="https://avatars0.githubusercontent.com/u/57308117?s=460&u=6e5fe4402d0dd14a75f2e3be371c97cd52aa9ff5&v=4"
            alt="pasm94"
          />
          <div>
            <strong>rocketseat/unform</strong>
            <p>Easy peasy highly scalable ReactJS & React Native forms!</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;