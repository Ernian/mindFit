import { Timer } from '../timer'
import { MathTasks } from '../mathTasks'
import { ScreenKeyboard } from '../screenKeyboard'
import { Settings } from '../../types'
import css from './index.module.scss'

interface MathGameProps {
  settings: Settings,
  stopGame: () => void
}

export const MathGame = ({ settings, stopGame }: MathGameProps) => {
  const { difficulty, time } = settings

  return (
    <div className={css.game}>
      <Timer time={time} stopGame={stopGame} />
      <MathTasks difficulty={difficulty} />
      <button className={css.button} onClick={stopGame}>Stop</button>
      <ScreenKeyboard />
    </div>
  )
}