import endpoint from '@root/endpoint.json';
import { showNotification } from '@mantine/notifications';
import { findMenuID } from '@/libs/authenticator';
import { sendRequestGET, sendRequestPOST } from '@/libs/sendRequest';
import { useAuthStore } from '@/store/auth';
import { useMenuStore } from '@/store/menu';

export const getAllUser = async () => {
  try {
    console.info('[REQ GET ALL USER]');
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestGET(`${endpoint.baseURL}${endpoint.user}`, header);

    return response;
  } catch (error: any) {
    console.error('[GET ALL USER ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};

export const createNewUser = async (req: RequestNewUser) => {
  try {
    console.info('[REQ CREATE NEW USER]', req);
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestPOST(`${endpoint.publicURL}${endpoint.register}`, req, header);

    return response;
  } catch (error: any) {
    console.error('[CREATE NEW USER ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};

export const getInstitutionList = async () => {
  try {
    console.info('[REQ GET INSTITUTION LIST]');
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestGET(`${endpoint.baseURL}${endpoint.institution}`, header);

    return response;
  } catch (error: any) {
    console.error('[GET INSTITUTION LIST ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};