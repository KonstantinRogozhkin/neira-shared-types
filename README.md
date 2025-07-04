# neira-shared-types

**Единый источник правды для TypeScript типов в экосистеме NEIRA**

[![npm version](https://badge.fury.io/js/neira-shared-types.svg)](https://badge.fury.io/js/neira-shared-types)
[![npm downloads](https://img.shields.io/npm/dm/neira-shared-types.svg)](https://www.npmjs.com/package/neira-shared-types)

## 🎯 Назначение

Этот пакет содержит все общие TypeScript типы, используемые для взаимодействия между клиентами (desktop, mobile, web) и бэкендом `neira-cloud-backend`. Он решает проблему дублирования типов и обеспечивает консистентность API контрактов во всей экосистеме.

## 📦 Установка

```bash
npm install neira-shared-types
# или
yarn add neira-shared-types
```

## 🚀 Использование

### В бэкенде (`neira-cloud-backend`)

```typescript
import { 
  ApiResponse, 
  User, 
  Chat, 
  SaleChannel, 
  SaleDialog 
} from 'neira-shared-types';

// Используем типы в API роутах
app.get('/api/users/:id', async (req, res): Promise<ApiResponse<User>> => {
  const user = await getUserById(req.params.id);
  return { success: true, data: user };
});
```

### В клиентах (`neira-cloud-connector`, `api-client`)

```typescript
import { 
  ApiResponse, 
  User, 
  ChatRequest, 
  ChatResponse,
  SaleChannel 
} from 'neira-shared-types';

class ApiClient {
  async getUser(id: string): Promise<User> {
    const response: ApiResponse<User> = await this.http.get(`/users/${id}`);
    return response.data;
  }
  
  async sendMessage(chatId: string, request: ChatRequest): Promise<ChatResponse> {
    return await this.http.post(`/chat/${chatId}/messages`, request);
  }
}
```

## 📋 Включенные типы

### Базовые типы
- `ApiResponse<T>` - Стандартный ответ API
- `PaginatedResponse<T>` - Пагинированный ответ
- `ApiMethod`, `ApiEndpoint`, `UUID` - Утилитарные типы

### Аутентификация
- `AuthTokens` - Токены доступа
- `LoginRequest`, `RegisterRequest` - Запросы аутентификации
- `AuthResponse` - Ответ на аутентификацию

### Пользователи
- `User` - Пользователь системы
- `AppSettings` - Настройки приложения

### Чат и AI
- `Chat`, `ChatMessage` - Чаты и сообщения
- `ChatRequest`, `ChatResponse` - Запросы/ответы чата
- `LLMModel` - Модели языковых моделей

### Уведомления
- `PushNotification` - Push уведомления

### Neira.Sale (Продажи)
- `SaleChannel` - Каналы продаж
- `SaleDialog` - Диалоги продаж
- `SaleStats` - Статистика продаж
- `SendSaleMessageRequest`, `SendSaleMessageResponse` - Отправка сообщений

## 🔄 Миграция с локальных зависимостей

### ✅ Было (локальные file: ссылки):

```json
{
  "dependencies": {
    "@neira/shared-types": "file:../neira-shared-types"
  }
}
```

### ✅ Стало (npm пакет):

```json
{
  "dependencies": {
    "neira-shared-types": "^1.1.1"
  }
}
```

```typescript
import { SaleChannel, User } from 'neira-shared-types';

// Используем импортированные типы
```

## 🛠️ Разработка

### Публикация новой версии

```bash
# 1. Обновить версию в package.json
# 2. Собрать пакет
npm run build

# 3. Опубликовать
npm publish
```

### Локальная разработка

Для тестирования изменений без публикации используйте `yarn link`:

```bash
# В папке neira-shared-types
cd neira-shared-types
yarn link
npm run dev  # запустить watch-режим

# В папке проекта-потребителя
cd neira-cloud-backend
yarn link "neira-shared-types"

# Отключить после разработки
yarn unlink "neira-shared-types"
yarn install --force
```

Подробнее см. [DEVELOPMENT.md](./DEVELOPMENT.md).

## 📊 Статус миграции

| Проект | Статус | Версия | Сборка |
|--------|--------|--------|--------|
| `neira-cloud-backend` | ✅ Мигрирован | `^1.1.1` | ✅ Работает |
| `neira-enterprise/neira-cloud-connector` | ✅ Мигрирован | `^1.1.1` | ✅ Работает |
| `neira-mobile-core` | ✅ Мигрирован | `^1.1.2` | ✅ Работает |

**Все `file:` ссылки успешно заменены на npm-зависимости!**  
**Все проекты собираются успешно!** 🎉

## 🔗 Полезные ссылки

- [npm пакет](https://www.npmjs.com/package/neira-shared-types)
- [Инструкция по разработке](./DEVELOPMENT.md)
- [Отчет о миграции](./MIGRATION-REPORT.md)
- [Changelog](https://github.com/YourOrg/neira-super-app-2/releases)

## 📝 Вклад в разработку

При добавлении новых типов:

1. **Документируйте** каждый интерфейс с помощью JSDoc
2. **Группируйте** типы по функциональности (Auth, Chat, Sale, etc.)
3. **Используйте** консистентные соглашения по именованию
4. **Тестируйте** изменения в зависимых пакетах
5. **Обновляйте** версию согласно SemVer

## 🔄 Версионирование

Пакет следует семантическому версионированию:
- **MAJOR** - Кардинальные изменения в API (breaking changes)
- **MINOR** - Добавление новых типов (обратно совместимые)
- **PATCH** - Исправления и улучшения документации

## 📄 Лицензия

MIT License - подробности в файле [LICENSE](./LICENSE). 