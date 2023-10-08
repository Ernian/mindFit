import { ChangeEvent, useState } from 'react'
import { MathSettings } from '../components/mathSettings'
import { Settings } from '../types'
import { MathGame } from '../components/mathGame'

const MathPage = () => {
  const [isGameStart, setIsGameStart] = useState(false)
  const [settings, setSettings] = useState<Settings>({ difficulty: 1, time: 120 })

  const startGame = () => setIsGameStart(true)
  const stopGame = () => setIsGameStart(false)

  const changeSettings = (event: ChangeEvent<HTMLInputElement>, key: keyof Settings) => {
    setSettings({
      ...settings,
      [key]: key === 'difficulty' ?
        (+event.target.value > 0 ? event.target.value : 1) :
        (+event.target.value < 30 ? 30 : event.target.value)
    })
  }

  return (
    <>
      {
        isGameStart ?
          <MathGame
            settings={settings}
            stopGame={stopGame}
          /> :
          <MathSettings
            startGame={startGame}
            settings={settings}
            changeSettings={changeSettings}
          />
      }
    </>
  )
}

export default MathPage