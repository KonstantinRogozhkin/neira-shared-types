/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * MCP IPC Contracts - строгие TypeScript интерфейсы для IPC каналов
 *
 * Часть новой архитектуры SSOT MCPManager
 * Обеспечивает type safety и четкий контракт между main и renderer процессами
 */

/**
 * @fileoverview Контракты для MCP (Model Context Protocol) интеграции
 * Типы, интерфейсы и константы для взаимодействия с MCP серверами
 */

// ================== БАЗОВЫЕ ТИПЫ ==================

export interface MCPServerConfig {
  id: string
  name: string
  url: string
  type: 'sse' | 'stdio'
  description?: string
  headers?: Array<{ key: string; value: string }>
  autoConnect: boolean
  // Настройки stdio (если type === 'stdio')
  command?: string
  args?: string[]
  env?: Array<{ key: string; value: string }>
  // Дополнительные настройки для SSE (зарезервировано)
}

export interface MCPTool {
  name: string
  description: string
  inputSchema: any
  enabled: boolean
}

export interface MCPSystemState {
  servers: MCPServerView[]
  autoConnectExecuted: boolean
  lastAutoConnectTime?: number
}

export interface MCPServerView {
  // Конфигурация (из electron-store)
  id: string
  name: string
  url: string
  type: 'sse' | 'stdio'
  description?: string
  autoConnect: boolean

  // Runtime состояние (только в памяти)
  status: 'disconnected' | 'connecting' | 'connected' | 'error'
  errorMessage?: string
  toolsLoading: boolean
  toolsError?: string
  lastConnected?: number
  connectionAttempts: number
  tools?: MCPTool[]
}

// ================== IPC КАНАЛЫ ==================

export interface MCPIPCChannels {
  // Main → Renderer (события)
  'mcp:state-update': (state: MCPSystemState) => void
  'mcp:server-status-changed': (serverId: string, status: MCPServerStatus) => void
  'mcp:server-added': (serverId: string, config: MCPServerConfig) => void
  'mcp:server-removed': (serverId: string) => void
  'mcp:server-connected': (serverId: string, tools: MCPTool[]) => void
  'mcp:server-disconnected': (serverId: string, reason?: string) => void
  'mcp:auto-connect-completed': (successful: number, total: number) => void

  // Renderer → Main (запросы)
  'mcp:get-system-state': () => Promise<MCPSystemState>
  'mcp:add-server': (config: Omit<MCPServerConfig, 'id'>) => Promise<string>
  'mcp:update-server': (serverId: string, updates: Partial<MCPServerConfig>) => Promise<void>
  'mcp:remove-server': (serverId: string) => Promise<void>
  'mcp:connect-server': (serverId: string) => Promise<boolean>
  'mcp:disconnect-server': (serverId: string) => Promise<void>
  'mcp:execute-tool': (serverId: string, toolName: string, args: any) => Promise<MCPToolResult>
  'mcp:force-auto-connect': () => Promise<void>
}

// ================== ТИПЫ ДАННЫХ ==================

export type MCPServerStatus = 'disconnected' | 'connecting' | 'connected' | 'error'

export interface MCPToolResult {
  success: boolean
  result?: any
  error?: string
  timestamp: number
  executionTime: number
}

export interface MCPServerConnectionResult {
  serverId: string
  success: boolean
  error?: string
  toolsCount?: number
}

export interface MCPAutoConnectResult {
  totalServers: number
  successfulConnections: number
  failedConnections: number
  results: MCPServerConnectionResult[]
  duration: number
}

// ================== IPC СОБЫТИЯ ==================

export interface MCPStateUpdateEvent {
  type: 'mcp:state-update'
  payload: MCPSystemState
  timestamp: number
}

export interface MCPServerStatusChangedEvent {
  type: 'mcp:server-status-changed'
  payload: {
    serverId: string
    status: MCPServerStatus
    previousStatus?: MCPServerStatus
  }
  timestamp: number
}

export interface MCPServerAddedEvent {
  type: 'mcp:server-added'
  payload: {
    serverId: string
    config: MCPServerConfig
  }
  timestamp: number
}

