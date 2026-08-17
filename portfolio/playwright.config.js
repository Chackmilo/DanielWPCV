import { defineConfig, devices } from '@playwright/test'

// Mocked specs run against the production build served by `vite preview` (:4173);
// the chatbot API is intercepted per-test, so no Python backend is needed.
// The opt-in live spec (title tagged @live) talks to the dev server (:5173) instead.
export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: 'list',
    use: {
        baseURL: 'http://localhost:4173',
        trace: 'on-first-retry',
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ],
    webServer: {
        command: 'npm run build && npm run preview -- --port 4173 --strictPort',
        url: 'http://localhost:4173',
        reuseExistingServer: !process.env.CI,
        timeout: 180000,
    },
})
