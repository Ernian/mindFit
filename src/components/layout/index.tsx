import { Outlet } from 'react-router-dom'
import { Header } from '../header'
import { Footer } from '../footer'
import css from './index.module.scss'

interface LayoutProps {
  isLoading?: boolean
}

const Layout = ({ isLoading }: LayoutProps) => {
  return (
    <main className={css.main}>
      <Header />
      <div className={css.content}>
        {isLoading && <h2>Loading...</h2>}
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}

export default Layout