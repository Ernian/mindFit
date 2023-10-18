import { Outlet } from 'react-router-dom'
import { Header } from '../header'
import { Footer } from '../footer'
import { Loader } from '../loader'
import css from './index.module.scss'

interface LayoutProps {
  isLoading?: boolean
}

const Layout = ({ isLoading }: LayoutProps) => {
  return (
    <main className={css.main}>
      <Header />
      <div className={css.content}>
        {isLoading && <Loader />}
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}

export default Layout