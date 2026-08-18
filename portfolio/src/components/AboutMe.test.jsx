import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutMe from './AboutMe'
import { LanguageProvider } from '../context/LanguageContext'

describe('AboutMe Hero Bento component', () => {
    it('renders hero title, verified subtitle, and metrics', () => {
        render(
            <LanguageProvider>
                <AboutMe />
            </LanguageProvider>
        )

        expect(screen.getByText('Daniel Camilo Pardo Figueroa')).toBeInTheDocument()
        expect(screen.getByText(/Director of Data Strategy & AI/i)).toBeInTheDocument()
        expect(screen.getByText('~40%')).toBeInTheDocument()
        expect(screen.getByText('1.5x')).toBeInTheDocument()
        expect(screen.getByText('500M+')).toBeInTheDocument()
        expect(screen.getByText('99.9%')).toBeInTheDocument()
    })

    it('renders CV download and schedule call CTAs', () => {
        render(
            <LanguageProvider>
                <AboutMe />
            </LanguageProvider>
        )

        expect(screen.getByRole('link', { name: /Download CV|Descargar CV/i })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /Schedule|Agendar/i })).toBeInTheDocument()
    })
})
