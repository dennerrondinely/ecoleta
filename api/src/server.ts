import express from 'express'

const app = express()

app.get('/users', (request, response) => {
  console.log('Listagem de usuários')

  response.json([
    { nome: 'Denner' },
    { nome: 'Wellington' },
    { nome: 'Bruna' },
    { nome: 'Fernando' }
  ])
})

app.listen(3333, () => {
  console.log('🚀 Executando na porta :3333')
})