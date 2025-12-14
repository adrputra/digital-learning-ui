import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppShellWrapper from './components/template/AppShell';
import { authenticator } from './libs/authenticator';
import PageLoader from './components/atoms/PageLoader';

// Lazy load all page components
const Login = lazy(() => import('./pages/login'));
const UserProfile = lazy(() => import('./pages/user/UserProfile'));
const StudentList = lazy(() => import('./pages/student/StudentList'));
const RoleList = lazy(() => import('./pages/role/RoleList'));
const MenuList = lazy(() => import('./pages/menu/MenuList'));
const UserList = lazy(() => import('./pages/user/UserList'));
const InstitutionList = lazy(() => import('./pages/institution/index'));
const Dataset = lazy(() => import('./pages/dataset'));
const DatasetDetail = lazy(() => import('./pages/dataset/detail'));
const Parameter = lazy(() => import('./pages/parameter'));
const NFC = lazy(() => import('./pages/nfc'));
const RoleMappingList = lazy(() => import('./pages/role/RoleMappingList'));

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <AppShellWrapper />,
    children: [
      {
        path: '/',
        element: <RoleList />,
        // loader: authenticator,
      },
      {
        path: '/user',
        element: <UserList />,
        // loader: authenticator,
      },
      {
        path: '/user/profile',
        element: <UserProfile />,
        // loader: authenticator,
      },
      {
        path: '/student',
        element: <StudentList />,
        // loader: authenticator,
      },
      {
        path: '/menu',
        element: <MenuList />,
        // loader: authenticator,
      },
      {
        path: '/role',
        element: <RoleList />,
        // loader: authenticator,
      },
      {
        path: '/rolemapping',
        element: <RoleMappingList />,
        // loader: authenticator,
      },
      {
        path: '/experimental',
        element: <Parameter />,
        // loader: authenticator,
      },
      {
        path: '/dataset',
        element: <Dataset />,
        // loader: authenticator,
      },
      {
        path: '/dataset/:institutionID/:username',
        element: <DatasetDetail />,
        // loader: authenticator,
      },
      {
        path: '/parameter',
        element: <Parameter />,
        // loader: authenticator,
      },
      {
        path: '/nfc',
        element: <NFC />,
        // loader: authenticator,
      },
      {
        path: '/institution',
        element: <InstitutionList />,
        // loader: authenticator,
      },
    ],
  },
]);

export function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
