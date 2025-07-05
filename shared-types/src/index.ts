/**
 * Унифицированные типы для IPC архитектуры NEIRA Super App
 * Обеспечивают type-safety между main и renderer процессами
 */

import path from 'node:path'

// Экспортируем список разрешенных IPC-каналов
export * from './ipc-channels'

// Экспортируем типы для внешних библиотек
export * from './vendor-types'

/// <reference types="node" />

type BufferEncoding =
  | 'ascii'
  | 'utf8'
  | 'utf-8'
  | 'utf16le'
  | 'ucs2'
  | 'ucs-2'
  | 'base64'
  | 'base64url'
  | 'latin1'
  | 'binary'
  | 'hex'

// ========== БАЗОВЫЕ IPC ТИПЫ ==========

/**
 * Стандартизированный формат ответа для ВСЕХ IPC каналов
 */
export interface IPCResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  stack?: string
}

/**
 * Стандартизированный формат запроса для API каналов
 */
export interface APIRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: any
  endpoint: string
  headers?: Record<string, string>
}

// ========== ЛОГИРОВАНИЕ ==========

/**
 * Уровни логирования
 */
export type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'verbose'

/**
 * Компоненты для логирования
 */
export type LogComponent =
  | 'shell:main'
  | 'shell:tabs'
  | 'shell:menu'
  | 'shell:shortcuts'
  | 'shell:extensions'
  | 'shell:webui'
  | 'shell:build'
  | 'shell:server'
  | 'shell:manager'
  | 'shell:ipc'
  | 'shell:audio'
  | 'shell:api'
  | 'windowmanager'
  | 'tabmanager'
  | 'servermanager'
  | 'processmanager'
  | 'ipcmanager'
  | 'audiomanager'
  | 'apimanager'
  // Neira-app components
  | 'app:ui'
  | 'app:hooks'
  | 'app:api'
  | 'app:auth'
  | 'app:chat'
  | 'app:mcp'
  | 'app:tabs'
  | 'app:db'
  | 'app:stt'
  | 'app:voice'
  // Generic
  | 'common'
  | 'test'

/**
 * Формат сообщения лога для IPC канала system:log
 */
export interface SystemLogMessage {
  component: LogComponent
  level: LogLevel
  message: string
  timestamp: number
  data?: unknown[]
}

// ========== НАВИГАЦИЯ ==========

export interface NavigationOptions {
  url: string
  tabId?: string
  newTab?: boolean
  title?: string
}

// ========== ВКЛАДКИ ==========

export interface TabData {
  id: string
  url: string
  title: string
  active: boolean
  favicon?: string
  path: string // для совместимости со старым API
}

export interface TabCreateOptions {
  url: string
  title?: string
  active?: boolean
  favicon?: string
}

export interface TabState {
  tabs: TabData[]
  activeTabId: string | null
}

// ========== ЧАТ И AI ==========

export interface ChatMessage {
  id?: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: string
}

export interface Chat {
  id: string
  title: string
  messages?: ChatMessage[]
  createdAt: string
  updatedAt: string
  userId: string
}

export interface ChatSendMessageRequest {
  chatId?: string
  message: string
  model?: string
  userId: string
}

// ========== ГОЛОСОВОЙ ИНТЕРФЕЙС ==========

export interface VoiceSettings {
  enabled: boolean
  hotwordDetection: boolean
  hotwordPhrase: string
  microphoneDevice?: string
  sensitivity: number
}

export interface VoiceStatus {
  // Основное состояние
  isListening: boolean
  hasPermission: boolean
  hotwordDetected: boolean
  isRecording: boolean
  error?: string

  /**
   * Устаревшие поля, оставлены для обратной совместимости
   * Будут удалены после полного перехода на новую модель
   */
  listening?: boolean // @deprecated Используйте isListening
  realtimeMode?: boolean // @deprecated Используйте voiceMode === 'realtime'
  microphoneEnabled?: boolean // @deprecated Используйте hasPermission
  currentMode?: string // @deprecated Используйте voiceMode
  state?: string // @deprecated Используйте voiceMode

