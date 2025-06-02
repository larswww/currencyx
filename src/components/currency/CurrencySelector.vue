<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { currencies } from '@/data/currencies'
import type { Currency } from '@/types/currency'

interface Props {
  excludeCurrency?: Currency
}

interface Emits {
  (e: 'select', currency: Currency): void
  (e: 'close'): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const searchQuery = ref('')

// Filter currencies based on search query and exclude current currency
const filteredCurrencies = computed(() => {
  const filtered = currencies.filter(currency => {
    // Exclude the currency that's already selected in the other panel
    if (props.excludeCurrency && currency.code === props.excludeCurrency.code) {
      return false
    }
    
    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      return (
        currency.code.toLowerCase().includes(query) ||
        currency.name.toLowerCase().includes(query)
      )
    }
    
    return true
  })
  
  // Sort by common currencies first (already ordered in our data), then alphabetically
  return filtered
})
</script> 
<template>
    <!-- Modal Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-[#3a3a47] rounded-lg max-w-md w-full max-h-[80vh] flex flex-col">
        <!-- Header -->
        <div class="p-4 border-b border-gray-600">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-white">Select Currency</h2>
            <BaseButton
              @click="$emit('close')"
              variant="ghost"
              size="sm"
              shape="rounded"
              icon-position="only"
              class="!p-2 hover:!bg-gray-600"
              aria-label="Close"
            >
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </BaseButton>
          </div>
          
          <!-- Search Input -->
          <div class="mt-3">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search currencies..."
              class="w-full p-3 bg-[#4a4a57] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              autofocus
            />
          </div>
        </div>
        
        <!-- Currency List -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-2">
            <BaseButton
              v-for="currency in filteredCurrencies"
              :key="currency.code"
              @click="$emit('select', currency)"
              variant="ghost"
              size="md"
              block
              class="!p-3 hover:!bg-[#4a4a57] !justify-start"
            >
              <div class="flex items-center space-x-3 w-full">
                <span class="text-2xl">{{ currency.flag }}</span>
                <div class="flex-1 text-left">
                  <div class="font-semibold text-white">{{ currency.code }}</div>
                  <div class="text-sm text-gray-400">{{ currency.name }}</div>
                </div>
                <div v-if="currency.symbol" class="text-gray-500 text-sm">
                  {{ currency.symbol }}
                </div>
              </div>
            </BaseButton>
            
            <!-- No Results -->
            <div v-if="filteredCurrencies.length === 0" class="p-8 text-center text-gray-400">
              No currencies found matching "{{ searchQuery }}"
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>