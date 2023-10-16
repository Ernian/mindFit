import { configureStore } from '@reduxjs/toolkit'
import mathReducer from './mathSlice'

const store = configureStore({
  reducer: {
    math: mathReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store