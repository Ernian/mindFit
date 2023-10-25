import { useEffect, useState } from 'react'
import classNames from 'classnames'
import css from './index.module.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppStore'
import { actionSetTime } from '../../../store/mathSlice'

export const Timer = () => {
  const { time } = useAppSelector(state => state.math.settings)
  const dispatch = useAppDispatch()

  const [seconds, setSeconds] = useState(time)

  useEffect(() => {

    const id = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds => seconds - 1)
      } else {
        clearInterval(id)
        dispatch(actionSetTime(0))
      }
    }, 1000)

    return () => clearInterval(id)
  }, [seconds])

  const classes = classNames({
    [css['timer']]: true,
    [css['danger']]: seconds < 15,
  })

  return (
    <div className={classes}>
      Time: {seconds}
    </div>
  )
}