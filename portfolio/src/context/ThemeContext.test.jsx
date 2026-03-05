import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

// A helper component that exposes the theme context for testing
function ThemeTestHarness() {
    const { isDarkMode, toggleTheme } = useTheme();
    return (
        <div>
            <span data-testid="theme-status">{isDarkMode ? 'dark' : 'light'}</span>
            <button data-testid="toggle-btn" onClick={toggleTheme}>Toggle</button>
        </div>
    );
}

describe('ThemeContext', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        // Remove the 'dark' class from <html> if leftover
        document.documentElement.classList.remove('dark');
    });

    it('defaults to light mode when no preference is saved and system prefers light', () => {
        // Mock matchMedia to return light preference
        window.matchMedia = vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }));

        render(
            <ThemeProvider>
                <ThemeTestHarness />
            </ThemeProvider>
        );

        expect(screen.getByTestId('theme-status').textContent).toBe('light');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('defaults to dark mode when system prefers dark and nothing is saved', () => {
        window.matchMedia = vi.fn().mockImplementation((query) => ({
            matches: true,
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }));

        render(
            <ThemeProvider>
                <ThemeTestHarness />
            </ThemeProvider>
        );

        expect(screen.getByTestId('theme-status').textContent).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('reads saved preference from localStorage (dark)', () => {
        localStorage.setItem('theme', 'dark');
        window.matchMedia = vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }));

        render(
            <ThemeProvider>
                <ThemeTestHarness />
            </ThemeProvider>
        );

        expect(screen.getByTestId('theme-status').textContent).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('reads saved preference from localStorage (light)', () => {
        localStorage.setItem('theme', 'light');
        window.matchMedia = vi.fn().mockImplementation((query) => ({
            matches: true, // system says dark, but saved pref overrides
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }));

        render(
            <ThemeProvider>
                <ThemeTestHarness />
            </ThemeProvider>
        );

        expect(screen.getByTestId('theme-status').textContent).toBe('light');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('toggles from light to dark and updates localStorage and class', () => {
        window.matchMedia = vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }));

        render(
            <ThemeProvider>
                <ThemeTestHarness />
            </ThemeProvider>
        );

        // Start in light
        expect(screen.getByTestId('theme-status').textContent).toBe('light');

        // Toggle to dark
        fireEvent.click(screen.getByTestId('toggle-btn'));

        expect(screen.getByTestId('theme-status').textContent).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('toggles from dark to light and updates localStorage and class', () => {
        localStorage.setItem('theme', 'dark');
        window.matchMedia = vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }));

        render(
            <ThemeProvider>
                <ThemeTestHarness />
            </ThemeProvider>
        );

        // Start in dark
        expect(screen.getByTestId('theme-status').textContent).toBe('dark');

        // Toggle to light
        fireEvent.click(screen.getByTestId('toggle-btn'));

        expect(screen.getByTestId('theme-status').textContent).toBe('light');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
        expect(localStorage.getItem('theme')).toBe('light');
    });
});
