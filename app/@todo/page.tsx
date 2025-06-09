'use client'

import {JSX, Suspense} from 'react'
import TodoItem from '@/app/_components/item/TodoItem'
import TodoForm from '@/app/_components/form/TodoForm'
import {useTodos} from '@/app/_context/TodoContext'
import {apiTodo} from '@/app/_api/todo/router'

const Todo = (): JSX.Element => {
  const {todos, refreshTodos} = useTodos()

  const toggleCheck = async (todoIdx: number, checked: boolean): Promise<void> => {
    const todo = todos.find(todo => todo.todoIdx === todoIdx)
    if (!todo) return

    const result = await apiTodo().updateTodoContent(todoIdx, {
      ...todo,
      checked: !checked,
    })

    if (result) await refreshTodos()
  }

  const handleDelete = async (todoIdx: number): Promise<void> => {
    const result = await apiTodo().updateTodoDeleted(todoIdx)

    if (result) await refreshTodos()
  }

  return (
    <section className={'w-full md:w-1/2 bg-white rounded-2xl shadow p-4'}>
      <h2 className={'center text-xl font-bold mb-4'}>오늘의 일정</h2>
      <Suspense fallback={<div>투두 새로고침 중입니다</div>}>
        <ul className={'space-y-2 h-100 overflow-y-scroll'}>
          {todos.map(
            (todo): JSX.Element => (
              <TodoItem
                key={todo.todoIdx}
                {...todo}
                onToggle={() => toggleCheck(todo.todoIdx, todo.checked)}
                onDelete={() => handleDelete(todo.todoIdx)}
              />
            ),
          )}
        </ul>
      </Suspense>
      <TodoForm onTodoAdded={refreshTodos} />
    </section>
  )
}

export default Todo
