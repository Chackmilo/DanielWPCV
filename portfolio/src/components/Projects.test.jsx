import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Projects from './Projects'
import { LanguageProvider } from '../context/LanguageContext'

describe('Projects component', () => {
    it('renders project list and filters by category', () => {
        render(
            <LanguageProvider>
                <Projects />
            </LanguageProvider>
        )

        // Initial render has projects
        expect(screen.getByText('RippleNami')).toBeInTheDocument()
        expect(screen.getByText('NablaOps')).toBeInTheDocument()

        // Filter by AI category
        const aiButton = screen.getByRole('button', { name: /AI Agents & GenAI|Agentes IA & GenAI/i })
        fireEvent.click(aiButton)

        expect(screen.getByText('NablaOps')).toBeInTheDocument()
    })
})
