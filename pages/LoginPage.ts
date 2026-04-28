import { Page, Locator } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly errorMessage: Locator
  readonly requiredError: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('input[name="username"]')
    this.passwordInput = page.locator('input[name="password"]')
    this.loginButton = page.locator('button[type="submit"]')
    this.errorMessage = page.locator('.oxd-alert-content-text')
    this.requiredError = page.locator('.oxd-input-field-error-message').first()
  }

  async goto() {
    await this.page.goto('/web/index.php/auth/login')
  }

  async fillUsername(username: string) {
    await this.usernameInput.clear()
    await this.usernameInput.fill(username)
  }

  async fillPassword(password: string) {
    await this.passwordInput.clear()
    await this.passwordInput.fill(password)
  }

  async clickLogin() {
    await this.loginButton.click()
  }

  async login(username: string, password: string) {
    await this.fillUsername(username)
    await this.fillPassword(password)
    await this.clickLogin()
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent()
  }

  async isRequiredErrorVisible() {
    await this.page.waitForSelector('.oxd-input-field-error-message', { timeout: 5000 })
    return await this.requiredError.isVisible()
  }

  async isDashboardVisible() {
    await this.page.waitForURL('**/dashboard**')
    return true
  }
}