import useFetching, { useMutation } from "../../hooks/use-fetching";
import Requests from "../requests";
import Responses from "../responces";
import Api from "../rootApi";

export default class ExamApi extends Api {
  static Get({uuid}: Requests.Exam.Get) {
    return fetch(Api.BASE_URL + `encoded-form-urls/evaluation/${uuid}/`)
  } 
  static PostCriteria({uuid, criteria}: Requests.Exam.PostCriteria) {
    return fetch(Api.BASE_URL + `rus/evaluation/form-url/${uuid}/post/`, {
      method: 'POST',
      body: JSON.stringify({ 
        criteria 
      }),
      headers: Api.Headers,
    })
  }
  static UpdateCriteria({uuid, criteria}: Requests.Exam.UpdateCriteria) {
    return fetch(Api.BASE_URL + `rus/evaluation/form-url/${uuid}/edit/`, {
      method: 'PUT',
      body: JSON.stringify({ 
        criteria
      }),
      headers: Api.Headers
    })
  }
  static PostSentence({uuid, evaluator_comment, mistake_type, sentence_number}: Requests.Exam.PostSentence) {
    return fetch(Api.BASE_URL + `rus/evaluation/sentence_review/form-url/${uuid}/post/`, {
      method: 'POST',
      body: JSON.stringify({
        evaluator_comment,
        mistake_type,
        sentence_number
      }),
      headers: Api.Headers
    })
  }
  static UpdateSentence({uuid, evaluator_comment, mistake_type, sentence_number}: Requests.Exam.UpdateSentence) {
    return fetch(Api.BASE_URL + `rus/evaluation/sentence_review/form-url/${uuid}/edit/${sentence_number}`, {
      method: 'PUT',
      body: JSON.stringify({
        evaluator_comment,
        mistake_type
      }),
      headers: Api.Headers
    })
  }
}

export const useGetExam = (params: Requests.Exam.Get) => 
  useFetching<
    Requests.Exam.Get, 
    Responses.Exam.Get
  >(ExamApi.Get, params)

export const usePostCriteriaExam = () => 
  useMutation<
    Requests.Exam.PostCriteria, 
    Responses.Exam.PostCriteria
  >(ExamApi.Get)

export const useUpdateCriteriaExam = () => 
  useMutation<
    Requests.Exam.UpdateCriteria, 
    Responses.Exam.UpdateCriteria
  >(ExamApi.UpdateCriteria)

export const usePostSentenceExam = () => 
  useMutation<
    Requests.Exam.PostSentence, 
    Responses.Exam.PostSentence
  >(ExamApi.PostSentence)

export const useUpdateSentenceExam = () => 
  useMutation<
    Requests.Exam.UpdateSentence, 
    Responses.Exam.UpdateSentence
  >(ExamApi.UpdateSentence)