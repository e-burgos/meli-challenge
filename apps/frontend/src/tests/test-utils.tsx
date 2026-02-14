import type { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom';
import { render, type RenderOptions } from '@testing-library/react';

/**
 * Creates a fresh QueryClient for tests (no cache sharing, no retries).
 */
function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
}

interface AllTheProvidersProps {
  children: ReactNode;
  initialEntries?: MemoryRouterProps['initialEntries'];
}

function AllTheProviders({ children, initialEntries = ['/'] }: AllTheProvidersProps): ReactElement {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}

/**
 * Renders a component with QueryClientProvider and MemoryRouter for page tests.
 */
function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { initialEntries?: MemoryRouterProps['initialEntries'] }
): ReturnType<typeof render> {
  const { initialEntries = ['/'], ...renderOptions } = options ?? {};
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <AllTheProviders initialEntries={initialEntries}>{children}</AllTheProviders>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export { createTestQueryClient, renderWithProviders };
