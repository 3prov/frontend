import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum NotifTypes {
  none = "NONE",
  edited = "EDITED",
  sended = "SENDED",
  notifTimeWrite = "NOTIF_TIME_WRITE",
  notifTimeExam = "NOTIF_TIME_EXAM"
}

type Notif = {
  id: string,
  current: NotifTypes,
  time?: Date
}

export interface NotifState {
  notifs: Notif[]
}

const initialState: NotifState = {
  notifs: []
}

const notifSlice = createSlice({
  name: 'notif',
  initialState,
  reducers: {
    addNotif: (state, action: PayloadAction<Notif>) => {
      state.notifs.push(action.payload)
    },
    deleteNotif: (state, action: PayloadAction<Notif>) => {
      state.notifs = state.notifs.filter(notif => notif.id !== action.payload.id)
    },
    clearNotifs: (state) => {
      state.notifs = []
    }
  }
})

export const { addNotif, deleteNotif, clearNotifs } = notifSlice.actions
export default notifSlice.reducer