/**
 * Единый источник правды для разрешенных IPC-каналов
 * Используется для генерации allowed-channels.json в main и preload
 */

/**
 * Список всех разрешенных IPC-каналов
 * ВАЖНО: При добавлении нового канала, добавьте его также в интерфейс IPCChannels в index.ts
 */
export const ALLOWED_IPC_CHANNELS = [
  // === НАВИГАЦИЯ ===
  'navigation:navigate',
  'navigation:back',
  'navigation:forward',
  'navigation:reload',

  // === ВКЛАДКИ ===
  'create-tab',
  'activate-tab',
  'close-tab',
  'get-tabs',
  'get-active-tab',
  'get-initial-tab-state',

  // === ЧАТ И AI ===
  'chat:send-message',
  'chats:get-list',
  'chats:get-by-id',
  'chats:delete',
  'chats:save',

  // === POLYLITH BACKEND CHATS ===
  'polylith:chats:get-all',
  'polylith:chats:get-by-id',
  'polylith:chats:save',
  'polylith:chats:delete',

  // === МОДЕЛИ AI ===
  'models:get-available',
  'models:get-tariffs',

  // === ГОЛОСОВОЙ ИНТЕРФЕЙС ===
  'voice-start-listening',
  'voice-stop-listening',
  'voice-toggle-listening',
  'voice-get-status',
  'voice-update-settings',
  'voice-toggle-mode',
  'voice-hide-window',
  'voice-control',

  // === STT (Speech-to-Text) ===
  'stt:recognize',
  'stt:disconnect',

  // === ОКНО ЗАПИСИ ===
  'recording-window-show',
  'recording-window-hide',
  'recording-window-update',

  // === УПРАВЛЕНИЕ ОКНОМ ===
  'minimize-window',
  'maximize-window',
  'close-window',
  'get-window-state',
  'theme:update',

  // === WORKERS ===
  'browser-worker-command',
  'desktop-worker-command',
  'agent-command',
  'audio-worker-command',
  'get-workers-status',

  // === СЕРВЕР ===
  'server:get-status',
  'server:restart',

  // === СИСТЕМА ===
  'system:get-app-info',
  'system:get-system-info',
  'hotkeys:get-config',

  // === РАСШИРЕНИЯ ===
  'extensions:get-list',
  'extensions:install',
  'extensions:remove',
  'extensions:toggle',
  'extensions:get-stats',
  'extensions-webstore-install',
  'extensions-webstore-update-all',
  'extensions-webstore-status',

  // === УТИЛИТЫ ===
  'generate-title',
  'get-user-id',
  'user:set-id',
  'log-message',

  // === MCP (Model Context Protocol) ===
  'mcp:get-servers',
  'mcp:add-server',
  'mcp:remove-server',
  'mcp:create-eventsource',
  'mcp:close-eventsource',
  'mcp:send-message',
  'mcp:call-tool',
  'mcp:execute-tool',
  'mcp:connect-server',
  'mcp:disconnect-server',
  'mcp:update-server',
  'mcp:toggle-tool',
  'mcp:get-tools',
  'mcp:prepare-tools',

  // === API ENDPOINTS (прямые, без обертки) ===
  'api-chats',
  'api-models',
  'api-chat',
  'api-debug',

  // === СИСТЕМНЫЕ ===
  'ui-ready',
  'system:log',

  // === MCP Менеджер утилитарные ===
  'mcp:auto-connect',
  'mcp:get-system-state',
  'mcp:get-auto-connect-servers',

  // === ФАЙЛОВАЯ СИСТЕМА ===
  'fs-read-file',
  'fs-write-file',
  'fs-stat',
  'fs-readdir',

  // === НАСТРОЙКИ ===
  'settings:get-hotkeys',
  'settings:set-hotkeys',
  'settings:register-hotkeys',
  'system:get-registered-ipc-channels',

  // === ГОРЯЧИЕ КЛАВИШИ ДЛЯ УПРАВЛЕНИЯ ВКЛАДКАМИ ===
  'request-new-tab',
  'request-close-tab',
  'request-select-next-tab',
  'request-select-previous-tab',

  // === AGENT EXECUTION PLANS ===
  'agent:create-plan',
  'agent:execute-plan',
  'agent:cancel-plan',
  'agent:get-plan-status',

  // === ДЕСKTOP WORKER V0.1 ===
  'desktop:click',
  'desktop:type',

  // === BROWSER WORKER V0.1 ===
  'browser:navigate',
  'browser:click',
  'browser:get-html',

  // === НАСТРОЙКИ API-КЛЮЧЕЙ ===
  'settings:api-keys:get',
  'settings:api-keys:set',

  // === ПРОКСИ ===
  'proxy:get-status',
  'proxy:set-keys',
  'proxy:refresh-status',

  // === СОБЫТИЯ (для send/on) ===
  'tab-created',
  'tab-closed',
  'tab-activated',
  'tab-updated',
  'tab-navigated',
  'chat-created',
  'chat:stream-chunk',
  'voice-status-changed',
  'voice-transcription',
  'mcp:state-update',
  'mcp-auto-connect-trigger',
  'mcp:open-add-server-ui',
  'app-will-quit',
  'window-will-close',
  'theme-changed',
  'theme-sync',
  'app-focus-requested',
  'core-services-ready',
  'main-process-fully-ready',
  'agent:step-started',
  'agent:step-completed',
  'agent:step-reasoning',
  'agent:plan-created',
  'agent:plan-updated',
  'agent:plan-step-started',
  'agent:plan-step-completed',
  'agent:plan-completed',
]

/**
 * Проверяет, является ли канал разрешенным
 * @param channel Имя канала для проверки
 * @returns true, если канал разрешен, иначе false
 */
export function isAllowedChannel(channel: string): boolean {
  return ALLOWED_IPC_CHANNELS.includes(channel)
}
