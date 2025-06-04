'use client'

import {JSX} from 'react'
import FullCalendar from '@fullcalendar/react'
import daygrid from '@fullcalendar/daygrid'
import interaction, {DateClickArg} from '@fullcalendar/interaction'
import {useRouter} from 'next/navigation'

const Calendar = (): JSX.Element => {
  const router = useRouter()

  const handleDateClick = (info: DateClickArg) => {
    console.log(info)
    router.push(`/modal/${info.dateStr}`)
  }

  return (
    <section className={'w-full md:w-1/2 bg-white rounded-2xl shadow p-4'}>
      <h2 className={'center text-xl font-bold mb-4'}>캘린더</h2>
      <FullCalendar
        plugins={[daygrid, interaction]}
        initialView='dayGridMonth'
        dateClick={(info: DateClickArg) => handleDateClick(info)}
      />
    </section>
  )
}

export default Calendar
