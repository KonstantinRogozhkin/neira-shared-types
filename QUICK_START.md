# Быстрый старт: neira-shared-types

## Что настроено

✅ **Отдельный репозиторий**: https://github.com/KonstantinRogozhkin/neira-shared-types  
✅ **GitHub Actions** для автоматической публикации в NPM  
✅ **Скрипт для создания релизов**  
✅ **Обновленный README**  

## Как создать релиз

### 1. Настроить NPM токен (один раз)

1. Перейдите в настройки репозитория на GitHub
2. Откройте "Settings" → "Secrets and variables" → "Actions"
3. Создайте секрет `NPM_TOKEN` с вашим NPM токеном

### 2. Создать релиз

```bash
# Создать patch релиз (1.1.3 → 1.1.4)
./scripts/release.sh patch

# Создать minor релиз (1.1.3 → 1.2.0)
./scripts/release.sh minor

# Создать major релиз (1.1.3 → 2.0.0)
./scripts/release.sh major
```

### 3. Создать релиз на GitHub

После выполнения скрипта:

1. Перейдите по ссылке, которую выдаст скрипт
2. Добавьте описание изменений
3. Нажмите "Publish release"
4. Пакет автоматически опубликуется в NPM

## Проверка

- **GitHub Actions**: https://github.com/KonstantinRogozhkin/neira-shared-types/actions
- **NPM пакет**: https://www.npmjs.com/package/neira-shared-types

## Использование

```bash
# Установка
npm install neira-shared-types
```

```typescript
import { NeiraApiResponse, NeiraUser } from 'neira-shared-types';
```

---

🚀 **Готово к использованию!** 