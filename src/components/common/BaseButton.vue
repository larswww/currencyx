<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { Component } from 'vue'
import type { ButtonVariant, ButtonSize, ButtonShape, IconPosition } from '@/types/button'

// Props with defaults - Vue 3 composition pattern
interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  shape?: ButtonShape
  disabled?: boolean
  loading?: boolean
  active?: boolean
  block?: boolean
  icon?: string | Component
  iconPosition?: IconPosition
  loadingText?: string
  ariaLabel?: string
  type?: 'button' | 'submit' | 'reset'
}

// Default values using withDefaults - Vue 3 pattern
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  shape: 'rounded',
  disabled: false,
  loading: false,
  active: false,
  block: false,
  iconPosition: 'left',
  type: 'button',
})

// Emits definition - type-safe events
interface Emits {
  (e: 'click', event: MouseEvent): void
}

const emit = defineEmits<Emits>()

// Composable for slot detection - reusable pattern
const slots = useSlots()
const hasSlotContent = computed(() => {
  return !!(slots.default && slots.default().length > 0)
})

// Computed for disabled state - reactive pattern
const isDisabled = computed(() => {
  return props.disabled || props.loading
})

// Variant styles - configuration pattern
const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white',
    success: 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white',
    warning: 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 text-white',
    ghost:
      'bg-transparent hover:bg-gray-600 focus:ring-gray-500 text-gray-300 border border-gray-600',
    link: 'bg-transparent hover:bg-gray-700 focus:ring-blue-500 text-blue-400 underline',
  }
  return variants[props.variant]
})

// Size styles - scaling pattern
const sizeClasses = computed(() => {
  const sizes = {
    xs: 'px-2 py-1 text-xs min-h-[32px]',
    sm: 'px-3 py-1.5 text-sm min-h-[36px]',
    md: 'px-4 py-2 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-lg min-h-[52px]',
    xl: 'px-8 py-4 text-xl min-h-[60px]',
  }
  return sizes[props.size]
})

// Shape styles - morphology pattern
const shapeClasses = computed(() => {
  const shapes = {
    square: 'rounded-none',
    rounded: 'rounded-lg',
    circle: 'rounded-full aspect-square',
    pill: 'rounded-full',
  }
  return shapes[props.shape]
})

// State-dependent classes - conditional styling pattern
const stateClasses = computed(() => {
  return {
    'opacity-50 cursor-not-allowed': isDisabled.value,
    'ring-2 ring-offset-2 ring-offset-[#2b2b35]': props.active,
    'w-full': props.block,
    'justify-center': props.iconPosition === 'only' || !hasSlotContent.value,
  }
})

// Combined classes - computed pattern for performance
const buttonClasses = computed(() => {
  return [
    // Base classes
    'inline-flex items-center font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#2b2b35]',
    'disabled:cursor-not-allowed disabled:opacity-50',

    // Dynamic classes
    variantClasses.value,
    sizeClasses.value,
    shapeClasses.value,
    stateClasses.value,
  ]
})

// Event handler - clean separation pattern
const handleClick = (event: MouseEvent) => {
  if (!isDisabled.value) {
    emit('click', event)
  }
}
</script>
<template>
  <button
    :type="type"
    :disabled="isDisabled"
    :aria-label="ariaLabel"
    :class="buttonClasses"
    @click="handleClick"
    v-bind="$attrs"
  >
    <!-- Loading State -->
    <div v-if="loading" class="button-loading">
      <div class="button-spinner" />
      <span v-if="loadingText && iconPosition !== 'only'" class="ml-2">
        {{ loadingText }}
      </span>
    </div>

    <!-- Normal State -->
    <template v-else>
      <!-- Left Icon -->
      <div
        v-if="icon && (iconPosition === 'left' || iconPosition === 'only')"
        class="button-icon"
        :class="{ 'mr-2': iconPosition === 'left' && hasSlotContent }"
      >
        <!-- You can replace this with your preferred icon system -->
        <component :is="icon" v-if="typeof icon !== 'string'" />
        <span v-else v-html="icon" />
      </div>

      <!-- Button Content -->
      <span v-if="iconPosition !== 'only' && hasSlotContent" class="button-content">
        <slot />
      </span>

      <!-- Right Icon -->
      <div v-if="icon && iconPosition === 'right'" class="button-icon ml-2">
        <component :is="icon" v-if="typeof icon !== 'string'" />
        <span v-else v-html="icon" />
      </div>
    </template>
  </button>
</template>
<style scoped>
@reference "@/assets/main.css";
.button-loading {
  @apply flex items-center justify-center;
}

.button-spinner {
  @apply w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin;
}

.button-icon {
  @apply flex items-center justify-center;
}

.button-content {
  @apply truncate;
}

/* Ensure minimum touch targets for accessibility */
@media (max-width: 480px) {
  .button {
    @apply min-h-[44px] min-w-[44px];
  }
}
</style>
