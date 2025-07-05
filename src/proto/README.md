# Proto - Единый источник правды для определений Protocol Buffers

> **Важно:** Эта директория является единым источником правды (SSOT) для всех Protocol Buffers определений в NEIRA Super App.

## 📋 Назначение

Proto — это центральная директория с Protocol Buffers схемами для NEIRA Super App. Содержит определения для:

- gRPC-сервисов агентов (`agent.proto`)
- Chrome Extensions API и формата CRX3 (`chrome-extensions.proto`)
- Других межсервисных контрактов

Обеспечивает типобезопасную коммуникацию между компонентами системы и внешними сервисами.

## 🔧 Правила работы с Proto файлами

1. **Единый источник правды**: Все определения должны находиться только в этой директории
2. **Никаких дублирований**: Запрещено создавать копии proto-файлов в других директориях
3. **Генерация кода**: После изменения proto-файлов обязательно запускайте соответствующие скрипты генерации:

```bash
# Для всех proto-файлов
yarn proto:gen

# Для отдельных файлов
yarn proto:gen:node        # Генерация для Node.js
yarn proto:gen:python      # Генерация для Python API
yarn proto:gen:chrome-extensions  # Генерация для Chrome Extensions
```

4. **Обратная совместимость**: При изменении существующих сообщений соблюдайте правила обратной совместимости Protocol Buffers

## 📚 Документация

- **[📖 Интеграция с Chrome Extensions](/docs/04-reference/02-chrome-extensions.md)**
- **[📖 Организация кода](/docs/03-core-concepts/03-code-organization.md)**
- **[📖 Миграция Proto к SSOT](/docs/fixes/proto-ssot-consolidation.md)**

## 📂 Структура файлов

- **agent.proto** - Определения для Python-агента и gRPC-сервисов
- **chrome-extensions.proto** - Определения для работы с Chrome Extensions и форматом CRX3

---

_© NEIRA Super App Team, 2025_