  // Дополнительные поля, ожидаемые UI
  voiceMode: string
  settings?: {
    enabled: boolean
    hotword: string
    sensitivity: number
    language: string
    autoSend: boolean
    shortcuts: {
      toggleHotwordListening: string
      startManualRecording: string
      stopRecording: string
      quickActivation: string
      focusApp: string
    }
  }
}

// ========== WORKERS ==========

export interface WorkerCommand {
  command: string
  params?: Record<string, any>
}

// === НОВЫЕ ТИПЫ ДЛЯ DESKTOP КОМАНД ===
export interface DesktopClickParams {
  x: number
  y: number
}

export interface DesktopTypeParams {
  text: string
}

// === НОВЫЕ ТИПЫ ДЛЯ BROWSER КОМАНД ===
export interface BrowserNavigateParams {
  url: string
}

export interface BrowserClickParams {
  selector: string
}

export interface BrowserGetHTMLParams {} // пустой объект для единообразия

// === РЕЗУЛЬТАТЫ ВЫПОЛНЕНИЯ КОМАНД ===
export interface DesktopClickResult {
  clicked: true
  position: { x: number; y: number }
}

export interface DesktopTypeResult {
  typed: true
  text: string
}

export interface BrowserNavigateResult {
  navigated: true
  url: string
  title?: string
}

export interface BrowserClickResult {
  clicked: true
  selector: string
  element?: any
}

export interface BrowserGetHTMLResult {
  html: string
  url: string
  title: string
}

// === ОБНОВЛЕННЫЙ ИНТЕРФЕЙС WORKER КОМАНД ===
export interface DesktopWorkerCommand {
  command: 'click' | 'type'
  params: DesktopClickParams | DesktopTypeParams
}

export interface BrowserWorkerCommand {
  command: 'navigate' | 'click' | 'getHTML'
  params: BrowserNavigateParams | BrowserClickParams | BrowserGetHTMLParams
}

export interface WorkerStatus {
  name: string
  status: 'running' | 'stopped' | 'error'
  pid?: number
  lastActivity?: string
}

// ========== РАСШИРЕНИЯ ==========

export interface Extension {
  id: string
  name: string
  version: string
  enabled: boolean
  manifest: any
  path: string
}

// ========== MCP (Model Context Protocol) ==========

export interface MCPServer {
  id: string
  name: string
  command: string
  args: string[]
  env?: Array<{ key: string; value: string }>
  type: 'sse' | 'stdio'
  url?: string // для SSE серверов
  status: 'stopped' | 'starting' | 'running' | 'error'
  sandboxId?: string // для stdio серверов в sandbox
}

// MCPSandboxRequest и MCPSandboxResponse удалены - заменены на MCPManager SSOT архитектуру

/**
 * 🔧 Утилита для корректного форматирования URL MCP серверов
 * Устраняет дублирование логики между mcpClient.ts и APIManager.ts
 */
export const formatServerUrl = (server: { url: string; type: 'sse' | 'stdio' }): string => {
  if (!server.url) {
    throw new Error('Server URL is required')
  }

  // HTTP/HTTPS серверы используются как есть
  if (server.url.startsWith('http://') || server.url.startsWith('https://')) {
    return server.url
  }

  // URLs с полным протоколом (file://, custom protocols)
  if (server.url.includes('://')) {
    return server.url
  }

  // Локальные пути - добавляем file:// protocol для stdio серверов
  if (server.type === 'stdio') {
    return `file://${path.resolve(server.url)}`
  }

  // Для SSE серверов без протокола предполагаем HTTP
  return server.url.startsWith('localhost') || server.url.match(/^\d+\.\d+\.\d+\.\d+/)
    ? `http://${server.url}`
    : server.url
}

// ========== ГЛАВНЫЙ IPC КОНТРАКТ ==========

/**
 * Типизированный контракт для всех IPC каналов
 * Ключ = название канала, Значение = функция с типизированными параметрами и возвратом
 */
export interface IPCChannels {
  // === НАВИГАЦИЯ ===
  'navigation:navigate': (options: NavigationOptions) => Promise<IPCResponse<void>>
  'navigation:back': () => Promise<IPCResponse<void>>
  'navigation:forward': () => Promise<IPCResponse<void>>
  'navigation:reload': () => Promise<IPCResponse<void>>

