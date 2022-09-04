import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import evaluationSlice from "./slices/evaluation";
import essaySlice from './slices/essay'
import notificationSlice from "./slices/notifs";

const store = configureStore({
  reducer: {
    essay: essaySlice,
    evaluation: evaluationSlice,
    notifs: notificationSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store