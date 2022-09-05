import useFetching from "../../hooks/use-fetching";
import Requests from "../requests";
import Responses from "../responces";
import { createApi } from "../root"

export const PostRateExam = ({ 
  uuid, 
  score, 
  evaluation_criteria 
}: Requests.Rate.Post) => createApi({
  url: `rus/results/rate_essay_evaluation/${uuid}/post/`,
  method: 'POST',
  data: {
    score,
    evaluation_criteria
  }
})

export const GetExamResults = ({ 
  uuid 
}: Requests.Rate.GetExamResults) => createApi({
  url: `encoded-form-urls/results/${uuid}/`
})

export const GetTextByEssayId = ({ 
  uuid 
}: Requests.Rate.GetTextByEssayId) => createApi({
  url: `rus/text/get_by_results_form_url/${uuid}/`
})

export const useGetExamResults = (params: Requests.Rate.GetExamResults) => 
  useFetching<
    Requests.Rate.GetExamResults,
    Responses.Rate.GetExamResults
  >(GetExamResults, params)

export const useGetTextByEssayId = (params: Requests.Rate.GetTextByEssayId) => 
  useFetching<
    Requests.Rate.GetTextByEssayId,
    Responses.Rate.GetTextByEssayUuid
  >(GetTextByEssayId, params)