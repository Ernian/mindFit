import { Link, Outlet } from 'react-router-dom'

interface LayoutProps {
  isLoading?: boolean
}

const Layout = ({ isLoading }: LayoutProps) => {
  return (
    <>
      <header>
        header
        <Link to='/'>Main</Link>
        <Link to='/math-one-love'>Math</Link>
        <Link to='/pairs'>Pairs</Link>
      </header>
      <main>
        main
        {isLoading && <h2>Loading</h2>}
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  )
}

export default Layout