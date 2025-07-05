# GitHub Actions для neira-shared-types

## Обзор

Этот репозиторий настроен с автоматическими GitHub Actions для:
- ✅ Непрерывной интеграции (CI)
- ✅ Автоматической публикации в NPM через semantic-release
- ✅ Управления версиями через Conventional Commits

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

### 2. Semantic Release (`.github/workflows/publish.yml`)

**Триггеры:**
- Push в ветку `main`

**Что выполняется:**
- Установка зависимостей через Yarn
- Сборка пакета
- Запуск тестов
- **Анализ коммитов** по стандарту Conventional Commits
- **Автоматическое определение версии** (major/minor/patch)
- **Генерация CHANGELOG.md**
- **Создание git тега**
- **Публикация в NPM**
- **Создание GitHub Release**

## Настройка секретов

Для работы автоматической публикации необходимо настроить секреты в GitHub:

1. Перейдите в Settings → Secrets and variables → Actions
2. Добавьте секреты:
   - `NPM_TOKEN`: Токен для публикации в NPM
     - Получите токен в NPM: https://www.npmjs.com/settings/tokens
     - Выберите "Automation" token type
   - `GITHUB_TOKEN`: Автоматически предоставляется GitHub Actions

## Процесс релиза (полностью автоматический)

### 1. Разработка с Conventional Commits

```bash
# Новая функция (minor версия)
git commit -m "feat: добавлена поддержка новых типов"

# Исправление бага (patch версия)
git commit -m "fix: исправлена типизация интерфейса"

# Критическое изменение (major версия)
git commit -m "feat!: изменена структура API"
```

### 2. Пуш в main

```bash
git push origin main
```

### 3. Автоматический релиз

GitHub Actions **автоматически**:
1. Анализирует коммиты с последнего релиза
2. Определяет тип версии (major/minor/patch)
3. Обновляет `package.json`
4. Генерирует `CHANGELOG.md`
5. Создает git тег
6. Публикует в NPM
7. Создает GitHub Release

## Semantic Release конфигурация

Настройки в `.releaserc.json`:

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator", 
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git"
  ]
}
```

## Правила версионирования

| Тип коммита | Версия | Пример |
|-------------|---------|---------|
| `feat:` | minor | 1.1.3 → 1.2.0 |
| `fix:` | patch | 1.1.3 → 1.1.4 |
| `perf:` | patch | 1.1.3 → 1.1.4 |
| `refactor:` | patch | 1.1.3 → 1.1.4 |
| `feat!:` или `BREAKING CHANGE:` | major | 1.1.3 → 2.0.0 |
| `docs:`, `style:`, `test:`, `chore:` | нет релиза | - |

## Мониторинг

- **CI статус**: Проверяйте статус в разделе Actions
- **Автоматические релизы**: https://github.com/KonstantinRogozhkin/neira-shared-types/releases
- **NPM публикация**: https://www.npmjs.com/package/neira-shared-types
- **Changelog**: Автоматически генерируется в `CHANGELOG.md`

## Troubleshooting

### Релиз не создался
- Проверьте, что коммиты соответствуют Conventional Commits
- Убедитесь, что есть изменения, требующие релиза
- Проверьте логи workflow в Actions

### Ошибка публикации в NPM
- Проверьте актуальность `NPM_TOKEN`
- Убедитесь, что у токена есть права на публикацию
- Проверьте права доступа к пакету

### Ошибки сборки
- Проверьте TypeScript ошибки
- Убедитесь, что все зависимости корректно установлены
- Проверьте конфигурацию `tsconfig.json`

### Semantic-release не работает
- Проверьте конфигурацию в `.releaserc.json`
- Убедитесь, что все плагины установлены
- Проверьте права `GITHUB_TOKEN`

## Преимущества автоматизации

✅ **Нет ручных ошибок** в версионировании  
✅ **Автоматический changelog** на основе коммитов  
✅ **Стандартизированный процесс** для всей команды  
✅ **Мгновенная публикация** после мержа в main  
✅ **Полная прозрачность** через GitHub Actions логи 