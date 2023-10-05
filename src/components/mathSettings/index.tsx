import { ChangeEvent } from 'react'
import { Settings } from '../../types'
import css from './index.module.scss'

interface MathSettingsProps {
  startGame: () => void
  settings: Settings,
  changeSettings: (event: ChangeEvent<HTMLInputElement>, key: keyof Settings) => void
}

export const MathSettings = ({ startGame, settings, changeSettings }: MathSettingsProps) => {

  return (
    <div className={css.settings}>
      <h2 className={css.header}>Settings</h2>
      <div className={css.input}>
        <input
          type='range'
          name='difficulty'
          value={settings.difficulty}
          min={0}
          max={3}
          step={1}
          onChange={(event) => { changeSettings(event, 'difficulty') }}
        />
        <span>Difficulty: {settings.difficulty}</span>
      </div>
      <div className={css.input}>
        <input
          type='range'
          name='time'
          onChange={(event) => { changeSettings(event, 'time') }}
          value={settings.time}
          min={0}
          max={180}
          step={15}
        />
        <span>Time: {settings.time}</span>
      </div>
      <button onClick={startGame} className={css.button}>Start</button>
    </div>
  )
}