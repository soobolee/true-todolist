'use client'

import {createContext, useContext, useState, useEffect, ReactNode, JSX} from 'react'
import {apiTodo, TodoDto} from '@/app/_api/todo/router'

interface TodoContextType {
  todos: TodoDto[]
  allTodos: TodoDto[]
  refreshTodos: () => Promise<void>
}

const TodoContext = createContext<TodoContextType | null>(null)

export const TodoProvider = ({children}: {children: ReactNode}): JSX.Element => {
  const [todos, setTodos] = useState<TodoDto[]>([])
  const [allTodos, setAllTodos] = useState<TodoDto[]>([])

  const refreshTodos = async () => {
    const res = await apiTodo().findByDate(new Date().toLocaleDateString('sv-SE'))
    const resAll = await apiTodo().findByAll()

    if (res) setTodos(res)
    if (resAll) setAllTodos(resAll)
  }

  useEffect(() => {
    refreshTodos()
  }, [])

  return <TodoContext value={{todos, allTodos, refreshTodos}}>{children}</TodoContext>
}

export const useTodos = () => {
  const context = useContext(TodoContext)

  if (!context) {
    throw new Error('Context가 존재하지 않습니다.')
  }

  return context
}
