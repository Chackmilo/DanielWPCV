import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { LanguageProvider, useLanguage } from './LanguageContext'

const wrapper = ({ children }) => <LanguageProvider>{children}</LanguageProvider>

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  it('defaults to English — t() returns the en argument', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper })
    expect(result.current.lang).toBe('en')
    expect(result.current.t('Hello', 'Hola')).toBe('Hello')
  })

  it('toggleLanguage switches to Spanish — t() returns the es argument', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper })
    act(() => result.current.toggleLanguage())
    expect(result.current.lang).toBe('es')
    expect(result.current.t('Hello', 'Hola')).toBe('Hola')
  })

  it('toggling twice returns to English', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper })
    act(() => result.current.toggleLanguage())
    act(() => result.current.toggleLanguage())
    expect(result.current.lang).toBe('en')
    expect(result.current.t('Hello', 'Hola')).toBe('Hello')
  })

  it('useLanguage throws when used outside a LanguageProvider', () => {
    expect(() => renderHook(() => useLanguage())).toThrow(/within LanguageProvider/)
  })
})
