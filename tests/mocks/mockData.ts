// tests/mocks/mockData.ts
import type { 
  Document, 
  User, 
  LogData, 
  DatabaseEvent 
} from '../../src/types/types';

// Simple mock users for admin dashboard testing
export const mockUsers: User[] = [
  {
    _id: '507f1f77bcf86cd799439011',
    username: 'admin_user',
    password: '$2b$10$hashedpassword1',
    role: 'admin',
    createdAt: '2024-01-15T08:30:00.000Z',
    updatedAt: '2024-01-15T08:30:00.000Z',
  },
  {
    _id: '507f1f77bcf86cd799439012',
    username: 'john_doe',
    password: '$2b$10$hashedpassword2',
    role: 'user',
    createdAt: '2024-01-16T10:15:00.000Z',
    updatedAt: '2024-01-16T10:15:00.000Z',
  },
];

// Simple mock documents for testing CRUD operations
export const mockDocuments: Document[] = [
  {
    id: '507f1f77bcf86cd799439020',
    title: 'Test Document 1',
    description: 'First test document',
    status: 'active',
    userId: '507f1f77bcf86cd799439012',
    createdAt: '2024-01-15T09:00:00.000Z',
    updatedAt: '2024-01-16T11:30:00.000Z',
    createdBy: '507f1f77bcf86cd799439012',
  },
  {
    id: '507f1f77bcf86cd799439021',
    title: 'Test Document 2',
    description: 'Second test document',
    status: 'completed',
    userId: '507f1f77bcf86cd799439011',
    createdAt: '2024-01-14T16:45:00.000Z',
    updatedAt: '2024-01-15T10:20:00.000Z',
    createdBy: '507f1f77bcf86cd799439011',
  },
];

// Simple collections list
export const mockCollections = ['users', 'documents', 'posts'];

// Simple log entries for testing logs view
export const mockLogEntries: LogData[] = [
  {
    id: 'log-1',
    timestamp: '2024-01-18T10:30:15.123Z',
    method: 'GET',
    url: '/pendulum/api?collection=documents',
    status: '200',
    duration: '45ms',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    ip: '192.168.1.100',
    userId: '507f1f77bcf86cd799439012',
  },
  {
    id: 'log-2',
    timestamp: '2024-01-18T10:31:22.456Z',
    method: 'POST',
    url: '/pendulum/api',
    status: '201',
    duration: '78ms',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    ip: '192.168.1.101',
    userId: '507f1f77bcf86cd799439011',
  },
];

// Simple real-time event for testing reactivity
export const mockDatabaseEvent: DatabaseEvent = {
  collection: 'documents',
  action: 'insert',
  operationId: 'op-insert-001',
  eventData: {
    affected: [mockDocuments[0]],
    count: 1,
    ids: ['507f1f77bcf86cd799439020'],
  },
};
