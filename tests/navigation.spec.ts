import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { SideMenuPage } from '../pages/SideMenuPage'

test.describe('Navigation - OrangeHRM', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('Admin', 'admin123')
    await page.waitForURL('**/dashboard**')
    await page.waitForSelector('.oxd-sidepanel-body', { timeout: 10000 })
  })

  test('should display all main menu items', async ({ page }) => {
    const sideMenuPage = new SideMenuPage(page)
    await expect(page.locator('.oxd-sidepanel-body')).toBeVisible()
    expect(await sideMenuPage.isMenuItemVisible('Admin')).toBeTruthy()
    expect(await sideMenuPage.isMenuItemVisible('PIM')).toBeTruthy()
    expect(await sideMenuPage.isMenuItemVisible('Leave')).toBeTruthy()
    expect(await sideMenuPage.isMenuItemVisible('Time')).toBeTruthy()
    expect(await sideMenuPage.isMenuItemVisible('Recruitment')).toBeTruthy()
  })

  test('should navigate to Admin module', async ({ page }) => {
    const sideMenuPage = new SideMenuPage(page)
    await sideMenuPage.clickMenu('Admin')
    await expect(page).toHaveURL(/\/admin/)
  })

  test('should navigate to PIM module', async ({ page }) => {
    const sideMenuPage = new SideMenuPage(page)
    await sideMenuPage.clickMenu('PIM')
    await expect(page).toHaveURL(/\/pim/)
  })

  test('should navigate to Leave module', async ({ page }) => {
    const sideMenuPage = new SideMenuPage(page)
    await sideMenuPage.clickMenu('Leave')
    await expect(page).toHaveURL(/\/leave/)
  })

})