import useFetching from "@src/hooks/use-fetching"
import { createApi } from "../root"
import Requests from "../requests";
import Responses from "../responces";

export const Get = ({uuid}: Requests.Exam.Get) => createApi({
  url: `encoded-form-urls/evaluation/${uuid}/`
})
 
export const PostCriteria = ({
  uuid, 
  criteria
}: Requests.Exam.PostCriteria) => createApi({
  url: `rus/evaluation/form-url/${uuid}/post/`,
  method: 'POST',
  data: criteria,
})

export const UpdateCriteria = ({
  uuid, 
  criteria
}: Requests.Exam.UpdateCriteria) => createApi({
  url: `rus/evaluation/form-url/${uuid}/edit/`,
  method: 'PUT',
  data: criteria,
})

export const PostSentence = ({
  uuid, 
  evaluator_comment, 
  mistake_type, 
  sentence_number
}: Requests.Exam.PostSentence) => createApi({
  url: `rus/evaluation/sentence_review/form-url/${uuid}/post/`,
  method: 'POST',
  data: {
    evaluator_comment,
    mistake_type,
    sentence_number
  },
})

export const UpdateSentence = ({
  uuid, 
  evaluator_comment, 
  mistake_type, 
  sentence_number
}: Requests.Exam.UpdateSentence) => createApi({
  url: `rus/evaluation/sentence_review/form-url/${uuid}/edit/${sentence_number}`, 
  method: 'PUT',
  data: {
    evaluator_comment,
    mistake_type
  },
})

export const useGetExam = (params: Requests.Exam.Get) => 
  useFetching<
    Requests.Exam.Get, 
    Responses.Exam.Get
  >(Get, params)