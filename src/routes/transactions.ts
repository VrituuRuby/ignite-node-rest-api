import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createTransactionsBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['debit', 'credit']),
    })

    const { amount, title, type } = createTransactionsBodySchema.parse(
      request.body,
    )

    await knex('transactions').insert({
      id: randomUUID(),
      amount: type === 'credit' ? amount : amount * -1,
      title,
    })

    return reply.status(201).send()
  })

  app.get('/', async () => {
    const transactions = await knex('transactions').select()
    return { transactions }
  })

  app.get('/:id', async (request) => {
    const getRequestParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getRequestParamsSchema.parse(request.params)

    const transaction = await knex('transactions').where('id', id).first()

    return {
      transaction,
    }
  })

  app.get('/summary', async () => {
    const summary = await knex('transactions')
      .sum('amount', { as: 'amount' })
      .first()

    return { summary }
  })
}
