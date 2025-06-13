import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

let todoList =[
  {
    id: 1,
    task: 'Play tennnis',
    isFinish: false
  },
  {
    id: 2,
    task: 'Play soccer',
    isFinish: true
  }
]

app.get('/todo', (c) => {
  // TODOリストを取得
  return c.json(todoList);
})

app.post('/todo', async (c) => {
  const body =  await c.req.json()
  const newTask = body['newTask'];  
  // 新規追加処理
  return new Response(null, { status: 201 });
})

app.put('/todo/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const body =  await c.req.json()
  const isFinish = body['newTask'];
  const task = body['newTask'];
  // 更新処理（isFinishだけ値が来る時と、taskだけ値が来る時がある）
  return new Response(null, { status: 200 });
})

app.delete('/todo/:id', (c) => {
  const id = Number(c.req.param('id'));
  // 削除処理
  return new Response(null, { status: 200 });
})
;
export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)