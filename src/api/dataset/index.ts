import endpoint from '@root/endpoint.json';
import { showNotification } from '@mantine/notifications';
import { findMenuID } from '@/libs/authenticator';
import { sendRequestDELETE, sendRequestGET, sendRequestPOST } from '@/libs/sendRequest';
import { useAuthStore } from '@/store/auth';
import { useMenuStore } from '@/store/menu';

export const uploadDataset = async (req: FormData) => {
  try {
    console.info('[REQ UPLOAD DATASET]', req);
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
        'Content-Type': 'multipart/form-data',
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };

    req.forEach((item) => {
      console.info(item);
    });

    const response = await sendRequestPOST(`${endpoint.baseURL}${endpoint.dataset}`, req, header);

    return response;
  } catch (error: any) {
    console.error('[UPLOAD DATASET ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};

export const getDatasetList = async () => {
  try {
    console.info('[REQ GET ALL DATASET]');
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestGET(`${endpoint.baseURL}${endpoint.dataset}`, header);

    return response;
  } catch (error: any) {
    console.error('[GET ALL DATASET ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};

export const deleteDataset = async (id: string) => {
  try {
    console.info('[REQ DELETE DATASET]', id);
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestDELETE(
      `${endpoint.baseURL}${endpoint.dataset}/${id}`,
      header
    );

    return response;
  } catch (error: any) {
    console.error('[DELETE DATASET ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};

export const getLastTrainModel = async (id: string) => {
  try {
    console.info('[REQ GET LAST TRAIN MODEL]', id);
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestGET(
      `${endpoint.baseURL}${endpoint.lastTrainModel}/${id}`,
      header
    );

    return response;
  } catch (error: any) {
    console.error('[GET LAST TRAIN MODEL ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};

export const trainModel = async (id: string) => {
  try {
    console.info('[REQ TRAIN MODEL]', id);
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestPOST(
      `${endpoint.baseURL}${endpoint.trainModel}/${id}`,
      {},
      header
    );

    return response;
  } catch (error: any) {
    console.error('[TRAIN MODEL ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};

export const getModelTrainingHistory = async (req: FilterModelTrainingHistory) => {
  try {
    console.info('[REQ GET MODEL TRAINING HISTORY]', req);
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestPOST(
      `${endpoint.baseURL}${endpoint.trainModelHistory}`,
      req,
      header
    );

    return response;
  } catch (error: any) {
    console.error('[GET MODEL TRAINING HISTORY ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};

export const getDatasetsByUsername = async (institution_id: string, username: string) => {
  try {
    console.info('[REQ GET DATASETS BY USERNAME]',institution_id, username);
    const auth = useMenuStore.getState();
    const menu_id = findMenuID(auth.menuList, '/dataset');
    const header = {
      ...(useAuthStore.getState().token && {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      }),
      ...(menu_id && { 'app-menu-id': menu_id }),
    };
    const response = await sendRequestGET(
      `${endpoint.baseURL}${endpoint.dataset}/${institution_id}/${username}`,
      header
    );

    return response;
  } catch (error: any) {
    console.error('[GET DATASETS BY USERNAME ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};