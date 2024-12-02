import { create } from 'zustand';
import { showNotification } from '@mantine/notifications';
import { deleteDataset, getDatasetList, getLastTrainModel, getModelTrainingHistory, uploadDataset } from '@/api/dataset';
import { useLayoutStore } from '../layout';
import { formatDate } from '@/libs/utils';

const { showLoading, hideLoading } = useLayoutStore.getState();

interface DatasetStore {
  uploadDataset: (req: FormData) => Promise<any>;

  datasetList: Dataset[];
  getDatasetList: () => Promise<any>;

  deleteDataset: (id: string) => Promise<any>;

  lastTrainModel: string;
  getLastTrainModel: (id: string) => Promise<any>;

  modelTrainingHistory: ModelTraingingHistory[];
  getModelTrainingHistory: (req: FilterModelTrainingHistory) => Promise<any>;
}

export const useDatasetStore = create<DatasetStore>()((set) => ({
  uploadDataset: async (req: FormData) => {
    showLoading();
    await uploadDataset(req)
      .then((res) => {
        if (res.code === 200) {
          showNotification({
            color: 'green',
            title: 'Success',
            message: res.message,
          });
          useDatasetStore.getState().getDatasetList();
        }
      })
      .finally(() => {
        hideLoading();
      });
  },

  datasetList: [],
  getDatasetList: async () => {
    showLoading();
    await getDatasetList().then((res) => {
      if (res.code === 200) {
        set({ datasetList: res.data });
      }
    }).finally(() => {
      hideLoading();
    });
  },

  deleteDataset: async (id: string) => {
    showLoading();
    await deleteDataset(id).then((res) => {
      if (res.code === 200) {
        showNotification({
          color: 'green',
          title: 'Success',
          message: res.message,
        });
        useDatasetStore.getState().getDatasetList();
      }
    }).finally(() => {
      hideLoading();
    });
  },

  lastTrainModel: '',
  getLastTrainModel: async (id: string) => {
    await getLastTrainModel(id).then((res) => {
      if (res.code === 200) {
        set({ lastTrainModel: formatDate(res.data) });
      }
    });
  },

  modelTrainingHistory: [],
  getModelTrainingHistory: async (req: FilterModelTrainingHistory) => {
    await getModelTrainingHistory(req).then((res) => {
      if (res.code === 200) {
        set({ modelTrainingHistory: res.data });
      }
    })
  }
}));
