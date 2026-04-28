import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test.describe('Login - OrangeHRM', () => {

  test('valid login should redirect to dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('Admin', 'admin123')
    await expect(page).toHaveURL(/dashboard/, { timeout: 15000 })
  })

  test('invalid login should show error message', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('Admin', 'wrongpassword')
    const error = await loginPage.getErrorMessage()
    expect(error).toContain('Invalid credentials')
  })

  test('empty fields should show required error', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.clickLogin()
    await expect(page.locator('.oxd-input-field-error-message').first())
      .toBeVisible({ timeout: 5000 })
  })

})