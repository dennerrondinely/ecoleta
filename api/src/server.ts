import express from 'express'

const app = express()
app.use(express.json())

const users = [
  {
    nome: 'Denner',
    email: 'teste@teste.com.br'
  },
  {
    nome: 'Wellington',
    email: 'teste@teste.com.br'
  },
  {
    nome: 'Bruna',
    email: 'teste@teste.com.br'
  },
  {
    nome: 'Fernando',
    email: 'teste@teste.com.br'
  }
]

app.get('/', (request, response) => {
  return response.send('🚀 Bem Vindo ao Ecoleta! ♻')
})


app.listen(3333, () => {
  console.log('🚀 Executando na porta :3333')
})