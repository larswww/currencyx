<script setup lang="ts">
import BaseButton from '@/components/common/BaseButton.vue'
import { testIds } from '@/testIds'

interface Props {
  isLoading?: boolean
}

interface Emits {
  (e: 'click'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.swap-button {
  min-width: 48px;
  min-height: 48px;
}

.group:hover svg:not(.animate-spin) {
  transition: transform 250ms ease-out;
}
</style>
<template>
  <BaseButton
    @click="$emit('click')"
    :disabled="isLoading"
    :loading="isLoading"
    variant="primary"
    shape="circle"
    size="md"
    icon-position="only"
    aria-label="Swap currencies"
    class="swap-button group relative"
    :data-testid="testIds.swapButton"
  >
    <!-- Swap Icon -->
    <svg
      class="w-6 h-6 text-white transition-transform duration-250 ease-out"
      :class="{ 'group-hover:rotate-180': !isLoading }"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
      />
    </svg>
  </BaseButton>
</template>
