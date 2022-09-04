import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetExam, usePostCriteriaExam, usePostSentenceExam, useUpdateCriteriaExam, useUpdateSentenceExam } from '../../api/exam'
import { CriteriaWorker, SentencesWorker } from '../../domain/storage'
import { MappedCriterion, Sentence } from '../../entities/exam'
import { Status } from '../../entities/ui'
import useUnload from '../../hooks/use-unload'
import { criterionIsDefault, criterionIsEqual } from '../../utils'
import Boundary from '../wrappers/Boundary'
import EssayBlock from '../ui/EssayBlock'
import OriginBlock from '../ui/OriginBlock'
import { useAppDispatch, useTypedSelector } from '../../store'
import type { RootState } from '../../store'
import { shallowEqual } from 'react-redux'
import { initEvaluation, syncEvaluation } from '../../store/slices/evaluation'

const criteriaSelector = (state: RootState) => state.evaluation.criteria
const evaluationFormSelector = (state: RootState) => ({
  created: state.evaluation.created_at, 
  status: state.evaluation.status
})
const sentenceSelector = (state: RootState) => state.evaluation.sentences 
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