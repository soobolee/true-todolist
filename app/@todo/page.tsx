'use client'

import {JSX, useState} from 'react'
import TodoItem, {TodoItemProps} from '@/app/_components/item/TodoItem'
import TodoForm from '@/app/_components/form/TodoForm'

type Todo = Omit<TodoItemProps, 'onToggle'>

const Todo = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 'todo_202506040001',
      title: '회의 준비',
      description: 'test',
      date: '2025-06-04',
      checked: true,
    },
    {
      id: 'todo_202506040002',
      title: '보고서 작성',
      description: 'test',
      date: '2025-06-04',
      checked: false,
    },
  ])

  const toggleCheck = (id: string): void => {
    setTodos((prev: Todo[]): Todo[] =>
      prev.map((todo: Todo): Todo => (todo.id === id ? {...todo, checked: !todo.checked} : todo)),
    )
  }

  return (
    <section className={'w-full md:w-1/2 bg-white rounded-2xl shadow p-4'}>
      <h2 className={'center text-xl font-bold mb-4'}>오늘의 일정</h2>
      <ul className={'space-y-2'}>
        {todos.map(
          (todo: Todo): JSX.Element => (
            <TodoItem key={todo.id} {...todo} onToggle={toggleCheck} />
          ),
        )}
      </ul>
      <TodoForm />
    </section>
  )
}

export default Todo
