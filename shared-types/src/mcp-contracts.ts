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

// ================== ERROR RESPONSES ==================

export interface MCPErrorResponse {
  success: false
  error: string
  code?: string
  timestamp: number
}

// ================== UNION TYPES ==================

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

// ================== HELPER TYPES ==================

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

// ================== VALIDATION SCHEMAS ==================

export const MCPRequestSchema = {
  'mcp:get-system-state': {},
  'mcp:add-server': {
    required: ['name', 'url', 'type', 'autoConnect'],
    properties: {
      name: { type: 'string', minLength: 1 },
      url: { type: 'string', format: 'uri' },
      type: { enum: ['sse', 'stdio'] },
      autoConnect: { type: 'boolean' },
      description: { type: 'string' },
    },
  },
  'mcp:update-server': {
    required: ['serverId'],
    properties: {
      serverId: { type: 'string', minLength: 1 },
      updates: { type: 'object' },
    },
  },
  'mcp:remove-server': {
    required: ['serverId'],
    properties: {
      serverId: { type: 'string', minLength: 1 },
    },
  },
  'mcp:connect-server': {
    required: ['serverId'],
    properties: {
      serverId: { type: 'string', minLength: 1 },
    },
  },
  'mcp:disconnect-server': {
    required: ['serverId'],
    properties: {
      serverId: { type: 'string', minLength: 1 },
    },
  },
  'mcp:execute-tool': {
    required: ['serverId', 'toolName'],
    properties: {
      serverId: { type: 'string', minLength: 1 },
      toolName: { type: 'string', minLength: 1 },
      args: { type: 'object' },
    },
  },
  'mcp:force-auto-connect': {},
} as const

// ================== CONSTANTS ==================

export const MCP_IPC_CHANNELS = [
  // События (Main → Renderer)
  'mcp:state-update',
  'mcp:server-status-changed',
  'mcp:server-added',
  'mcp:server-removed',
  'mcp:server-connected',
  'mcp:server-disconnected',
  'mcp:auto-connect-completed',

  // Запросы (Renderer → Main)
  'mcp:get-system-state',
  'mcp:add-server',
  'mcp:update-server',
  'mcp:remove-server',
  'mcp:connect-server',
  'mcp:disconnect-server',
  'mcp:execute-tool',
  'mcp:force-auto-connect',
] as const

export const MCP_ERROR_CODES = {
  SERVER_NOT_FOUND: 'SERVER_NOT_FOUND',
  CONNECTION_FAILED: 'CONNECTION_FAILED',
  TOOL_EXECUTION_FAILED: 'TOOL_EXECUTION_FAILED',
  INVALID_CONFIG: 'INVALID_CONFIG',
  ALREADY_CONNECTED: 'ALREADY_CONNECTED',
  NOT_CONNECTED: 'NOT_CONNECTED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  TIMEOUT: 'TIMEOUT',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
} as const

export type MCPErrorCode = (typeof MCP_ERROR_CODES)[keyof typeof MCP_ERROR_CODES]
