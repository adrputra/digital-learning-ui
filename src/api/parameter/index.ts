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
export const getParameterList = async () => {
    try {
        console.info('[REQ GET ALL PARAMETER]');
        const auth = useMenuStore.getState();
        const menu_id = findMenuID(auth.menuList, '/');
        const header = {
            ...(useAuthStore.getState().token && {
                Authorization: `Bearer ${useAuthStore.getState().token}`,
            }),
            ...(menu_id && { 'app-menu-id': menu_id }),
        };
        const response = await sendRequestGET(`${endpoint.baseURL}${endpoint.parameter}`, header);

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