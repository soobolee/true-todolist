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
    const today = new Date().toLocaleDateString('sv-SE')

    const resByDate = await apiTodo().findByAll({page: 0, size: 1000}, {date: today})
    const resAll = await apiTodo().findByAll({page: 0, size: 1000})

    if (resByDate) setTodos(resByDate.content || [])
    if (resAll) setAllTodos(resAll.content || [])
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
