import type {Metadata} from 'next'
import {JSX, ReactNode} from 'react'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'TodoList',
  description: 'true value-TodoList',
}

const RootLayout = ({todo, calendar}: Readonly<{todo: ReactNode; calendar: ReactNode}>): JSX.Element => {
  return (
    <html lang='ko'>
      <body>
        <header className={'center h-17 shadow text-xl font-bold mt-3 mb-3'}>Todo List</header>
        <main className={'container'}>
          {todo}
          {calendar}
        </main>
      </body>
    </html>
  )
}

export default RootLayout
