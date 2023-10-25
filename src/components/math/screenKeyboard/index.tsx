import { ScreenButton } from '../screenButton'
import css from './index.module.scss'

const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '0', '⇐']

export const ScreenKeyboard = () => {


  return (
    <div className={css.keyboard}>
      {
        buttons.map(button => <ScreenButton key={button} button={button} />)
      }
    </div>
  )
}