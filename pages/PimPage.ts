import { Page, Locator } from '@playwright/test'

export class PimPage {
  readonly page: Page
  readonly searchNameInput: Locator
  readonly searchButton: Locator
  readonly tableRows: Locator
  readonly tableHeader: Locator

  constructor(page: Page) {
    this.page = page
    this.searchNameInput = page.locator(
      '.oxd-form .oxd-autocomplete-text-input input').first()
    this.searchButton = page.locator('button[type="submit"]')
    this.tableRows = page.locator('.oxd-table-body .oxd-table-row')
    this.tableHeader = page.locator('.oxd-table-header')
  }

  async isOnPimPage() {
    await this.page.waitForURL('**/pim/viewEmployeeList**')
    return true
  }

  async searchByName(name: string) {
    await this.searchNameInput.fill(name)
    await this.searchButton.click()
    await this.page.waitForTimeout(2000)
  }

  async getTableRowCount() {
    await this.page.waitForTimeout(2000)
    await this.tableRows.first().waitFor({ state: 'visible', timeout: 15000 })
    return await this.tableRows.count()
  }

  async isTableHeaderVisible() {
    await this.tableHeader.waitFor({ timeout: 15000 })
    return await this.tableHeader.isVisible()
  }

  async getTableHeaderText() {
    await this.tableHeader.waitFor({ timeout: 15000 })
    return await this.tableHeader.textContent()
  }
}