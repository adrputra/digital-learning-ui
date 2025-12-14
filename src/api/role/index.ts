import endpoint from '@root/endpoint.json';
import { showNotification } from '@mantine/notifications';
import { findMenuID } from '@/libs/authenticator';
import { sendRequestDELETE, sendRequestGET, sendRequestPOST, sendRequestPUT } from '@/libs/sendRequest';
import { useAuthStore } from '@/store/auth';
import { useMenuStore } from '@/store/menu';

export const inquiryRoleMapping = async (page?: number, limit?: number, search?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC') => {
  try {
    console.info('[REQ INQUIRY ROLE MAPPING]', { page, limit, search, sortBy, sortOrder });
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    
    let url = `${endpoint.baseURL}${endpoint.roleMapping}`;
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
    console.error('[INQUIRY ROLE MAPPING ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};

export const inquiryRoleList = async (page?: number, limit?: number, search?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC') => {
  try {
    console.info('[REQ INQUIRY ROLE LIST]', { page, limit, search, sortBy, sortOrder });
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    
    let url = `${endpoint.baseURL}${endpoint.role}`;
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

export const createNewRole = async (req: RequestNewRole) => {
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
      `${endpoint.baseURL}${endpoint.createRole}`,
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

export const updateRoleMapping = async (req: RequestNewRoleMapping) => {
  try {
    console.info('[REQ UPDATE ROLE MAPPING]', req);
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestPUT(
      `${endpoint.baseURL}${endpoint.roleMapping}`,
      req,
      header
    );

    return response;
  } catch (error: any) {
    console.error('[UPDATE ROLE MAPPING ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};

export const deleteRoleMapping = async (req: string) => {
  try {
    console.info('[REQ DELETE ROLE MAPPING]', req);
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestDELETE(
      `${endpoint.baseURL}${endpoint.roleMapping}/${req}`,
      header
    );

    return response;
  } catch (error: any) {
    console.error('[DELETE ROLE MAPPING ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
 
}
