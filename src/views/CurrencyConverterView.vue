<script setup lang="ts">
import { onMounted } from 'vue'
import CurrencyPanel from '@/components/currency/CurrencyPanel.vue'
import SwapButton from '@/components/currency/SwapButton.vue'
import CurrencySelector from '@/components/currency/CurrencySelector.vue'
import CalculatorKeypad from '@/components/calculator/CalculatorKeypad.vue'
import { useCalculator } from '@/composables/useCalculator'
import { useCurrency } from '@/composables/useCurrency'
import { useExchangeRate } from '@/composables/useExchangeRate'
import type { CalculatorOperation } from '@/types/calculator'
import type { Currency } from '@/types/currency'

// Use composables
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { calculatorState, processCalculatorKey } = useCalculator()

const {
  // State
  baseCurrency,
  targetCurrency,
  baseAmount,
  targetAmount,
  activePanel,
  showCurrencySelector,
  activePanelType,
  
  // Methods
  setActivePanel,
  updateBaseAmount,
  updateTargetAmount,
  updateActiveAmount,
  swapCurrencies,
  openCurrencySelector,
  closeCurrencySelector,
  handleCurrencySelect
} = useCurrency()

const {
  exchangeRate,
  lastUpdated,
  isConverting,
  calculateTargetAmount,
  calculateBaseAmount,
  fetchExchangeRate,
  formatTime
} = useExchangeRate(baseCurrency, targetCurrency, baseAmount, targetAmount)

// Enhanced currency swap with exchange rate refresh
const handleSwapCurrencies = () => {
  swapCurrencies()
  fetchExchangeRate()
}

// Enhanced currency selection with exchange rate refresh
const handleCurrencySelectWithRefresh = (currency: Currency) => {
  handleCurrencySelect(currency)
  fetchExchangeRate()
}

// Calculator integration
const handleCalculatorKey = (key: string | number | CalculatorOperation) => {
  const result = processCalculatorKey(key)
  
  if (result !== null) {
    updateActiveAmount(result)
    
    // Recalculate the opposite panel based on active panel
    if (activePanel.value === 'base') {
      calculateTargetAmount()
    } else {
      calculateBaseAmount()
    }
  }
}

// Enhanced amount updates that trigger conversions
const handleBaseAmountUpdate = (amount: number) => {
  updateBaseAmount(amount)
  calculateTargetAmount()
}

const handleTargetAmountUpdate = (amount: number) => {
  updateTargetAmount(amount)
  calculateBaseAmount()
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
                @update-amount="handleBaseAmountUpdate"
                @focus="setActivePanel('base')"
              />
            </div>

            <!-- Swap Button -->
            <div class="flex justify-center">
              <SwapButton @click="handleSwapCurrencies" :is-loading="isConverting" />
            </div>

            <!-- Target Currency Panel -->
            <div class="space-y-3">
              <CurrencyPanel
                :currency="targetCurrency"
                :amount="targetAmount"
                :is-active="activePanel === 'target'"
                @select-currency="openCurrencySelector('target')"
                @update-amount="handleTargetAmountUpdate"
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
      @select="handleCurrencySelectWithRefresh"
      @close="closeCurrencySelector"
    />
  </div>
</template>
