import { WeekFormat } from "@entities/common"
import { Essay, Task, TaskKey } from "@entities/essay"
import { Examing, Sentence, ExamScore } from "@entities/exam"

declare namespace Responses {
  namespace Common {
    type GetEssaysByDate = {
      count: number,
      next: null | string,
      previous: null | string,
      results: {
        id: string,
        week_id: string,
        body: string,
        evaluations: {
          criteria_score: number
        }[]
      }[],
    }
    type GetDateInfo = {
      count: number,
      next: null | string,
      previous: null | string,
      results: (WeekFormat & {
        id: string,
        author: string
      })[]
    }
    type GetText = Task & {
      keys: TaskKey[]
    }
    type GetEssay = Essay & {
      task: Task & {
        keys: TaskKey[]
      }
    } & {
      evaluations: Examing[]
    }
    type GetExamRate = ExamScore
  }
  namespace Exam {
    type Get = {
      evaluation_already_sent: boolean,
      evaluation: Examing | null,
      essay: Essay,
      task: Task,
      task_keys: TaskKey[]
    }
    type PostCriteria = Examing
    type UpdateCriteria = Examing
    type PostSentence = Sentence
    type UpdateSentence = {
      evaluator_comment: string,
      mistake_type: string
    }
  }
  namespace Write {
    type Get = {
      essay_already_sent: boolean,
      essay: Essay | null,
      task: Task
    }
    type Post = Essay
    type Update = Essay
  }
  namespace Rate {
    type Post = ExamScore
    type GetExamResults = Examing[]
    type GetTextByEssayUuid = Task & {
      keys: TaskKey[]
    }
  }
}

export = Responses
export as namespace Responses