import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
    test('loads with the hero heading visible', async ({ page }) => {
        await page.goto('/')
        await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()
    })

    test('theme toggle flips the dark class on <html>', async ({ page }) => {
        await page.goto('/')
        const html = page.locator('html')
        const before = (await html.getAttribute('class')) || ''
        // Theme button aria-label is "Switch to dark mode" / "Switch to light mode" (EN default)
        await page.getByRole('button', { name: /dark mode|light mode/i }).click()
        await expect(async () => {
            const after = (await html.getAttribute('class')) || ''
            expect(after).not.toBe(before)
        }).toPass()
    })

    test('language toggle flips the EN/ES button label', async ({ page }) => {
        await page.goto('/')
        const langBtn = page.getByRole('button', { name: /Switch to Spanish|Cambiar a inglés/i })
        const before = (await langBtn.textContent())?.trim()
        await langBtn.click()
        await expect(async () => {
            const after = (await langBtn.textContent())?.trim()
            expect(after).not.toBe(before)
        }).toPass()
    })
})
