/**
 * TypeScript интерфейсы для OpenRouter API v1/models
 * Основано на официальной документации: https://openrouter.ai/docs/models
 */

export interface OpenRouterArchitecture {
  /** Поддерживаемые типы входных данных: ["file", "image", "text"] */
  input_modalities: string[]
  /** Поддерживаемые типы выходных данных: ["text"] */
  output_modalities: string[]
  /** Метод токенизации */
  tokenizer: string
  /** Тип инструкций (null если не применимо) */
  instruct_type: string | null
}

export interface OpenRouterPricing {
  /** Стоимость за input token в USD */
  prompt: string
  /** Стоимость за output token в USD */
  completion: string
  /** Фиксированная стоимость за API запрос в USD */
  request: string
  /** Стоимость за изображение в USD */
  image: string
  /** Стоимость за операцию веб-поиска в USD */
  web_search?: string
  /** Стоимость за внутренние reasoning токены в USD */
  internal_reasoning?: string
  /** Стоимость за чтение кэшированного input токена в USD */
  input_cache_read?: string
  /** Стоимость за запись кэшированного input токена в USD */
  input_cache_write?: string
}

export interface OpenRouterTopProvider {
  /** Лимит контекста для данного провайдера */
  context_length: number
  /** Максимальное количество токенов в ответе */
  max_completion_tokens: number
  /** Применяется ли модерация контента */
  is_moderated: boolean
}

export interface OpenRouterRateLimit {
  /** Информация о лимитах (null если нет лимитов) */
  // Структура зависит от API, нужно уточнить
  [key: string]: any
}

export interface OpenRouterModel {
  /** Уникальный идентификатор модели для API запросов */
  id: string
  /** Постоянный slug модели, который никогда не меняется */
  canonical_slug: string
  /** ID модели в Hugging Face (может быть пустым) */
  hugging_face_id?: string
  /** Читаемое имя модели для отображения */
  name: string
  /** Unix timestamp добавления модели в OpenRouter */
  created: number
  /** Подробное описание возможностей модели */
  description: string
  /** Максимальный размер контекстного окна в токенах */
  context_length: number
  /** Объект с техническими возможностями модели */
  architecture: OpenRouterArchitecture
  /** Структура цен для использования модели (наименьшая цена) */
  pricing: OpenRouterPricing
  /** Конфигурация основного провайдера */
  top_provider: OpenRouterTopProvider
  /** Информация о лимитах запросов */
  per_request_limits: OpenRouterRateLimit | null
  /** Массив поддерживаемых API параметров */
  supported_parameters: string[]

  // === НОВЫЕ ПОЛЯ ИЗ ОБНОВЛЕННОГО JSON ===
  /** Является ли модель бесплатной (предвычислено) */
  isFree?: boolean
  /** Провайдер модели (предвычислено) */
  provider?: string
  /** Примерная стоимость за 1K токенов в USD (предвычислено) */
  costPer1KTokens?: number
  /** Поддерживает ли модель vision (предвычислено) */
  supportsVision?: boolean
  /** Поддерживает ли модель tools (предвычислено) */
  supportsTools?: boolean
  /** Категория модели (предвычислено) */
  category?: 'free' | 'budget' | 'balanced' | 'premium' | 'vision' | 'coding'
}

export interface OpenRouterModelsResponse {
  /** Массив объектов моделей */
  data: OpenRouterModel[]
}

/**
 * Поддерживаемые параметры OpenAI-совместимого API
 */
export type OpenRouterSupportedParameter =
  | 'tools' // Function calling capabilities
  | 'tool_choice' // Tool selection control
  | 'max_tokens' // Response length limiting
  | 'temperature' // Randomness control
  | 'top_p' // Nucleus sampling
  | 'reasoning' // Internal reasoning mode
  | 'include_reasoning' // Include reasoning in response
  | 'structured_outputs' // JSON schema enforcement
  | 'response_format' // Output format specification
  | 'stop' // Custom stop sequences
  | 'frequency_penalty' // Repetition reduction
  | 'presence_penalty' // Topic diversity
  | 'seed' // Deterministic outputs

/**
 * Расширенная модель с вычисленными полями для NEIRA
 */
export interface EnhancedOpenRouterModel extends OpenRouterModel {
  /** Является ли модель бесплатной (имеет суффикс :free) */
  isFree: boolean
  /** Провайдер модели (извлеченный из id) */
  provider: string
  /** Примерная стоимость за 1K токенов (input + output) в USD */
  costPer1KTokens: number
  /** Поддерживает ли модель vision (изображения) */
  supportsVision: boolean
  /** Поддерживает ли модель tools (function calling) */
  supportsTools: boolean
  /** Категория модели для группировки в UI */
  category: 'free' | 'budget' | 'balanced' | 'premium' | 'vision' | 'coding'
}

/**
 * Кэшированные данные моделей OpenRouter
 */
export interface OpenRouterModelCache {
  /** Время последнего обновления в ISO формате */
  lastUpdated: string
  /** Время истечения кэша (TTL) в ISO формате */
  expiresAt: string
  /** Количество моделей в кэше */
  totalModels: number
  /** Массив моделей с расширенной информацией */
  models: EnhancedOpenRouterModel[]
  /** Статистика по категориям */
  stats: {
    free: number
    premium: number
    supportsVision: number
    supportsTools: number
  }
}

/**
 * Фильтры для поиска моделей
 */
export interface ModelSearchFilters {
  /** Фильтр по провайдеру */
  provider?: string
  /** Только бесплатные модели */
  freeOnly?: boolean
  /** Максимальная стоимость за 1K токенов */
  maxCostPer1K?: number
  /** Минимальный размер контекста */
  minContextLength?: number
  /** Поддержка vision */
  supportsVision?: boolean
  /** Поддержка tools */
  supportsTools?: boolean
  /** Категории моделей */
  categories?: string[]
  /** Поиск по имени/описанию */
  search?: string
}

/**
 * Результат поиска моделей
 */
export interface ModelSearchResult {
  /** Найденные модели */
  models: EnhancedOpenRouterModel[]
  /** Общее количество найденных моделей */
  total: number
  /** Примененные фильтры */
  filters: ModelSearchFilters
  /** Время выполнения поиска в мс */
  searchTime: number
}