export interface MCPServerRemovedEvent {
  type: 'mcp:server-removed'
  payload: {
    serverId: string
  }
  timestamp: number
}

export interface MCPServerConnectedEvent {
  type: 'mcp:server-connected'
  payload: {
    serverId: string
    tools: MCPTool[]
    connectionTime: number
  }
  timestamp: number
}

export interface MCPServerDisconnectedEvent {
  type: 'mcp:server-disconnected'
  payload: {
    serverId: string
    reason?: string
  }
  timestamp: number
}

export interface MCPAutoConnectCompletedEvent {
  type: 'mcp:auto-connect-completed'
  payload: MCPAutoConnectResult
  timestamp: number
}

// ================== IPC ЗАПРОСЫ/ОТВЕТЫ ==================

export interface MCPGetSystemStateRequest {
  type: 'mcp:get-system-state'
  timestamp: number
}

export interface MCPGetSystemStateResponse {
  success: true
  data: MCPSystemState
  timestamp: number
}

export interface MCPAddServerRequest {
  type: 'mcp:add-server'
  payload: Omit<MCPServerConfig, 'id'>
  timestamp: number
}

export interface MCPAddServerResponse {
  success: true
  data: string // serverId
  timestamp: number
}

export interface MCPUpdateServerRequest {
  type: 'mcp:update-server'
  payload: {
    serverId: string
    updates: Partial<MCPServerConfig>
  }
  timestamp: number
}

export interface MCPUpdateServerResponse {
  success: true
  timestamp: number
}

export interface MCPRemoveServerRequest {
  type: 'mcp:remove-server'
  payload: {
    serverId: string
  }
  timestamp: number
}

export interface MCPRemoveServerResponse {
  success: true
  timestamp: number
}

export interface MCPConnectServerRequest {
  type: 'mcp:connect-server'
  payload: {
    serverId: string
  }
  timestamp: number
}

export interface MCPConnectServerResponse {
  success: true
  data: boolean // connection success
  timestamp: number
}

export interface MCPDisconnectServerRequest {
  type: 'mcp:disconnect-server'
  payload: {
    serverId: string
  }
  timestamp: number
}

export interface MCPDisconnectServerResponse {
  success: true
  timestamp: number
}

export interface MCPExecuteToolRequest {
  type: 'mcp:execute-tool'
  payload: {
    serverId: string
    toolName: string
    args: any
  }
  timestamp: number
}

export interface MCPExecuteToolResponse {
  success: true
  data: MCPToolResult
  timestamp: number
}

export interface MCPForceAutoConnectRequest {
  type: 'mcp:force-auto-connect'
  timestamp: number
}

export interface MCPForceAutoConnectResponse {
  success: true
  timestamp: number
}

// ================== ОШИБКИ ==================

export interface MCPErrorResponse {
  success: false
  error: string
  code?: string
  timestamp: number
}

// ================== UNION ТИПЫ ==================

export type MCPEvent =
  | MCPStateUpdateEvent
  | MCPServerStatusChangedEvent
  | MCPServerAddedEvent
  | MCPServerRemovedEvent
  | MCPServerConnectedEvent
  | MCPServerDisconnectedEvent
  | MCPAutoConnectCompletedEvent

export type MCPRequest =
  | MCPGetSystemStateRequest
  | MCPAddServerRequest
  | MCPUpdateServerRequest
  | MCPRemoveServerRequest
  | MCPConnectServerRequest
  | MCPDisconnectServerRequest
  | MCPExecuteToolRequest
  | MCPForceAutoConnectRequest

export type MCPResponse =
  | MCPGetSystemStateResponse
  | MCPAddServerResponse
  | MCPUpdateServerResponse
  | MCPRemoveServerResponse
  | MCPConnectServerResponse
  | MCPDisconnectServerResponse
  | MCPExecuteToolResponse
  | MCPForceAutoConnectResponse
  | MCPErrorResponse

// ================== HELPER ТИПЫ ==================

export type MCPRequestType = MCPRequest['type']
export type MCPEventType = MCPEvent['type']

