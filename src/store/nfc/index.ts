import { create } from 'zustand';
import { showNotification } from '@mantine/notifications';
import { pingNFCDevice, scanNFCTag, writeNFCTag } from '@/api/nfc';

interface NFCStore {
  nfcDevice: NFCDevice;
  setNfcDevice: (nfcDevice: NFCDevice) => void;

  nfcDeviceLastConnection: string;
  setNfcDeviceLastConnection: (nfcDeviceLastConnection: string) => void;

  nfcTagUID: string;
  setNfcTagUID: (nfcTagUID: string) => void;

  nfcDatas: Record<number, string>;
  setNfcDatas: (nfcDatas: Record<number, string>) => void;

  pingNFC: (ipAddress: string, port: string) => void;
  scanNFC: (blockNumbers: string[]) => Promise<void>;
  writeNFC: (blockNumber: string, data: string) => Promise<void>;
}

export const useNFCStore = create<NFCStore>()((set) => ({
  nfcDevice: { ipAddress: '', port: '' },
  setNfcDevice: (nfcDevice: NFCDevice) => set({ nfcDevice }),

  nfcDeviceLastConnection: '1970-01-01',
  setNfcDeviceLastConnection: (nfcDeviceLastConnection: string) => set({ nfcDeviceLastConnection }),

  nfcTagUID: '',
  setNfcTagUID: (nfcTagUID: string) => set({ nfcTagUID }),

  nfcDatas: {},
  setNfcDatas: (nfcDatas: Record<number, string>) => set({ nfcDatas }),

  pingNFC: async (ipAddress: string, port: string) => {
    set({ nfcDevice: { ipAddress, port } });
    await pingNFCDevice(ipAddress, port).then((res) => {
      if (res.code === 200) {
        set({ nfcDeviceLastConnection: new Date().toString() });
        showNotification({
          title: 'NFC Device Connected',
          message: 'You can now Read/Write NFC Tag',
          color: 'green',
        });
      }
    });
  },
  scanNFC: async (blockNumbers: string[]) => {
    set({ nfcDatas: {} });
    await scanNFCTag(blockNumbers.map(Number), useNFCStore.getState().nfcDevice).then((res) => {
      if (res.code === 200 && res.data) {
        set({ nfcDatas: res.data.data, nfcTagUID: res.data.uid });
        showNotification({
          title: 'Successfully Scan NFC Tag',
          message: 'You can now Read/Write NFC Tag',
          color: 'green',
        });
      }
      else {
        showNotification({
          title: 'Error Scan NFC Tag',
          message: 'Please try again',
          color: 'red',
        });
      }
    });
  },

  writeNFC: async (blockNumber: string, data: string) => {
    await writeNFCTag(Number(blockNumber), data, useNFCStore.getState().nfcDevice).then((res) => {
      if (res.code === 200) {
        showNotification({
          title: 'Successfully Write NFC Tag',
          message: 'You can now Read/Write NFC Tag',
          color: 'green',
        });
      }
    });
  }
}));
