# Vue 3 Composition API Design Patterns for Reusable UI Components

## Overview

This document outlines the design patterns and best practices used in our `BaseButton` component, demonstrating modern Vue 3 Composition API patterns for building reusable, maintainable, and type-safe UI components.

## 🏗️ **Component Architecture Patterns**

### 1. **Type-Safe Props with Interface Definition**

```typescript
interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  shape?: ButtonShape
  disabled?: boolean
  loading?: boolean
  // ... more props
}
```

**Benefits:**
- Full TypeScript intellisense
- Compile-time error checking
- Self-documenting component API
- IDE auto-completion

### 2. **Default Props with `withDefaults`**

```typescript
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  shape: 'rounded',
  disabled: false,
  loading: false,
  // ... more defaults
})
```

**Benefits:**
- Type-safe default values
- Cleaner component usage
- Backwards compatibility
- Reduced boilerplate in parent components

### 3. **Computed Properties for Dynamic Styling**

```typescript
const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white',
    // ... more variants
  }
  return variants[props.variant]
})
```

**Benefits:**
- Reactive styling based on props
- Performance optimization (cached results)
- Clean separation of logic and presentation
- Easy to extend with new variants

### 4. **Slot Detection Pattern**

```typescript
const slots = useSlots()
const hasSlotContent = computed(() => {
  return !!(slots.default && slots.default().length > 0)
})
```

**Benefits:**
- Conditional rendering based on slot content
- Flexible component layouts
- Better icon-only button handling
- Dynamic spacing adjustments

### 5. **Emit Type Safety**

```typescript
interface Emits {
  (e: 'click', event: MouseEvent): void
}

const emit = defineEmits<Emits>()
```

**Benefits:**
- Type-safe event emissions
- IDE auto-completion for event listeners
- Documentation of component events
- Compile-time validation

## 🎨 **Styling Patterns**

### 1. **Configuration Object Pattern**

```typescript
const sizeClasses = computed(() => {
  const sizes = {
    xs: 'px-2 py-1 text-xs min-h-[32px]',
    sm: 'px-3 py-1.5 text-sm min-h-[36px]',
    md: 'px-4 py-2 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-lg min-h-[52px]',
    xl: 'px-8 py-4 text-xl min-h-[60px]'
  }
  return sizes[props.size]
})
```

**Benefits:**
- Centralized style configuration
- Easy to add new variants
- Consistent sizing scale
- Easy maintenance

### 2. **Conditional Class Application**

```typescript
const stateClasses = computed(() => {
  return {
    'opacity-50 cursor-not-allowed': isDisabled.value,
    'ring-2 ring-offset-2': props.active,
    'w-full': props.block,
    'justify-center': props.iconPosition === 'only'
  }
})
```

**Benefits:**
- Dynamic class application
- Readable conditional logic
- Performance optimization
- Clean state management

### 3. **Class Composition Pattern**

```typescript
const buttonClasses = computed(() => {
  return [
    // Base classes
    'inline-flex items-center font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2',
    
    // Dynamic classes
    variantClasses.value,
    sizeClasses.value,
    shapeClasses.value,
    stateClasses.value
  ]
})
```

**Benefits:**
- Organized class structure
- Easy to debug
- Performant (single computed)
- Maintainable

## 🔄 **State Management Patterns**

### 1. **Derived State Pattern**

```typescript
const isDisabled = computed(() => {
  return props.disabled || props.loading
})
```

**Benefits:**
- Reactive derived state
- Single source of truth
- Automatic updates
- Clean business logic

### 2. **Reactive Event Handling**

```typescript
const handleClick = (event: MouseEvent) => {
  if (!isDisabled.value) {
    emit('click', event)
  }
}
```

**Benefits:**
- Conditional event handling
- Type-safe parameters
- Clean separation of concerns
- Prevents unintended actions

## 🧩 **Composition Patterns**

### 1. **Icon Composition Pattern**

