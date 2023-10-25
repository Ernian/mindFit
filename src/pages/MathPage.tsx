import { MathSettings } from '../components/math/mathSettings'
import { MathGame } from '../components/math/mathGame'
import { useAppSelector } from '../hooks/useAppStore'

const MathPage = () => {

  const { isPlay } = useAppSelector(state => state.math)

  return (
    <>
      {
        isPlay ? <MathGame /> : <MathSettings />
      }
    </>
  )
}

export default MathPage