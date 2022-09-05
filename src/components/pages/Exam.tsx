import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CriteriaWorker, SentencesWorker } from '../../domain/storage'
import useUnload from '../../hooks/use-unload'
import Boundary from '../wrappers/Boundary'
import EssayBlock from '../ui/EssayBlock'
import OriginBlock from '../ui/OriginBlock'
import { useAppDispatch, useTypedSelector } from '../../store'
import type { RootState } from '../../store'
import { shallowEqual } from 'react-redux'
import { initEvaluation, syncEvaluation } from '../../store/slices/evaluation'
import { useGetExam } from '../../api/modules/exam'

const criteriaSelector = (state: RootState) => state.evaluation.criteria
const evaluationFormSelector = (state: RootState) => ({
  created: state.evaluation.created_at, 
  status: state.evaluation.status
})

const sentenceSelector = (state: RootState) => state.evaluation.sentences 
/*
  TODO:
    - отправка данных на сервер
      - пре-валидация
      - обсудить с бэкендом форму данных, т.к. она мне не нравится
    - компонент критерий
      - валидация (см. сообщения себе в ВК)
    - компонент комментариев к тексту
      - логика селекшена текста
      - сами комментарии
*/
const Exam: React.FC = () => {
  const { id } = useParams()
  
  const criteria = useTypedSelector(criteriaSelector, shallowEqual)
  const sentences = useTypedSelector(sentenceSelector, shallowEqual)
  const { created, status } = useTypedSelector(evaluationFormSelector, shallowEqual)
  const dispatch = useAppDispatch()

  const { data, error, isLoading } = useGetExam({uuid: id || ''})

  useEffect(() => {
    dispatch(initEvaluation(id))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(
    () => {
      dispatch(syncEvaluation(data && data.evaluation))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]
  )

  useUnload(() => {
    SentencesWorker.set(id, sentences)
    CriteriaWorker.set(id, {criteria})
  })

  return (
    <Boundary loading={isLoading} error={error}>
      <main>
        <OriginBlock task={data!.task!} task_keys={data!.task_keys} />
        <EssayBlock essay={data!.essay} />
      </main>
    </Boundary>
  )
}

export default Exam