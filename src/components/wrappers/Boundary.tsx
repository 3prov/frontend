import React from 'react'
import type { FetchingError } from '@src/hooks/use-fetching'
import Loader from '../ui/Loader'

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
  if (!error) return (<>{children}</>)
  
  return (
    <div className='Error'>
      <div>Во время загрузки страницы произошла ошибка:</div>
      <div><code>{error.message}</code></div>
      <div>Если это поведение было неожиданным для вас, пожалуйста, сообщите нам об этом в телеграм-бот: <a href={'/'}>ссылка скоро будет......</a></div>
    </div>
  )
}

const LoaderWrapper: React.FC<LoaderProps> = ({loading, children}) => {
  if (!loading) return (<>{children}</>)
  
  return (
    <Loader />
  )
}

const Boundary: React.FC<BoundaryProps> = ({loading, error, children}) => {
  return (
    <LoaderWrapper loading={loading}>
      <Error error={error}>
        {children}
      </Error>
    </LoaderWrapper>
  )
}

export default Boundary