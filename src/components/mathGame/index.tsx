import { useState } from 'react'
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
  const [timeIsOver, setTimeIsOver] = useState(false)

  return (
    <div className={css.game}>
      <Timer
        time={time}
        setTimeIsOver={setTimeIsOver}
      />
      <MathTasks
        difficulty={difficulty}
        timeIsOver={timeIsOver}
        stopGame={stopGame}
      />
      <button
        className={css.button}
        onClick={stopGame}
      >
        Stop
      </button>
      <ScreenKeyboard />
    </div>
  )
}