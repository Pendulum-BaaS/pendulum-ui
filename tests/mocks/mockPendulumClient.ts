// tests/mocks/mockPendulumClient.ts
import { vi } from 'vitest';

export const createMockPendulumClient = (overrides = {}) => {
  const mockClient = {
    getAdminKey: vi.fn().mockReturnValue(null),
    setAdminKey: vi.fn(),
    clearAdminKey: vi.fn(),
    getAuthToken: vi.fn().mockReturnValue(null),
    setAuthToken: vi.fn(),
    clearAuthToken: vi.fn(),
    isAuthenticated: vi.fn().mockReturnValue(false),
    isAdmin: vi.fn().mockReturnValue(false),
    validateAdminKey: vi.fn().mockResolvedValue({ 
      success: true, 
      role: 'admin' 
    }),
    getCollectionPermissions: vi.fn().mockResolvedValue({
      success: true,
      data: {
        collectionName: 'test',
        permissions: {
          create: ['admin', 'user'],
          read: ['admin', 'user', 'public'],
          update: ['admin', 'user'],
          delete: ['admin'],
        },
      },
    }),
    updateCollectionPermissions: vi.fn().mockResolvedValue({ success: true }),
    createCollection: vi.fn().mockResolvedValue({ success: true }),
    getAllCollections: vi.fn().mockResolvedValue({
      success: true,
      data: { collections: [] },
    }),
    deleteCollection: vi.fn().mockResolvedValue({ success: true }),
    destroy: vi.fn(),
    getPendingOperationsCount: vi.fn().mockReturnValue(0),
    
    // Database operations
    db: {
      getAll: vi.fn().mockResolvedValue({ success: true, data: [] }),
      getOne: vi.fn().mockResolvedValue({ success: true, data: {} }),
      getSome: vi.fn().mockResolvedValue({ success: true, data: [] }),
      insert: vi.fn().mockResolvedValue({ success: true, data: [] }),
      updateOne: vi.fn().mockResolvedValue({ success: true, data: {} }),
      updateSome: vi.fn().mockResolvedValue({ success: true, data: [] }),
      updateAll: vi.fn().mockResolvedValue({ success: true, data: [] }),
      replace: vi.fn().mockResolvedValue({ success: true, data: {} }),
      removeOne: vi.fn().mockResolvedValue({ success: true, data: {} }),
      removeSome: vi.fn().mockResolvedValue({ success: true, data: [] }),
      removeAll: vi.fn().mockResolvedValue({ success: true, data: [] }),
    },

    // Auth operations
    auth: {
      register: vi.fn().mockResolvedValue({ success: true }),
      login: vi.fn().mockResolvedValue({ success: true, userId: 'test-user-id' }),
      logout: vi.fn().mockResolvedValue({ success: true }),
    },

    // Realtime operations
    realtime: {
      subscribe: vi.fn(),
      unsubscribe: vi.fn(),
      disconnect: vi.fn(),
    },

    ...overrides,
  };

  return mockClient;
};
