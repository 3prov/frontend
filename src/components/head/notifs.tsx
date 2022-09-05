import React, { useCallback, useState } from 'react'
import { DateString } from '../../entities/common'
import { Notif, NotificationTypes } from '../../entities/ui'
import { RootState, useAppDispatch, useTypedSelector } from '../../store'
import { removeNotif } from '../../store/slices/notifs'

import notifSettings from '../../assets/notifs.json'

import notifWarn from '../../assets/notifs-images/warn.svg'
import notifDone from '../../assets/notifs-images/done.svg'
import notifError from '../../assets/notifs-images/error.svg'

const images: {[k: string]: string} = {
  'done': notifDone,
  'err': notifError,
  'time': notifWarn
}

type NotifProps = Notif & { close: (id: number) => void }
type NotifAnims = 'init-notif-anim' | 'close-notif-anim'

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
      return notifSettings.titles[type].replace('$1', notifDateFormater(payload!))
    default:
      return notifSettings.titles[type]
  }
}

const NotifElement: React.FC<NotifProps> = ({ id, type, payload, close }) => {
  const [lastAnim, setLastAnim] = useState<NotifAnims>('init-notif-anim')
  
  const currentNotif = 
    ["DONE", "ERR", "TIME"]
      .find(el => type.includes(el))
      ?.toLowerCase() || 'default'
  
  const closeNotifAnimStart = () => {
    setLastAnim('close-notif-anim')
  }

  const closeNotif = (e: React.AnimationEvent<HTMLDivElement>) => {
    switch (e.animationName as NotifAnims) {
      case "close-notif-anim":
        return close(id)
      default: 
        return
      }
  }
  return (
    <div className={["Notif", `Notif__${currentNotif}`, `Notif__${lastAnim}`].join(' ')} 
         onAnimationEnd={closeNotif}
    >
      <img className='Notif-mark' src={images[currentNotif]} alt={"ничо нет :("}/>
      <div className='Notif-text'>{notifFormater(type, payload)}</div>
      <div className='Notif-close' onClick={closeNotifAnimStart} />
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