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
type FetchingErrorBlockProps = {
  error: FetchingError
  children: React.ReactNode
}

const FetchingErrorBlock: React.FC<FetchingErrorBlockProps> = ({error, children}) => {
  if (!error) return (<>{children}</>)
  
  return (
    <div className='Error'>
      <div className="Error-messages">Во время загрузки страницы произошла ошибка:</div>
      <div className="Error-messages">
        <span className='Error-status'>
        { 
          error.status >= 500 
          ? "Ошибка на стороне сервера"
          : error.status >= 400 
          ? "Не найдено"
          : "Неизвестная ошибка"
        }
        </span>
      </div>
      <div className="Error-messages">
        Если это поведение было неожиданным для вас, пожалуйста, сообщите нам об этом в телеграм-бот: <a href={'/'}>ссылка скоро будет......</a>
      </div>
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
      <FetchingErrorBlock error={error}>
        {children}
      </FetchingErrorBlock>
    </LoaderWrapper>
  )
}

export default Boundary