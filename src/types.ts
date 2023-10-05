export interface Settings {
  difficulty: number,
  time: number
}

export interface MathTask {
  firstNumber: number,
  secondNumber: number,
  answer: number,
  operation: Operations
}

export type Operations = 'addition' | 'subtraction' | 'multiplication' | 'division'