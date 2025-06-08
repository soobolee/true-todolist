'use client'

import {JSX, FormEvent, useState} from 'react'
import {apiTodo} from '@/app/_api/todo/router'

interface TodoFormProps {
  onTodoAdded: () => void
}

const TodoForm = ({onTodoAdded}: TodoFormProps): JSX.Element => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const todoDto = {
      title,
      description,
      date,
      checked: false,
      todoIdx: 0,
    }

    const result = await apiTodo().insertTodoContent(todoDto)
    if (result) {
      setTitle('')
      setDescription('')
      setDate('')
      onTodoAdded()
    }
  }

  return (
    <form onSubmit={handleSubmit} className={'mt-10 flex'}>
      <div className={'flex flex-col gap-1 w-[80%]'}>
        <input
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='제목'
          className={'border rounded p-2'}
          required
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder='설명'
          className={'border rounded p-2'}
        />
        <input
          type='date'
          value={date}
          onChange={e => setDate(e.target.value)}
          className={'border rounded p-2'}
          required
        />
      </div>
      <div className={'flex flex-col justify-center items-center w-[20%]'}>
        <button type='submit' className={'h-10 w-15 bg-blue-500 text-white rounded'}>
          추가
        </button>
      </div>
    </form>
  )
}

export default TodoForm
