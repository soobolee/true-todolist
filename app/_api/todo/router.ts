export interface TodoDto {
  todoIdx: number
  title: string
  description: string
  date: string
  checked: boolean
}

export interface TodoInterface {
  insertTodoContent: (todoDto: TodoDto) => Promise<TodoDto | false>
  findByAll: () => Promise<TodoDto[] | false>
  findByDate: (date: string) => Promise<TodoDto[] | false>
  updateTodoContent: (todoIdx: number, updateDto: TodoDto) => Promise<TodoDto | false>
  updateTodoDeleted: (todoIdx: number) => Promise<TodoDto | false>
}

export const apiTodo = (): TodoInterface => {
  const uri = 'todos'
  const server = 'http://localhost:8080'

  const headers = {
    'Content-Type': 'application/json',
  }

  const resHandler = async (res: Response): Promise<any> => {
    if (!res.ok) return false

    const data = await res.json()

    return data ?? false
  }

  const insertTodoContent = async (todoDto: TodoDto): Promise<TodoDto | false> => {
    const url = `${server}/api/${uri}`
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(todoDto),
      })
      return await resHandler(res)
    } catch (e) {
      console.error('insertTodoContent 에러 발생', e)
      return false
    }
  }

  const findByAll = async (): Promise<TodoDto[] | false> => {
    const url = `${server}/api/${uri}`

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers,
      })
      return await resHandler(res)
    } catch (e) {
      console.error('findByAll 에러 발', e)
      return false
    }
  }

  const findByDate = async (date: string): Promise<TodoDto[] | false> => {
    const url = `${server}/api/${uri}/${date}`

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers,
      })
      return await resHandler(res)
    } catch (e) {
      console.error('findByDate 에러 발생', e)
      return false
    }
  }

  const updateTodoContent = async (todoIdx: number, updateDto: TodoDto): Promise<TodoDto | false> => {
    const url = `${server}/api/${uri}/${todoIdx}`

    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updateDto),
      })
      return await resHandler(res)
    } catch (e) {
      console.error('updateTodoContent 에러 발생', e)
      return false
    }
  }

  const updateTodoDeleted = async (todoIdx: number): Promise<TodoDto | false> => {
    const url = `${server}/api/${uri}/${todoIdx}`

    try {
      const res = await fetch(url, {
        method: 'DELETE',
        headers,
      })
      return await resHandler(res)
    } catch (e) {
      console.error('updateTodoDeleted 에러 발생', e)
      return false
    }
  }

  return {
    insertTodoContent,
    findByAll,
    findByDate,
    updateTodoContent,
    updateTodoDeleted,
  }
}
