import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  openedCard: string
  findedCards: string[]
}

const initialState: InitialState = {
  openedCard: '',
  findedCards: []
}

const pairsSlice = createSlice({
  name: 'pairs',
  initialState,
  reducers: {
    actionSetOpenedCard(state, { payload }: PayloadAction<string>) {
      if (!state.openedCard) {
        state.openedCard = payload
      }
      return state
    },
    actionResetOpenedCard(state) {
      state.openedCard = ''
    },
    actionAddFindedCard(state, { payload }: PayloadAction<string>) {
      state.findedCards.push(payload)
    },
    actionResetFindedCards(state) {
      state.findedCards = []
    },
  }
})

export const {
  actionSetOpenedCard,
  actionResetOpenedCard,
  actionAddFindedCard,
  actionResetFindedCards,
} = pairsSlice.actions

export default pairsSlice.reducer