import React from 'react'
import { DateString } from '@entities/common'

type WorkSendedProps = {
  at: DateString
}

const dateFormat = (created: string) => {
  const date = new Date(created)
  return `${date.toLocaleDateString('ru', {day: 'numeric', month: 'long'})} в ${date.toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'})}`
}

const WorkSended: React.FC<WorkSendedProps> = ({at}) => {
  return (
    <div className='WorkSended'>Сдано {dateFormat(at)}</div>
  )
}

export default WorkSended