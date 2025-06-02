<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import type { Currency } from '@/types/currency'

interface Props {
  currency: Currency
  amount: number
  isActive: boolean
}

interface Emits {
  (e: 'selectCurrency'): void
  (e: 'updateAmount', amount: number): void
  (e: 'focus'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Format amount for display
const displayAmount = computed(() => {
  if (props.amount === 0) return ''
  // Format number with up to 6 decimal places, removing trailing zeros
  return props.amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6
  })
})

// Handle amount input changes
const handleAmountInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/[^0-9.,]/g, '') // Allow only numbers, commas, and periods
  
  // Convert comma to period for decimal point
  const normalizedValue = value.replace(',', '.')
  
  // Parse the number
  const numericValue = parseFloat(normalizedValue) || 0
  
  emit('updateAmount', numericValue)
}
</script> 
<template>
    <div class="currency-panel">
      <!-- Currency Selector Button -->
      <BaseButton
        @click="$emit('selectCurrency')"
        variant="ghost"
        size="md"
        block
        class="!p-3 !bg-[#4a4a57] hover:!bg-[#5a5a67] !justify-between"
        :class="{ 'ring-2 ring-blue-500': isActive }"
      >
        <div class="flex items-center space-x-3">
          <!-- Currency Flag -->
          <span class="text-2xl">{{ currency.flag }}</span>
          
          <!-- Currency Info -->
          <div class="text-left">
            <div class="font-semibold text-white">{{ currency.code }}</div>
            <div class="text-xs text-gray-400 truncate max-w-[120px]">{{ currency.name }}</div>
          </div>
        </div>
        
        <!-- Dropdown Arrow -->
        <svg 
          class="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </BaseButton>
      
      <!-- Amount Input -->
      <div class="mt-3">
        <input
          type="text"
          :value="displayAmount"
          @input="handleAmountInput"
          @focus="$emit('focus')"
          class="w-full p-4 bg-[#4a4a57] border-2 rounded-lg text-white text-2xl md:text-3xl font-mono text-center transition-colors duration-200"
          :class="{ 
            'border-blue-500 bg-[#5a5a67]': isActive,
            'border-transparent hover:border-gray-600': !isActive 
          }"
          placeholder="0"
          inputmode="decimal"
          autocomplete="off"
        />
      </div>
    </div>
  </template>