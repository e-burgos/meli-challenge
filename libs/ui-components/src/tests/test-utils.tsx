import type { ReactElement, ReactNode } from 'react';
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom';
import { render, type RenderOptions } from '@testing-library/react';

interface RouterWrapperProps {
  children: ReactNode;
  initialEntries?: MemoryRouterProps['initialEntries'];
}

function RouterWrapper({ children, initialEntries = ['/'] }: RouterWrapperProps): ReactElement {
  return <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>;
}

/**
 * Renders a component with MemoryRouter for components that use Link, useNavigate, or useSearchParams.
 */
function renderWithRouter(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { initialEntries?: MemoryRouterProps['initialEntries'] }
): ReturnType<typeof render> {
  const { initialEntries = ['/'], ...renderOptions } = options ?? {};
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <RouterWrapper initialEntries={initialEntries}>{children}</RouterWrapper>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export { renderWithRouter };
