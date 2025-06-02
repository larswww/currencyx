import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CurrencyConverterView from '../CurrencyConverterView.vue'

describe('CurrencyConverterView', () => {
  it('mounts without error', () => {
    const wrapper = mount(CurrencyConverterView)
    expect(wrapper.vm).toBeTruthy()
  })

  it('renders the main container', () => {
    const wrapper = mount(CurrencyConverterView)
    expect(wrapper.find('.min-h-screen').exists()).toBe(true)
  })

  it('contains currency panels', () => {
    const wrapper = mount(CurrencyConverterView)
    expect(wrapper.find('.bg-\\[\\#3a3a47\\]').exists()).toBe(true)
  })
})
