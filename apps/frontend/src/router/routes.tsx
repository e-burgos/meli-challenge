import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { Layout } from '@meli-challenge/ui-components';
import { Home } from '../pages/Home';
import { ProductDetail } from '../pages/ProductDetail';
import { DesignSystem } from '../pages/DesignSystem';
import { Prototype } from '../pages/Prototype';

export const router = createBrowserRouter([
  { path: 'design-system', element: <DesignSystem /> },
  { path: 'prototype', element: <Prototype /> },
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'product/:productId', element: <ProductDetail /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
