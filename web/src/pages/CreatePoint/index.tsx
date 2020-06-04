import React from 'react';
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'

import logo from '../../assets/logo.svg'

import './styles.css';

const CreatePoint = () => {
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para a Home
        </Link>
      </header>

      <form action="">
        <h1>Cadastro do ponto de coleta</h1>
        <fieldset>
          <legend>
            <h2>
              Dados
            </h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>
              Endereço
            </h2>
            <span>Selecione um endereço no mapa</span>
          </legend>
          <Map center={[-21.695292, -43.4479465]} zoom={17}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-21.695292, -43.4479465]}/>
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf">
                <option value="0">Selecione uma UF</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="cidade">cidade</label>
              <select name="cidade" id="cidade">
                <option value="0">Selecione uma cidade</option>
              </select>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>
              Itens de Coleta
            </h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="" />
              <span>Óleo de cozinha</span>
            </li>
            <li className="selected">
              <img src="http://localhost:3333/uploads/oleo.svg" alt="" />
              <span>Óleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="" />
              <span>Óleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="" />
              <span>Óleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="" />
              <span>Óleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="" />
              <span>Óleo de cozinha</span>
            </li>
          </ul>
        </fieldset>
        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
}

export default CreatePoint;