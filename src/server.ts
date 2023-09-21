import fastify from 'fastify'
import cookies from '@fastify/cookie'

import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const server = fastify()

server.register(cookies)
server.register(transactionsRoutes, { prefix: 'transactions' })

server
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server running in http://localhost:3333')
  })
