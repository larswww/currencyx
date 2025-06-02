import { describe, it, expect, beforeEach } from 'vitest'
import { useCalculator } from '@/composables/useCalculator'

describe('Calculator Logic', () => {
  let calculator: ReturnType<typeof useCalculator>

  const processKeys = (keys: (string | number)[]): number | null => {
    let result = null
    for (const key of keys) {
      result = calculator.processCalculatorKey(key)
    }
    return result
  }

  beforeEach(() => {
    calculator = useCalculator()
  })

  describe('Basic Operations', () => {
    it('should handle single number input (5) correctly', () => {
      const result = calculator.processCalculatorKey(5)
      expect(result).toBe(5)
      expect(calculator.calculatorState.value.display).toBe('5')
    })

    it('should handle multiple digit input (123) and concatenate correctly', () => {
      processKeys([1, 2, 3])
      expect(calculator.calculatorState.value.display).toBe('123')
    })

    it('should perform addition correctly (7 + 3 = 10)', () => {
      const result = processKeys([7, '+', 3, '='])
      expect(result).toBe(10)
      expect(calculator.calculatorState.value.display).toBe('10')
    })

    it('should perform subtraction correctly (20 - 8 = 12)', () => {
      const result = processKeys([2, 0, '-', 8, '='])
      expect(result).toBe(12)
      expect(calculator.calculatorState.value.display).toBe('12')
    })

    it('should perform multiplication correctly (8 × 9 = 72)', () => {
      const result = processKeys([8, '×', 9, '='])
      expect(result).toBe(72)
      expect(calculator.calculatorState.value.display).toBe('72')
    })

    it('should perform division correctly (56 ÷ 8 = 7)', () => {
      const result = processKeys([5, 6, '÷', 8, '='])
      expect(result).toBe(7)
      expect(calculator.calculatorState.value.display).toBe('7')
    })
  })

  describe('Advanced Operations', () => {
    it('should handle complex chained operations calculating left to right (10 + 5 × 2 = 30)', () => {
      const result = processKeys([1, 0, '+', 5, '×', 2, '='])
      expect(result).toBe(30)
      expect(calculator.calculatorState.value.display).toBe('30')
    })

    it('should handle decimal calculations correctly (3.5 × 2 = 7)', () => {
      const result = processKeys([3, '.', 5, '×', 2, '='])
      expect(result).toBe(7)
      expect(calculator.calculatorState.value.display).toBe('7')
    })

    it('should prevent multiple decimal points in same number (3.5.7 becomes 3.57)', () => {
      processKeys(['C', 3, '.', 5, '.', 7])
      expect(calculator.calculatorState.value.display).toBe('3.57')
    })

    it('should handle decimal numbers in calculation (2.5 + 1.5 = 4)', () => {
      const result = processKeys([2, '.', 5, '+', 1, '.', 5, '='])
      expect(result).toBe(4)
      expect(calculator.calculatorState.value.display).toBe('4')
    })

    it('should handle chained operations (2 + 3 + 4 = 9) calculating left to right', () => {
      const result = processKeys([2, '+', 3, '+', 4, '='])
      expect(result).toBe(9)
      expect(calculator.calculatorState.value.display).toBe('9')
    })
  })

  describe('Error Handling', () => {
    it('should handle division by zero and show error state (10 ÷ 0)', () => {
      processKeys([1, 0, '÷', 0, '='])
      expect(calculator.calculatorState.value.display).toBe('Error')
    })

    it('should recover from error state when cleared and perform new calculation (2 + 3 = 5)', () => {
      processKeys([5, '÷', 0, '='])
      expect(calculator.calculatorState.value.display).toBe('Error')
      
      const result = processKeys(['C', 2, '+', 3, '='])
      expect(result).toBe(5)
      expect(calculator.calculatorState.value.display).toBe('5')
    })
  })

  describe('Input Handling', () => {
    it('should clear display and reset to 0 when C button is pressed', () => {
      processKeys([1, 2, 3])
      expect(calculator.calculatorState.value.display).toBe('123')
      
      const result = calculator.processCalculatorKey('C')
      expect(result).toBe(0)
      expect(calculator.calculatorState.value.display).toBe('0')
      expect(calculator.calculatorState.value.operation).toBeNull()
      expect(calculator.calculatorState.value.previousValue).toBeNull()
    })

    it('should handle backspace correctly with single digits reducing to 0', () => {
      processKeys(['C', 7])
      expect(calculator.calculatorState.value.display).toBe('7')
      
      const result = calculator.processCalculatorKey('⌫')
      expect(result).toBe(0)
      expect(calculator.calculatorState.value.display).toBe('0')
    })

    it('should remove last digit when backspace (⌫) is pressed', () => {
      processKeys([1, 2, 3])
      expect(calculator.calculatorState.value.display).toBe('123')
      
      const result = calculator.processCalculatorKey('⌫')
      expect(result).toBe(12)
      expect(calculator.calculatorState.value.display).toBe('12')
    })

    it('should handle clear operation in middle of calculation and allow fresh start (4 + 6 = 10)', () => {
      processKeys([1, 5, '+', 3])
      calculator.processCalculatorKey('C')
      
      expect(calculator.calculatorState.value.display).toBe('0')
      expect(calculator.calculatorState.value.operation).toBeNull()
      expect(calculator.calculatorState.value.previousValue).toBeNull()
      
      const result = processKeys([4, '+', 6, '='])
      expect(result).toBe(10)
      expect(calculator.calculatorState.value.display).toBe('10')
    })
  })
}) 