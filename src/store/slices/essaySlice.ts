import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { essayWriteTokenFormat } from "../../utils";

export interface EssayState {
  originalText: string,
  essayText: string
}

type EssayToken = string

const initialState: EssayState = {
  originalText: 'none',
  essayText: ''
}

const essaySlice = createSlice({
  name: 'essay',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<EssayToken>) => {
      const getText = localStorage.getItem(essayWriteTokenFormat(action.payload))
      if (getText) {
        state.essayText = getText
      }
    },
    editText: (state, action: PayloadAction<string>) => {
      state.essayText = action.payload
    },
    exit: (state, action: PayloadAction<EssayToken>) => {
      localStorage.setItem(essayWriteTokenFormat(action.payload), state.essayText)
    }
  }
})

export const { setText, editText, exit } = essaySlice.actions
export default essaySlice.reducer