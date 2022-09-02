import useFetching, { useMutation } from "../../hooks/use-fetching";
import Requests from "../requests";
import Responses from "../responces";
import Api from "../rootApi";

export default class WriteApi extends Api {
  static Get({ uuid }: Requests.Write.Get) {
    return fetch(Api.BASE_URL + `encoded-form-urls/work/${uuid}/`)
  } 
  static Post({ uuid, body }: Requests.Write.Post) {
    return fetch(Api.BASE_URL + `rus/essay/form-url/${uuid}/post/`, {
      method: 'POST',
      body: JSON.stringify({body}),
      headers: Api.Headers,
    })
  }
  static Update({ uuid, body }: Requests.Write.Update) {
    return fetch(Api.BASE_URL + `rus/essay/form-url/${uuid}/edit/`, {
      method: 'PUT',
      body: JSON.stringify({body}),
      headers: Api.Headers
    })
  }
}

export const useGetWrite = ({uuid}: Requests.Write.Get, depth: any[] = []) => 
  useFetching<
    Requests.Write.Get, 
    Responses.Write.Get
  >(WriteApi.Get, {uuid}, depth)

export const usePostWrite = () => 
  useMutation<
    Requests.Write.Post, 
    Responses.Write.Post
  >(WriteApi.Post)

export const useUpdateWrite = () => 
  useMutation<
    Requests.Write.Update, 
    Responses.Write.Update
  >(WriteApi.Update)