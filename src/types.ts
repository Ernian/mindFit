export interface MathTask {
  firstNumber: number,
  secondNumber: number,
  answer: number,
  operation: Operations
}

export type Operations = 'addition' | 'subtraction' | 'multiplication' | 'division'