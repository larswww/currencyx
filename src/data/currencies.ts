import type { Currency } from '@/types/currency'

export const currencies: Currency[] = [
  // Major currencies (most common first as per PRD)
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', symbol: '$' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵', symbol: '¥' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭', symbol: 'CHF' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺', symbol: 'A$' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳', symbol: '¥' },

  // Other popular currencies
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳', symbol: '₹' },
  { code: 'KRW', name: 'South Korean Won', flag: '🇰🇷', symbol: '₩' },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬', symbol: 'S$' },
  { code: 'HKD', name: 'Hong Kong Dollar', flag: '🇭🇰', symbol: 'HK$' },
  { code: 'SEK', name: 'Swedish Krona', flag: '🇸🇪', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', flag: '🇳🇴', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', flag: '🇩🇰', symbol: 'kr' },
  { code: 'PLN', name: 'Polish Złoty', flag: '🇵🇱', symbol: 'zł' },
  { code: 'CZK', name: 'Czech Koruna', flag: '🇨🇿', symbol: 'Kč' },
  { code: 'HUF', name: 'Hungarian Forint', flag: '🇭🇺', symbol: 'Ft' },
  { code: 'TRY', name: 'Turkish Lira', flag: '🇹🇷', symbol: '₺' },
  { code: 'RUB', name: 'Russian Ruble', flag: '🇷🇺', symbol: '₽' },
  { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷', symbol: 'R$' },
  { code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽', symbol: 'Mex$' },
  { code: 'ARS', name: 'Argentine Peso', flag: '🇦🇷', symbol: '$' },
  { code: 'CLP', name: 'Chilean Peso', flag: '🇨🇱', symbol: '$' },
  { code: 'COP', name: 'Colombian Peso', flag: '🇨🇴', symbol: '$' },
  { code: 'PEN', name: 'Peruvian Sol', flag: '🇵🇪', symbol: 'S/' },
  { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦', symbol: 'R' },
  { code: 'EGP', name: 'Egyptian Pound', flag: '🇪🇬', symbol: '£' },
  { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬', symbol: '₦' },
  { code: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪', symbol: 'KSh' },
  { code: 'MAD', name: 'Moroccan Dirham', flag: '🇲🇦', symbol: 'DH' },
  { code: 'TND', name: 'Tunisian Dinar', flag: '🇹🇳', symbol: 'DT' },
  { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪', symbol: 'AED' },
  { code: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦', symbol: 'SR' },
  { code: 'QAR', name: 'Qatari Riyal', flag: '🇶🇦', symbol: 'QR' },
  { code: 'KWD', name: 'Kuwaiti Dinar', flag: '🇰🇼', symbol: 'KD' },
  { code: 'BHD', name: 'Bahraini Dinar', flag: '🇧🇭', symbol: 'BD' },
  { code: 'OMR', name: 'Omani Rial', flag: '🇴🇲', symbol: 'OR' },
  { code: 'ILS', name: 'Israeli Shekel', flag: '🇮🇱', symbol: '₪' },
  { code: 'JOD', name: 'Jordanian Dinar', flag: '🇯🇴', symbol: 'JD' },
  { code: 'LBP', name: 'Lebanese Pound', flag: '🇱🇧', symbol: 'L£' },
  { code: 'THB', name: 'Thai Baht', flag: '🇹🇭', symbol: '฿' },
  { code: 'MYR', name: 'Malaysian Ringgit', flag: '🇲🇾', symbol: 'RM' },
  { code: 'IDR', name: 'Indonesian Rupiah', flag: '🇮🇩', symbol: 'Rp' },
  { code: 'PHP', name: 'Philippine Peso', flag: '🇵🇭', symbol: '₱' },
  { code: 'VND', name: 'Vietnamese Dong', flag: '🇻🇳', symbol: '₫' },
  { code: 'PKR', name: 'Pakistani Rupee', flag: '🇵🇰', symbol: '₨' },
  { code: 'BDT', name: 'Bangladeshi Taka', flag: '🇧🇩', symbol: '৳' },
  { code: 'LKR', name: 'Sri Lankan Rupee', flag: '🇱🇰', symbol: 'Rs' },
  { code: 'NPR', name: 'Nepalese Rupee', flag: '🇳🇵', symbol: '₨' },
  { code: 'MMK', name: 'Myanmar Kyat', flag: '🇲🇲', symbol: 'K' },
  { code: 'KHR', name: 'Cambodian Riel', flag: '🇰🇭', symbol: '៛' },
  { code: 'LAK', name: 'Lao Kip', flag: '🇱🇦', symbol: '₭' },
  { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿', symbol: 'NZ$' },
  { code: 'FJD', name: 'Fijian Dollar', flag: '🇫🇯', symbol: 'FJ$' },
  { code: 'TOP', name: 'Tongan Paʻanga', flag: '🇹🇴', symbol: 'T$' },
  { code: 'WST', name: 'Samoan Tālā', flag: '🇼🇸', symbol: 'WS$' },
]

export const defaultBaseCurrency: Currency = currencies[0] // USD
export const defaultTargetCurrency: Currency = currencies[1] // EUR

export const findCurrencyByCode = (code: string): Currency | undefined => {
  return currencies.find((currency) => currency.code === code)
}
