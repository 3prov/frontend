import { createApi } from "../root"
import Requests from "../requests";
import Responses from "../responces";
import useFetching from "../../hooks/use-fetching";

export const GetEssaysByDate = ({year, week}: Requests.Common.GetEssaysByDate = {
  year: new Date().getFullYear(), 
  week: new Date().getMonth() + 1
}) => createApi({
  url: `rus/results`,
  params: {
    task__week_id__study_year_from: '' + year,
    task__week_id__week_number: '' + week
  }
})
export const GetDateInfo = () => createApi({
  url: `rus/text/list_all/`
})
export const GetText = ({uuid}: Requests.Common.GetText) => createApi({
  url: `rus/text/${uuid}/`
})
export const GetEssay = ({uuid}: Requests.Common.GetEssay) => createApi({
  url: `rus/essay/${uuid}/`
})
export const GetExamRate = ({uuid}: Requests.Common.GetExamRate) => createApi({
  url: `rus/results/get_rate_by_evaluation_criteria/${uuid}/`
})

export const useCommonGetEssaysByDate = (params: Requests.Common.GetEssaysByDate) => 
  useFetching<
    Requests.Common.GetEssaysByDate, 
    Responses.Common.GetEssaysByDate
  >(GetEssaysByDate, params)

export const useCommonGetDateInfo = (params: Requests.Common.GetDateInfo) => 
  useFetching<
    Requests.Common.GetDateInfo, 
    Responses.Common.GetDateInfo
  >(GetDateInfo, params)

export const useCommonGetText = (params: Requests.Common.GetText) => 
  useFetching<
    Requests.Common.GetText, 
    Responses.Common.GetText
  >(GetText, params)

export const useCommonGetEssay = (params: Requests.Common.GetEssay) => 
  useFetching<
    Requests.Common.GetEssay, 
    Responses.Common.GetEssay
  >(GetEssay, params)

export const useCommonGetExamRate = (params: Requests.Common.GetExamRate) => 
  useFetching<
    Requests.Common.GetExamRate, 
    Responses.Common.GetExamRate
  >(GetExamRate, params)