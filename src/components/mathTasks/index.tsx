import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { getMathTask } from '../../mathService'
import { MathTask, Operations } from '../../types'
import css from './index.module.scss'

interface TasksProps {
  difficulty: number,
  timeIsOver: boolean,
  stopGame: () => void
}

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

export const MathTasks = ({ difficulty, timeIsOver, stopGame }: TasksProps) => {
  const [currentTask, setCurrentTask] = useState<MathTask>(getMathTask(difficulty))
  const [nextTask, setNextTask] = useState<MathTask>(getMathTask(difficulty))
  const [answer, setAnswer] = useState<string[]>([])
  const [isFirstTask, setIsFirstTask] = useState<boolean>(true)
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('uncertainly')

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
    if (timeIsOver) {
      stopGame()
    }
    setTimeout(() => setAnswerStatus('uncertainly'), 200)
  }, [currentTask])

  useEffect(() => {
    const keyboardHandler = (event: KeyboardEvent) => {
      if (answerStatus !== "uncertainly") return

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