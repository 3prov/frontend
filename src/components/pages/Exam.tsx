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

const Exam: React.FC = () => {
  const { id } = useParams()
  
  const [created, setCreated] = useState<string>('')
  const [criteria, setCriteria] = useState<MappedCriterion>(CriteriaWorker.get(id)!)
  const [sentences, setSentences] = useState(SentencesWorker.get(id)!)
  const [status, setStatus] = useState<Status>('init')

  const { data, error, isLoading } = useGetExam({uuid: id || ''})
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
        sendCriteria({criteria: {...criteria.criteria}, uuid: id || ''})

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
      if (!data || !data.evaluation_already_sent || !data.evaluation) {
        return
      }

      setCreated(data.evaluation.created_at)

      const sentenceServer = data.evaluation.sentences_review 
      const criteriaServer = data.evaluation.criteria 

      const sentenceIsDefault = !sentences.length
      const criteriaIsDefault = criterionIsDefault(criteria)

      if (sentenceIsDefault && sentenceServer.length) {
        setSentences(sentenceServer)
      } 
      if (criteriaIsDefault) {
        setCriteria({criteria: criteriaServer})
      }

      const sentenceDesync = !sentenceIsDefault && sentences.length !== sentenceServer.length
      const criteriaDesync = !criteriaIsDefault && criterionIsEqual(criteria, { criteria: criteriaServer })

      setStatus(sentenceDesync || criteriaDesync ? 'edit' : 'sended')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, id]
  )

  useUnload(() => {
    SentencesWorker.set(id, sentences)
    CriteriaWorker.set(id, criteria)
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