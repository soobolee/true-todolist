'use client'

import {JSX, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import daygrid from '@fullcalendar/daygrid'
import interaction, {DateClickArg} from '@fullcalendar/interaction'
import TodoModal from '@/app/_components/modal/TodoModal'
import {useTodos} from '@/app/_context/TodoContext'

const Calendar = (): JSX.Element => {
  const {allTodos} = useTodos()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

  const handleDateClick = (info: DateClickArg) => {
    const date = info.dateStr
    setSelectedDate(date)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const renderDayCell = (arg: any) => {
    const dateStr = arg.date.toLocaleDateString('sv-SE')
    const todoCount = allTodos.filter(todo => todo.date === dateStr).length

    return (
      <div className={'fc-daygrid-day-frame'}>
        <div className={'fc-daygrid-day-top'}>
          <span className={'fc-daygrid-day-number'}>{arg.dayNumberText}</span>
        </div>
        <div className={'fc-daygrid-day-bottom h-7'}>
          {todoCount > 0 && (
            <>
              <div className={'fc-daygrid-event-dot'}></div>
              <div className={'fc-daygrid-event-title'}>{todoCount}개</div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <section className={'w-full md:w-1/2 bg-white rounded-2xl shadow p-4 cursor-pointer'}>
        <h2 className={'center text-xl font-bold mb-4'}>캘린더</h2>
        <FullCalendar
          plugins={[daygrid, interaction]}
          initialView={'dayGridMonth'}
          dateClick={handleDateClick}
          locale={'ko'}
          height={'90%'}
          dayCellContent={renderDayCell}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'today',
          }}
        />
      </section>
      <TodoModal date={selectedDate} isOpen={isModalOpen} onCloseModal={handleModalClose} />
    </>
  )
}

export default Calendar
