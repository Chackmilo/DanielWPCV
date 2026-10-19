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
        const langBtn = page.locator('.lang-btn')
        await expect(langBtn).toBeVisible()
        const before = (await langBtn.textContent())?.trim()
        await langBtn.click()
        await expect(async () => {
            const after = (await langBtn.textContent())?.trim()
            expect(after).not.toBe(before)
        }).toPass()
    })

    test('renders AlterEgo in projects', async ({ page }) => {
        await page.goto('/')
        await expect(page.getByText(/AlterEgo/i).first()).toBeVisible()
    })

    test('renders Microsoft AI & Machine Learning Engineer in education', async ({ page }) => {
        await page.goto('/')
        await expect(page.getByText('Microsoft AI & Machine Learning Engineer').first()).toBeVisible()
    })

    test('renders fluent B2 English in footer', async ({ page }) => {
        await page.goto('/')
        await expect(page.getByText(/Advanced, fluent \(B2\)|Avanzado, fluido \(B2\)/i)).toBeVisible()
    })

    test('renders Certifications before Blog in the DOM for scroll-spy accuracy', async ({ page }) => {
        await page.goto('/')
        await page.locator('#certifications').waitFor({ state: 'attached' })
        await page.locator('#blog').waitFor({ state: 'attached' })
        const order = await page.evaluate(() => {
            const certs = document.getElementById('certifications')
            const blog = document.getElementById('blog')
            if (!certs || !blog) return false
            // DOCUMENT_POSITION_FOLLOWING (4) significa que blog está después de certifications
            return Boolean(certs.compareDocumentPosition(blog) & Node.DOCUMENT_POSITION_FOLLOWING)
        })
        expect(order).toBe(true)
    })

    test('applies --font-size-section-title CSS variable to h2 section titles', async ({ page }) => {
        await page.goto('/')
        const fontSize = await page.locator('#skills h2').evaluate((el) => {
            return window.getComputedStyle(el).fontSize
        })
        // Debe ser mayor a 24px (ej. ~30px a 40px según el clamp), no el 16px por defecto
        expect(parseFloat(fontSize)).toBeGreaterThan(24)
    })

    test('hides private GitHub links or shows private badge instead of 404 links', async ({ page }) => {
        await page.goto('/')
        const privateRepoLinks = page.locator('a[href="https://github.com/Chackmilo/Agente"], a[href="https://github.com/Chackmilo/blablabla"], a[href="https://github.com/Chackmilo/GRA-valuation"], a[href="https://github.com/Chackmilo/Fortuna_Agente"]')
        await expect(privateRepoLinks).toHaveCount(0)
    })

    test('updates Nabla AI initial greeting dynamically when toggling language', async ({ page }) => {
        await page.goto('/')
        await expect(page.getByText(/Hello! I am Nabla/i)).toBeVisible()
        await page.locator('.lang-btn').click()
        await expect(page.getByText(/¡Hola! Soy Nabla/i)).toBeVisible()
    })

    test('opens and closes command palette via button and keyboard', async ({ page }) => {
        await page.goto('/')
        const cmdBtn = page.getByRole('button', { name: /Open command palette|Abrir paleta de comandos/i })
        await cmdBtn.click()
        const dialog = page.getByRole('dialog', { name: /Command Palette|Paleta de Comandos/i })
        await expect(dialog).toBeVisible()
        await page.keyboard.press('Escape')
        await expect(dialog).not.toBeVisible()
    })
})

