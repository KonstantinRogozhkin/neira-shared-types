# Миграция на Semantic Release

## Что изменилось

✅ **Устранен конфликт процесса релиза**  
✅ **Единый стандарт** - только semantic-release  
✅ **Автоматизация** - никаких ручных действий  
✅ **Conventional Commits** - стандартизированные коммиты  

## Старый процесс (удален)

❌ **Ручной скрипт** `./scripts/release.sh`  
❌ **Ручное создание релизов** в GitHub UI  
❌ **Конфликтующая документация**  

## Новый процесс (активный)

✅ **Автоматический релиз** через semantic-release  
✅ **Conventional Commits** для управления версиями  
✅ **Единая документация** во всех файлах  

## Что нужно знать разработчикам

### Формат коммитов изменился

**Было:**
```bash
git commit -m "bump version to 1.1.4"
git commit -m "add new types"
git commit -m "fix bug in types"
```

**Стало:**
```bash
git commit -m "feat: добавлены новые типы"
git commit -m "fix: исправлена ошибка в типизации"
git commit -m "docs: обновлена документация"
```

### Процесс релиза изменился

**Было:**
1. Запустить `./scripts/release.sh patch`
2. Создать релиз в GitHub UI
3. Дождаться публикации

**Стало:**
1. Сделать коммит по стандарту Conventional Commits
2. Запушить в `main`
3. Все остальное происходит автоматически

## Правила версионирования

| Коммит | Версия | Пример |
|--------|--------|---------|
| `feat:` | minor | 1.1.3 → 1.2.0 |
| `fix:` | patch | 1.1.3 → 1.1.4 |
| `feat!:` | major | 1.1.3 → 2.0.0 |
| `docs:` | нет релиза | - |

## Преимущества

✅ **Нет ручных ошибок** - автоматическое управление версиями  
✅ **Стандартизация** - единый процесс для всех  
✅ **Прозрачность** - все действия видны в GitHub Actions  
✅ **Автоматический changelog** - генерируется из коммитов  
✅ **Мгновенная публикация** - сразу после мержа  

## Файлы, которые изменились

### Добавлены
- `.releaserc.json` - конфигурация semantic-release
- `CHANGELOG.md` - автогенерируемый changelog
- `MIGRATION-SEMANTIC-RELEASE.md` - этот файл

### Обновлены
- `package.json` - добавлены зависимости
- `QUICK_START.md` - обновлен процесс релиза
- `GITHUB_ACTIONS.md` - обновлена документация
- `CONTRIBUTING.md` - обновлены правила контрибуции

### Удалены
- `scripts/release.sh` - ручной скрипт релиза

## Проверка настроек

1. **Секреты GitHub Actions:**
   - `NPM_TOKEN` - токен для публикации в NPM
   - `GITHUB_TOKEN` - автоматически предоставляется

2. **Зависимости:**
   - `semantic-release` - основной пакет
   - `@semantic-release/changelog` - генерация changelog
   - `@semantic-release/git` - коммиты в git
   - `@semantic-release/npm` - публикация в NPM

3. **Конфигурация:**
   - `.releaserc.json` - правила релиза
   - `.github/workflows/publish.yml` - GitHub Actions

## Мониторинг

- **Релизы**: https://github.com/KonstantinRogozhkin/neira-shared-types/releases
- **NPM**: https://www.npmjs.com/package/neira-shared-types
- **Actions**: https://github.com/KonstantinRogozhkin/neira-shared-types/actions

---

**Результат:** Конфликт процесса релиза устранен. Теперь есть единый, автоматизированный процесс через semantic-release. 