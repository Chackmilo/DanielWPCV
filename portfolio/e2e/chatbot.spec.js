import { test, expect } from '@playwright/test'

const inputName = /Ask me about Daniel|Pregúntame sobre Daniel/i
const sendName = /Send message|Enviar mensaje/i

test.describe('Nabla chatbot (mocked /api/chat)', () => {
    test('sends a message and renders the assistant reply', async ({ page }) => {
        await page.route('**/api/chat', (route) =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ reply: 'Mocked Nabla answer.' }),
            })
        )

        await page.goto('/')
        const input = page.getByRole('textbox', { name: inputName })
        await input.fill('What is Daniel’s role?')
        await page.getByRole('button', { name: sendName }).click()

        await expect(page.getByText('What is Daniel’s role?')).toBeVisible()
        await expect(page.getByText('Mocked Nabla answer.')).toBeVisible()
    })

    test('shows the bilingual error bubble when the API fails', async ({ page }) => {
        await page.route('**/api/chat', (route) =>
            route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({ detail: 'boom' }),
            })
        )

        await page.goto('/')
        const input = page.getByRole('textbox', { name: inputName })
        await input.fill('trigger an error')
        await page.getByRole('button', { name: sendName }).click()

        await expect(
            page.getByText(/having trouble connecting|problemas para conectarme/i)
        ).toBeVisible()
    })
})