  // === ВКЛАДКИ ===
  'create-tab': (options: TabCreateOptions) => Promise<IPCResponse<string>>
  'activate-tab': (options: { tabId: string }) => Promise<IPCResponse<void>>
  'close-tab': (options: { tabId: string }) => Promise<IPCResponse<void>>
  'get-tabs': () => Promise<IPCResponse<TabData[]>>
  'get-active-tab': () => Promise<IPCResponse<TabData | null>>
  'get-initial-tab-state': () => Promise<{ tabs: TabInfo[]; activeTabId: string | null }>

  // === ЧАТ И AI ===
  'chat:send-message': (request: ChatSendMessageRequest) => Promise<string> // Особый формат для AI SDK
  'chats:get-list': (userId: string) => Promise<IPCResponse<Chat[]>>
  'chats:get-by-id': (options: { id: string; userId: string }) => Promise<IPCResponse<Chat | null>>
  'chats:delete': (options: { id: string; userId: string }) => Promise<IPCResponse<void>>
  'chats:save': (chat: Chat) => Promise<IPCResponse<void>>

  // === POLYLITH BACKEND CHATS ===
  'polylith:chats:get-all': (userId: string) => Promise<IPCResponse<any[]>>
  'polylith:chats:get-by-id': (options: {
    chatId: string
    userId: string
  }) => Promise<IPCResponse<any>>
  'polylith:chats:save': (options: {
    id?: string
    userId: string
    messages: any[]
    title?: string
  }) => Promise<IPCResponse<{ id: string }>>
  'polylith:chats:delete': (options: {
    chatId: string
    userId: string
  }) => Promise<IPCResponse<void>>

  // === МОДЕЛИ AI ===
  'models:get-available': () => Promise<IPCResponse<string[]>>
  'models:get-tariffs': () => Promise<IPCResponse<TariffPlan[]>>

  // === ГОЛОСОВОЙ ИНТЕРФЕЙС ===
  'voice-start-listening': () => Promise<IPCResponse<void>>
  'voice-stop-listening': () => Promise<IPCResponse<void>>
  'voice-toggle-listening': () => Promise<IPCResponse<VoiceStatus>>
  'voice-get-status': () => Promise<IPCResponse<VoiceStatus>>
  'voice-update-settings': (settings: Partial<VoiceSettings>) => Promise<IPCResponse<void>>
  'voice-toggle-mode': (mode: string) => Promise<IPCResponse<VoiceStatus>>
  'voice-hide-window': () => Promise<IPCResponse<void>>
  'voice-control': (
    action: string | { command?: string; action?: string; params?: any },
    params?: any,
  ) => Promise<IPCResponse<any>>

  // === STT (Speech-to-Text) ===
  'stt:recognize': (options: {
    audio: ArrayBuffer
    lang?: string
  }) => Promise<IPCResponse<{ text: string; confidence?: number; provider: string }>>
  'stt:disconnect': () => Promise<IPCResponse<void>>

  // === ОКНО ЗАПИСИ ===
  'recording-window-show': (options: { mode: string }) => Promise<IPCResponse<void>>
  'recording-window-hide': () => Promise<IPCResponse<void>>
  'recording-window-update': (options: {
    mode: string
    audioLevel?: number
    isRecording?: boolean
  }) => Promise<IPCResponse<void>>

  // === УПРАВЛЕНИЕ ОКНОМ ===
  'minimize-window': () => Promise<IPCResponse<void>>
  'maximize-window': () => Promise<IPCResponse<void>>
  'close-window': () => Promise<IPCResponse<void>>
  'get-window-state': () => Promise<IPCResponse<any>>
  'theme:update': (theme: 'light' | 'dark' | 'sunset' | 'black') => Promise<IPCResponse<void>>

  // === WORKERS ===
  'browser-worker-command': (command: WorkerCommand) => Promise<IPCResponse<any>>
  'desktop-worker-command': (command: WorkerCommand) => Promise<IPCResponse<any>>
  'agent-command': (command: WorkerCommand) => Promise<IPCResponse<any>>
  'audio-worker-command': (command: WorkerCommand) => Promise<IPCResponse<any>>
  'get-workers-status': () => Promise<IPCResponse<WorkerStatus[]>>

