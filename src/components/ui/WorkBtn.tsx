import React from 'react'

type WorkBtnProps = {
  currentStatus: 'send' | 'edit'
  click: (e: React.SyntheticEvent<HTMLButtonElement>) => void
}

const WorkBtn: React.FC<WorkBtnProps> = ({click, currentStatus}) => {
  return (
    <button className={`WorkBtn ${currentStatus === 'send' ? 'WorkBtn__send' : 'WorkBtn__edit'}`}
            onClick={click}
    >
      {`${currentStatus === 'send' ? 'Отправить' : 'Редактировать'}`}
    </button>
  )
}

export default WorkBtn