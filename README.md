# Union — B2B Merch Platform

Next.js 15 + Supabase + Vercel

## Быстрый старт

### 1. Установить Node.js

Скачайте с [nodejs.org](https://nodejs.org) (LTS версия) или через Homebrew:

```bash
brew install node
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Настроить Supabase

Создайте файл `.env.local` (скопировав `.env.local.example`):

```bash
cp .env.local.example .env.local
```

Вставьте свои ключи из [Supabase Dashboard](https://app.supabase.com) → Project Settings → API:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### 4. Создать таблицы в Supabase

Перейдите в Supabase Dashboard → **SQL Editor** и выполните:

1. Содержимое файла `supabase/schema.sql` — создаёт таблицы и политики
2. Содержимое файла `supabase/seed.sql` — добавляет тестовые данные

### 5. Создать аккаунт администратора

В Supabase Dashboard → **Authentication** → **Users** → **Add user**:
- Email: ваш email
- Password: надёжный пароль
- Нажмите "Create user"

Этим аккаунтом будете входить в `/admin`

### 6. Запустить локально

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

---

## Деплой на Vercel

1. Запушьте код в GitHub
2. Импортируйте проект в [vercel.com](https://vercel.com)
3. В настройках Vercel добавьте переменные окружения из `.env.local`
4. В Supabase Dashboard → **Authentication** → **URL Configuration** добавьте ваш Vercel URL в Site URL

---

## Структура проекта

```
src/
  app/
    page.tsx              — Главная страница (лендинг)
    catalog/              — Каталог товаров
    admin/                — Административная панель
      login/              — Страница входа
      orders/             — Заявки (список + смена статуса)
      products/           — Товары (CRUD)
      clients/            — Клиенты на главной
  components/
    Navbar, Footer, Hero  — Публичные компоненты
    admin/                — Компоненты админки
  lib/
    supabase/             — Клиент и серверный клиент Supabase
    types.ts              — TypeScript типы
supabase/
  schema.sql              — Схема БД
  seed.sql                — Тестовые данные
```

## Возможности

**Публичный сайт:**
- Лендинг с Hero, преимуществами, каталогом, клиентами
- Каталог с фильтрацией по категориям
- Страница товара с формой заявки
- Форма заявки на главной

**Административная панель (`/admin`):**
- Список всех заявок со сменой статуса
- Добавление / редактирование / удаление товаров
- Управление клиентами на главной (логотипы, порядок)
