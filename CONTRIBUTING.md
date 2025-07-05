# Руководство по контрибуции в neira-shared-types

## Процесс разработки

### 1. Conventional Commits

Мы используем стандарт **Conventional Commits** для автоматического управления версиями.

#### Формат коммитов

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Типы коммитов

| Тип | Описание | Версия |
|-----|----------|---------|
| `feat` | Новая функция | minor |
| `fix` | Исправление бага | patch |
| `perf` | Улучшение производительности | patch |
| `refactor` | Рефакторинг без изменения API | patch |
| `docs` | Изменения в документации | нет релиза |
| `style` | Форматирование, отступы | нет релиза |
| `test` | Добавление тестов | нет релиза |
| `build` | Изменения в сборке | нет релиза |
| `ci` | Изменения в CI/CD | нет релиза |
| `chore` | Рутинные задачи | нет релиза |

#### Критические изменения (BREAKING CHANGES)

Для major версии используйте:

```bash
# Вариант 1: восклицательный знак
git commit -m "feat!: изменена структура NeiraApiResponse"

# Вариант 2: footer
git commit -m "feat: новая структура API

BREAKING CHANGE: изменена структура NeiraApiResponse, 
теперь data обязательное поле"
```

### 2. Примеры коммитов

```bash
# Новая функция (minor: 1.1.3 → 1.2.0)
git commit -m "feat: добавлена поддержка WebSocket типов"

# Исправление бага (patch: 1.1.3 → 1.1.4)
git commit -m "fix: исправлена типизация NeiraUser.permissions"

# Улучшение производительности (patch: 1.1.3 → 1.1.4)
git commit -m "perf: оптимизирована типизация IPC каналов"

# Рефакторинг (patch: 1.1.3 → 1.1.4)
git commit -m "refactor: упрощена структура типов"

# Критическое изменение (major: 1.1.3 → 2.0.0)
git commit -m "feat!: изменен интерфейс NeiraApiResponse"

# Документация (нет релиза)
git commit -m "docs: обновлено README с примерами"

# Форматирование (нет релиза)
git commit -m "style: исправлено форматирование кода"
```

### 3. Workflow разработки

1. **Создайте ветку**:
   ```bash
   git checkout -b feature/new-types
   ```

2. **Внесите изменения** в типы

3. **Соберите пакет**:
   ```bash
   yarn build
   ```

4. **Сделайте коммит по стандарту**:
   ```bash
   git commit -m "feat: добавлены типы для нового API"
   ```

5. **Создайте Pull Request** в `main`

6. **После мержа** - автоматический релиз через semantic-release

## Автоматический релиз

После мержа в `main` ветку GitHub Actions автоматически:

1. ✅ Анализирует коммиты
2. ✅ Определяет новую версию
3. ✅ Обновляет `package.json`
4. ✅ Генерирует `CHANGELOG.md`
5. ✅ Создает git тег
6. ✅ Публикует в NPM
7. ✅ Создает GitHub Release

## Структура проекта

```
neira-shared-types/
├── src/
│   ├── index.ts          # Основные экспорты
│   ├── ipc-channels.ts   # IPC каналы
│   ├── mcp-contracts.ts  # MCP контракты
│   └── proto/           # Protobuf определения
├── dist/                # Скомпилированные файлы
├── .releaserc.json      # Конфигурация semantic-release
└── CHANGELOG.md         # Автогенерируемый changelog
```

## Добавление новых типов

### 1. Создание типов

```typescript
// src/new-feature.ts
export interface NewFeatureType {
  id: string;
  name: string;
  options?: Record<string, unknown>;
}

export type NewFeatureStatus = 'active' | 'inactive' | 'pending';
```

### 2. Экспорт в index.ts

```typescript
// src/index.ts
export * from './new-feature';
```

### 3. Обновление экспортов в package.json

```json
{
  "exports": {
    "./new-feature": {
      "types": "./dist/new-feature.d.ts",
      "import": "./dist/new-feature.js",
      "require": "./dist/new-feature.js"
    }
  }
}
```

## Проверка изменений

### Локальная проверка

```bash
# Сборка
yarn build

# Проверка пакета
yarn pack --dry-run

# Проверка типов
npx tsc --noEmit
```

### Тестирование в других пакетах

```bash
# Создание локального пакета
yarn pack

# Установка в другом проекте
npm install /path/to/neira-shared-types-v1.1.4.tgz
```

## Отладка релизов

### Проверка логов

1. Перейдите в [GitHub Actions](https://github.com/KonstantinRogozhkin/neira-shared-types/actions)
2. Найдите workflow "Publish to NPM"
3. Изучите логи semantic-release

### Частые проблемы

1. **Релиз не создался**:
   - Проверьте формат коммитов
   - Убедитесь, что есть изменения, требующие релиза

2. **Ошибка NPM**:
   - Проверьте `NPM_TOKEN` в секретах
   - Убедитесь в правах на публикацию

3. **Ошибка сборки**:
   - Проверьте TypeScript ошибки
   - Убедитесь в корректности зависимостей

## Мониторинг

- **Релизы**: https://github.com/KonstantinRogozhkin/neira-shared-types/releases
- **NPM**: https://www.npmjs.com/package/neira-shared-types
- **CI/CD**: https://github.com/KonstantinRogozhkin/neira-shared-types/actions 