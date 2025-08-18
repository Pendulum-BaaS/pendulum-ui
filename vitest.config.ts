/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    // Test environment configuration
    environment: 'jsdom',
    
    // Setup files
    setupFiles: ['./tests/setup.ts'],
    
    // Global test configuration
    globals: true,
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'tests/',
        'dist/',
        '**/*.config.*',
        '**/*.d.ts',
        '**/types.ts',
        '**/gradients.ts',
        '**/vite-env.d.ts',
        'src/main.tsx', // Entry point
        'src/index.css', // CSS files
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 70,
          functions: 80,
          lines: 80,
        },
      },
    },
    
    // Test file patterns
    include: [
      'tests/**/*.test.{ts,tsx}',
      'tests/**/*.spec.{ts,tsx}',
    ],
    
    // Files to exclude from testing
    exclude: [
      'node_modules/',
      'dist/',
      'build/',
      '.git/',
    ],
    
    // Mock patterns
    deps: {
      inline: [
        // Inline dependencies that need to be transformed
        '@mui/material',
        '@mui/icons-material',
        '@mui/x-data-grid',
        '@pendulum-baas/sdk',
      ],
    },
    
    // Test timeout (useful for async operations)
    testTimeout: 10000,
    hookTimeout: 10000,
    
    // Retry failed tests (useful for flaky real-time tests)
    retry: 1,
    
    // Run tests in sequence for better debugging, set to false for parallel execution (faster)
    sequence: {
      concurrent: true,
    },
    
    // Mock CSS modules and other assets
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    
    // Environment variables for tests
    env: {
      NODE_ENV: 'test',
    },
    
    // Reporter configuration
    reporters: [
      'verbose',
      'html',
    ],
    
    // Output directory for test results
    outputFile: {
      html: './test-results/index.html',
      json: './test-results/results.json',
    },
  },
  
  // Resolve configuration for imports
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@tests': resolve(__dirname, './tests'),
    },
  },
  
  // Define configuration for different environments
  define: {
    // Make process.env available in tests
    'process.env': process.env,
  },
  
  // Server configuration for test environment
  server: {
    // Mock the proxy configuration from your main vite.config.ts but disabled during testing
    proxy: {},
  },
  
  // Build configuration that affects test environment
  build: {
    // Source maps for better debugging in tests
    sourcemap: true,
  },
  
  // Optimizations
  optimizeDeps: {
    include: [
      '@testing-library/react',
      '@testing-library/jest-dom',
      '@testing-library/user-event',
    ],
  },
});
