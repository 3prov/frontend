import useFetching from "../../hooks/use-fetching";
import Requests from "../requests";
import Responses from "../responces";
import { createApi } from "../root"

export const Get = ({ 
  uuid 
}: Requests.Write.Get) => createApi({
  url: `encoded-form-urls/work/${uuid}/`
})

export const Post = ({
  uuid, body
}: Requests.Write.Post) => createApi({
  url: `rus/essay/form-url/${uuid}/post/`,
  method: 'POST',
  data: {
    body
  }
})

export const Update = ({
  uuid, body
}: Requests.Write.Update) => createApi({
  url: `rus/essay/form-url/${uuid}/edit/`,
  method: 'PUT',
  data: {
    body
  }
})

export const useGetWrite = ({uuid}: Requests.Write.Get) => 
  useFetching<
    Requests.Write.Get, 
    Responses.Write.Get
  >(Get, {uuid})