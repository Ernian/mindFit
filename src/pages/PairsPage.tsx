import { useState } from 'react'
import { CountOfCards } from '../types'
import { PairsSettings } from '../components/pairs/pairSettings'
import { PairsGame } from '../components/pairs/pairsGame'

const PairsPage = () => {
  const [countOfCards, setCountOfCards] = useState<CountOfCards>(4)
  const [isPlay, setIsPlay] = useState(false)

  return (
    <>
      {
        isPlay ?
          <PairsGame
            setIsPlay={setIsPlay}
            countOfCards={countOfCards}
          /> :
          <PairsSettings
            setIsPlay={setIsPlay}
            countOfCards={countOfCards}
            setCountOfCards={setCountOfCards}
          />
      }
    </>
  )
}

export default PairsPage