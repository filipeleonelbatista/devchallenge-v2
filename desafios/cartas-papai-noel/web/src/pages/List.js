import React, { useState, useEffect } from 'react';
import '../styles/pages/list.css';
import { FiSearch } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';

import api from '../services/api';

function List() {

    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    const [letterList, setLetterList] = useState([]);

    function buscarEstados() {
        return new Promise(function (resolve, reject) {

            var xhr = new XMLHttpRequest();
            xhr.open('GET', `https://servicodados.ibge.gov.br/api/v1/localidades/estados`);
            xhr.send(null);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject("Erro");
                    }
                }
            }
        });
    }

    function buscarCidade(state) {
        return new Promise(function (resolve, reject) {

            var xhr = new XMLHttpRequest();
            xhr.open('GET', `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`);
            xhr.send(null);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject("Erro");
                    }
                }
            }
        });
    }

    useEffect(() => {
        buscarEstados().then(function (response) {
            setStateList(response);
        });
    }, []);

    useEffect(() => {
        buscarCidade(state).then(function (response) {
            setCityList(response);
        });
    }, [state]);

    async function handleSearch() {
        const result = await api.get('letters', {
            params: {
                city: city,
                state: state
            }
        });
        setLetterList(result.data);
    }

    return (
        <div id="page-list-letter">
            <Sidebar />
            <main>
                <div className="container">
                    <header>
                        <h1>Estas são as cartas<br />disponíveis na região.</h1>
                        <div className="input-group">
                            <div className="input-block">
                                <label htmlFor="state">Estado</label>
                                <select
                                    defaultValue=""
                                    id="state"
                                    value={state}
                                    onChange={(e) => { setState(e.target.value) }}
                                >
                                    <option disabled hidden value="">Selecione uma opção</option>
                                    {stateList.map((option, index) => {
                                        return <option key={index} value={option.sigla}>{option.nome}</option>
                                    })}
                                </select>
                            </div>
                            <div className="input-block">
                                <label htmlFor="city">Município</label>
                                <select
                                    defaultValue=""
                                    id="city"
                                    value={city}
                                    onChange={(e) => { setCity(e.target.value) }}
                                >
                                    <option disabled hidden value="">Selecione uma opção</option>
                                    {cityList.map((option, index) => {
                                        return <option key={index} value={option.nome}>{option.nome}</option>
                                    })}
                                </select>
                            </div>
                            <button onClick={handleSearch} className="confirm-button" type="submit">
                                <FiSearch size={24} color="rgba(0, 0, 0, 0.6)" />
                            </button>
                        </div>
                    </header>

                    {
                        letterList.length === 0
                        && (
                            <h3>Nenhuma cartinha foi encontrada.<br />
                                Tente outra localidade.</h3>
                        )

                    }

                    {letterList.map((letter, index) => {
                        return (
                            <div key={index} className="content">
                                <div className="header">
                                    <div className="name">
                                        {letter.name}
                                    </div>
                                    <div className="location">
                                        {letter.city}-{letter.state}
                                    </div>
                                </div>
                                <div className="letter">
                                    {letter.letter}
                                </div>
                                <div className="footer">

                                    {letter.whatsapp === ''
                                        ? (
                                            <a className="red-button" href={`mailto:${letter.email}`}>
                                                Entrar em contato
                                            </a>
                                        )
                                        : (
                                            <a className="red-button" href={`https://wa.me/${letter.whatsapp}`}>
                                                Entrar em contato
                                            </a>
                                        )
                                    }
                                </div>
                            </div>
                        );
                    })}

                </div>

            </main>
        </div>
    );
}

export default List;