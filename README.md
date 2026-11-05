# GreenCity Automated Tests (Playwright)

Стартовий каркас автотестів для вебзастосунку [GreenCity](https://www.greencity.cx.ua/#/greenCity).

Це **шаблон**. У ньому є структура Page Object, базова інфраструктура тестів і один приклад UI-тесту. Завдання — додавати сторінки, компоненти й тести. Карта екранів і шарів лежить у [docs/ui-page-object-architecture.md](docs/ui-page-object-architecture.md), UML — у [docs/ui-page-object-uml.md](docs/ui-page-object-uml.md).

Паралельний стартер на Java і Selenium: [GreenCity-TAQC-Selenium](https://github.com/GreenCity-november-2026/GreenCity-TAQC-Selenium).

## Технології

- **Node.js 20+**
- **TypeScript**
- **Playwright Test** — UI і API тести, браузер, очікування, звіт
- **dotenv** — локальні змінні оточення

Playwright сам чекає, поки елемент стане видимим і готовим до дії. Окремий implicit wait, `sleep` і `waitUntilElementVisible` не потрібні. Твердження лишаються в тесті: `await expect(locator).toBeVisible()`.

## Швидкий старт

### 1. Встановити залежності

```bash
npm install
npx playwright install chromium
```

### 2. Налаштувати тестові дані

```bash
cp .env.example .env
```

У PowerShell:

```powershell
Copy-Item .env.example .env
```

Відредагуйте `.env`:

```properties
BASE_UI_URL=https://www.greencity.cx.ua/#/greenCity
BASE_API_URL=https://api-greencity.azurewebsites.net/

USER_EMAIL=your.user@example.com
USER_NAME=Your User Name
USER_PASSWORD=your_password

ADMIN_EMAIL=admin@example.com
ADMIN_NAME=Admin Name
ADMIN_PASSWORD=admin_password
```

`.env` є в `.gitignore`. Облікові дані в репозиторій не комітити.

`BASE_UI_URL` має відкривати модуль GreenCity (`#/greenCity`). Корінь сайту може перенаправити на UBS, цей стартер UBS не покриває.

Без `.env` UI-адреса за замовчуванням усе одно веде на `#/greenCity`, тож приклад тесту можна запустити одразу після встановлення браузера.

### 3. Запустити приклад тесту

```bash
npm run test:ui
```

Усі тести:

```bash
npm test
```

Один файл:

```bash
npx playwright test tests/ui/home.spec.ts
```

З видимим браузером:

```bash
npm run test:headed
```

Перевірка типів без запуску браузера:

```bash
npm run typecheck
```

## Структура

```
src/
├── config/test-values.ts                 # читає .env
├── ui/
│   ├── base.ts                           # спільні дії сторінки
│   ├── pages/
│   │   ├── base.page.ts                  # базовий клас сторінок
│   │   └── homepage/home.page.ts         # приклад сторінки
│   ├── components/
│   │   ├── base.component.ts
│   │   ├── header/header.component.ts
│   │   └── footer/footer.component.ts
│   └── elements/base.element.ts
└── api/clients/base.client.ts            # базовий клас API-клієнтів
tests/
├── support/ui.fixture.ts                 # відкриває головну і віддає HomePage
├── support/api.fixture.ts                # request з BASE_API_URL
└── ui/home.spec.ts                       # приклад тесту
```

## Як додавати код

### Нова сторінка

Сторінка — це екран із власним URL під `#/greenCity`. Sign in, sign up і «забув пароль» сторінками не є: хедер відкриває їх однією модалкою, URL не змінюється. Це майбутня модалка, не `SignInPage`.

1. Створіть клас у `src/ui/pages/<назва>/`.
2. Успадкуйте `BasePage`.
3. Оголосіть локатори від `page` або від кореня компонента і методи сторінки.

Приклад для `#/greenCity/about`:

```typescript
import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class AboutPage extends BasePage {
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('h2.section__header');
  }

  async getTitle(): Promise<string> {
    return this.title.innerText();
  }
}
```

Локатор створюється одразу, а шукає елемент лише в момент дії або `expect`.

### Новий компонент

1. Створіть клас у `src/ui/components/<назва>/`.
2. Успадкуйте `BaseComponent`.
3. Передайте кореневий `Locator` зі сторінки. Внутрішні локатори будуйте від `this.root`, щоб вони не чіпляли такі самі елементи зовні компонента.

### Новий UI-тест

1. Створіть `tests/ui/<назва>.spec.ts`.
2. Імпортуйте `test` і `expect` з `tests/support/ui.fixture.ts`.
3. Фікстура `homePage` вже відкриває `BASE_UI_URL`.

```typescript
import { expect, test } from '../support/ui.fixture';

test('about title should be visible', async ({ homePage }) => {
  const aboutPage = await homePage.header.openAbout();
  await expect(aboutPage.title).toBeVisible();
});
```

`openAbout()` — метод, який ви додаєте в `HeaderComponent`. Він клікає посилання About us і повертає `new AboutPage(this.page)`.

Метод, який повертає іншу сторінку, має бути `async` і повертати її після кліку. Перевірку, що відкрився потрібний екран, робіть у тесті через `expect`.

### API-клієнт

Нащадок `BaseClient` отримує `request` із `tests/support/api.fixture.ts` і викликає `this.get()` / `this.post()`. `setToken()` додає заголовок `Authorization: Bearer ...`.

```typescript
import { APIRequestContext } from '@playwright/test';
import { BaseClient } from './base.client';

export class NewsClient extends BaseClient {
  constructor(request: APIRequestContext, baseApiUrl: string) {
    super(request, baseApiUrl);
  }

  list() {
    return this.get('/eco-news');
  }
}
```

Шлях у прикладі орієнтовний. Уточніть його за контрактом [GreenCity API](https://github.com/ita-social-projects/GreenCity), перш ніж писати тест.

## Звіт

```bash
npm test
npm run report
```

Playwright зберігає HTML-звіт у `playwright-report/`, а trace, скріншот і відео падіння — у `test-results/`.

## CI

Workflow `.github/workflows/ci.yml` на кожен push і pull request у `main` ставить залежності, перевіряє типи й запускає тести в Chromium. HTML-звіт зберігається артефактом `playwright-report`.

## Вимоги

- Node.js 20+
- Google Chrome ставить Playwright командою `npx playwright install chromium`
