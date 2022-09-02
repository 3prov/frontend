import React from 'react'
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
  return (<>
    { 
      error ?    
      <div className='Error'>
        <div>Во время загрузки страницы произошла ошибка:</div>
        <div><code>{error.message}</code></div>
        <div>Если это поведение было неожиданным для вас, пожалуйста, сообщите нам об этом в телеграм-бот: <a href={'/'}>ссылка скоро будет......</a></div>
      </div> :
      { children }
    }
  </>)
}

const Loader: React.FC<LoaderProps> = ({loading, children}) => {
  return (<>
    {
      loading ?
      <div className='Loader-container'><span className="loader"/></div> :
      { children }
    }
  </>)
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