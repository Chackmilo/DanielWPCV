import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CareerTimeline from './CareerTimeline'
import { LanguageProvider } from '../context/LanguageContext'

describe('CareerTimeline component', () => {
    it('renders career milestones including RippleNami, NablaOps, and inDrive', () => {
        render(
            <LanguageProvider>
                <CareerTimeline />
            </LanguageProvider>
        )

        expect(screen.getByText('RippleNami')).toBeInTheDocument()
        expect(screen.getByText('NablaOps')).toBeInTheDocument()
        expect(screen.getByText('inDrive LATAM Delivery')).toBeInTheDocument()
        expect(screen.getByText('twinlu')).toBeInTheDocument()
    })
})
