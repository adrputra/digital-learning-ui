import endpoint from '@root/endpoint.json';
import { showNotification } from '@mantine/notifications';
import { findMenuID } from '@/libs/authenticator';
import { sendRequestDELETE, sendRequestGET, sendRequestPOST, sendRequestPUT } from '@/libs/sendRequest';
import { useAuthStore } from '@/store/auth';
import { useMenuStore } from '@/store/menu';

export const inquiryMenu = async () => {
  try {
    console.info('[REQ INQUIRY MENU]');
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestGET(`${endpoint.baseURL}${endpoint.menu}`, header);

    return response;
  } catch (error: any) {
    console.error('[INQUIRY MENU ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};

export const createNewMenu = async (req: RequestNewMenu) => {
  try {
    console.info('[REQ CREATE NEW MENU]', req);
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestPOST(
      `${endpoint.baseURL}${endpoint.createMenu}`,
      req,
      header
    );

    return response;
  } catch (error: any) {
    console.error('[CREATE NEW MENU ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};

export const updateMenu = async (req: RequestNewMenu) => {
  try {
    console.info('[REQ UPDATE MENU]', req);
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestPUT(`${endpoint.baseURL}${endpoint.menu}`, req, header);

    return response;
  } catch (error: any) {
    console.error('[UPDATE MENU ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};

export const deleteMenu = async (id: string) => {
  try {
    console.info('[REQ DELETE MENU]', id);
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestDELETE(`${endpoint.baseURL}${endpoint.menu}/${id}`, header);

    return response;
  } catch (error: any) {
    console.error('[DELETE MENU ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};
