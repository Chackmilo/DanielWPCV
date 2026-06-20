import { describe, it, expect } from 'vitest'
import { STAR_SPLIT_RE, STAR_TEST_RE } from './constants'

describe('STAR regexes', () => {
  it('splits English STAR descriptions keeping labels as delimiters', () => {
    const parts = 'Situation: lost users Action: shipped fix Result: recovered'.split(STAR_SPLIT_RE)
    expect(parts).toContain('Situation:')
    expect(parts).toContain('Action:')
    expect(parts).toContain('Result:')
    // delimiters are captured, so the prose between them survives too
    expect(parts.some((p) => p.includes('shipped fix'))).toBe(true)
  })

  it('splits Spanish STAR labels', () => {
    const parts = 'Situación: x Tarea: y Acción: z Resultado: w'.split(STAR_SPLIT_RE)
    expect(parts).toContain('Situación:')
    expect(parts).toContain('Tarea:')
    expect(parts).toContain('Acción:')
    expect(parts).toContain('Resultado:')
  })

  it('STAR_TEST_RE matches a bare label only', () => {
    expect(STAR_TEST_RE.test('Situation:')).toBe(true)
    expect(STAR_TEST_RE.test('Task:')).toBe(true)
    expect(STAR_TEST_RE.test('Resultado:')).toBe(true)
  })

  it('STAR_TEST_RE rejects labels embedded in prose and non-labels', () => {
    expect(STAR_TEST_RE.test('Situation: did things')).toBe(false)
    expect(STAR_TEST_RE.test('not a label')).toBe(false)
    expect(STAR_TEST_RE.test('')).toBe(false)
  })
})
