'use client'

import {JSX} from 'react'
import Form from 'next/form'

const TodoForm = (): JSX.Element => {
  return (
    <Form action={'api/todo/getAll'} className='mt-10 flex'>
      <div className='flex flex-col gap-1 w-[80%]'>
        <input type='text' name='title' placeholder='제목' className='border rounded p-2' required />
        <textarea placeholder='설명' name='description' className='border rounded p-2' />
        <input type='date' name='date' className='border rounded p-2' required />
      </div>
      <div className={'flex flex-col justify-center items-center w-[20%]'}>
        <button type='submit' className='h-10 w-15 bg-blue-500 text-white rounded'>
          추가
        </button>
      </div>
    </Form>
  )
}

export default TodoForm
