import { Page, Locator, expect } from '@playwright/test'

export class AdminPage {
  readonly page: Page
  readonly searchUsernameInput: Locator
  readonly searchButton: Locator
  readonly tableRows: Locator
  readonly tableHeader: Locator

  constructor(page: Page) {
    this.page = page
    this.searchUsernameInput = page.locator(
      '.oxd-table-filter input.oxd-input').first()
    this.searchButton = page.locator('button[type="submit"]')
    this.tableRows = page.locator('.oxd-table-body .oxd-table-row')
    this.tableHeader = page.locator('.oxd-table-header')
  }

  async isOnAdminPage() {
    await this.page.waitForURL('**/admin/viewSystemUsers**')
    return true
  }

  async searchByUsername(username: string) {
    await this.searchUsernameInput.clear()
    await this.searchUsernameInput.fill(username)
    await expect(this.searchUsernameInput).toHaveValue(username)
    await this.searchButton.click()
    await this.page.waitForResponse(
      response => response.url().includes('/api/v2/admin/users') &&
      response.status() === 200,
      { timeout: 15000 }
    )
  }

  async getTableRowCount() {
    await this.page.waitForTimeout(1000)
    return await this.tableRows.count()
  }

  async isTableHeaderVisible() {
    await this.tableHeader.waitFor({ timeout: 10000 })
    return await this.tableHeader.isVisible()
  }

  async getTableHeaderText() {
    await this.tableHeader.waitFor({ timeout: 10000 })
    return await this.tableHeader.textContent()
  }

  async isNoRecordsFoundVisible() {
    const rowCount = await this.tableRows.count()
    return rowCount === 0
  }
}