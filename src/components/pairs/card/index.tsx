import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppStore'
import {
  actionSetOpenedCard,
  actionResetOpenedCard,
  actionAddFindedCard,
} from '../../../store/pairSlice'
import { question } from '../icons'
import css from './index.module.scss'

export const Card = ({ icon }: { icon: JSX.Element }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { findedCards, openedCard } = useAppSelector(state => state.pairs)
  const dispatch = useAppDispatch()

  const iconName = icon.type.name as string

  const cardClasses = classNames({
    [css['card']]: true,
    [css['flip']]: isOpen || findedCards.includes(iconName),
    [css['find']]: findedCards.includes(iconName),
  })

  const openCard = () => {
    if (!isOpen) {
      setIsOpen(true)
    }

    if (!openedCard) {
      dispatch(actionSetOpenedCard(iconName))
      return
    }

    if (openedCard === iconName) {
      dispatch(actionAddFindedCard(iconName))
      dispatch(actionResetOpenedCard())
    } else {
      setTimeout(() => {
        dispatch(actionResetOpenedCard())
      }, 800)
    }
  }

  useEffect(() => {
    if (isOpen && !openedCard) {
      setIsOpen(false)
    }
  }, [openedCard])

  return (
    <div className={css.container}>
      {
        icon.type.name === 'ImCool' ?
          <div className={css.cool}>{icon}</div > :
          <div className={cardClasses}>
            <div className={css.question} onClick={openCard}>
              {question}
            </div>
            <div className={css.icon}>
              {icon}
            </div>
          </div>
      }
    </div>
  )
}