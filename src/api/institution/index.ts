import endpoint from '@root/endpoint.json';
import { showNotification } from '@mantine/notifications';
import { findMenuID } from '@/libs/authenticator';
import { sendRequestDELETE, sendRequestGET, sendRequestPOST, sendRequestPUT } from '@/libs/sendRequest';
import { useAuthStore } from '@/store/auth';
import { useMenuStore } from '@/store/menu';

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

export const addNewInstitution = async (req: RequestNewInstitution) => {
  try {
    console.info('[REQ ADD NEW INSTITUTION]', req);
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestPOST(
      `${endpoint.baseURL}${endpoint.institution}`,
      req,
      header
    );

    return response;
  } catch (error: any) {
    console.error('[ADD NEW INSTITUTION ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};

export const updateInstitution = async (req: RequestEditInstitution) => {
  try {
    console.info('[REQ UPDATE INSTITUTION]', req);
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestPUT(`${endpoint.baseURL}${endpoint.institution}`, req, header);

    return response;
  } catch (error: any) {
    console.error('[UPDATE INSTITUTION ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};

export const deleteInstitution = async (id: string) => {
  try {
    console.info('[REQ DELETE INSTITUTION]', id);
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestDELETE(`${endpoint.baseURL}${endpoint.institution}/${id}`, header);

    return response;
  } catch (error: any) {
    console.error('[DELETE INSTITUTION ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};