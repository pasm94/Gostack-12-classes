import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  }
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  }
}

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    // PODEMOS FAZER AS REQUISICOES ASSIM. ELAS SERAO FEITAS AO MESMO TEMPO
    api.get(`repos/${params.repository}`).then(response => {
      setRepository(response.data);
    })

    api.get(`repos/${params.repository}/issues`).then(response => {
      setIssues(response.data);
    })

    // PODEMOS FAZER ASSIM. EH RUIM, PQ NAO EH AO MESMO TEMPO
    // async function loadData() {
    //   const repository = await api.get(`repos/${params.repository}`)
    //   console.log(repository);
    //   const issues = await api.get(`repos/${params.repository}/issues`)
    //   console.log(issues);
    // }

    // E ASSIM SERA AO MESMO TEMPO TBM.
    // async function loadData() {
    // const [repository, issues] = await Promise.all([
    // await api.get(`repos/${params.repository}`),
    // await api.get(`repos/${params.repository}/issues`),
    // ]);
    // };
    // loadData();
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
        Voltar
      </Link>
      </Header>

      {repository && ( // se tiver repositorio exibe
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>

            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Forks</span>
            </li>

            <li>
              <strong>67</strong>
              <span>Issues Abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map(issue => (
          <a key={issue.id} href={issue.html_url}> {/* usamos a pq sai da rota interna */}
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;