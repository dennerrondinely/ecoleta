import { Request, Response } from 'express'
import knex from '../database/conection'

class ItemsController {
  async index(request: Request, response: Response) {
    const items = await knex('items').select('*')

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        name: item.title,
        imageUrl: `http://192.168.42.86:3333/uploads/${item.image}` //192.168.42.86:19000
      }
    })
    return response.json(serializedItems)
  }
}

export default ItemsController