![Playwright Tests](https://github.com/Morenoreis/PlaywrightOrange/actions/workflows/playwright.yml/badge.svg)

# PlaywrightOrange 🍊

End-to-end test automation project using **Playwright + TypeScript** on the [OrangeHRM](https://opensource-demo.orangehrmlive.com) demo website.

Built as a practical QA Automation portfolio focused on best practices, clean architecture, and real module coverage of an HR system.

---

##  Tech Stack

- [Playwright](https://playwright.dev/) 1.40+
- TypeScript
- Node.js 24+
- Page Object Model (POM)

---

##  Project Structure

```
PlaywrightOrange/
├── pages/
│   ├── LoginPage.ts
│   ├── SideMenuPage.ts
│   ├── AdminPage.ts
│   └── PimPage.ts
├── tests/
│   ├── login.spec.ts
│   ├── navigation.spec.ts
│   ├── admin.spec.ts
│   └── pim.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

---

##  Test Coverage

###  Login Tests
- Valid login should redirect to dashboard
- Invalid login should show error message
- Empty fields should show required error

###  Navigation Tests
- Should display all main menu items
- Should navigate to Admin module
- Should navigate to PIM module
- Should navigate to Leave module

###  Admin Tests
- Should access Admin module successfully
- Should display table headers correctly
- Should find existing user in search
- Should reset search and show all users

###  PIM Tests
- Should access PIM module successfully
- Should display employee list with records
- Should display table headers correctly
- Should find employee by name

---

##  Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/Morenoreis/PlaywrightOrange.git
cd PlaywrightOrange
npm install
npx playwright install
```

### Run all tests

```bash
npx playwright test
```

### Run with UI mode

```bash
npx playwright test --ui
```

### Run headed (visible browser)

```bash
npx playwright test --headed
```

### Run a specific spec

```bash
npx playwright test tests/login.spec.ts
```

### View HTML report

```bash
npx playwright show-report
```

---

##  Architecture

This project follows the **Page Object Model (POM)** pattern:

- Each module has its own Page Object under `pages/`
- Locators are centralized using Playwright `Locator` in each Page class
- `test.beforeEach` handles login and navigation setup for each suite
- `waitForLoadState` and `waitForURL` ensure stable navigation
- `playwright.config.ts` centralizes timeout and browser configuration

---

##  Notes

- The demo site resets data periodically
- Tests run sequentially with 1 worker to avoid conflicts
- Retries set to 1 to handle occasional demo site instability
- Project is part of a multi-framework QA portfolio

---
## Continuous Integration

Tests run automatically on every push and pull request via GitHub Actions. The Playwright HTML report is uploaded as a workflow artifact and can be downloaded from the Actions tab, or generated locally with:

```bash
npx playwright show-report
```
##  Author

**Moreno Barros Reis**


QA Automation Engineer


•[LinkedIn](https://www.linkedin.com/in/morenoreis/)


 • [GitHub](https://github.com/Morenoreis)
