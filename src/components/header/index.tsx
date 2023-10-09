import { Link } from 'react-router-dom'
import logo from '../../assets/favicon/favicon-32x32.png'
import css from './index.module.scss'

export const Header = () => {
  return (
    <header className={css.header}>
      <div className={`${css.container} container`}>
        <Link to='/' className={css.logo}>
          <img src={logo} alt='logo' />
        </Link>
        <Link to='/math-one-love'>Math</Link>
        <Link to='/pairs'>Pairs</Link>
      </div>
    </header>
  )
}