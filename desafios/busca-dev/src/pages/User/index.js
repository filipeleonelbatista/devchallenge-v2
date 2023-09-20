import React, { useEffect, useState } from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function User() {
    const username = localStorage.getItem('username');
    const [user, setUser] = useState('');
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        
        async function SearchRepositories(){
            const response = await api.get(`/users/${username}/repos`)
            setRepositories(response.data);
        }

        async function SearchUser(){
            const response = await api.get(`/users/${username}`)

            if(response){
                setUser(response.data);
                SearchRepositories();
            }
        }
        
        SearchUser();
        
    }, [username]);

    repositories.sort((a, b) => {
        return b.stargazers_count - a.stargazers_count;
    });

    return (
        <div className="container-user">
            <div className="header">
                <h1>Busca<span>Dev</span></h1>
                <Link to="/">
                    <button>Início</button>
                </Link>
            </div>

            {
               
                    user ?
                    (<div className="dev">
                        <div className="left-container">
                            <img src={user.avatar_url} alt="Avatar" />
                            <h2>@{user.login}</h2>
                            <p className="bio">{user.bio}</p>
                            <p className="email">{user.email}</p>
                            <div className="info">
                                <div className="following">
                                    <p>Seguindo</p>
                                    <h4>{user.following}</h4>
                                </div>
                                <div className="followers">
                                    <h4>{user.followers}</h4>
                                    <p>Seguidores</p>
                                </div>
                            </div>
                        </div>
                        <div className="principal-container">
                            
                            <div className="repositories">
                                {
                                   repositories.map(repository =>(
                                       <div className="repository">
                                        <div className="stars">
                                        <h1>{repository.stargazers_count}</h1>
                                        <h3>stars</h3>
                                        </div>
                                        <div className="repository-content">
                                            <h2>{repository.name}</h2>
                                            <p>{repository.description}</p>
                                        </div>
                                        <a target="_blank" rel="noopener noreferrer" href={repository.html_url}>
                                           <FontAwesomeIcon icon={faChevronRight} className="arrow"  />
                                        </a>
                                       </div>
                                    ))
                               }
                            </div>
                        </div>
                    </div>)

                    :

                    (<div className="user-not-found">
                        <h2>Usuário não encontrado :(</h2>
                        <Link to="/">
                            <button>Tente novamente</button>
                        </Link>
                    </div>)
            }

        </div>
    )
}