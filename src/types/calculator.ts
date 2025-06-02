export type CalculatorOperation = '+' | '-' | '×' | '÷' | '='

export interface CalculatorState {
  display: string
  previousValue: number | null
  operation: CalculatorOperation | null
  waitingForOperand: boolean
}

export interface CalculatorKey {
  label: string
  value: string | number | CalculatorOperation
  type: 'number' | 'operation' | 'function'
  className?: string
}
