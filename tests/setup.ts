// tests/setup.ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock EventSource for SSE functionality
class MockEventSource {
  static readonly CONNECTING = 0;
  static readonly OPEN = 1;
  static readonly CLOSED = 2;

  readonly CONNECTING = 0;
  readonly OPEN = 1;
  readonly CLOSED = 2;

  onopen = vi.fn();
  onmessage = vi.fn();
  onerror = vi.fn();
  close = vi.fn();
  readyState = 1;
  url = '';
  withCredentials = false;

  addEventListener = vi.fn();
  removeEventListener = vi.fn();
  dispatchEvent = vi.fn();

  constructor(url: string | URL) {
    this.url = typeof url === 'string' ? url : url.toString();
  }
}

global.EventSource = MockEventSource as any;

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
});

// Mock PendulumClient
export const createMockPendulumClient = (overrides = {}) => ({
  getAdminKey: vi.fn().mockReturnValue(null),
  setAdminKey: vi.fn(),
  clearAdminKey: vi.fn(),
  validateAdminKey: vi.fn().mockResolvedValue({ success: true, role: 'admin' }),
  getCollectionPermissions: vi.fn().mockResolvedValue({
    success: true,
    data: { collectionName: 'test', permissions: { create: ['admin'], read: ['admin'], update: ['admin'], delete: ['admin'] } },
  }),
  updateCollectionPermissions: vi.fn().mockResolvedValue({ success: true }),
  createCollection: vi.fn().mockResolvedValue({ success: true }),
  getAllCollections: vi.fn().mockResolvedValue({ success: true, data: { collections: [] } }),
  deleteCollection: vi.fn().mockResolvedValue({ success: true }),
  destroy: vi.fn(),
  getPendingOperationsCount: vi.fn().mockReturnValue(0),
  db: {
    getAll: vi.fn().mockResolvedValue({ success: true, data: [] }),
    getOne: vi.fn().mockResolvedValue({ success: true, data: {} }),
    insert: vi.fn().mockResolvedValue({ success: true, data: [] }),
    updateOne: vi.fn().mockResolvedValue({ success: true, data: {} }),
    removeOne: vi.fn().mockResolvedValue({ success: true, data: {} }),
  },
  auth: {
    register: vi.fn().mockResolvedValue({ success: true }),
    login: vi.fn().mockResolvedValue({ success: true, userId: 'test-user-id' }),
    logout: vi.fn().mockResolvedValue({ success: true }),
  },
  realtime: {
    subscribe: vi.fn(),
    unsubscribe: vi.fn(),
    disconnect: vi.fn(),
  },
  ...overrides,
});
