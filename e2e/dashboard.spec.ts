import { test, expect } from '@playwright/test'

test.describe('LCARS Dashboard', () => {
  test('all 6 panels are visible', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByTestId('panel-agent-status')).toBeVisible()
    await expect(page.getByTestId('panel-active-tasks')).toBeVisible()
    await expect(page.getByTestId('panel-memory-health')).toBeVisible()
    await expect(page.getByTestId('panel-calendar')).toBeVisible()
    await expect(page.getByTestId('panel-system-resources')).toBeVisible()
    await expect(page.getByTestId('panel-quick-actions')).toBeVisible()
  })

  test('API /api/health returns 200', async ({ request }) => {
    const res = await request.get('http://localhost:3333/api/health')
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.status).toBe('ok')
    expect(body).toHaveProperty('uptime')
    expect(body).toHaveProperty('timestamp')
  })

  test('API /api/system returns valid data', async ({ request }) => {
    const res = await request.get('http://localhost:3333/api/system')
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.cpu).toBeDefined()
    expect(body.memory).toBeDefined()
    expect(body.disk).toBeDefined()
    expect(body.cpu.cores).toBeGreaterThan(0)
  })

  test('API /api/memory returns stats', async ({ request }) => {
    const res = await request.get('http://localhost:3333/api/memory')
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body).toHaveProperty('fileCount')
    expect(body).toHaveProperty('files')
  })

  test('LCARS styling is present', async ({ page }) => {
    await page.goto('/')

    // Dark background
    const body = page.locator('body')
    const bg = await body.evaluate(el => getComputedStyle(el).backgroundColor)
    // Should be dark (rgb values close to 0)
    expect(bg).toBeTruthy()

    // Header exists
    await expect(page.locator('.lcars-header')).toBeVisible()

    // LCARS panels exist
    const panels = page.locator('.lcars-panel')
    await expect(panels.first()).toBeVisible()
  })

  test('WebSocket connects', async ({ page }) => {
    await page.goto('/')

    // Wait for WebSocket connection (indicated by CONNECTED text)
    await expect(page.getByText('CONNECTED')).toBeVisible({ timeout: 10000 })
  })
})
