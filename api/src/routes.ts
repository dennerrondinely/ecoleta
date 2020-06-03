import express from 'express'
import knex from './database/conection'

const routes = express.Router()

routes.get('/items', async (request, response) => {
  const items = await knex('items').select('*')

  const serializedItems = items.map(item => {
    return { name: item.title, imageUrl: `http://localhost:3333/uploads/${item.image}` }
  })

  return response.json(serializedItems)
})

export default routes;