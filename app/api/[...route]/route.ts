import { prisma } from '@/lib/prisma'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'nodejs'

const app = new Hono().basePath('/api')

app.get('/todo',  async(c) => {
  const todoList = await prisma.todo.findMany({
    orderBy: [
      { isFinish: 'asc' },
      { createdAt: 'asc' }
    ]
  })
  
  return c.json(todoList);
})

app.post('/todo', async (c) => {
  const body =  await c.req.json()
  const newTask = body['newTask'];  
  const todoList = await prisma.todo.create({data: {task: newTask}});
  return new Response(null, { status: 201 });
})

app.put('/todo/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const body =  await c.req.json()
  const isFinish = body.isFinish;
  const task = body.task;
  if(typeof isFinish === 'boolean') {
    await prisma.todo.update({
      where: {id: id},
      data: {isFinish: isFinish}
    });
  } else if(typeof task === 'string') {
    await prisma.todo.update({
      where: {id: id},
      data: {task: task}
    });
  }
  return new Response(null, { status: 200 });
})

app.delete('/todo/:id', async (c) => {
  const id = Number(c.req.param('id'));
  await prisma.todo.delete({where: {id: id}});
  return new Response(null, { status: 200 });
})

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)