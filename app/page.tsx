'use client'
import { useEffect, useState } from 'react'

type Todo = {
  task: string;
  isFinish: boolean;
  id: number;
};

export default function Home() {
  const [todo, setTodo] = useState<Todo[]>();
  const [newTask, setNewTask] = useState<string>('');

  // GET
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/todo')
      const todo = await res.json()
      setTodo(todo)
    }
    fetchData()
  }, [])

  if (!todo) return <p>Loading...</p>

  // POST
  const handleSubmit = async () => {
    if (!newTask) {
      alert('タスク内容を入力してください')
      return
    }

    const res = await fetch('/api/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newTask }),
    })

    if (res.status === 201) {
      alert('追加成功！')
      setNewTask('')
      const updated = await fetch('/api/todo')
      const updatedTodo = await updated.json()
      setTodo(updatedTodo)
    } else {
      alert('追加失敗')
    }
  }

  // PUT
  const toggleIsFinish = async (id: number, current: boolean) => {
    const res = await fetch(`/api/todo/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isFinish: !current }),
    })

    if (res.ok) {
      const updated = await fetch('/api/todo')
      const updatedTodo = await updated.json()
      setTodo(updatedTodo)
    } else {
      alert('更新失敗')
    }
  }

  // DELETE
  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/todo/${id}`, {
      method: 'DELETE',
    })

    if (res.status === 200) {
      alert('削除成功！')
      setNewTask('')
      const updated = await fetch('/api/todo')
      const updatedTodo = await updated.json()
      setTodo(updatedTodo)
    } else {
      alert('削除失敗')
    }
  }

  return (
    <> 
      <h2>TODO LIST</h2>
      <ul>
        {todo.map((t) => (
          <li key={t.id}>
            <label>
              <input
                type="checkbox"
                checked={t.isFinish}
                onChange={() => toggleIsFinish(t.id, t.isFinish)}
              />
                {t.task}
            </label>
            <button
             onClick={() => handleDelete(t.id)}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
      <fieldset>
        <legend>タスク追加</legend>
          <label htmlFor="task">Task: </label>
          <input
            type="text"
            id="task"
            name="task"
            value = {newTask}
            onChange={(e) => setNewTask(e.target.value)}
            required
          />
          <button
            onClick={handleSubmit}
          >
            追加
          </button>
      </fieldset>
    </>
  );
}
