import { create } from 'zustand';
import { showNotification } from '@mantine/notifications';
import { deleteDataset, getDatasetList, getLastTrainModel, getModelTrainingHistory, uploadDataset } from '@/api/dataset';
import { useLayoutStore } from '../layout';
import { formatDate } from '@/libs/utils';
import { PaginationState, DEFAULT_PAGINATION, extractPagination, resetPagination } from '@/types/pagination';

const { showLoading, hideLoading } = useLayoutStore.getState();

interface DatasetStore extends PaginationState {
  uploadDataset: (req: FormData) => Promise<any>;

  datasetList: Dataset[];
  getDatasetList: (page?: number, limit?: number) => Promise<any>;

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
          const { page, limit } = useDatasetStore.getState();
          useDatasetStore.getState().getDatasetList(page, limit);
        }
      })
      .finally(() => {
        hideLoading();
      });
  },

  datasetList: [],
  ...DEFAULT_PAGINATION,
  getDatasetList: async (page?: number, limit?: number) => {
    showLoading();
    const currentPage = page ?? DEFAULT_PAGINATION.page;
    const currentLimit = limit ?? DEFAULT_PAGINATION.limit;
    await getDatasetList(currentPage, currentLimit).then((res) => {
      if (res.code === 200) {
        const pagination = extractPagination(res.pagination, currentPage, currentLimit);
        set({ 
          datasetList: res.data || [],
          ...pagination
        });
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
        const { page, limit } = useDatasetStore.getState();
        useDatasetStore.getState().getDatasetList(page, limit);
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
