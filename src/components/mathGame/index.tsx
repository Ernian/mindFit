import { Timer } from '../timer'
import { MathTasks } from '../mathTasks'
import { ScreenKeyboard } from '../screenKeyboard'
import { useAppDispatch } from '../../hooks/useAppStore'
import { actionStopGame } from '../../store/mathSlice'
import css from './index.module.scss'

export const MathGame = () => {
  const dispatch = useAppDispatch()

  return (
    <div className={css.game}>
      <Timer />
      <MathTasks />
      <button
        className={css.button}
        onClick={() => dispatch(actionStopGame())}
      >
        Stop
      </button>
      <ScreenKeyboard />
    </div>
  )
}