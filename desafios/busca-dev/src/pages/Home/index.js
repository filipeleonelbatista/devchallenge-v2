import React, {useState} from 'react';
import './styles.css';
import { useHistory } from 'react-router-dom';

export default function Home() {
    const [username, setUsername] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        localStorage.setItem('username', username);
        
        history.push('/user');
    }

    return (
            <div className="container-home">
                <h1>Busca<span>Dev</span></h1>
                <form onSubmit={handleLogin}>
                    <input className="username"
                    placeholder="Usuário do github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    />
                    <input className="submit" type="submit" value="Buscar" />
                </form>
            </div>
    )
}