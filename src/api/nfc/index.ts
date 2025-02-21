import endpoint from '@root/endpoint.json';
import { showNotification } from '@mantine/notifications';
import { sendRequestGET, sendRequestPOST } from '@/libs/sendRequest';

export const pingNFCDevice = async (ipAddress: string, port: string) => {
  try {
    console.info('[REQ PING NFC DEVICE]');
    const response = await sendRequestGET(`http://${ipAddress}:${port}${endpoint.nfc.ping}`);

    return response;
  } catch (error: any) {
    console.error('[PING NFC DEVICE ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};

export const scanNFCTag = async (req: number[], nfcDevice: NFCDevice) => {
  try {
    const request = {
      blockNumber: req,
    };

    console.info('[REQ SCAN NFC TAG]', request);
    const response = await sendRequestPOST(
      `http://${nfcDevice.ipAddress}:${nfcDevice.port}${endpoint.nfc.scan}`,
      request
    );
    return response;
  } catch (error: any) {
    console.error('[SCAN NFC TAG ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};

export const writeNFCTag = async (blockNumber: number, data: string, nfcDevice: NFCDevice) => {
  try {
    const request = {
      blockNumber,
      data,
    };

    console.info('[REQ WRITE NFC TAG]', request);
    const response = await sendRequestPOST(
      `http://${nfcDevice.ipAddress}:${nfcDevice.port}${endpoint.nfc.write}`,
      request
    );
    return response;
  } catch (error: any) {
    console.error('[WRITE NFC TAG ERROR]', error);
    showNotification({
      color: 'red',
      title: 'Request Error',
      message: error?.response?.data?.message || error?.response?.data || error?.message,
    });
  }
};
