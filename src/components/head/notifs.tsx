import React, { useCallback } from 'react'
import { DateString } from '../../entities/common'
import { Notif, NotificationTypes } from '../../entities/ui'
import { RootState, useAppDispatch, useTypedSelector } from '../../store'
import { removeNotif } from '../../store/slices/notifs'
import notifTitles from '../../assets/notif-titles.json'

type NotifProps = Notif & { close: (id: number) => void }

const notifDateFormater = (date: DateString) => {
  const settings = Intl.DateTimeFormat('ru', {
    minute: '2-digit', 
    hour: '2-digit'
  })
  
  return settings.format(
    new Date(
      +( new Date(date) ) - +( new Date() )
    )
  )
}
const notifFormater = (type: NotificationTypes, payload?: string) => {
  switch(type) {
    case NotificationTypes.TIME:
      return notifTitles[type].replace('$1', notifDateFormater(payload!))
    default:
      return notifTitles[type]
  }
}

const NotifElement: React.FC<NotifProps> = ({ id, type, payload, close }) => {
  const closeNotif = () => {
    close(id)
  }

  return (
    <div className={[
      "Notif", 
      `Notif__${
        ["DONE", "ERR", "TIME"].find(el => type.includes(el))
                               ?.toLowerCase() 
        || 'default'
      }`
    ].join(' ')}>
      <div className='Notif-text'>{notifFormater(type, payload)}</div>
      <div className='Notif-close' onClick={closeNotif}></div>
    </div>
  )
}

const notificationsSelector = (state: RootState) => state.notifs
const NotifsContainer: React.FC = () => {
  const { notifs } = useTypedSelector(notificationsSelector)
  const dispatch = useAppDispatch()
  const close = useCallback((id: number) => {
    dispatch(removeNotif(id))
  }, [dispatch])

  return (
    <div className='Notifs' hidden={!notifs.length}>
      { 
        notifs.map(notif => 
          <NotifElement key={notif.id} close={close} {...notif} /> 
        ) 
      }
    </div>
  )
}

export default NotifsContainer