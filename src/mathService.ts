import { Operations, MathTask } from './types'

const getTwoRandomNumbersInRange = (min: number, max: number): [number, number] => (
  [min + Math.floor(Math.random() * (max - min + 1)),
  min + Math.floor(Math.random() * (max - min + 1))]
)

const getRandomOperation = (): Operations => {
  const random = Math.random()

  if (random < 0.25) {
    return 'addition'
  }

  if (random > 0.25 && random < 0.5) {
    return 'subtraction'
  }

  if (random > 0.5 && random < 0.75) {
    return 'multiplication'
  }

  return 'division'
}

const getRange = (difficulty: number, operation: Operations): [number, number] => {
  if (difficulty === 1) {
    switch (operation) {
      case 'multiplication':
        return [0, 10]
      case 'division':
        return [1, 10]
      default:
        return [0, 50]
    }
  }
  if (difficulty === 2) {
    switch (operation) {
      case 'multiplication':
        return [0, 15]
      case 'division':
        return [1, 15]
      default:
        return [0, 100]
    }
  }

  switch (operation) {
    case 'multiplication':
      return [0, 20]
    case 'division':
      return [1, 20]
    default:
      return [0, 200]
  }
}

class Calculation {
  static addition(a: number, b: number) {
    return a + b
  }
  static subtraction(a: number, b: number) {
    return a - b
  }
  static multiplication(a: number, b: number) {
    return a * b
  }
}

export const getMathTask = (difficulty: number): MathTask => {
  const operation = getRandomOperation()
  const numbers = getTwoRandomNumbersInRange(...getRange(difficulty, operation))

  if (operation === 'division') {
    return {
      firstNumber: Calculation.multiplication(...numbers),
      secondNumber: numbers[0],
      answer: numbers[1],
      operation
    }
  }

  return {
    firstNumber: numbers[0],
    secondNumber: numbers[1],
    answer: Calculation[operation](...numbers),
    operation
  }
}