  // === СЕРВЕР ===
  'server:get-status': () => Promise<IPCResponse<any>>
  'server:restart': () => Promise<IPCResponse<void>>

  // === СИСТЕМА ===
  'system:get-app-info': () => Promise<IPCResponse<any>>
  'system:get-system-info': () => Promise<IPCResponse<any>>
  'hotkeys:get-config': () => Promise<IPCResponse<any>>

  // === РАСШИРЕНИЯ ===
  'extensions:get-list': () => Promise<IPCResponse<Extension[]>>
  'extensions:install': (options: { path: string }) => Promise<IPCResponse<void>>
  'extensions:remove': (options: { extensionId: string }) => Promise<IPCResponse<void>>
  'extensions:toggle': (options: {
    extensionId: string
    enabled: boolean
  }) => Promise<IPCResponse<void>>
  'extensions:get-stats': () => Promise<IPCResponse<any>>
  'extensions-webstore-install': (options: {
    extensionId: string
  }) => Promise<IPCResponse<string | null>>
  'extensions-webstore-update-all': () => Promise<IPCResponse<string[]>>
  'extensions-webstore-status': () => Promise<IPCResponse<{ enabled: boolean }>>

  // === УТИЛИТЫ ===
  'generate-title': (options: { messages: ChatMessage[] }) => Promise<IPCResponse<string>>
  'get-user-id': () => Promise<IPCResponse<string>>
  'user:set-id': (userId: string) => Promise<IPCResponse<{ success: boolean; error?: string }>>
  'log-message': (options: {
    level: string
    component: string
    message: string
    args?: any[]
  }) => Promise<IPCResponse<void>>

  // === MCP (Model Context Protocol) ===
  'mcp:get-servers': () => Promise<IPCResponse<MCPServer[]>>
  'mcp:add-server': (server: Omit<MCPServer, 'status' | 'sandboxId'>) => Promise<IPCResponse<void>>
  'mcp:remove-server': (serverId: string) => Promise<IPCResponse<void>>
  'mcp:create-eventsource': (options: { url: string }) => Promise<IPCResponse<void>>
  'mcp:close-eventsource': (options: { url: string }) => Promise<IPCResponse<void>>
  'mcp:send-message': (options: { message: any; serverId: string }) => Promise<IPCResponse<any>>
  'mcp:call-tool': (options: {
    toolName: string
    args?: any
    serverId?: string
  }) => Promise<IPCResponse<any>>
  'mcp:execute-tool': (options: {
    toolName: string
    args?: any
    responseChannel: string
  }) => Promise<IPCResponse<any>>
  'mcp:connect-server': (options: { serverId: string }) => Promise<IPCResponse<void>>
  'mcp:disconnect-server': (options: { serverId: string }) => Promise<IPCResponse<void>>
  'mcp:update-server': (options: {
    serverId: string
    serverConfig: Record<string, unknown>
  }) => Promise<IPCResponse<void>>
  'mcp:toggle-tool': (options: { serverId: string; toolName: string }) => Promise<IPCResponse<void>>
  'mcp:get-tools': () => Promise<IPCResponse<Record<string, unknown>>>
  'mcp:prepare-tools': () => Promise<IPCResponse<Record<string, unknown>>>

  // === API ENDPOINTS (прямые, без обертки) ===
  'api-chats': (request: APIRequest) => Promise<any>
  'api-models': (request: APIRequest) => Promise<any>
  'api-chat': (request: APIRequest) => Promise<any>
  'api-debug': (request: APIRequest) => Promise<any>

  // === СИСТЕМНЫЕ ===
  'ui-ready': () => Promise<IPCResponse<void>>

  // === ЛОГИ ===
  'system:log': (log: {
    level: string
    component: string
    message: string
    data?: any[]
  }) => Promise<IPCResponse<void>>

  // === MCP Менеджер утилитарные ===
  'mcp:auto-connect': () => Promise<IPCResponse<void>>
  'mcp:get-system-state': () => Promise<IPCResponse<any>>
  'mcp:get-auto-connect-servers': () => Promise<IPCResponse<{ servers: any[] }>>

