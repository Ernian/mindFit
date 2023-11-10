export interface MathTask {
  firstNumber: number,
  secondNumber: number,
  answer: number,
  operation: Operations
}

export type Operations = 'addition' | 'subtraction' | 'multiplication' | 'division'
export type CountOfCards = 4 | 8 | 12