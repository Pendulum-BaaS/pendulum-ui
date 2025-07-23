import type { Collection } from '../types/types';

export const sampleCollections: Collection[] = [
  { name: 'Employees',
    documents: [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
        status: 'Active',
        lastLogin: '2024-01-15',
        department: 'Engineering',
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'User',
        status: 'Active',
        lastLogin: '2024-01-14',
        department: 'Marketing'
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        role: 'Manager',
        status: 'Inactive',
        lastLogin: '2024-01-10',
        department: 'Sales'
      },
    ]
  },
  {
    name: 'Products',
    documents: [
      {
        id: '1',
        productName: 'Laptop Pro',
        category: 'Electronics',
        price: 1299.99,
        stock: 25,
        brand: 'TechCorp',
        rating: 4.5
      },
      {
        id: '2',
        productName: 'Wireless Mouse',
        category: 'Accessories',
        price: 29.99,
        stock: 150,
        brand: 'InputTech',
        rating: 4.2
      },
      {
        id: '3',
        productName: 'Monitor 4K',
        category: 'Electronics',
        price: 399.99,
        stock: 8,
        brand: 'DisplayCorp',
        rating: 4.8
      }
    ]
  },
  {
    name: 'Orders',
    documents: [
      {
        id: '1',
        orderNumber: 'ORD-2024-001',
        customerName: 'Alice Brown',
        total: 1329.98,
        status: 'Shipped',
        orderDate: '2024-01-12',
        items: 2
      },
      {
        id: '2',
        orderNumber: 'ORD-2024-002',
        customerName: 'Charlie Wilson',
        total: 429.98,
        status: 'Processing',
        orderDate: '2024-01-13',
        items: 1
      },
      {
        id: '3',
        orderNumber: 'ORD-2024-003',
        customerName: 'Diana Garcia',
        total: 59.98,
        status: 'Delivered',
        orderDate: '2024-01-11',
        items: 2
      }
    ]
  },
  {
    name: 'Settings',
    documents: [
      {
        id: '1',
        configKey: 'api_timeout',
        value: '30000',
        type: 'number',
        description: 'API request timeout in milliseconds',
        lastModified: '2024-01-10'
      },
      {
        id: '2',
        configKey: 'max_file_size',
        value: '10MB',
        type: 'string',
        description: 'Maximum file upload size',
        lastModified: '2024-01-08'
      },
      {
        id: '3',
        configKey: 'enable_notifications',
        value: 'true',
        type: 'boolean',
        description: 'Enable email notifications',
        lastModified: '2024-01-05'
      }
    ]
  }
];