  // === ФАЙЛОВАЯ СИСТЕМА ===
  'fs-read-file': (
    path: string,
    encoding?: BufferEncoding | null,
  ) => Promise<IPCResponse<Uint8Array | string>>
  'fs-write-file': (
    path: string,
    data: Uint8Array | string,
    options?: { encoding?: BufferEncoding | null; flag?: string },
  ) => Promise<IPCResponse<void>>
  'fs-stat': (
    path: string,
  ) => Promise<IPCResponse<{ isDirectory: boolean; mtimeMs: number; size: number }>>
  'fs-readdir': (
    path: string,
  ) => Promise<IPCResponse<Array<{ name: string; isDirectory: boolean }>>>

  // === НАВИГАЦИЯ ===
  'settings:get-hotkeys': () => Promise<any>
  'settings:set-hotkeys': (hotkeys: any) => Promise<any>
  'settings:register-hotkeys': () => Promise<void>
  'system:get-registered-ipc-channels': () => Promise<string[]>

  // Горячие клавиши для управления вкладками
  'request-new-tab': () => Promise<IPCResponse<void>>
  'request-close-tab': () => Promise<IPCResponse<void>>
  'request-select-next-tab': () => Promise<IPCResponse<void>>
  'request-select-previous-tab': () => Promise<IPCResponse<void>>

  // === AGENT EXECUTION PLANS ===
  'agent:create-plan': (options: { userQuery: string }) => Promise<IPCResponse<any>>
  'agent:execute-plan': (options: { planId: string }) => Promise<IPCResponse<void>>
  'agent:cancel-plan': (options: { planId: string }) => Promise<IPCResponse<void>>
  'agent:get-plan-status': (options: { planId: string }) => Promise<IPCResponse<any>>

  // === ДЕСKTOP WORKER V0.1 ===
  'desktop:click': (params: DesktopClickParams) => Promise<IPCResponse<DesktopClickResult>>
  'desktop:type': (params: DesktopTypeParams) => Promise<IPCResponse<DesktopTypeResult>>

  // === BROWSER WORKER V0.1 ===
  'browser:navigate': (params: BrowserNavigateParams) => Promise<IPCResponse<BrowserNavigateResult>>
  'browser:click': (params: BrowserClickParams) => Promise<IPCResponse<BrowserClickResult>>
  'browser:get-html': (params: BrowserGetHTMLParams) => Promise<IPCResponse<BrowserGetHTMLResult>>

  // === НАСТРОЙКИ API-КЛЮЧЕЙ ===
  'settings:api-keys:get': () => Promise<IPCResponse<Record<string, string | undefined>>>
  'settings:api-keys:set': (options: {
    keys: Record<string, string | undefined>
  }) => Promise<IPCResponse<void>>

  // === ПРОКСИ ===
  'proxy:get-status': () => Promise<
    IPCResponse<{
      status: string
      lastUpdate: string
      keys: Array<{ id: string; key: string; status: string; region?: string; lastUsed?: string }>
    }>
  >
  'proxy:set-keys': (options: {
    keys: Array<{ id: string; key: string; region?: string }>
  }) => Promise<IPCResponse<void>>
  'proxy:refresh-status': () => Promise<IPCResponse<void>>

  /**
   * Индекс-подпись для временной поддержки неописанных каналов.
   * Должна быть удалена после полной типизации всех invoke вызовов.
   */
  [key: string]: (...args: any[]) => Promise<any>
}

// ========== EVENTS ==========

/**
 * События, которые main процесс может отправлять renderer'у
 */
export interface IPCEvents {
  // Вкладки
  'tab-created': TabData
  'tab-closed': { tabId: string }
  'tab-activated': { tabId: string }
  'tab-updated': Partial<TabData> & { tabId: string }
  'tab-navigated': { tabId: string; url: string }

  // Чаты
  'chat-created': { chatId: string; title?: string }
  'chat:stream-chunk': {
    chatId: string
    requestId: string
    chunk: ChatStreamChunk
  }

  // Голос
  'voice-status-changed': VoiceStatus
  'voice-transcription': { text: string; isFinal: boolean }

  // MCP
  'mcp:state-update': any
  'mcp-auto-connect-trigger': void
  'mcp:open-add-server-ui': {
    name: string
    command: string
    env?: Record<string, string>
  }

