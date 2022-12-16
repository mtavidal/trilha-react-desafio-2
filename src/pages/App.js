
import { useState } from 'react';
import gitLogo from '../assets/github.png'
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';

import { Container } from './styles';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);


  const handleSearchRepo = async () => {
    let data = null;
    try {
      ({data} = await api.get(`repos/${currentRepo}`));

    } catch (err) {
      console.log(err);
      
    } finally {
      console.log(data); // Could be success or error
    }
    

    if(data !== null){

      const isExist = repos.find(repo => repo.id === data.id);
              
      if(!isExist){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('')
        return
      } else{
        alert('Repositório já adicionado')
        setCurrentRepo('')
        return
      }

    }
    alert('Repositório não encontrado')
    

  }

  const handleRemoveRepo = (id) => {
    const newList = repos.filter (repo => repo.id !== id);
    setRepos(newList);
  }


  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo"/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
    </Container>
  );
}

export default App;
