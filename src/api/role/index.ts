import endpoint from '@root/endpoint.json';
import { showNotification } from '@mantine/notifications';
import { findMenuID } from '@/libs/authenticator';
import { sendRequestGET, sendRequestPOST } from '@/libs/sendRequest';
import { useAuthStore } from '@/store/auth';
import { useMenuStore } from '@/store/menu';

export const inquiryRoleMapping = async () => {
  try {
    console.info('[REQ INQUIRY ROLE MAPPING]');
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestGET(`${endpoint.baseURL}${endpoint.roleMapping}`, header);

    return response;
  } catch (error: any) {
    console.error('[INQUIRY ROLE MAPPING ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};

export const inquiryRoleList = async () => {
  try {
    console.info('[REQ INQUIRY ROLE LIST]');
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestGET(`${endpoint.baseURL}${endpoint.role}`, header);

    return response;
  } catch (error: any) {
    console.error('[INQUIRY ROLE LIST ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};

export const createNewRoleMapping = async (req: RequestNewRoleMapping) => {
  try {
    console.info('[REQ CREATE NEW ROLE MAPPING]', req);
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestPOST(
      `${endpoint.baseURL}${endpoint.createRoleMapping}`,
      req,
      header
    );

    return response;
  } catch (error: any) {
    console.error('[CREATE NEW ROLE MAPPING ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};
