import useFetching from "../../hooks/use-fetching";
import Requests from "../requests";
import Responses from "../responces";
import Api from "../rootApi";

export default class CommonApi extends Api {
  static GetEssaysByDate({year, week}: Requests.Common.GetEssaysByDate = {
    year: new Date().getFullYear(), 
    week: new Date().getMonth() + 1
  }) {
    return fetch(Api.BASE_URL + `rus/results?task__week_id__study_year_from=${year}&task__week_id__week_number=${week}`)
  }
  static GetDateInfo(_: Requests.Common.GetDateInfo) {
    return fetch(Api.BASE_URL + `rus/text/list_all/`)
  }
  static GetText({uuid}: Requests.Common.GetText) {
    return fetch(Api.BASE_URL + `rus/text/${uuid}/`)
  }
  static GetEssay({uuid}: Requests.Common.GetEssay) {
    return fetch(Api.BASE_URL + `rus/essay/${uuid}/`)
  }
  static GetExamRate({uuid}: Requests.Common.GetExamRate) {
    return fetch(Api.BASE_URL + `rus/results/get_rate_by_evaluation_criteria/${uuid}/`)
  }
}

export const useCommonGetEssaysByDate = (params: Requests.Common.GetEssaysByDate) => 
  useFetching<
    Requests.Common.GetEssaysByDate, 
    Responses.Common.GetEssaysByDate
  >(CommonApi.GetEssaysByDate, params)

export const useCommonGetDateInfo = (params: Requests.Common.GetDateInfo) => 
  useFetching<
    Requests.Common.GetDateInfo, 
    Responses.Common.GetDateInfo
  >(CommonApi.GetDateInfo, params)

export const useCommonGetText = (params: Requests.Common.GetText) => 
  useFetching<
    Requests.Common.GetText, 
    Responses.Common.GetText
  >(CommonApi.GetText, params)

export const useCommonGetEssay = (params: Requests.Common.GetEssay) => 
  useFetching<
    Requests.Common.GetEssay, 
    Responses.Common.GetEssay
  >(CommonApi.GetEssay, params)

export const useCommonGetExamRate = (params: Requests.Common.GetExamRate) => 
  useFetching<
    Requests.Common.GetExamRate, 
    Responses.Common.GetExamRate
  >(CommonApi.GetExamRate, params)