# neira-shared-types

Общие TypeScript типы для экосистемы NEIRA.

## Установка

```bash
npm install neira-shared-types
```

## Использование

```typescript
import { 
  NeiraApiResponse, 
  NeiraUser, 
  NeiraError,
  NeiraConfig 
} from 'neira-shared-types';

// Пример использования типов
const user: NeiraUser = {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com'
};

const response: NeiraApiResponse<NeiraUser> = {
  success: true,
  data: user,
  message: 'User retrieved successfully'
};
```

## Доступные типы

### Основные типы

- `NeiraUser` - Пользователь системы
- `NeiraApiResponse<T>` - Стандартный ответ API
- `NeiraError` - Ошибка системы
- `NeiraConfig` - Конфигурация приложения

### Типы для API

- `NeiraAuthRequest` - Запрос авторизации
- `NeiraAuthResponse` - Ответ авторизации
- `NeiraTokenPayload` - Полезная нагрузка токена

### Утилитарные типы

- `NeiraId` - Идентификатор в системе
- `NeiraTimestamp` - Временная метка
- `NeiraStatus` - Статус операции

## Разработка

### Требования

- Node.js 16+
- TypeScript 5.0+

### Установка зависимостей

```bash
npm install
```

### Сборка

```bash
npm run build
```

### Разработка с автоматической пересборкой

```bash
npm run dev
```

### Очистка

```bash
npm run clean
```

## Публикация

Пакет автоматически публикуется в NPM с использованием `semantic-release` при слиянии изменений в ветки `main` или `master` через процесс CI/CD. Это обеспечивает автоматическое управление версиями, создание тегов и генерацию `CHANGELOG.md` на основе коммитов, соответствующих правилам Conventional Commits.

Больше нет необходимости в ручных шагах публикации или выполнении скриптов.

## Версионирование

Проект использует [Semantic Versioning](https://semver.org/):

- **PATCH** (1.0.1) - исправления багов
- **MINOR** (1.1.0) - новые возможности (обратно совместимые)
- **MAJOR** (2.0.0) - breaking changes

## Структура проекта

```
neira-shared-types/
├── src/
│   └── index.ts          # Основные типы
├── dist/                 # Скомпилированные файлы
├── scripts/
│   └── release.sh        # Скрипт для создания релизов
├── .github/
│   └── workflows/
│       └── publish.yml   # GitHub Actions для публикации
├── package.json
├── tsconfig.json
└── README.md
```

## Лицензия

MIT

## Связь

- GitHub: [neira-shared-types](https://github.com/KonstantinRogozhkin/neira-shared-types)
- NPM: [neira-shared-types](https://www.npmjs.com/package/neira-shared-types)

---

Создано для экосистемы NEIRA 