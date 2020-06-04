import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import api from '../../services/api'

import logo from '../../assets/logo.svg'

import './styles.css';
import axios from 'axios';

interface Item {
  id: number
  name: string
  imageUrl: string
}
interface IBGUFResponse {
  sigla: string
}
interface IBGCITYResponse {
  nome: string
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([])
  const [ufs, setUfs] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedUf, setSelectedUf] = useState('')
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  })


  const history = useHistory()

  useEffect(() => {
    api('/items').then(resp => {
      setItems(resp.data)
    })
  }, [])

  useEffect(() => {
    axios.get<IBGUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla)
      setUfs(ufInitials)
    })
  }, [])

  useEffect(() => {
    if (!selectedUf) return;
    axios.get<IBGCITYResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome)
        setCities(cityNames)
      })
  }, [selectedUf])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setInitialPosition([latitude, longitude])
      setSelectedPosition([latitude, longitude])
    })
  }, [])

  function handelSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value
    setSelectedUf(uf)
  }

  function handelSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value
    setSelectedCity(city)
  }

  function handelMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng])
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }


  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id)
    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id)
      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id])

    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const { email, name, whatsapp } = formData
    const uf = selectedUf
    const city = selectedCity
    const [latitude, longitude] = selectedPosition
    const items = selectedItems
    const data = {
      email,
      name,
      whatsapp,
      uf,
      city,
      latitude,
      longitude,
      items
    }

    await api.post('points', data)

    alert('Ponto de coleta criado!')

    history.push('/')
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para a Home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
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
              onChange={handleInputChange}
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleInputChange}
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                onChange={handleInputChange}
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
          <Map center={initialPosition} zoom={17} onClick={handelMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf" value={selectedUf} onChange={handelSelectedUf}>
                <option value="">Selecione uma UF</option>
                {ufs.map(uf => (
                  <option value={uf} key={uf} >{uf}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="cidade">cidade</label>
              <select name="cidade" id="cidade" value={selectedCity} onChange={handelSelectedCity} >
                <option value="0">Selecione uma cidade</option>
                {cities.map(city => (
                  <option value={city} key={city} >{city}</option>
                ))}
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
            {items.map(item => (
              <li key={item.id} onClick={() => handleSelectItem(item.id)} className={selectedItems.includes(item.id) ? 'selected' : ''}>
                <img src={item.imageUrl} alt={item.name} />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </fieldset>
        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
}

export default CreatePoint;