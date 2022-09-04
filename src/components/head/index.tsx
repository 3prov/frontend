import React from 'react'
import NotifsContainer from './notifs'
import Title from './title'

const Head: React.FC = () => {
  return (
    <>
      <Title />
      <NotifsContainer />
    </>
  )
}

export default Head