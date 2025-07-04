# Локальная разработка с neira-shared-types

## Публикация новой версии

1. Обновите версию в `package.json`
2. Соберите пакет:
   ```bash
   npm run build
   ```
3. Опубликуйте в npm:
   ```bash
   npm publish
   ```

## Локальная разработка (yarn link)

Если вам нужно протестировать изменения в типах локально, не публикуя их:

### 1. Создайте глобальную ссылку

В папке `neira-shared-types`:
```bash
cd neira-shared-types
yarn link
```

### 2. Подключите ссылку в проекте-потребителе

В папке проекта (например, `neira-cloud-backend`):
```bash
cd neira-cloud-backend
yarn link "neira-shared-types"
```

### 3. Запустите watch-режим для типов

В папке `neira-shared-types`:
```bash
npm run dev
```

Теперь все изменения в типах будут автоматически подхватываться проектом-потребителем.

### 4. Отключение локальной ссылки

Когда закончите разработку:
```bash
cd neira-cloud-backend
yarn unlink "neira-shared-types"
yarn install --force
```

## Проблемы с yarn workspaces

Если у вас проблемы с yarn workspaces (как в `neira-mobile-core`), временно используйте локальные file: ссылки в `package.json`:

```json
{
  "dependencies": {
    "neira-shared-types": "file:../../../../neira-shared-types"
  }
}
```

Не забудьте вернуть обратно к версионированной зависимости перед коммитом! 