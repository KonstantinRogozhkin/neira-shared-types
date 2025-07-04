/**
 * @fileoverview Общие TypeScript типы для экосистемы NEIRA
 * Единый источник правды для всех API контрактов между клиентами и бэкендом
 */

// ===== БАЗОВЫЕ ТИПЫ =====

/**
 * Стандартный ответ API
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Пагинированный ответ API
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ===== АУТЕНТИФИКАЦИЯ =====

/**
 * Токены аутентификации
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

/**
 * Запрос на вход
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Запрос на регистрацию
 */
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

/**
 * Ответ на аутентификацию
 */
export interface AuthResponse extends ApiResponse<User> {
  tokens: AuthTokens;
}

// ===== ПОЛЬЗОВАТЕЛИ =====

/**
 * Пользователь системы
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  subscription?: UserSubscription;
}

/**
 * Подписка пользователя
 */
export interface UserSubscription {
  id: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  expiresAt?: string;
  credits: number;
  maxCredits: number;
}

/**
 * Настройки приложения пользователя
 */
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'ru' | 'es' | 'fr';
  notifications: {
    push: boolean;
    email: boolean;
    marketing: boolean;
  };
  privacy: {
    analytics: boolean;
    crashReporting: boolean;
  };
}

// ===== ЧАТ И СООБЩЕНИЯ =====

/**
 * Чат с AI
 */
export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  messages: ChatMessage[];
}

/**
 * Сообщение в чате
 */
export interface ChatMessage {
  id: string;
  chatId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  model?: string;
  tokenCount?: number;
}

/**
 * Запрос на отправку сообщения
 */
export interface ChatRequest {
  messages: ChatMessage[];
  model: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

/**
 * Ответ на сообщение в чате
 */
export interface ChatResponse extends ApiResponse<ChatMessage> {
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    cost: number;
  };
}

// ===== AI МОДЕЛИ =====

/**
 * Модель языковой модели
 */
export interface LLMModel {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic' | 'google' | 'openrouter';
  contextWindow: number;
  inputCost: number;
  outputCost: number;
  isAvailable: boolean;
}

// ===== УВЕДОМЛЕНИЯ =====

/**
 * Push уведомление
 */
export interface PushNotification {
  id: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  type: 'chat' | 'system' | 'billing' | 'marketing';
  userId: string;
  createdAt: string;
  isRead: boolean;
}

// ===== NEIRA.SALE (ПРОДАЖИ) =====

/**
 * Канал продаж
 */
export interface SaleChannel {
  id: string;
  name: string;
  type: 'telegram' | 'whatsapp' | 'custom';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Диалог продаж
 */
export interface SaleDialog {
  id: string;
  channelId?: string;
  user_id: string; // Совместимость с neira-cloud-connector
  userId?: string; // Алиас для user_id
  customerName?: string;
  customerContact?: string;
  last_message: string; // Совместимость с neira-cloud-connector
  lastMessage?: string; // Алиас для last_message
  status: 'active' | 'closed' | 'paused';
  createdAt: string;
  updatedAt: string;
}

/**
 * Статистика продаж
 */
export interface SaleStats {
  total_dialogs: number; // Совместимость с neira-cloud-connector
  totalDialogs?: number; // Алиас для total_dialogs
  active_dialogs: number; // Совместимость с neira-cloud-connector
  activeDialogs?: number; // Алиас для active_dialogs
  closed_deals: number; // Совместимость с neira-cloud-connector
  closedDeals?: number; // Алиас для closed_deals
  revenue?: number;
  averageResponseTime?: number;
  conversionRate?: number;
}

/**
 * Запрос на отправку сообщения в продажах
 */
export interface SendSaleMessageRequest {
  channelId: string;
  userId: string;
  text: string;
  metadata?: Record<string, any>;
}

/**
 * Ответ на отправку сообщения в продажах
 */
export interface SendSaleMessageResponse extends ApiResponse {
  messageId: string;
  sentAt: string;
}

// ===== ОШИБКИ =====

/**
 * Ошибка приложения
 */
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

// ===== НАВИГАЦИЯ (React Navigation) =====

/**
 * Параметры навигации для мобильного приложения
 */
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Chat: { chatId?: string };
  Settings: undefined;
  Profile: undefined;
  Subscription: undefined;
};

// ===== УТИЛИТАРНЫЕ ТИПЫ =====

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type ApiEndpoint = string;
export type ISO8601String = string;
export type UUID = string;

/**
 * Делает указанные поля опциональными
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Делает указанные поля обязательными
 */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// ===== КОНСТАНТЫ =====

/**
 * Эндпоинты API
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  CHAT: {
    LIST: '/chat',
    CREATE: '/chat',
    GET: '/chat/:id',
    DELETE: '/chat/:id',
    SEND_MESSAGE: '/chat/:id/messages',
  },
  USER: {
    PROFILE: '/user/profile',
    SETTINGS: '/user/settings',
    SUBSCRIPTION: '/user/subscription',
  },
  MODELS: '/models',
  NOTIFICATIONS: '/notifications',
} as const;

/**
 * Ключи для локального хранилища
 */
export const STORAGE_KEYS = {
  AUTH_TOKENS: 'auth_tokens',
  USER_SETTINGS: 'user_settings',
  CHAT_HISTORY: 'chat_history',
  DEVICE_ID: 'device_id',
} as const; 