import React from 'react'
import { useLocation } from 'react-router-dom'
import raw_titles from '@assets/header-names.json'

const getTitleFromLocation = (location: string) => {
  const titles = raw_titles as { [key: string]: string }
  const loc = location.split('/')[1] || 'main'
  return titles[loc]
}

const Title: React.FC = () => {
  const location = useLocation()
  
  return (
    <div className='Title'>
      <div className='Title-tag'>3проверочки / русский язык</div>
      <div className='Title-specific'>{ getTitleFromLocation(location.pathname) }</div>
    </div>
  )
}

export default Title