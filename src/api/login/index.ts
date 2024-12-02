import config from '@root/config.json';
import endpoint from '@root/endpoint.json';
import { sendRequestGET, sendRequestPOST } from '@/libs/sendRequest';
import { showNotification } from '@/libs/alert';

export const getRandomImage = async () => {
  try {
    const response = await sendRequestGET(
      `${endpoint.unsplash.base}${endpoint.unsplash.random}?client_id=${config.unsplash.access_key}`
    );
    console.info('[REQ GET RANDOM IMAGE]', response);
    return response.urls.regular;
  } catch (error) {
    console.error(error);
  }
};

export const doLogin = async (req: LoginForm) => {
  try {
    console.info('[REQ DO LOGIN]', req);

    const response = await sendRequestPOST(`${endpoint.publicURL}${endpoint.login}`, req);

    showNotification({ status: 'success', title: 'Login Success', message: response.message });

    return response;
  } catch (error: any) {
    console.error('[DO LOGIN ERROR]', error);
    showNotification({ status: 'error', title: 'Login Failed', message: error?.response?.data?.message || error?.response?.data || error?.message });
  }
};
