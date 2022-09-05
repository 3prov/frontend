import { ProjectDate } from "@entities/common"
import { Essay } from "@entities/essay"
import { MappedCriterion, Sentence, ExamScore } from "@entities/exam"

type UUIDRequired = {
  uuid: string
}

declare namespace Requests {
  namespace Common {
    type GetEssaysByDate = ProjectDate
    type GetDateInfo = {} | undefined
    type GetText = UUIDRequired
    type GetEssay = UUIDRequired
    type GetExamRate = UUIDRequired
  }
  namespace Exam {
    type Get = UUIDRequired
    type PostCriteria = UUIDRequired & MappedCriterion
    type UpdateCriteria = UUIDRequired & MappedCriterion
    type PostSentence = UUIDRequired & Sentence
    type UpdateSentence = UUIDRequired & Sentence
  }
  namespace Write {
    type Get = UUIDRequired
    type Post = UUIDRequired & Essay
    type Update = UUIDRequired & Essay
  }
  namespace Rate {
    type Post = UUIDRequired & ExamScore
    type GetExamResults = UUIDRequired
    type GetTextByEssayId = UUIDRequired
  }
}

export = Requests
export as namespace Requests