import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppStore'
import { actionSetDifficulty, actionSetTime, actionStartGame } from '../../../store/mathSlice'
import css from './index.module.scss'

export const MathSettings = () => {
  const { settings } = useAppSelector(state => state.math)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(actionSetTime(90))
  }, [])

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
          onChange={({ target }) => dispatch(actionSetDifficulty(parseInt(target.value)))}
        />
        <span>Difficulty: {settings.difficulty}</span>
      </div>
      <div className={css.input}>
        <input
          type='range'
          name='time'
          onChange={({ target }) => {
            const time = parseInt(target.value)
            if (time < 30) return
            dispatch(actionSetTime(time))
          }}
          value={settings.time}
          min={0}
          max={180}
          step={15}
        />
        <span>Time: {settings.time}</span>
      </div>
      {
        sessionStorage.getItem('lastResult') &&
        sessionStorage.getItem('bestResult') &&
        <>
          <p>Last result: {sessionStorage.getItem('lastResult')}</p>
          <p>Best result: {sessionStorage.getItem('bestResult')}</p>
        </>
      }
      <button
        className={css.button}
        onClick={() => dispatch(actionStartGame())}
      >
        Start
      </button>
    </div>
  )
}