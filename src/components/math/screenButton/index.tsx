import { FiDelete } from 'react-icons/fi'
import css from './index.module.scss'

export const ScreenButton = ({ button }: { button: string }) => {
  const onClickHandler = () => {
    const key = /[\d-]/.test(button) ? button : 'Backspace'

    const event = new KeyboardEvent('keyup', { key })

    document.dispatchEvent(event)
  }

  return (
    <button
      className={css.button}
      onClick={onClickHandler}
    >
      {button === 'del' ? <FiDelete /> : button}
    </button>
  )
}