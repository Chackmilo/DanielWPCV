import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import QuickChips from './QuickChips'
import { LanguageProvider } from '../context/LanguageContext'

describe('QuickChips component', () => {
    it('renders suggestion chips in English by default', () => {
        render(
            <LanguageProvider>
                <QuickChips onSelect={vi.fn()} disabled={false} />
            </LanguageProvider>
        )

        expect(screen.getByText(/What is Daniel's experience in GenAI/i)).toBeInTheDocument()
        expect(screen.getByText(/Tell me about the Datalakehouse/i)).toBeInTheDocument()
    })

    it('triggers onSelect callback when a chip is clicked', () => {
        const handleSelect = vi.fn()
        render(
            <LanguageProvider>
                <QuickChips onSelect={handleSelect} disabled={false} />
            </LanguageProvider>
        )

        const firstChip = screen.getByText(/What is Daniel's experience in GenAI/i)
        fireEvent.click(firstChip)

        expect(handleSelect).toHaveBeenCalledTimes(1)
        expect(handleSelect).toHaveBeenCalledWith("What is Daniel's experience in GenAI & AI Agents?")
    })

    it('disables all buttons when disabled prop is true', () => {
        render(
            <LanguageProvider>
                <QuickChips onSelect={vi.fn()} disabled={true} />
            </LanguageProvider>
        )

        const buttons = screen.getAllByRole('button')
        buttons.forEach(button => {
            expect(button).toBeDisabled()
        })
    })
})
