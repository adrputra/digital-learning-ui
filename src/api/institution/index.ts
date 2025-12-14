import endpoint from '@root/endpoint.json';
import { showNotification } from '@mantine/notifications';
import { findMenuID } from '@/libs/authenticator';
import { sendRequestDELETE, sendRequestGET, sendRequestPOST, sendRequestPUT } from '@/libs/sendRequest';
import { useAuthStore } from '@/store/auth';
import { useMenuStore } from '@/store/menu';

export const getInstitutionList = async (page?: number, limit?: number, search?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC') => {
  try {
    console.info('[REQ GET INSTITUTION LIST]', { page, limit, search, sortBy, sortOrder });
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    
    let url = `${endpoint.baseURL}${endpoint.institution}`;
    const params = new URLSearchParams();
    if (page !== undefined) {
      params.append('page', page.toString());
    }
    if (limit !== undefined) {
      params.append('limit', limit.toString());
    }
    if (search) {
      params.append('search', search);
    }
    if (sortBy) {
      params.append('sort_by', sortBy);
    }
    if (sortOrder) {
      params.append('sort_order', sortOrder);
    }
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await sendRequestGET(url, header);

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