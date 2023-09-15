import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Layout from './components/layout'


const LazyMathPage = lazy(() => import('./pages/MathPage'))
const LazyPairsPage = lazy(() => import('./pages/PairsPage'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Layout isLoading={true} />}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path='math-one-love' element={<LazyMathPage />} />
            <Route path='pairs' element={<LazyPairsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
