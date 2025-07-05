# Быстрый старт: neira-shared-types

## Что настроено

✅ **Отдельный репозиторий**: https://github.com/KonstantinRogozhkin/neira-shared-types  
✅ **Автоматический релиз через semantic-release**  
✅ **GitHub Actions** для CI/CD  
✅ **Conventional Commits** для управления версиями  

## Процесс разработки

### 1. Настройка NPM токена (один раз)

1. Перейдите в настройки репозитория на GitHub
2. Откройте "Settings" → "Secrets and variables" → "Actions"
3. Создайте секрет `NPM_TOKEN` с вашим NPM токеном

### 2. Разработка и коммиты

Используйте **Conventional Commits** для автоматического управления версиями:

```bash
# Новая функция (minor версия: 1.1.3 → 1.2.0)
git commit -m "feat: добавлена поддержка новых IPC каналов"

# Исправление бага (patch версия: 1.1.3 → 1.1.4)
git commit -m "fix: исправлена типизация NeiraUser"

# Критическое изменение (major версия: 1.1.3 → 2.0.0)
git commit -m "feat!: изменена структура NeiraApiResponse"
# или
git commit -m "feat: новая структура API

BREAKING CHANGE: изменена структура NeiraApiResponse"
```

### 3. Автоматический релиз

После пуша в `main` ветку:

1. **GitHub Actions** автоматически:
   - Анализирует коммиты
   - Определяет новую версию
   - Генерирует changelog
   - Создает git тег
   - Публикует в NPM

2. **Никаких ручных действий не требуется!**

## Типы коммитов

| Тип | Описание | Версия |
|-----|----------|---------|
| `feat:` | Новая функция | minor |
| `fix:` | Исправление бага | patch |
| `perf:` | Улучшение производительности | patch |
| `refactor:` | Рефакторинг кода | patch |
| `docs:` | Только документация | нет релиза |
| `style:` | Форматирование кода | нет релиза |
| `test:` | Тесты | нет релиза |
| `chore:` | Рутинные задачи | нет релиза |

## Проверка

- **GitHub Actions**: https://github.com/KonstantinRogozhkin/neira-shared-types/actions
- **NPM пакет**: https://www.npmjs.com/package/neira-shared-types
- **Релизы**: https://github.com/KonstantinRogozhkin/neira-shared-types/releases

## Использование

```bash
# Установка
npm install neira-shared-types
```

```typescript
import { NeiraApiResponse, NeiraUser } from 'neira-shared-types';
```

---

🚀 **Автоматизированный релиз готов!** Просто делайте коммиты по стандарту Conventional Commits. 