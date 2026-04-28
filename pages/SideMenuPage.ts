import { Page, Locator } from '@playwright/test'

export class SideMenuPage {
  readonly page: Page
  readonly menuItems: Locator

  constructor(page: Page) {
    this.page = page
    this.menuItems = page.locator('.oxd-sidepanel-body a.oxd-main-menu-item')
  }

  async clickMenu(menuName: string) {
    await this.menuItems.filter({ hasText: menuName }).click()
    await this.page.waitForLoadState('networkidle', { timeout: 15000 })
  }

  async isMenuItemVisible(menuName: string) {
    return await this.menuItems.filter({ hasText: menuName }).isVisible()
  }
}