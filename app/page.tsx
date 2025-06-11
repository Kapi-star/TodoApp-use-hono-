'use client'
import { useEffect, useState } from 'react'

type Todo = {
  task: string;
  isFinish: boolean;
};

export default function Home() {
  const [todo, setTodo] = useState<Todo[]>()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/todo')
      const todo = await res.json()
      setTodo(todo)
    }
    fetchData()
  }, [])

  console.log(todo);

  if (!todo) return <p>Loading...</p>
  
  let tasks = "TODO List"

  for (let i = 0; i < todo.length; i++) {
    if (!todo[i].isFinish) {
      tasks += `\n未完了: ${todo[i].task}`
    } else {
      tasks += `\n完了: ${todo[i].task}`
    }
  }

  return <pre>{tasks}</pre>
}
