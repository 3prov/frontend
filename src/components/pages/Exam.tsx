import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetExam, usePostCriteriaExam, usePostSentenceExam, useUpdateCriteriaExam, useUpdateSentenceExam } from '../../api/exam'
import { CriteriaWorker, SentencesWorker } from '../../domain/storage'
import { MappedCriterion, Sentence } from '../../entities/exam'
import useUnload from '../../hooks/use-unload'
import { criterionIsDefault, criterionIsEqual } from '../../utils'
import Boundary from '../hoc/Boundary'

type Status = 'init' | 'edit' | 'sended'

const Exam: React.FC = () => {
  const { id } = useParams()
  
  const [created, setCreated] = useState<string>('')
  const [criteria, setCriteria] = useState<MappedCriterion>(CriteriaWorker.get(id)!)
  const [sentences, setSentences] = useState(SentencesWorker.get(id)!)
  const [status, setStatus] = useState<Status>('init')

  const getData = useGetExam({uuid: id || ''})
  const postCriteria = usePostCriteriaExam()
  const updateCriteria = useUpdateCriteriaExam()
  const postSentence = usePostSentenceExam()
  const updateSentence = useUpdateSentenceExam()

  const sendCriteria = status === 'init' ? postCriteria : updateCriteria
  const sendSentence = (sentence: Sentence) => 
    sentences.find(sent => sent.sentence_number === sentence.sentence_number) 
      ? updateSentence({uuid: id || '', ...sentence}) 
      : postSentence({uuid: id || '', ...sentence})

  const clickToSend = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    switch (status) {
      case 'init':
        setStatus('sended')
        break
      case 'sended':
        setStatus('edit')
        break
      case 'edit':
        setStatus('sended')
        break
    }
  }

  useEffect(
    () => {
      if (!getData.data || !getData.data.evaluation_already_sent || !getData.data.evaluation) {
        return
      }

      const sentenceCache = SentencesWorker.get(id)!
      const criteriaCache = CriteriaWorker.get(id)!

      setCreated(getData.data.evaluation.created_at)

      const sentenceServer = getData.data.evaluation.sentences_review 
      const criteriaServer = getData.data.evaluation.criteria 

      const sentenceIsDefault = !sentenceCache.length
      const criteriaIsDefault = criterionIsDefault(criteriaCache)

      if (sentenceIsDefault && sentenceServer.length) {
        setSentences(sentenceServer)
      } 
      if (criteriaIsDefault) {
        setCriteria({criteria: criteriaServer})
      }

      const sentenceDesync = !sentenceIsDefault && sentenceCache.length !== sentenceServer.length
      const criteriaDesync = !criteriaIsDefault && criterionIsEqual(criteriaCache, { criteria: criteriaServer })

      setStatus(sentenceDesync || criteriaDesync ? 'edit' : 'sended')
    }, [getData.data, id]
  )

  useUnload(() => {
    SentencesWorker.set(id, sentences)
    CriteriaWorker.set(id, criteria)
  })

  return (
    <Boundary loading={getData.isLoading} error={getData.error}>
      <div>прикол...........</div>
    </Boundary>
  )
}

export default Exam