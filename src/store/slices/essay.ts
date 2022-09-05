import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { WriteApi } from "../../api";
import Responses from "../../api/responces";
import { WriteWorker } from "../../domain/storage";
import type { DateString } from "../../entities/common";
import type { Essay } from "../../entities/essay";
import { Id, NotificationTypes, Status } from "../../entities/ui";
import { addNotif } from "./notifs";

type EssayState = {
  text: string
  created_at: DateString
  status: Status
}

export const sendEssay = createAsyncThunk<
  Responses.Write.Post | Responses.Write.Update | void, 
  { uuid: string }, 
  { state: RootState }
>(
  'essay/send',
  async ({uuid}, {getState, dispatch}) => {
    const { essay } = getState()
    if (essay.status === 'sended') {
      dispatch(changeStatus('edit'))
      return 
    }
    const res = await (essay.status === 'init' ? WriteApi.Post({ uuid, body: essay.text }) : WriteApi.Update({uuid, body: essay.text}))
    if (!res || !res.ok) {
      dispatch(addNotif({type: NotificationTypes.SEND_ERR}))
      throw new Error(res.statusText)
    }
    const json = await res.json()
    dispatch(addNotif({
      type: essay.status === 'init' 
        ? NotificationTypes.SEND_DONE 
        : NotificationTypes.EDIT_DONE
    }))
    return json
  }
)

const initialState: EssayState = {
  text: '',
  created_at: '',
  status: 'init'
}

const essaySlice = createSlice({
  name: 'essay',
  initialState,
  reducers: {
    initText: (state, action: PayloadAction<Id>) => {
      state.text = WriteWorker.get(action.payload)!
    },
    syncText: (state, action: PayloadAction<Essay | null>) => {
      if (!action.payload) return
      state.created_at = action.payload.created_at || ''

      const desync = state.text.length !== action.payload.body.length && state.text !== ''
      if (desync) {
        state.status = 'edit'
      }
      else {
        state.text = action.payload.body
        state.status = 'sended'
      }
    },
    editText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
    changeStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(sendEssay.fulfilled, (state, action: PayloadAction<Responses.Write.Post | Responses.Write.Update | void>) => {
      if (!action.payload) {
        return
      }
      state.created_at = action.payload.created_at || ''
      state.text = action.payload.body
      state.status = 'sended'
    })
  }
})

export default essaySlice.reducer
export const { initText, syncText, editText, changeStatus } = essaySlice.actions