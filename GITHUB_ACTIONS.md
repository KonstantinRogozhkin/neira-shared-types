# GitHub Actions для neira-shared-types

## Обзор

Этот репозиторий настроен с автоматическими GitHub Actions для:
- ✅ Непрерывной интеграции (CI)
- ✅ Автоматической публикации в NPM

## Workflows

### 1. CI Pipeline (`.github/workflows/ci.yml`)

**Триггеры:**
- Push в ветки `main`, `develop`
- Pull Request в ветки `main`, `develop`

**Что выполняется:**
- Тестирование на Node.js 18 и 20
- Сборка пакета
- Проверка TypeScript компиляции
- Валидация содержимого пакета

### 2. NPM Publishing (`.github/workflows/publish.yml`)

**Триггеры:**
- Создание нового релиза в GitHub
- Ручной запуск через workflow_dispatch

**Что выполняется:**
- Установка зависимостей через Yarn
- Сборка пакета
- Запуск тестов
- Публикация в NPM
- Создание комментария с результатом

## Настройка секретов

Для работы автоматической публикации необходимо настроить секрет в GitHub:

1. Перейдите в Settings → Secrets and variables → Actions
2. Добавьте секрет `NPM_TOKEN`:
   - Получите токен в NPM: https://www.npmjs.com/settings/tokens
   - Выберите "Automation" token type
   - Скопируйте токен и добавьте как секрет

## Процесс релиза

1. **Обновите версию** в `package.json`:
   ```bash
   yarn version patch  # или minor/major
   ```

2. **Создайте коммит** с изменениями:
   ```bash
   git add package.json
   git commit -m "chore: bump version to X.X.X"
   git push
   ```

3. **Создайте релиз** в GitHub:
   - Перейдите в Releases → Create a new release
   - Создайте новый тег (например, `v1.1.4`)
   - Добавьте описание изменений
   - Нажмите "Publish release"

4. **Автоматическая публикация**: GitHub Actions автоматически опубликует пакет в NPM

## Мониторинг

- **CI статус**: Проверяйте статус в разделе Actions
- **NPM публикация**: После релиза проверьте https://www.npmjs.com/package/neira-shared-types
- **Логи**: Все логи доступны в разделе Actions → конкретный workflow

## Troubleshooting

### Ошибка публикации в NPM
- Проверьте актуальность `NPM_TOKEN`
- Убедитесь, что версия в `package.json` больше текущей в NPM
- Проверьте права доступа к пакету

### Ошибки сборки
- Проверьте TypeScript ошибки
- Убедитесь, что все зависимости корректно установлены
- Проверьте конфигурацию `tsconfig.json`

### CI падает на тестах
- Добавьте тесты в проект или измените workflow для пропуска тестов
- Проверьте совместимость с разными версиями Node.js 