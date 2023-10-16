import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  isPlay: boolean
  settings: {
    difficulty: number
    time: number
  }

}

const initialState: InitialState = {
  isPlay: false,
  settings: {
    difficulty: 1,
    time: 120
  }
}

const mathSlice = createSlice({
  name: 'math',
  initialState,
  reducers: {
    actionStartGame(state) {
      state.isPlay = true
    },
    actionStopGame(state) {
      state.isPlay = false
    },
    actionSetDifficulty(state, { payload }: PayloadAction<number>) {
      if (payload < 1) return state
      state.settings.difficulty = payload
    },
    actionSetTime(state, { payload }: PayloadAction<number>) {
      state.settings.time = payload
    },
  }
})

export const {
  actionStartGame,
  actionStopGame,
  actionSetDifficulty,
  actionSetTime,
} = mathSlice.actions

export default mathSlice.reducer