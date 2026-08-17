import { test, expect } from '@playwright/test'

// Opt-in smoke test against the REAL backend + DeepSeek.
// Run with:  npm run test:e2e:live
// Requires:  the dev server on :5173 (npm run dev) which proxies /api → :8000,
//            the FastAPI backend running (.\start-backend.ps1), and DEEPSEEK_API_KEY set.
// The "@live" title tag is how the npm scripts include/exclude this spec.
test('@live Nabla returns a real reply from the backend', async ({ page }) => {
    test.setTimeout(60000)

    await page.goto('http://localhost:5173/')

    const input = page.getByRole('textbox', { name: /Ask me about Daniel|Pregúntame sobre Daniel/i })
    await input.fill("What is Daniel's current role?")

    const [response] = await Promise.all([
        page.waitForResponse((r) => r.url().includes('/api/chat'), { timeout: 45000 }),
        page.getByRole('button', { name: /Send message|Enviar mensaje/i }).click(),
    ])

    expect(response.status()).toBe(200)
    const json = await response.json()
    expect(typeof json.reply).toBe('string')
    expect(json.reply.trim().length).toBeGreaterThan(0)

    // The real reply should render in a chat bubble.
    await expect(page.getByText(json.reply.trim(), { exact: false })).toBeVisible({ timeout: 10000 })
})
