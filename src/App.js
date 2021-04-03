/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';


export default function App() {
  
  // Variáveis com diferentes estados
  const [repositories, setRepositories] = useState([]);


  // useEffect
  // Parâmetro 01: Função; Parametro 2: Quando será executada a função (Circunstância). Sempre que o valor do parametro 2 mudar, o useEffect é acionado. 
  // Caso não tenha um segundo parametro a função é executada apenas uma vez
  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/justhenrique/repos');
    const data = await response.json();

    setRepositories(data);
  }, []);


  function handleFavorite(id){
    const newRepositories = repositories.map(repo => {
      return repo.id === id? { ...repo, favorite: !repo.favorite} : repo
    });

    setRepositories(newRepositories);
  }

  return (
    <>
      <ul>
        {/* laço de repetição: para cada 'repo' cria um a 'li' */}
        {repositories.map(repo => 
          <li key={repo.id}> 
            {repo.name}
            {repo.favorite && <span>(Favorito)</span>}
            <button onClick={() => handleFavorite(repo.id)}> Favoritar </button>
          </li>)}
      </ul>
    </>
  );
}


