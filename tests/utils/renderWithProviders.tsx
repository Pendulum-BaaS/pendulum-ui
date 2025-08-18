// tests/utils/renderWithProviders.tsx
import React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { PendulumProvider } from '../../src/contexts/PendulumProvider';
import { LogsProvider } from '../../src/contexts/LogsProvider';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6a4c93' },
    background: {
      default: 'rgba(26, 26, 46, 0.95)',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
});

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  withoutRouter?: boolean;
  withoutPendulumProvider?: boolean;
  withoutLogsProvider?: boolean;
  withoutTheme?: boolean;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // For the test case: withoutPendulumProvider: true, withoutRouter: true
    if (options.withoutRouter && options.withoutPendulumProvider) {
      if (options.withoutTheme && options.withoutLogsProvider) {
        return <>{children}</>;
      }
      if (options.withoutTheme) {
        return <LogsProvider>{children}</LogsProvider>;
      }
      if (options.withoutLogsProvider) {
        return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
      }
      return (
        <LogsProvider>
          <ThemeProvider theme={darkTheme}>
            {children}
          </ThemeProvider>
        </LogsProvider>
      );
    }

    // Default full provider stack
    return (
      <BrowserRouter>
        <PendulumProvider>
          <LogsProvider>
            <ThemeProvider theme={darkTheme}>
              {children}
            </ThemeProvider>
          </LogsProvider>
        </PendulumProvider>
      </BrowserRouter>
    );
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

export { userEvent };
export * from '@testing-library/react';
