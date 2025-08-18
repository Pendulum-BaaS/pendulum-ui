// tests/components/AdminAuthModal.test.tsx
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import { renderWithProviders, userEvent } from '../utils/renderWithProviders';
import { createMockPendulumClient } from '../setup';
import AdminAuthModal from '../../src/components/AdminAuthModal';
import { PendulumContext } from '../../src/contexts/PendulumProvider';

// Mock the gradients utility
vi.mock('../../src/utils/gradients', () => ({
  pendulumGradient: 'linear-gradient(45deg, #6a4c93 30%, #4a3269 90%)',
}));

// Mock the PendulumProvider context
const MockPendulumProvider: React.FC<{ 
  children: React.ReactNode; 
  client?: any;
}> = ({ children, client }) => {
  const mockClient = client || createMockPendulumClient();
  return (
    <PendulumContext.Provider value={{ client: mockClient, isConnected: true }}>
      {children}
    </PendulumContext.Provider>
  );
};

describe('AdminAuthModal', () => {
  const mockOnAuthSuccess = vi.fn();
  let mockClient: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockClient = createMockPendulumClient();
  });

  const renderAdminModal = (props = {}, clientOverrides = {}) => {
    const client = { ...mockClient, ...clientOverrides };
    return renderWithProviders(
      <MockPendulumProvider client={client}>
        <AdminAuthModal 
          open={true} 
          onAuthSuccess={mockOnAuthSuccess} 
          {...props}
        />
      </MockPendulumProvider>,
      { withoutPendulumProvider: true, withoutRouter: true }
    );
  };

  it('allows user to successfully authenticate with valid admin key', async () => {
    const user = userEvent.setup();
    
    renderAdminModal({}, {
      validateAdminKey: vi.fn().mockResolvedValue({ success: true, role: 'admin' }),
      setAdminKey: vi.fn(),
    });

    // User sees the modal
    expect(screen.getByText('Admin Access Required')).toBeInTheDocument();
    expect(screen.getByText('Enter your admin API key to access the Pendulum dashboard')).toBeInTheDocument();

    // User enters their admin key
    const adminKeyInput = screen.getByLabelText('Admin Token');
    await user.type(adminKeyInput, 'valid-admin-key-123');

    // User clicks submit
    const submitButton = screen.getByRole('button', { name: 'Access Dashboard' });
    expect(submitButton).toBeEnabled();
    await user.click(submitButton);

    // Authentication succeeds
    await waitFor(() => {
      expect(mockOnAuthSuccess).toHaveBeenCalledOnce();
    });
  });

  it('does not show modal when closed', () => {
    renderAdminModal({ open: false });
    expect(screen.queryByText('Admin Access Required')).not.toBeInTheDocument();
  });
});
