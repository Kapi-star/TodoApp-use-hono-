import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

const todoList =[
  {
    task: 'Play tennnis',
    isFinish: false
  },
  {
    task: 'Play soccer',
    isFinish: true
  }
]

app.get('/todo', (c) => {
  return c.json(todoList);
})

export const GET = handle(app)
