import React, { useState, useEffect } from 'react';
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		api.get('repositories').then(response => {
			setRepositories(response.data)
		})
  }, []);
  
  async function handleAddRepository() {

    const response = await api.post('repositories', {
			title: 'NovoTitle3',
      url: 'https://github.com/newuser3?tab=repositories',
      techs: [
        'Java3',
        'Python3',
        'C++3',
      ],
		});    
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {

    api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
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