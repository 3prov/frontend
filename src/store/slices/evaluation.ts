import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import init from '../../assets/criterion.json'
import { CriteriaWorker, SentencesWorker } from "../../domain/storage";
import { DateString } from "../../entities/common";
import { Examing, Sentence } from "../../entities/exam";
import { Id, Status } from "../../entities/ui";
import { criterionIsDefault, criterionIsEqual, mapCriterion } from "../../utils";

type EvaluationState = {
  criteria: {
    [k: string]: number | null
  },
  sentences: Sentence[]
  created_at: DateString
  status: Status
}

const initialState: EvaluationState = {
  ...mapCriterion(init),
  sentences: [],
  created_at: '',
  status: 'init'
}

const evaluationSlice = createSlice({
  name: 'evaluation',
  initialState,
  reducers: {
    initEvaluation: (state, action: PayloadAction<Id>) => {
      state.criteria = CriteriaWorker.get(action.payload)!.criteria
      state.sentences = SentencesWorker.get(action.payload)!
    },
    syncEvaluation: (state, action: PayloadAction<Examing | null>) => {
      if (!action.payload) return
      
      const { criteria, sentences_review, created_at } = action.payload
      state.created_at = created_at

      const criteriaIsDefault = criterionIsDefault({
        criteria: state.criteria
      })

      if (!state.sentences.length && sentences_review.length) {
        state.sentences = sentences_review
      } 
      if (criteriaIsDefault) {
        state.criteria = criteria
      }

      const sentenceDesync = !!state.sentences.length && state.sentences.length !== sentences_review.length
      const criteriaDesync = !criteriaIsDefault && criterionIsEqual({ criteria: state.criteria }, { criteria })

      state.status = sentenceDesync || criteriaDesync ? 'edit' : 'sended'
    },
    changeCriteria: (state, action: PayloadAction<{key: string, value: number}>) => {
      const { key, value } = action.payload
      state.criteria[key] = value
    }
  },
  extraReducers: (builder) => {
    
  },
})

export default evaluationSlice.reducer
export const { changeCriteria, initEvaluation, syncEvaluation } = evaluationSlice.actions