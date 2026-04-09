import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';
import LoginPage from '@/features/auth/LoginPage';
import DashboardPage from '@/features/dashboard/DashboardPage';
import OrganizationListPage from '@/features/organizations/OrganizationListPage';
import OrganizationFormPage from '@/features/organizations/OrganizationFormPage';
import OrganizationDetailPage from '@/features/organizations/OrganizationDetailPage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/', element: <Navigate to="/dashboard" replace /> },
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/organizations', element: <OrganizationListPage /> },
          { path: '/organizations/new', element: <OrganizationFormPage /> },
          { path: '/organizations/:id', element: <OrganizationDetailPage /> },
          { path: '/organizations/:id/edit', element: <OrganizationFormPage /> },
        ],
      },
    ],
  },
]);

export default router;
