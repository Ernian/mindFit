import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { CountOfCards } from '../../../types'
import css from './index.module.scss'

interface PairsSettingsProps {
  setIsPlay: Dispatch<SetStateAction<boolean>>
  countOfCards: CountOfCards
  setCountOfCards: Dispatch<SetStateAction<CountOfCards>>
}

export const PairsSettings = ({ setIsPlay, countOfCards, setCountOfCards }: PairsSettingsProps) => {
  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(event.target.value) as CountOfCards
    setCountOfCards(count)
  }

  return (
    <div className={css.settings}>
      <h2 className={css.header}>Settings</h2>

      <div className={css.select}>
        <select
          name="count-of-cards"
          onChange={onChangeHandler}
          value={countOfCards}
        >
          <option value="4">8</option>
          <option value="8">16</option>
          <option value="12">24</option>
        </select>
        <span>Count of cards: {countOfCards * 2}</span>
      </div>

      <button
        className={css.button}
        onClick={() => setIsPlay(true)}
      >
        Start
      </button>
    </div>
  )
}