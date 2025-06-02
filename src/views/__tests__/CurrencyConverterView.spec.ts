import { describe, it, expect, beforeEach } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import type { ComponentPublicInstance } from 'vue'
import CurrencyConverterView from '../CurrencyConverterView.vue'

describe('CurrencyConverterView', () => {
  let wrapper: VueWrapper<ComponentPublicInstance<typeof CurrencyConverterView>>

  const emitKeys = async (keys: (string | number)[]) => {
    const calculatorKeypad = wrapper.findComponent({ name: 'CalculatorKeypad' })
    for (const key of keys) {
      await calculatorKeypad.vm.$emit('keyPress', key)
    }
  }

  beforeEach(() => {
    wrapper = mount(CurrencyConverterView)
  })

  describe('Component Mounting and Rendering', () => {
    it('mounts without error', () => {
      expect(wrapper.vm).toBeTruthy()
    })

    it('renders the main container with correct styling', () => {
      expect(wrapper.find('.min-h-screen').exists()).toBe(true)
      expect(wrapper.find('.bg-\\[\\#2b2b35\\]').exists()).toBe(true)
    })

    it('contains currency panels in correct layout', () => {
      expect(wrapper.find('.bg-\\[\\#3a3a47\\]').exists()).toBe(true)
      const currencyPanels = wrapper.findAllComponents({ name: 'CurrencyPanel' })
      expect(currencyPanels).toHaveLength(2)
    })

    it('displays calculator keypad component', () => {
      const calculatorKeypad = wrapper.findComponent({ name: 'CalculatorKeypad' })
      expect(calculatorKeypad.exists()).toBe(true)
    })

    it('displays swap button between currency panels', () => {
      const swapButton = wrapper.findComponent({ name: 'SwapButton' })
      expect(swapButton.exists()).toBe(true)
    })
  })

  describe('Currency Conversion Integration', () => {
    it('should update base amount and trigger currency conversion when calculator is used', async () => {
      const initialBaseAmount = wrapper.vm.baseAmount
      expect(initialBaseAmount).toBe(1)
      
      await emitKeys([5])
      expect(wrapper.vm.baseAmount).toBe(5)
    })

    it('should work on target panel when target is active and calculate (4 + 6 = 10)', async () => {
      wrapper.vm.setActivePanel('target')
      
      await emitKeys([4, '+', 6, '='])
      expect(wrapper.vm.targetAmount).toBe(10)
      expect(wrapper.vm.baseAmount).toBe(1) // Base amount should remain unchanged
    })

    it('should switch active panels correctly and calculator affects the correct panel', async () => {
      // Start with base panel active (default)
      expect(wrapper.vm.activePanel).toBe('base')
      
      await emitKeys([1, 0, 0])
      expect(wrapper.vm.baseAmount).toBe(100)
      
      // Switch to target panel
      wrapper.vm.setActivePanel('target')
      expect(wrapper.vm.activePanel).toBe('target')
      
      await emitKeys(['C', 2, 0, 0])
      expect(wrapper.vm.targetAmount).toBe(200)
      expect(wrapper.vm.baseAmount).toBe(100) // Should remain unchanged
    })
  })

  describe('Calculator and Currency Integration', () => {
    it('should handle calculator operation and maintain currency conversion context', async () => {
      const baseCurrency = wrapper.vm.baseCurrency
      const targetCurrency = wrapper.vm.targetCurrency
      
      expect(baseCurrency.code).toBeDefined()
      expect(targetCurrency.code).toBeDefined()
      expect(baseCurrency.code).not.toBe(targetCurrency.code)
      
      await emitKeys([5, '+', 3, '='])
      expect(wrapper.vm.baseAmount).toBe(8)
    })

    it('should handle calculator clear and reset currency amount properly', async () => {
      await emitKeys([1, 2, 3])
      expect(wrapper.vm.baseAmount).toBe(123)
      
      await emitKeys(['C'])
      expect(wrapper.vm.baseAmount).toBe(0)
    })

    it('should handle division by zero gracefully without breaking currency conversion', async () => {
      await emitKeys([5, '÷', 0, '='])
      expect(wrapper.vm.baseAmount).toBeDefined()
      
      // Should still be able to perform currency operations
      expect(wrapper.vm.baseCurrency).toBeDefined()
      expect(wrapper.vm.targetCurrency).toBeDefined()
    })
  })

  describe('Component State Management', () => {
    it('should maintain calculator state alongside currency state', () => {
      expect(wrapper.vm.calculatorState).toBeDefined()
      expect(wrapper.vm.calculatorState.display).toBe('0')
      expect(wrapper.vm.baseCurrency).toBeDefined()
      expect(wrapper.vm.targetCurrency).toBeDefined()
    })

    it('should have initial currency amounts set correctly', () => {
      expect(wrapper.vm.baseAmount).toBe(1)
      expect(wrapper.vm.targetAmount).toBeDefined()
    })

    it('should have default active panel set to base', () => {
      expect(wrapper.vm.activePanel).toBe('base')
    })
  })
})
