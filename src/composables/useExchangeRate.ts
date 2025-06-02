import { ref, watch, type Ref } from 'vue'
import type { ExchangeRate, Currency } from '@/types/currency'

export function useExchangeRate(
  baseCurrency: Ref<Currency>,
  targetCurrency: Ref<Currency>,
  baseAmount: Ref<number>,
  targetAmount: Ref<number>
) {
  // Exchange rate state
  const exchangeRate = ref<ExchangeRate | null>(null)
  const lastUpdated = ref<Date | null>(null)
  const isConverting = ref(false)

  // Calculate target amount based on exchange rate
  const calculateTargetAmount = () => {
    if (exchangeRate.value) {
      targetAmount.value = baseAmount.value * exchangeRate.value.rate
    }
  }

  // Calculate base amount based on exchange rate
  const calculateBaseAmount = () => {
    if (exchangeRate.value) {
      baseAmount.value = targetAmount.value / exchangeRate.value.rate
    }
  }

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

  const fetchExchangeRate = async () => {
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

  // Watch for currency changes and refetch rates
  watch([baseCurrency, targetCurrency], () => {
    fetchExchangeRate()
  })

  // Utility function to format time
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return {
    // State
    exchangeRate,
    lastUpdated,
    isConverting,
    
    // Methods
    calculateTargetAmount,
    calculateBaseAmount,
    fetchExchangeRate,
    formatTime
  }
} 