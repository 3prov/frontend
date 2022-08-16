import { combineReducers } from "@reduxjs/toolkit";
import essayReducer from './slices/essaySlice'
import notificationSlice from "./slices/notificationSlice";

export default combineReducers({
  essayReducer,
  notificationSlice
})