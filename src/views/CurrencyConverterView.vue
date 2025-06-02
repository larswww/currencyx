<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CurrencyPanel from '@/components/currency/CurrencyPanel.vue'
import SwapButton from '@/components/currency/SwapButton.vue'
import CurrencySelector from '@/components/currency/CurrencySelector.vue'
import CalculatorKeypad from '@/components/calculator/CalculatorKeypad.vue'
import { defaultBaseCurrency, defaultTargetCurrency } from '@/data/currencies'
import type { Currency, ExchangeRate } from '@/types/currency'
import type { CalculatorOperation } from '@/types/calculator'

// Reactive state
const baseCurrency = ref<Currency>(defaultBaseCurrency)
const targetCurrency = ref<Currency>(defaultTargetCurrency)
const baseAmount = ref<number>(1)
const targetAmount = ref<number>(0)
const exchangeRate = ref<ExchangeRate | null>(null)
const lastUpdated = ref<Date | null>(null)
const isConverting = ref(false)

// UI state
const activePanel = ref<'base' | 'target'>('base')
const showCurrencySelector = ref(false)
const activePanelType = ref<'base' | 'target'>('base')

// Calculator state
const calculatorExpression = ref('')

// Methods
const setActivePanel = (panel: 'base' | 'target') => {
  activePanel.value = panel
}

const updateBaseAmount = (amount: number) => {
  baseAmount.value = amount
  calculateTargetAmount()
}

const updateTargetAmount = (amount: number) => {
  targetAmount.value = amount
  calculateBaseAmount()
}

const calculateTargetAmount = () => {
  if (exchangeRate.value) {
    targetAmount.value = baseAmount.value * exchangeRate.value.rate
  }
}

const calculateBaseAmount = () => {
  if (exchangeRate.value) {
    baseAmount.value = targetAmount.value / exchangeRate.value.rate
  }
}

const swapCurrencies = () => {
  const tempCurrency = baseCurrency.value
  baseCurrency.value = targetCurrency.value
  targetCurrency.value = tempCurrency

  // Swap amounts
  const tempAmount = baseAmount.value
  baseAmount.value = targetAmount.value
  targetAmount.value = tempAmount

  // TODO: Fetch new exchange rate
  fetchExchangeRate()
}

const openCurrencySelector = (panelType: 'base' | 'target') => {
  activePanelType.value = panelType
  showCurrencySelector.value = true
}

const closeCurrencySelector = () => {
  showCurrencySelector.value = false
}

const handleCurrencySelect = (currency: Currency) => {
  if (activePanelType.value === 'base') {
    baseCurrency.value = currency
  } else {
    targetCurrency.value = currency
  }
  closeCurrencySelector()
  fetchExchangeRate()
}

const handleCalculatorKey = (key: string | number | CalculatorOperation) => {
  if (typeof key === 'number') {
    // Handle number input
    const currentAmount = activePanel.value === 'base' ? baseAmount.value : targetAmount.value
    const newAmount = currentAmount === 0 ? key : parseFloat(`${currentAmount}${key}`)

    if (activePanel.value === 'base') {
      updateBaseAmount(newAmount)
    } else {
      updateTargetAmount(newAmount)
    }
  } else if (key === 'C') {
    // Clear
    if (activePanel.value === 'base') {
      updateBaseAmount(0)
    } else {
      updateTargetAmount(0)
    }
    calculatorExpression.value = ''
  } else if (key === '⌫') {
    // Backspace
    const currentAmount = activePanel.value === 'base' ? baseAmount.value : targetAmount.value
    const amountStr = currentAmount.toString()
    const newAmountStr = amountStr.length > 1 ? amountStr.slice(0, -1) : '0'
    const newAmount = parseFloat(newAmountStr)

    if (activePanel.value === 'base') {
      updateBaseAmount(newAmount)
    } else {
      updateTargetAmount(newAmount)
    }
  } else if (key === '.') {
    // Handle decimal point - TODO: implement proper decimal handling
  } else {
    // Handle operations (+, -, ×, ÷, =) - TODO: implement calculator logic
    console.log('Operation:', key)
  }
}

