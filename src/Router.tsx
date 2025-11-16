import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppShellWrapper from './components/template/AppShell';
import { authenticator } from './libs/authenticator';
import Login from './pages/login';
import UserProfile from './pages/user/UserProfile';
import StudentList from './pages/student/StudentList';
import RoleList from './pages/role/RoleList';
import MenuList from './pages/menu/MenuList';
import UserList from './pages/user/UserList';
import InstitutionList from './pages/institution/index';
import Dataset from './pages/dataset';
import DatasetDetail from './pages/dataset/detail';
import Parameter from './pages/parameter';
import NFC from './pages/nfc';
import RoleMappingList from './pages/role/RoleMappingList';

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
  return <RouterProvider router={router} />;
}
