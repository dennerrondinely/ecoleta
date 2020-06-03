import express from 'express'

const routes = express.Router()

routes.get('/', (request, response) => {
  return response.send('🚀 Bem Vindo ao Ecoleta! ♻')
})

export default routes;