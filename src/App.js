import React, { useEffect, useState } from 'react';

import api from 'services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    console.log('[App.js] 1º useEffect');
    async function upRepositories() {
      api.get('repositories').then((response) => {
        setRepositories(response.data);
      });
    }
    upRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'EFI-CLOVER-RYZER',
      url: 'https://github.com/reimon/EFI-CLOVER-RYZER',
      techs: ['Node.JS', 'ReactJS'],
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repositories) => (
          <li key={repositories.id}>
            {repositories.title}

            <button onClick={() => handleRemoveRepository(repositories.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
