import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.get('/todo', (c) => {
  return c.json({
    message: 'Hello from Hono!'
  })
})

export const GET = handle(app)
