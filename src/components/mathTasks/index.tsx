import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { getMathTask } from '../../mathService'
import { MathTask, Operations } from '../../types'
import css from './index.module.scss'

interface TasksProps {
  difficulty: number
}

type TaskState = [MathTask, MathTask]
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

export const MathTasks = ({ difficulty }: TasksProps) => {
  const getTasks = (): TaskState => [getMathTask(difficulty), getMathTask(difficulty)]
  const [[currentTask, nextTask], setTasks] = useState<TaskState>(getTasks)
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
      setTasks(() => [nextTask, nextTask])
    }, 450)

    setTimeout(() => {
      setTasks(() => [nextTask, getMathTask(difficulty)])
    }, 850)
  }

  useEffect(() => {
    setTimeout(() => setAnswerStatus(() => 'uncertainly'), 300)
  }, [currentTask])

  useEffect(() => {
    const keyboardHandler = (event: KeyboardEvent) => {
      if (event.code === 'Backspace') {
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.addEventListener('keyup', keyboardHandler)

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.removeEventListener('keyup', keyboardHandler)
    }
  }, [answer])

  const currentTaskClasses = classNames({
    [css['current-task']]: true,
    [css['current-task-appearence']]: isFirstTask,
    [css['current-task-fade']]: answerStatus !== 'uncertainly',
  })

  const answerClasses = classNames({
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
        <span className={answerClasses}>
          {currentTask.firstNumber}&nbsp;
          {getSign(currentTask.operation)}&nbsp;
          {currentTask.secondNumber} =
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