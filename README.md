
# 🚀 DevSecOps — GitHub Dependency Analyzer & Architecture Visualizer

![GitHub Repo Size](https://img.shields.io/github/repo-size/itsisoev/DevSecOps?style=for-the-badge)
![GitHub Stars](https://img.shields.io/github/stars/itsisoev/DevSecOps?style=for-the-badge)
![GitHub Forks](https://img.shields.io/github/forks/itsisoev/DevSecOps?style=for-the-badge)
![License](https://img.shields.io/github/license/itsisoev/DevSecOps?style=for-the-badge)

> **DevSecOps** — Платформа для анализа зависимостей и визуализации архитектуры ваших репозиториев на GitHub. Безопасная авторизация, детальный аудит зависимостей и интерактивные графы связей модулей.

---

## ✨ Основные возможности

### 🔑 GitHub OAuth авторизация
- Быстрый и безопасный вход через GitHub.
- В базе сохраняется только:
  - Имя пользователя
  - Email
  - Аватар
  - Токен для получения репозиториев через API
- Репозитории НЕ сохраняются в базу данных.

### 📦 Анализ зависимостей (Dependency Audit)
- Текущая и последняя версии каждой зависимости.
- Размеры библиотек в KB/MB.
- Рекомендации: обновлять или оставить как есть.
- Быстрый анализ по `package.json` без авторизации.

### 🕸️ Архитектурный граф зависимостей (Architecture Graph)
- Визуализация связей:
  - Компонентов
  - Сервисов
  - Модулей и других сущностей проекта.
- Помогает быстро понять структуру и взаимосвязи.

### ⚡️ Angular Features
- Используется:
  - `signal`
  - `DestroyRef`
  - `ChangeDetectionStrategy.OnPush`
- Высокая производительность и реактивность.

### 🎨 UI с помощью PrimeNG
- Используется мощный UI Kit — **PrimeNG**.
- Готовые компоненты: таблицы, графики, модальные окна, карточки и многое другое.
- Красивый дизайн и отзывчивость "из коробки".

---

## 🛠️ Установка и запуск

### 1. Клонировать репозиторий
```bash
git clone https://github.com/your-username/DevSecOps.git
cd DevSecOps
````

### 2. Установить зависимости фронтенда

```bash
npm install
```

### 3. Установить PrimeNG и PrimeIcons

```bash
npm install primeng primeicons
```

### 4. Настроить стили PrimeNG

В файле **angular.json** добавь стили:

```json
"styles": [
  "node_modules/primeng/resources/themes/lara-light-blue/theme.css",
  "node_modules/primeng/resources/primeng.min.css",
  "node_modules/primeicons/primeicons.css",
  "src/styles.css"
]
```

### 5. Настроить .env файл для работы с бекендом

Создай файл `.env`:

```env
VITE_API_URL=http://localhost:3000
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
```

### 6. Запустить фронтенд

```bash
npm run start
```

### 7. Запустить бекенд

Бекенд-репозиторий тут 👉 [NestJS-DevSecOps](https://github.com/itsisoev/NestJS-DevSecOps)

```bash
cd path/to/NestJS-DevSecOps
npm install
npm run start:dev
```

---

## 🛡️ Политика безопасности

* Репозитории не сохраняются в БД.
* Храним только необходимые данные для авторизации.
* Анализ зависимостей происходит в реальном времени.
* Передача данных безопасна.

---

## 🗺️ Roadmap (Дорожная карта)

* [ ] Security Audit (Проверка уязвимостей)
* [ ] Поддержка Bitbucket и GitLab
* [ ] Экспорт отчёта в PDF
* [ ] Расширенная визуализация архитектуры (SVG Export)

---

## 🤝 Как внести вклад?

1. Сделай форк 🍴
2. Создай ветку (`git checkout -b feature/YourFeature`)
3. Сделай коммит (`git commit -m 'Add feature'`)
4. Сделай push (`git push origin feature/YourFeature`)
5. Создай Pull Request

---

## 🧑‍💻 Автор

* [Далер Исоев](https://github.com/itsisoev)

---

## 📄 Лицензия

MIT License. Подробности в файле [LICENSE](LICENSE).

---

## ⭐️ Поддержи проект звездой!

Если тебе понравился проект — ставь ⭐️, для меня это важно!

---