```vue
<template>
  <div
    v-if="icon && (iconPosition === 'left' || iconPosition === 'only')"
    class="button-icon"
    :class="{ 'mr-2': iconPosition === 'left' && hasSlotContent }"
  >
    <component :is="icon" v-if="typeof icon !== 'string'" />
    <span v-else v-html="icon" />
  </div>
</template>
```

**Benefits:**
- Flexible icon support (components or strings)
- Conditional positioning
- Dynamic spacing
- Security considerations

### 2. **Loading State Composition**

```vue
<template>
  <div v-if="loading" class="button-loading">
    <div class="button-spinner" />
    <span v-if="loadingText && iconPosition !== 'only'" class="ml-2">
      {{ loadingText }}
    </span>
  </div>
</template>
```

**Benefits:**
- Clear loading states
- Accessible loading indicators
- Contextual loading text
- Smooth state transitions

## 📦 **Usage Patterns**

### 1. **Simple Usage**

```vue
<BaseButton @click="handleClick">
  Click me
</BaseButton>
```

### 2. **With Icon**

```vue
<BaseButton 
  icon="🚀" 
  icon-position="left"
  variant="primary"
>
  Launch
</BaseButton>
```

### 3. **Loading State**

```vue
<BaseButton 
  :loading="isSaving"
  loading-text="Saving..."
  @click="save"
>
  Save
</BaseButton>
```

### 4. **Complex Calculator Example**

```vue
<BaseButton
  v-for="num in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]"
  :key="num"
  @click="handleCalculatorKey(num)"
  variant="ghost"
  size="lg"
>
  {{ num }}
</BaseButton>
```

## 🎯 **Key Design Benefits**

### **1. Consistency**
- Uniform button behavior across the app
- Consistent styling and spacing
- Standardized event handling

### **2. Maintainability**
- Single component to update for global changes
- Clear separation of concerns
- Type-safe props prevent runtime errors

### **3. Flexibility**
- Multiple variants for different use cases
- Customizable through props and classes
- Slot-based content for maximum flexibility

### **4. Performance**
- Computed properties cache results
- Minimal re-renders
- Efficient class composition

### **5. Accessibility**
- Built-in ARIA support
- Minimum touch targets (44px)
- Focus management
- Loading state announcements

## 🚀 **Advanced Patterns**

### 1. **Composable Integration**

```typescript
// useButton.ts composable
export function useButton(props: ButtonProps) {
  const isPressed = ref(false)
  const rippleEffect = ref(false)
  
  const handlePress = () => {
    isPressed.value = true
    rippleEffect.value = true
    // ... button logic
  }
  
  return {
    isPressed,
    rippleEffect,
    handlePress
  }
}
```

### 2. **Theme Integration**

```typescript
// Theme-aware button
const themeClasses = computed(() => {
  const theme = inject('theme', 'dark')
  return theme === 'dark' ? 'ring-offset-[#2b2b35]' : 'ring-offset-white'
})
```

### 3. **Animation Integration**

```vue
<Transition name="button" mode="out-in">
  <div v-if="loading" class="button-loading">
    <!-- loading content -->
  </div>
  <div v-else class="button-content">
    <!-- normal content -->
  </div>
</Transition>
```

## 📚 **Best Practices Summary**

1. **Always use TypeScript interfaces** for props and emits
2. **Leverage computed properties** for dynamic styling
3. **Use `withDefaults`** for prop defaults
4. **Implement proper accessibility** (ARIA, focus, etc.)
5. **Make components extensible** through slots and custom classes
6. **Follow single responsibility principle** - each computed handles one concern
7. **Use semantic naming** for variants and sizes
8. **Test all prop combinations** and edge cases
9. **Document component API** with examples
10. **Consider performance** - avoid unnecessary reactivity

This pattern creates a robust, reusable, and maintainable button component that serves as a foundation for consistent UI across your Vue 3 application. 