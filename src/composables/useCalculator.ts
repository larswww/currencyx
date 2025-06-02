import { ref } from 'vue'
import type { CalculatorOperation, CalculatorState } from '@/types/calculator'

export function useCalculator() {
  // Calculator state
  const calculatorState = ref<CalculatorState>({
    display: '0',
    previousValue: null,
    operation: null,
    waitingForOperand: false
  })

  // Calculator logic
  const calculate = (firstOperand: number, secondOperand: number, operation: CalculatorOperation): number => {
    switch (operation) {
      case '+':
        return firstOperand + secondOperand
      case '-':
        return firstOperand - secondOperand
      case '×':
        return firstOperand * secondOperand
      case '÷':
        if (secondOperand === 0) {
          throw new Error('Division by zero')
        }
        return firstOperand / secondOperand
      default:
        return secondOperand
    }
  }

  const processCalculatorKey = (key: string | number | CalculatorOperation): number | null => {
    if (typeof key === 'number') {
      // Handle number input
      const inputValue = key.toString()
      
      if (calculatorState.value.waitingForOperand) {
        calculatorState.value.display = inputValue
        calculatorState.value.waitingForOperand = false
      } else {
        calculatorState.value.display = calculatorState.value.display === '0' ? inputValue : calculatorState.value.display + inputValue
      }

      return parseFloat(calculatorState.value.display)
    } else if (key === 'C') {
      // Clear all calculator state
      calculatorState.value = {
        display: '0',
        previousValue: null,
        operation: null,
        waitingForOperand: false
      }
      return 0
    } else if (key === '⌫') {
      // Backspace
      if (calculatorState.value.display.length > 1) {
        calculatorState.value.display = calculatorState.value.display.slice(0, -1)
      } else {
        calculatorState.value.display = '0'
      }
      return parseFloat(calculatorState.value.display)
    } else if (key === '.') {
      // Handle decimal point
      if (calculatorState.value.waitingForOperand) {
        calculatorState.value.display = '0.'
        calculatorState.value.waitingForOperand = false
      } else if (calculatorState.value.display.indexOf('.') === -1) {
        calculatorState.value.display += '.'
      }
      return null // No amount change for decimal point alone
    } else if (key === '=') {
      // Perform calculation
      if (calculatorState.value.operation && calculatorState.value.previousValue !== null) {
        try {
          const currentValue = parseFloat(calculatorState.value.display)
          const result = calculate(calculatorState.value.previousValue, currentValue, calculatorState.value.operation)
          
          calculatorState.value.display = result.toString()
          calculatorState.value.previousValue = null
          calculatorState.value.operation = null
          calculatorState.value.waitingForOperand = true

          return result
        } catch (error) {
          // Handle calculation errors (like division by zero)
          console.error('Calculator error:', error)
          calculatorState.value.display = 'Error'
          calculatorState.value.previousValue = null
          calculatorState.value.operation = null
          calculatorState.value.waitingForOperand = true
          return null
        }
      }
      return null
    } else {
      // Handle operations (+, -, ×, ÷)
      const currentValue = parseFloat(calculatorState.value.display)
      
      if (calculatorState.value.previousValue === null) {
        calculatorState.value.previousValue = currentValue
      } else if (calculatorState.value.operation) {
        try {
          const result = calculate(calculatorState.value.previousValue, currentValue, calculatorState.value.operation)
          calculatorState.value.display = result.toString()
          calculatorState.value.previousValue = result
          
          // Return the intermediate result
          calculatorState.value.operation = key as CalculatorOperation
          calculatorState.value.waitingForOperand = true
          return result
        } catch (error) {
          calculatorState.value.display = 'Error'
          calculatorState.value.previousValue = null
          calculatorState.value.operation = null
          calculatorState.value.waitingForOperand = true
          console.error('Calculator operation error:', error)
          return null
        }
      }

      calculatorState.value.operation = key as CalculatorOperation
      calculatorState.value.waitingForOperand = true
      return null // No amount change for operations
    }
  }

  return {
    calculatorState,
    processCalculatorKey
  }
} 