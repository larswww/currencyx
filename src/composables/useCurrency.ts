import { ref, computed } from 'vue'
import { defaultBaseCurrency, defaultTargetCurrency } from '@/data/currencies'
import type { Currency } from '@/types/currency'

export function useCurrency() {
  // Currency state
  const baseCurrency = ref<Currency>(defaultBaseCurrency)
  const targetCurrency = ref<Currency>(defaultTargetCurrency)
  const baseAmount = ref<number>(1)
  const targetAmount = ref<number>(0)
  
  // Active panel state
  const activePanel = ref<'base' | 'target'>('base')

  // UI state for currency selector
  const showCurrencySelector = ref(false)
  const activePanelType = ref<'base' | 'target'>('base')

  // Computed values
  const activeCurrency = computed(() => 
    activePanel.value === 'base' ? baseCurrency.value : targetCurrency.value
  )

  const activeAmount = computed(() => 
    activePanel.value === 'base' ? baseAmount.value : targetAmount.value
  )

  // Methods
  const setActivePanel = (panel: 'base' | 'target') => {
    activePanel.value = panel
  }

  const updateBaseAmount = (amount: number) => {
    baseAmount.value = amount
  }

  const updateTargetAmount = (amount: number) => {
    targetAmount.value = amount
  }

  const updateActiveAmount = (amount: number) => {
    if (activePanel.value === 'base') {
      updateBaseAmount(amount)
    } else {
      updateTargetAmount(amount)
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
  }

  return {
    // State
    baseCurrency,
    targetCurrency,
    baseAmount,
    targetAmount,
    activePanel,
    showCurrencySelector,
    activePanelType,
    
    // Computed
    activeCurrency,
    activeAmount,
    
    // Methods
    setActivePanel,
    updateBaseAmount,
    updateTargetAmount,
    updateActiveAmount,
    swapCurrencies,
    openCurrencySelector,
    closeCurrencySelector,
    handleCurrencySelect
  }
} 