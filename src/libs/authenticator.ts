import { redirect } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { useAuthStore } from '@/store/auth';
import { useMenuStore } from '@/store/menu';

// Function to check if the user has access to the menu
export const findAccessMenu = (path: string, menuList: Menu[] = []) => {
  // Use `some` to check if any menu matches the current route
  return menuList.some((menu) => menu.menu_route === path || menu.menu_route === `/${path.split('/')[1]}`);
};

// Authenticator to handle token validation and access control
export const authenticator = async ({ request }: any) => {
  const { token } = useAuthStore.getState();
  const { menuList } = useMenuStore.getState();

  // Extract the pathname from the request URL to match with the menu routes
  const url = new URL(request.url);
  const path = url.pathname; // Extract the pathname (e.g., /dashboard)

  // If no token, show notification and redirect to login
  if (!token || menuList.length === 0) {
    notifications.show({
      title: 'Session Expired',
      message: "We couldn't find your session. Please login again",
      color: 'red',
      withCloseButton: true,
    });
    return redirect('/login');
  }

  const hasAccess = findAccessMenu(path, menuList); // Check if the user has access to the route

  // If the user doesn't have access, show a notification and redirect to home
  if (!hasAccess) {
    notifications.show({
      title: 'Oopss!',
      message: "You don't have access to visit this page",
      color: 'yellow',
      withCloseButton: true,
    });
    return redirect('/');
  }

  // If access is granted, proceed
  return null;
};

export const findMenuID = (data: Menu[], menu: string) => {
  return data.find((item: { menu_route: string }) => item.menu_route === menu)
    ?.role_id;
};