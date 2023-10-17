import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { getMathTask } from '../../mathService'
import { MathTask, Operations } from '../../types'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppStore'
import { actionStopGame } from '../../store/mathSlice'
import css from './index.module.scss'

type AnswerStatus = 'correct' | 'wrong' | 'uncertainly'

const getSign = (operation: Operations) => {
  const signs = {
    addition: <span>&#43;</span>,
    subtraction: <span>&minus;</span>,
    multiplication: <span>&times;</span>,
    division: <span>&divide;</span>
  }

  return signs[operation]
}

export const MathTasks = () => {
  const { difficulty, time } = useAppSelector(state => state.math.settings)
  const dispatch = useAppDispatch()

  const [currentTask, setCurrentTask] = useState<MathTask>(getMathTask(difficulty))
  const [nextTask, setNextTask] = useState<MathTask>(getMathTask(difficulty))
  const [answer, setAnswer] = useState<string[]>([])
  const [isFirstTask, setIsFirstTask] = useState<boolean>(true)
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('uncertainly')
  const [{ correct, total }, setStatistic] = useState({ correct: 0, total: 0 })

  const checkAnswer = () => {
    if (answer.length !== currentTask.answer.toString().length) {
      return
    }

    answer.join('') === currentTask.answer.toString() ?
      setAnswerStatus('correct') :
      setAnswerStatus('wrong')

    if (isFirstTask) {
      setIsFirstTask(false)
    }

    setTimeout(() => {
      setAnswer([])
      setCurrentTask(nextTask)
    }, 400)

    setTimeout(() => {
      setNextTask(getMathTask(difficulty))
    }, 600)
  }

  useEffect(() => {
    const watchStatistic = () => {
      if (answerStatus === 'correct') {
        setStatistic(({ correct, total }) => ({
          correct: correct + 1,
          total: total + 1,
        }))
      }
      if (answerStatus === 'wrong') {
        setStatistic(({ correct, total }) => ({
          correct,
          total: total + 1,
        }))
      }
    }
    watchStatistic()
  }, [answerStatus])

  useEffect(() => {
    if (time === 0) {
      const bestResult = sessionStorage.getItem('bestResult')

      sessionStorage.setItem('lastResult', `${correct}/${total}`)

      if (!bestResult) {
        sessionStorage.setItem('bestResult', `${correct}/${total}`)
      } else {
        const bestCorrect = parseInt(bestResult.split('/')[0])

        if (correct > bestCorrect) {
          sessionStorage.setItem('bestResult', `${correct}/${total}`)
        }
      }
      dispatch(actionStopGame())
    }
    setTimeout(() => setAnswerStatus('uncertainly'), 200)
  }, [currentTask])

  useEffect(() => {
    const keyboardHandler = (event: KeyboardEvent) => {
      if (answerStatus !== 'uncertainly') return

      if (event.key === 'Backspace') {
        setAnswer(answer => answer.slice(0, -1))
      }

      if (answer.length >= currentTask.answer.toString().length) {
        return
      }

      if (/[\d-]/.test(event.key)) {
        setAnswer(answer => [...answer, event.key])
      }
    }

    checkAnswer()

    document.addEventListener('keyup', keyboardHandler)

    return () => {
      document.removeEventListener('keyup', keyboardHandler)
    }
  }, [answer, answerStatus])

  const currentTaskClasses = classNames({
    [css['current-task']]: true,
    [css['current-task-appearence']]: isFirstTask,
    [css['current-task-fade']]: answerStatus !== 'uncertainly',
  })

  const highlightClasses = classNames({
    [css['correct-highlight']]: answerStatus === 'correct',
    [css['wrong-highlight']]: answerStatus === 'wrong',
  })

  const nextTaskClasses = classNames({
    [css['next-task']]: true,
    [css['next-task-appearence-first']]: answerStatus === 'uncertainly' && isFirstTask,
    [css['next-task-appearence']]: answerStatus === 'uncertainly' && !isFirstTask,
    [css['next-task-transform']]: answerStatus !== 'uncertainly',
  })

  return (
    <div className={css.tasks}>
      <div className={css.statistic}>{correct} / {total}</div>
      <div className={currentTaskClasses}>
        <span className={highlightClasses}>
          {currentTask.firstNumber}&nbsp;
          {getSign(currentTask.operation)}&nbsp;
          {currentTask.secondNumber} =&nbsp;
          {answer.join('')}
        </span>
      </div>
      <div className={nextTaskClasses}>
        {nextTask.firstNumber}&nbsp;
        {getSign(nextTask.operation)}&nbsp;
        {nextTask.secondNumber} =
      </div>
    </div>
  )
}