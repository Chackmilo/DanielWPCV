import { test, expect } from '@playwright/test'

const POST_ID = 'from-pmo-to-ai-leadership'

test.describe('Blog routing', () => {
    test('renders a known post with the correct canonical link', async ({ page }) => {
        await page.goto(`/blog/${POST_ID}`)
        // Navbar also renders an <h1> site title, so scope to the article's heading.
        await expect(page.locator('article').getByRole('heading', { level: 1 })).toBeVisible()
        // Helmet injects a page-specific canonical <link> into <head> after mount.
        await expect(
            page.locator(`link[rel="canonical"][href$="/blog/${POST_ID}"]`)
        ).toBeAttached()
    })

    test('back-to-home link returns to the landing page', async ({ page }) => {
        await page.goto(`/blog/${POST_ID}`)
        await page.getByRole('link', { name: /Back to home|Volver al inicio/i }).click()
        await expect(page).toHaveURL(/\/(#blog)?$/)
        await expect(page.locator('#about')).toBeVisible()
    })

    test('unknown post id shows the 404 fallback', async ({ page }) => {
        await page.goto('/blog/this-post-does-not-exist')
        await expect(page.getByRole('heading', { name: '404' })).toBeVisible()
    })
})