  // Система
  'app-will-quit': void
  'window-will-close': void
  'theme-changed': { theme: string }
  'theme-sync': { theme: string }
  'app-focus-requested': void

  // Системные события готовности
  'core-services-ready': void // Только критические сервисы готовы (UI можно показывать)
  'main-process-fully-ready': void // Все сервисы инициализированы

  // AGENT
  'agent:step-started': { stepIndex: number; tool: string; params: Record<string, any> }
  'agent:step-completed': {
    stepIndex: number
    tool: string
    success: boolean
    result?: any
    error?: string
  }
  'agent:step-reasoning': {
    stepIndex: number
    tool: string
    reasoning: string
    timestamp: number
  }
  'agent:plan-created': { planId: string; plan: any }
  'agent:plan-updated': { planId: string; plan: any }
  'agent:plan-step-started': { planId: string; stepId: string }
  'agent:plan-step-completed': { planId: string; stepId: string; success: boolean }
  'agent:plan-completed': { planId: string; success: boolean }

  /**
   * Индекс-подпись для временной поддержки событие без типизации.
   */
  [key: string]: any
}

// ========== HELPER ТИПЫ ==========

/**
 * Извлекает тип параметров для конкретного IPC канала
 */
export type IPCChannelParams<T extends keyof IPCChannels> = Parameters<IPCChannels[T]>[0]

/**
 * Извлекает тип возврата для конкретного IPC канала
 */
export type IPCChannelReturn<T extends keyof IPCChannels> = ReturnType<IPCChannels[T]>

/**
 * Типизированный API для renderer процесса
 */
export interface NeiraAPI {
  invoke<T extends keyof IPCChannels>(
    channel: T,
    ...args: Parameters<IPCChannels[T]>
  ): ReturnType<IPCChannels[T]>

  on<T extends keyof IPCEvents>(channel: T, callback: (data: IPCEvents[T]) => void): () => void

  /**
   * Обратная совместимость с Node/EventEmitter removeListener.
   */
  removeListener?: (channel: string, callback: (...args: any[]) => void) => void

  /**
   * Индекс-подпись для динамических методов (minimizeWindow, maximizeWindow и т.д.)
   */
  [key: string]: any
}

export interface FileSystemOperations {
  readFile: (path: string, encoding?: BufferEncoding) => Promise<string>
  writeFile: (path: string, content: string, encoding?: BufferEncoding) => Promise<void>
}

export interface ElectronAPI {
  // ... existing code ...
}

export type Theme = 'light' | 'dark' | 'system'

export interface TabInfo {
  id: string
  url: string
  title: string
  active: boolean
  favicon?: string
}

export interface ITab {
  id: string
  url: string
  // ... existing code ...
}

// ========== ТАРИФНЫЕ ПЛАНЫ И МОДЕЛИ ==========

export type ModelCategory = 'Fast & Compact' | 'Balanced' | 'Advanced & Creative' | 'Vision & Image'

/**
 * Описание тарифного плана (Plan) для управления доступом к AI-моделям
 */
export interface TariffPlan {
  /** Уникальный идентификатор плана */
  id: 'free' | 'start' | 'pro' | 'max'
  /** Маркетинговое название плана (используется в UI) */
  name: string
  /** Краткое описание преимуществ плана */
  description: string
  /** Доступные модели, сгруппированные по категориям */
  modelsByCategory: Record<ModelCategory, string[]>
  /** Признак платного премиум-плана */
  isPremium: boolean
}

export * from './mcp-contracts'
export * from './openrouter-types'

// === CHAT STREAMING SUPPORT TYPES ===
export interface ToolCall {
  /** Имя инструмента (function/tool) */
  toolName: string
  /** Аргументы, переданные инструменту */
  args?: Record<string, any>
  /** Результат выполнения инструмента (если уже получен) */
  result?: any
  /** Текущее состояние выполнения */
  state?: 'requested' | 'executing' | 'result' | 'error'
  /** Любые дополнительные расширения */
  [key: string]: any
}

export interface ChatStreamChunkToken {
  type: 'token'
  content: string
}

export interface ChatStreamChunkThought {
  type: 'thought'
  description: string
}

export interface ChatStreamChunkFinal {
  type: 'final'
  content: string
  toolCalls?: ToolCall[]
}

