import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import classNames from 'classnames'
import css from './index.module.scss'

interface TimerProps {
  time: number,
  setTimeIsOver: Dispatch<SetStateAction<boolean>>,
}

export const Timer = ({ time, setTimeIsOver }: TimerProps) => {
  const [seconds, setSeconds] = useState(time)

  useEffect(() => {

    const id = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds => seconds - 1)
      } else {
        clearInterval(id)
        setTimeIsOver(true)
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