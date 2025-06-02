<script setup lang="ts">
import BaseButton from '@/components/common/BaseButton.vue'
import type { CalculatorOperation } from '@/types/calculator'

interface Props {
  disabled?: boolean
}

interface Emits {
  (e: 'keyPress', key: string | number | CalculatorOperation): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
<template>
  <div class="calculator-keypad">
    <div class="grid grid-cols-4 gap-3">
      <!-- Row 1: Clear, Backspace, Operations -->
      <BaseButton
        @click="$emit('keyPress', 'C')"
        :disabled="disabled"
        variant="danger"
        size="lg"
        class="col-span-2"
      >
        Clear
      </BaseButton>
      
      <BaseButton
        @click="$emit('keyPress', '⌫')"
        :disabled="disabled"
        variant="secondary"
        size="lg"
        icon="⌫"
        icon-position="only"
        aria-label="Backspace"
      />
      
      <BaseButton
        @click="$emit('keyPress', '÷')"
        :disabled="disabled"
        variant="warning"
        size="lg"
      >
        ÷
      </BaseButton>

      <!-- Row 2: 7, 8, 9, × -->
      <BaseButton
        v-for="num in [7, 8, 9]"
        :key="num"
        @click="$emit('keyPress', num)"
        :disabled="disabled"
        variant="ghost"
        size="lg"
      >
        {{ num }}
      </BaseButton>
      
      <BaseButton
        @click="$emit('keyPress', '×')"
        :disabled="disabled"
        variant="warning"
        size="lg"
      >
        ×
      </BaseButton>

      <!-- Row 3: 4, 5, 6, - -->
      <BaseButton
        v-for="num in [4, 5, 6]"
        :key="num"
        @click="$emit('keyPress', num)"
        :disabled="disabled"
        variant="ghost"
        size="lg"
      >
        {{ num }}
      </BaseButton>
      
      <BaseButton
        @click="$emit('keyPress', '-')"
        :disabled="disabled"
        variant="warning"
        size="lg"
      >
        −
      </BaseButton>

      <!-- Row 4: 1, 2, 3, + -->
      <BaseButton
        v-for="num in [1, 2, 3]"
        :key="num"
        @click="$emit('keyPress', num)"
        :disabled="disabled"
        variant="ghost"
        size="lg"
      >
        {{ num }}
      </BaseButton>
      
      <BaseButton
        @click="$emit('keyPress', '+')"
        :disabled="disabled"
        variant="warning"
        size="lg"
        class="row-span-2"
      >
        +
      </BaseButton>

      <!-- Row 5: 0, . -->
      <BaseButton
        @click="$emit('keyPress', 0)"
        :disabled="disabled"
        variant="ghost"
        size="lg"
        class="col-span-2"
      >
        0
      </BaseButton>
      
      <BaseButton
        @click="$emit('keyPress', '.')"
        :disabled="disabled"
        variant="ghost"
        size="lg"
      >
        .
      </BaseButton>
    </div>
    
    <!-- Equals button as separate row for better UX -->
    <BaseButton
      @click="$emit('keyPress', '=')"
      :disabled="disabled"
      variant="primary"
      size="lg"
      block
      class="mt-3"
    >
      =
    </BaseButton>
  </div>
</template>
<style scoped>
/* Grid-specific styles that can't be handled by the button component */
.calculator-keypad {
  /* Any keypad-specific styling */
}

/* Mobile optimization */
@media (max-width: 480px) {
  .calculator-keypad .row-span-2 {
    @apply row-span-2;
  }
}
</style> 