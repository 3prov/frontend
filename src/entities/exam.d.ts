import { DateString } from "./common"

export type Criteria = {
  name: string,
  title: string,
  limit: number,
  value: number | null
}

export type CriteriaAction = {
  name: string,
  value: number
}

export type CriterionBlock = {
  blockName: string,
  criterion: Criteria[]
}
export type Criterion = {
  criterion: CriterionBlock[]
}

export type MappedCriterion = {
  criteria: {
    id?: string
    [k: string]: number | null
  }
}

export type Sentence = {
  sentence_number: number,
  evaluator_comment: string,
  mistake_type: string
}

export type Examing = MappedCriterion & {
  created_at: DateString,
  sentences_review: Sentence[]
}

export type ExamScore = {
  score: number,
  evaluation_criteria: string
}