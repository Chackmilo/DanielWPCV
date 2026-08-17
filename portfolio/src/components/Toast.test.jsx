import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Toast from './Toast'

describe('Toast component', () => {
    it('renders message when isVisible is true', () => {
        render(<Toast message="Email copied successfully!" isVisible={true} />)
        expect(screen.getByText('Email copied successfully!')).toBeInTheDocument()
    })

    it('does not render message when isVisible is false', () => {
        render(<Toast message="Hidden message" isVisible={false} />)
        expect(screen.queryByText('Hidden message')).not.toBeInTheDocument()
    })
})