const fetchExchangeRate = async () => {
  // Mock exchange rates for demonstration (realistic rates as of 2024)
  const mockRates: Record<string, Record<string, number>> = {
    USD: {
      EUR: 0.85,
      GBP: 0.73,
      JPY: 110.25,
      CHF: 0.88,
      CAD: 1.25,
      AUD: 1.35,
      CNY: 6.45,
      INR: 74.5,
    },
    EUR: {
      USD: 1.18,
      GBP: 0.86,
      JPY: 129.65,
      CHF: 1.04,
      CAD: 1.47,
      AUD: 1.59,
      CNY: 7.59,
      INR: 87.71,
    },
    GBP: {
      USD: 1.37,
      EUR: 1.16,
      JPY: 151.04,
      CHF: 1.21,
      CAD: 1.71,
      AUD: 1.85,
      CNY: 8.84,
      INR: 102.15,
    },
  }

  isConverting.value = true

  // Simulate realistic API delay (200-600ms)
  const delay = Math.random() * 400 + 200

  await new Promise((resolve) => setTimeout(resolve, delay))

  try {
    const baseCode = baseCurrency.value.code
    const targetCode = targetCurrency.value.code

    // Get rate from mock data or calculate inverse
    let rate = 1
    if (baseCode === targetCode) {
      rate = 1
    } else if (mockRates[baseCode]?.[targetCode]) {
      rate = mockRates[baseCode][targetCode]
    } else if (mockRates[targetCode]?.[baseCode]) {
      rate = 1 / mockRates[targetCode][baseCode]
    } else {
      // Fallback: generate a realistic random rate based on currency types
      rate = 0.5 + Math.random() * 2 // Between 0.5 and 2.5
    }

    exchangeRate.value = {
      base: baseCode,
      target: targetCode,
      rate: rate,
      timestamp: new Date(),
      inverse: 1 / rate,
    }

    lastUpdated.value = new Date()
    calculateTargetAmount()
  } catch (error) {
    console.error('Failed to fetch exchange rate:', error)
    // In a real app, you'd show an error message to the user
  } finally {
    isConverting.value = false
  }
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Initialize
onMounted(() => {
  fetchExchangeRate()
})
</script>
<template>
  <div class="min-h-screen bg-[#2b2b35] text-white">
    <!-- Main App Container -->
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-md mx-auto md:max-w-lg">
        <!-- Header Section with Currency Panels -->
        <div class="bg-[#3a3a47] rounded-lg p-6 mb-6">
          <!-- Currency Panels Container -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <!-- Base Currency Panel -->
            <div class="space-y-3">
              <CurrencyPanel
                :currency="baseCurrency"
                :amount="baseAmount"
                :is-active="activePanel === 'base'"
                @select-currency="openCurrencySelector('base')"
                @update-amount="updateBaseAmount"
                @focus="setActivePanel('base')"
              />
            </div>

            <!-- Swap Button -->
            <div class="flex justify-center">
              <SwapButton @click="swapCurrencies" :is-loading="isConverting" />
            </div>

            <!-- Target Currency Panel -->
            <div class="space-y-3">
              <CurrencyPanel
                :currency="targetCurrency"
                :amount="targetAmount"
                :is-active="activePanel === 'target'"
                @select-currency="openCurrencySelector('target')"
                @update-amount="updateTargetAmount"
                @focus="setActivePanel('target')"
              />
            </div>
          </div>

          <!-- Exchange Rate Info -->
          <div class="mt-6 text-center text-sm text-gray-400">
            <div v-if="exchangeRate">
              1 {{ baseCurrency.code }} = {{ exchangeRate.rate.toFixed(4) }}
              {{ targetCurrency.code }}
            </div>
            <div v-if="lastUpdated" class="text-xs mt-1">
              Updated: {{ formatTime(lastUpdated) }}
            </div>
          </div>
        </div>

        <!-- Calculator Section -->
        <div class="bg-[#3a3a47] rounded-lg p-6">
          <CalculatorKeypad @key-press="handleCalculatorKey" :disabled="isConverting" />
        </div>
      </div>
    </div>

    <!-- Currency Selector Modal -->
    <CurrencySelector
      v-if="showCurrencySelector"
      :exclude-currency="activePanelType === 'base' ? targetCurrency : baseCurrency"
      @select="handleCurrencySelect"
      @close="closeCurrencySelector"
    />
  </div>
</template>
