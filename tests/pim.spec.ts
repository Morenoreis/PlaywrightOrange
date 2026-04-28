import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { SideMenuPage } from '../pages/SideMenuPage'
import { PimPage } from '../pages/PimPage'

test.describe('PIM - Employee List', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('Admin', 'admin123')
    await page.waitForURL('**/dashboard**')
    const sideMenuPage = new SideMenuPage(page)
    await sideMenuPage.clickMenu('PIM')
    await page.waitForURL('**/pim**')
  })

  test('should access PIM module successfully', async ({ page }) => {
    const pimPage = new PimPage(page)
    expect(await pimPage.isOnPimPage()).toBeTruthy()
  })

  test('should display employee list with records', async ({ page }) => {
    const pimPage = new PimPage(page)
    expect(await pimPage.getTableRowCount()).toBeGreaterThan(0)
  })

  test('should display table headers correctly', async ({ page }) => {
    const pimPage = new PimPage(page)
    expect(await pimPage.isTableHeaderVisible()).toBeTruthy()
    const headers = await pimPage.getTableHeaderText()
    expect(headers).toContain('Id')
    expect(headers).toContain('Last Name')
  })

  test('should find employee by name', async ({ page }) => {
    const pimPage = new PimPage(page)
    await pimPage.searchByName('John')
    expect(await pimPage.getTableRowCount()).toBeGreaterThan(0)
  })

})