export type MCPRequestPayload<T extends MCPRequestType> =
  Extract<MCPRequest, { type: T }> extends {
    payload: infer P
  }
    ? P
    : never

export type MCPEventPayload<T extends MCPEventType> =
  Extract<MCPEvent, { type: T }> extends {
    payload: infer P
  }
    ? P
    : never

// ================== КОНСТАНТЫ ==================

export const MCP_CHANNEL_PREFIX = 'mcp:'

export const MCP_EVENTS = {
  STATE_UPDATE: 'mcp:state-update',
  SERVER_STATUS_CHANGED: 'mcp:server-status-changed',
  SERVER_ADDED: 'mcp:server-added',
  SERVER_REMOVED: 'mcp:server-removed',
  SERVER_CONNECTED: 'mcp:server-connected',
  SERVER_DISCONNECTED: 'mcp:server-disconnected',
  AUTO_CONNECT_COMPLETED: 'mcp:auto-connect-completed',
} as const

export const MCP_REQUESTS = {
  GET_SYSTEM_STATE: 'mcp:get-system-state',
  ADD_SERVER: 'mcp:add-server',
  UPDATE_SERVER: 'mcp:update-server',
  REMOVE_SERVER: 'mcp:remove-server',
  CONNECT_SERVER: 'mcp:connect-server',
  DISCONNECT_SERVER: 'mcp:disconnect-server',
  EXECUTE_TOOL: 'mcp:execute-tool',
  FORCE_AUTO_CONNECT: 'mcp:force-auto-connect',
} as const

export const MCP_SERVER_STATUS = {
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  ERROR: 'error',
} as const

export const MCP_SERVER_TYPES = {
  SSE: 'sse',
  STDIO: 'stdio',
} as const

export const MCP_CONNECTION_TIMEOUT = 30000 // 30 секунд
export const MCP_HEARTBEAT_INTERVAL = 60000 // 1 минута
export const MCP_MAX_RECONNECT_ATTEMPTS = 3
export const MCP_RECONNECT_DELAY = 5000 // 5 секунд

// ================== ВАЛИДАЦИЯ ==================

export function isMCPEvent(event: any): event is MCPEvent {
  return event && typeof event === 'object' && 'type' in event && event.type.startsWith(MCP_CHANNEL_PREFIX)
}

export function isMCPRequest(request: any): request is MCPRequest {
  return request && typeof request === 'object' && 'type' in request && request.type.startsWith(MCP_CHANNEL_PREFIX)
}

export function isMCPResponse(response: any): response is MCPResponse {
  return response && typeof response === 'object' && 'success' in response && 'timestamp' in response
}

export function isMCPErrorResponse(response: any): response is MCPErrorResponse {
  return isMCPResponse(response) && response.success === false
}

export function isMCPSuccessResponse(response: any): response is Exclude<MCPResponse, MCPErrorResponse> {
  return isMCPResponse(response) && response.success === true
}

// ================== КОДЫ ОШИБОК ==================

export const MCP_ERROR_CODES = {
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  INVALID_REQUEST: 'INVALID_REQUEST',
  SERVER_NOT_FOUND: 'SERVER_NOT_FOUND',
  SERVER_ALREADY_EXISTS: 'SERVER_ALREADY_EXISTS',
  CONNECTION_FAILED: 'CONNECTION_FAILED',
  CONNECTION_TIMEOUT: 'CONNECTION_TIMEOUT',
  TOOL_EXECUTION_FAILED: 'TOOL_EXECUTION_FAILED',
  TOOL_NOT_FOUND: 'TOOL_NOT_FOUND',
  INVALID_TOOL_ARGS: 'INVALID_TOOL_ARGS',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  SERVER_UNAVAILABLE: 'SERVER_UNAVAILABLE',
  PROTOCOL_ERROR: 'PROTOCOL_ERROR',
  CONFIGURATION_ERROR: 'CONFIGURATION_ERROR',
} as const

export type MCPErrorCode = (typeof MCP_ERROR_CODES)[keyof typeof MCP_ERROR_CODES] 