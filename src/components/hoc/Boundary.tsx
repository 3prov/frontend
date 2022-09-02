import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { FetchingError } from '../../hooks/use-fetching'

type BoundaryProps = {
  children: React.ReactNode,
  loading: boolean,
  error: FetchingError
}
type LoaderProps = {
  loading: boolean,
  children: React.ReactNode
}
type ErrorProps = {
  error: FetchingError
  children: React.ReactNode
}

const Error: React.FC<ErrorProps> = ({error, children}) => {
  const nav = useNavigate()
  const [countdown, setCountdown] = useState(10)
  
  if (!error) return (
    <>
      {children}
    </>
  )
  
  //setTimeout(() => nav('/'), 10000)
  setTimeout(() => {
    setCountdown(cd => cd - 1)
  }, 1000);

  return (
    <div className='Error'>
      <div>Во время загрузки страницы произошла ошибка:</div>
      <div><code>{error.message}</code></div>
      <div>Вы будете отправлены на главную страницу через {countdown} секунд.</div>
    </div>
  )
}

const Loader: React.FC<LoaderProps> = ({loading, children}) => {
  if (!loading) return (
    <>
      {children}
    </>
  )

  return (
    <div className='Loader-container'><span className="loader"/></div>
  )
}

const Boundary: React.FC<BoundaryProps> = ({loading, error, children}) => {
  return (
    <Loader loading={loading}>
      <Error error={error}>
        {children}
      </Error>
    </Loader>
  )
}

export default Boundary