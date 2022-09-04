import React, { useCallback, useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetWrite } from '../../api/write'
import { WriteWorker } from '../../domain/storage'
import useUnload from '../../hooks/use-unload'
import { RootState, useAppDispatch, useTypedSelector } from '../../store'
import { editText, initText, sendEssay, syncText } from '../../store/slices/essay'
import Boundary from '../wrappers/Boundary'
import EssayBlock from '../ui/EssayBlock'
import OriginBlock from '../ui/OriginBlock'

const writeSelector = (state: RootState) => state.essay

const Write: React.FC = () => {
  const { id } = useParams()
  const { text, status, created_at: created } = useTypedSelector(writeSelector, shallowEqual)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initText(id))
  }, [dispatch, id])

  const {data, error, isLoading} = useGetWrite({uuid: id || ''})

  useEffect(
    () => {
      dispatch(syncText(data && data.essay))
    }, [data, dispatch]
  )

  const clickToSend = useCallback(
    (e: React.SyntheticEvent<HTMLButtonElement>) => {
      dispatch(sendEssay({uuid: id || ''}))
      e.currentTarget.focus()
    }, [dispatch, id]
  )

  const changeText = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(editText(e.target.value))
    }, [dispatch]
  )

  useUnload(() => {
    WriteWorker.set(id, text)
  })

  return (
    <main>
      <Boundary loading={isLoading} error={error}>
        <OriginBlock task={data?.task}/>
        <EssayBlock 
          essay={{
            body: text,
            created_at: created
          }} 
          changeText={changeText} 
          isEdit={status !== 'sended'}
          click={clickToSend}
        />
      </Boundary>
    </main>
  )
}

export default Write