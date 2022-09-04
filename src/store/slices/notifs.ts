import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notif, NotificationTypes } from "../../entities/ui";

type NotifsState = {
  notifs: Notif[]
}

const initialState: NotifsState = {
  notifs: []
}

const notifsSlice = createSlice({
  name: 'notifs',
  initialState,
  reducers: {
    addNotif: (state, action: PayloadAction<{type: NotificationTypes, payload?: string}>) => {
      state.notifs.push({
        id: Date.now() + Math.random(), 
        type: action.payload.type, 
        payload: action.payload.payload
      })
    },
    removeNotif: (state, action: PayloadAction<number>) => {
      state.notifs = state.notifs.filter(notif => notif.id !== action.payload)
    }
  }
})

export default notifsSlice.reducer
export const { addNotif, removeNotif } = notifsSlice.actions