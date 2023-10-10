import { useEffect, useState } from 'react'
import classNames from 'classnames'
import css from './index.module.scss'

interface TimerProps {
  time: number,
  stopGame: () => void
}

export const Timer = ({ time, stopGame }: TimerProps) => {
  const [seconds, setSeconds] = useState(time)

  useEffect(() => {

    const id = setInterval(() => {
      if (seconds > 1) {
        setSeconds(seconds => seconds - 1)
      } else {
        stopGame()
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