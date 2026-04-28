import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { SideMenuPage } from '../pages/SideMenuPage'
import { AdminPage } from '../pages/AdminPage'

test.describe('Admin - User Management', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('Admin', 'admin123')
    await page.waitForURL('**/dashboard**')
    const sideMenuPage = new SideMenuPage(page)
    await sideMenuPage.clickMenu('Admin')
    await page.waitForURL('**/admin**')
  })

  test('should access Admin module successfully', async ({ page }) => {
    const adminPage = new AdminPage(page)
    expect(await adminPage.isOnAdminPage()).toBeTruthy()
  })

  test('should display table headers correctly', async ({ page }) => {
    const adminPage = new AdminPage(page)
    expect(await adminPage.isTableHeaderVisible()).toBeTruthy()
    const headers = await adminPage.getTableHeaderText()
    expect(headers).toContain('Username')
    expect(headers).toContain('User Role')
  })

  test('should find existing user in search', async ({ page }) => {
    const adminPage = new AdminPage(page)
    await adminPage.searchByUsername('Admin')
    expect(await adminPage.getTableRowCount()).toBeGreaterThan(0)
  })

  test('should reset search and show all users', async ({ page }) => {
    const adminPage = new AdminPage(page)
    await adminPage.searchByUsername('Admin')
    const countAfterSearch = await adminPage.getTableRowCount()
    expect(countAfterSearch).toBeGreaterThan(0)
    await page.locator('button:has-text("Reset")').click()
    await page.waitForTimeout(1500)
    const countAfterReset = await adminPage.getTableRowCount()
    expect(countAfterReset).toBeGreaterThanOrEqual(countAfterSearch)
  })

})