export interface ChatStreamChunkError {
  type: 'error'
  message: string
  code?: string
}

export type ChatStreamChunk =
  | ChatStreamChunkToken
  | ChatStreamChunkThought
  | ChatStreamChunkFinal
  | ChatStreamChunkError

// ========== POLYLITH BACKEND EXPORTS ==========
// Временные заглушки для модулей из neira-cloud-backend
// TODO: Заменить на правильные импорты после настройки workspace

// Типы для TaskExecutionService
export interface RawTask {
  tool: string
  params?: Record<string, any>
}

export interface TaskExecutionResult {
  success: boolean
  result?: any
  error?: string
}

export interface BatchExecutionResult {
  results: TaskExecutionResult[]
  successCount: number
  failureCount: number
}

export interface AgentTask {
  id: string
  tool: string
  params?: Record<string, any>
  dependencies?: string[]
}

export interface AgentTaskResult {
  id: string
  success: boolean
  result?: any
  error?: string
}

// Типы для PlannerService
export interface PlannerStep {
  id: string
  tool: string
  params?: Record<string, any>
  dependencies?: string[]
  estimatedDuration?: number
}

export interface ExecutionPlan {
  id: string
  steps: PlannerStep[]
  totalEstimatedDuration?: number
}

export interface PlannerCapabilities {
  canCreateFiles?: boolean
  canExecuteCommands?: boolean
  canBrowseInternet?: boolean
  canUseTools?: boolean
}

// Типы для Chat
export interface AIMessage {
  role: string
  content: string
  id?: string
}

export interface UIMessage {
  role: string
  content: string
  id?: string
}

export interface DBMessage {
  role: string
  content: string
  id?: string
}

export interface MessagePart {
  type: string
  content: string
}

export interface ChatWithMessages {
  id: string
  title: string
  messages: AIMessage[]
  createdAt: string
  updatedAt: string
  userId: string
}

export interface SaveChatParams {
  id?: string
  userId: string
  messages: AIMessage[]
  title?: string
}

// Заглушки для классов (будут заменены на настоящие импорты)
export class TaskExecutionService {
  constructor(logger: any, processManager?: any) {
    console.warn('TaskExecutionService: Using stub implementation')
  }
  
  async execute(task: RawTask): Promise<TaskExecutionResult> {
    return { success: false, error: 'Stub implementation' }
  }
  
  async executeToolCalls(toolCalls: any[]): Promise<any[]> {
    return []
  }
  
  async executePlan(plan: ExecutionPlan): Promise<BatchExecutionResult> {
    return { results: [], successCount: 0, failureCount: 0 }
  }
  
  setChatId(chatId: string | null): void {
    // Stub
  }
}

export class PlannerService {
  constructor(logger: any, capabilities?: Partial<PlannerCapabilities>) {
    console.warn('PlannerService: Using stub implementation')
  }
  
  async createPlan(goal: string): Promise<ExecutionPlan> {
    return { id: 'stub-plan', steps: [] }
  }
  
  updateCapabilities(capabilities: Partial<PlannerCapabilities>): void {
    // Stub
  }
}

// Заглушка для backendApi
export const backendApi = {
  getChats: async (userId: string) => {
    console.warn('backendApi.getChats: Using stub implementation')
    return []
  },
  getChatById: async (chatId: string, userId: string) => {
    console.warn('backendApi.getChatById: Using stub implementation')
    return null
  },
  saveChat: async (params: SaveChatParams) => {
    console.warn('backendApi.saveChat: Using stub implementation')
    return { id: 'stub-chat-id' }
  },
  deleteChat: async (chatId: string, userId: string) => {
    console.warn('backendApi.deleteChat: Using stub implementation')
  },
  generateTitle: async (messages: AIMessage[]) => {
    console.warn('backendApi.generateTitle: Using stub implementation')
    return 'Generated Title'
  },
  // Добавляем свойство list для совместимости с моделями API
  list: []
}

export type BackendApi = typeof backendApi

// Заглушка для streamChatCompletion
export async function streamChatCompletion(cfg: any): Promise<any> {
  console.warn('streamChatCompletion: Using stub implementation')
  return { stream: null, response: null }
}
