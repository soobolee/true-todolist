'use client'

import {useEffect, useState, Suspense} from 'react'
import {createPortal} from 'react-dom'
import {apiTodo, TodoDto} from '@/app/_api/todo/router'

interface TodoModalProps {
  date: string
  isOpen: boolean
  onCloseModal: () => void
}

const TodoModal = ({date, isOpen, onCloseModal}: TodoModalProps) => {
  const [todos, setTodos] = useState<TodoDto[]>([])

  const fetchTodos = async () => {
    const selectedDate = date.includes('T') ? date.split('T')[0] : date

    const res = await apiTodo().findByAll({page: 0, size: 1000}, {date: selectedDate})
    if (res) setTodos(res.content || [])
  }

  useEffect(() => {
    if (isOpen) {
      fetchTodos()
    }
  }, [date, isOpen])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCloseModal()
    }
  }

  const calculateProgress = () => {
    if (todos.length === 0) return 0
    const completedCount = todos.filter(todo => todo.checked).length
    return Math.round((completedCount / todos.length) * 100)
  }

  if (!isOpen) return null

  return createPortal(
    <div className={'fixed inset-0 bg-black/50 flex items-center justify-center z-50'} onClick={handleBackdropClick}>
      <div className={'bg-white rounded-lg p-6 w-full max-w-md'} onClick={e => e.stopPropagation()}>
        <div className={'flex justify-between items-center mb-4'}>
          <div className={'flex items-center gap-2'}>
            <h2 className={'text-xl font-semibold'}>{date} 할 일</h2>
            <span className={'text-sm text-gray-500'}>(진행률: {calculateProgress()}%)</span>
          </div>
          <button onClick={handleBackdropClick} className={'text-gray-500 hover:text-gray-700'}>
            ✕
          </button>
        </div>
        <Suspense fallback={<div>모달 투두 로딩 중입니다.</div>}>
          <div className={'space-y-4'}>
            {todos.map(todo => (
              <div key={todo.todoIdx} className={'border rounded p-3'}>
                <div className={'flex items-center gap-2'}>
                  <input type={'checkbox'} checked={todo.checked} readOnly className={'w-5 h-5'} />
                  <span className={'font-semibold'}>{todo.title}</span>
                </div>
                <p className={'text-sm text-gray-600 mt-1'}>{todo.description}</p>
              </div>
            ))}
          </div>
        </Suspense>
      </div>
    </div>,
    document.body,
  )
}

export default TodoModal
