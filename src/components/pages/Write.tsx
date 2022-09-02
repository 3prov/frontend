import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetWrite, usePostWrite, useUpdateWrite } from '../../api/write'
import { WriteWorker } from '../../domain/storage'
import useUnload from '../../hooks/use-unload'
import Boundary from '../hoc/Boundary'
import EssayBlock from '../ui/EssayBlock'
import OriginBlock from '../ui/OriginBlock'

type Status = 'init' | 'edit' | 'sended'

const Write: React.FC = () => {
  const { id } = useParams()
  
  const [created, setCreated] = useState<string>('')
  const [text, setText] = useState<string>(WriteWorker.get(id)!)
  const [status, setStatus] = useState<Status>('init')

  const getData = useGetWrite({uuid: id || ''})
  const postData = usePostWrite()
  const updateData = useUpdateWrite()

  const send = status === 'init' ? postData : updateData

  const clickToSend = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    switch (status) {
      case 'init':
        send({uuid: id || '', body: text}, {
          onSuccess(data) {
            data.created_at && setCreated(data.created_at)
          },
        })
        setStatus('sended')
        break
      case 'sended':
        setStatus('edit')
        break
      case 'edit':
        send({uuid: id || '', body: text}, {
          onSuccess(data) {
            data.created_at && setCreated(data.created_at)
          },
        })
        setStatus('sended')
        break
    }
    e.currentTarget.focus()
  }

  useEffect(
    () => {
      if (!getData.data || !getData.data.essay_already_sent || !getData.data.essay) {
        return
      }
      const localCache = WriteWorker.get(id)!
      const serverData = getData.data.essay.body
      const syncEquality = localCache.length !== serverData.length && localCache !== ''
      
      setCreated(getData.data.essay.created_at!)
      setText(syncEquality ? localCache : serverData)
      setStatus(syncEquality ? 'edit' : 'sended')

    }, [getData.data, id]
  )

  const changeText = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value)
    }, []
  )

  useUnload(() => {
    WriteWorker.set(id, text)
  })

  return (
    <Boundary loading={getData.isLoading} error={getData.error}>
      <div>
        <OriginBlock task={getData.data!.task}/>
        <EssayBlock essay={{
                      body: text,
                      created_at: created
                    }} 
                    changeText={changeText} 
                    isEdit={status !== 'sended'}
                    click={clickToSend}
        />
      </div>
    </Boundary>
  )
}

export default Write