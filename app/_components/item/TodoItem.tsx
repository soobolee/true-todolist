'use client'

import {JSX} from 'react'

export type TodoItemProps = {
  todoIdx: number
  title: string
  description: string
  date: string
  checked: boolean
  onToggle: () => void
  onDelete: () => void
}

const TodoItem = ({title, description, date, checked, onToggle, onDelete}: TodoItemProps): JSX.Element => {
  return (
    <li className={'flex gap-5 border rounded p-3'}>
      <input type='checkbox' className={'w-7'} checked={checked} onChange={onToggle} />
      <div className={'flex-grow'}>
        <span className={'text-lg font-semibold'}>{title}</span>
        <p className={'text-sm text-gray-600'}>{description}</p>
        <p className={'text-xs text-gray-400'}>{date}</p>
      </div>
      <button onClick={onDelete} className={'text-red-500 hover:text-red-700 px-2'}>
        삭제
      </button>
    </li>
  )
}

export default TodoItem
