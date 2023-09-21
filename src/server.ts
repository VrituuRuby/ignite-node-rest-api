import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const server = fastify()

server.register(transactionsRoutes, { prefix: 'transactions' })

server.get('/', async () => {
  return {
    health: 'healthy',
  }
})

server
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server running in http://localhost:3333')
  })
