export interface Currency {
  code: string
  name: string
  flag: string
  symbol?: string
}

export interface ExchangeRate {
  base: string
  target: string
  rate: number
  timestamp: Date
  inverse: number
}

export interface CurrencyPair {
  base: Currency
  target: Currency
  baseAmount: number
  targetAmount: number
}

export interface ExchangeRateResponse {
  rates: Record<string, number>
  base: string
  date: string
} 