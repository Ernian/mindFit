import { MathSettings } from '../components/mathSettings'
import { MathGame } from '../components/mathGame'
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