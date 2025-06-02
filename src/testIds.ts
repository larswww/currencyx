export const testIds = {
  calculator: {
    clear: 'calc-button-clear',
    backspace: 'calc-button-backspace',
    divide: 'calc-button-divide',
    multiply: 'calc-button-multiply',
    subtract: 'calc-button-subtract',
    add: 'calc-button-add',
    equals: 'calc-button-equals',
    decimal: 'calc-button-decimal',
    number: (num: number) => `calc-button-${num}`,
  },

  currencyPanel: {
    panel: (code: string) => `currency-panel-${code.toLowerCase()}`,
    baseCurrencySelector: 'base-currency-selector',
    targetCurrencySelector: 'target-currency-selector',
    baseCurrencyCode: 'base-currency-code',
    targetCurrencyCode: 'target-currency-code',
    baseAmountInput: 'base-amount-input',
    targetAmountInput: 'target-amount-input',
    baseCurrencyPanel: 'base-currency-panel',
    targetCurrencyPanel: 'target-currency-panel',
  },

  currencySelector: {
    modal: 'currency-selector-modal',
    close: 'currency-selector-close',
    search: 'currency-search',
    option: (code: string) => `currency-option-${code}`,
  },

  swapButton: 'swap-button',

  exchangeRate: {
    info: 'exchange-rate-info',
    lastUpdated: 'last-updated-time',
  },
} as const 