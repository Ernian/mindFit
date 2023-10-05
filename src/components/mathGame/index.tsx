import { MathTasks } from '../mathTasks'
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
      <div className={css.timer}>Time: {time}</div>
      <MathTasks difficulty={difficulty} />
      <button className={css.button} onClick={stopGame}>Stop</button>
    </div>
  )
}