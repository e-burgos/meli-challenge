import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

/**
 * App router: home (/), product detail (/product/:productId).
 * RouterProvider is used in main so the whole app is routing-aware.
 */
export function AppRouter() {
  return <RouterProvider router={router} />;
}
