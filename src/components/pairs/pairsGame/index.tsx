import { Dispatch, SetStateAction } from 'react'
import { useAppDispatch } from '../../../hooks/useAppStore'
import { PairService } from '../pairService'
import {
  actionResetOpenedCard,
  actionResetFindedCards
} from '../../../store/pairSlice'
import { CountOfCards } from '../../../types'
import css from './index.module.scss'

interface PairsGameProps {
  countOfCards: CountOfCards
  setIsPlay: Dispatch<SetStateAction<boolean>>
}

export const PairsGame = ({ countOfCards, setIsPlay }: PairsGameProps) => {
  const dispatch = useAppDispatch()
  const pairService = new PairService(countOfCards)

  const stopGame = () => {
    setIsPlay(false)
    dispatch(actionResetOpenedCard())
    dispatch(actionResetFindedCards())
  }

  return (
    <div className={css.game}>
      <div className={css[pairService.getGridClass()]}>
        {pairService.renderIcons()}
      </div>
      <button
        className={css.button}
        onClick={stopGame}
      >
        Stop
      </button>
    </div>
  )
}