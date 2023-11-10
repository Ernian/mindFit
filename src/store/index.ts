import { configureStore } from '@reduxjs/toolkit'
import mathReducer from './mathSlice'
import pairsReducer from './pairSlice'

const store = configureStore({
  reducer: {
    math: mathReducer,
    pairs: pairsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store