import useFetching, { useMutation } from "../../hooks/use-fetching";
import Requests from "../requests";
import Responses from "../responces";
import Api from "../rootApi";

export default class RateApi extends Api {
  static PostRateExam({ uuid, score, evaluation_criteria }: Requests.Rate.Post) {
    return fetch(Api.BASE_URL + `rus/results/rate_essay_evaluation/${uuid}/post/`, {
      method: "POST",
      body: JSON.stringify({
        score,
        evaluation_criteria
      }),
      headers: Api.Headers
    })
  }
  static GetExamResults({ uuid }: Requests.Rate.GetExamResults) {
    return fetch(Api.BASE_URL + `encoded-form-urls/results/${uuid}/`)
  }
  static GetTextByEssayId({ uuid }: Requests.Rate.GetTextByEssayId) {
    return fetch(Api.BASE_URL + `rus/text/get_by_results_form_url/${uuid}/`)
  }
}

export const usePostRate = () => 
  useMutation<
    Requests.Rate.Post, 
    Responses.Rate.Post
  >(RateApi.PostRateExam)

export const useGetExamResults = (params: Requests.Rate.GetExamResults) => 
  useFetching<
    Requests.Rate.GetExamResults,
    Responses.Rate.GetExamResults
  >(RateApi.GetExamResults, params)

export const useGetTextByEssayId = (params: Requests.Rate.GetTextByEssayId) => 
  useFetching<
    Requests.Rate.GetTextByEssayId,
    Responses.Rate.GetTextByEssayUuid
  >(RateApi.GetTextByEssayId, params)