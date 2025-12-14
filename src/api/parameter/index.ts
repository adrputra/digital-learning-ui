import endpoint from '@root/endpoint.json';
import { showNotification } from '@mantine/notifications';
import { findMenuID } from '@/libs/authenticator';
import { sendRequestDELETE, sendRequestGET, sendRequestPOST, sendRequestPUT } from '@/libs/sendRequest';
import { useAuthStore } from '@/store/auth';
import { useMenuStore } from '@/store/menu';

export const getParameterByKey = async (key: string) => {
    try {
        console.info('[REQ GET PARAMETER BY KEY]');
        const auth = useMenuStore.getState();
        const menu_id = findMenuID(auth.menuList, '/');
        const header = {
            ...(useAuthStore.getState().token && {
                Authorization: `Bearer ${useAuthStore.getState().token}`,
            }),
            ...(menu_id && { 'app-menu-id': menu_id }),
        };
        const response = await sendRequestGET(`${endpoint.baseURL}${endpoint.parameter}/${key}`, header);

        return response;
    } catch (error: any) {
        console.error('[GET PARAMETER BY KEY ERROR]', error);
        showNotification({
            color: 'red',
            title: 'Request Error',
            message: error?.response?.data?.message || error?.response?.data || error?.message,
        });
    }
}
export const getParameterList = async (page?: number, limit?: number, search?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC') => {
    try {
        console.info('[REQ GET ALL PARAMETER]', { page, limit, search, sortBy, sortOrder });
        const auth = useMenuStore.getState();
        const menu_id = findMenuID(auth.menuList, '/');
        const header = {
            ...(useAuthStore.getState().token && {
                Authorization: `Bearer ${useAuthStore.getState().token}`,
            }),
            ...(menu_id && { 'app-menu-id': menu_id }),
        };
        
        let url = `${endpoint.baseURL}${endpoint.parameter}`;
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
        console.error('[GET ALL PARAMETER ERROR]', error);
        showNotification({
            color: 'red',
            title: 'Request Error',
            message: error?.response?.data?.message || error?.response?.data || error?.message,
        });
    }
};

export const createParameter = async (req: RequestNewParameter) => {
    try {
        console.info('[REQ CREATE PARAMETER]', req);
        const auth = useMenuStore.getState();
        const menu_id = findMenuID(auth.menuList, '/');
        const header = {
            ...(useAuthStore.getState().token && {
                Authorization: `Bearer ${useAuthStore.getState().token}`,
            }),
            ...(menu_id && { 'app-menu-id': menu_id }),
        };
        const response = await sendRequestPOST(`${endpoint.baseURL}${endpoint.parameter}`, req, header);

        return response;
    } catch (error: any) {
        console.error('[CREATE PARAMETER ERROR]', error);
        showNotification({
            color: 'red',
            title: 'Request Error',
            message: error?.response?.data?.message || error?.response?.data || error?.message,
        });
    }
};

export const updateParameter = async (req: RequestNewParameter) => {
    try {
        console.info('[REQ UPDATE PARAMETER]', req);
        const auth = useMenuStore.getState();
        const menu_id = findMenuID(auth.menuList, '/');
        const header = {
            ...(useAuthStore.getState().token && {
                Authorization: `Bearer ${useAuthStore.getState().token}`,
            }),
            ...(menu_id && { 'app-menu-id': menu_id }),
        };
        const response = await sendRequestPUT(`${endpoint.baseURL}${endpoint.parameter}`, req, header);

        return response;
    } catch (error: any) {
        console.error('[UPDATE PARAMETER ERROR]', error);
        showNotification({
            color: 'red',
            title: 'Request Error',
            message: error?.response?.data?.message || error?.response?.data || error?.message,
        });
    }
};

export const deleteParameter = async (id: string) => {
    try {
        console.info('[REQ DELETE PARAMETER]', id);
        const auth = useMenuStore.getState();
        const menu_id = findMenuID(auth.menuList, '/');
        const header = {
            ...(useAuthStore.getState().token && {
                Authorization: `Bearer ${useAuthStore.getState().token}`,
            }),
            ...(menu_id && { 'app-menu-id': menu_id }),
        };
        const response = await sendRequestDELETE(`${endpoint.baseURL}${endpoint.parameter}/${id}`, header);

        return response;
    } catch (error: any) {
        console.error('[DELETE PARAMETER ERROR]', error);
        showNotification({
            color: 'red',
            title: 'Request Error',
            message: error?.response?.data?.message || error?.response?.data || error?.message,
        });
    }
};