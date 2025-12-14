import { createParameter, getParameterByKey, getParameterList, updateParameter } from "@/api/parameter";
import { create } from "zustand";
import { useLayoutStore } from "../layout";
import { showNotification } from "@mantine/notifications";
import { PaginationState, DEFAULT_PAGINATION, extractPagination, resetPagination } from '@/types/pagination';

const { showLoading, hideLoading } = useLayoutStore.getState();

interface ParameterStore extends PaginationState {
    trainModelInterval: '';
    getTrainModelInterval: (key: string) => void;
    parameterList: Parameter[];
    setParameterList: (parameterList: Parameter[]) => void;
    getParameterList: (page?: number, limit?: number, search?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC') => void;
    createParameter: (parameter: RequestNewParameter) => void;
    updateParameter: (parameter: RequestNewParameter) => void;
    // deleteParameter: (id: string) => void;
    // uploadParameter: (req: FormData) => void;
    resetParameterStore: () => void;
}

export const useParameterStore = create<ParameterStore>()((set) => ({
    trainModelInterval: '',
    getTrainModelInterval: async (key) => {
        await getParameterByKey(key).then((res) => {
            if (res.code === 200) {
                set({ trainModelInterval: res.data.value }); 
            }
        })
    },
    parameterList: [],
    setParameterList: (parameterList: Parameter[]) => set({ parameterList }),
    ...DEFAULT_PAGINATION,
    getParameterList: async (page?: number, limit?: number, search?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC') => {
        showLoading();
        const currentPage = page ?? DEFAULT_PAGINATION.page;
        const currentLimit = limit ?? DEFAULT_PAGINATION.limit;
        await getParameterList(currentPage, currentLimit, search, sortBy, sortOrder).then((res) => {
            if (res.code === 200) {
                const pagination = extractPagination(res.pagination, currentPage, currentLimit);
                set({ 
                    parameterList: res.data || [],
                    ...pagination
                });
            }
        }).finally(() => {
            hideLoading();
        });
    },
    createParameter: async (parameter: RequestNewParameter) => {
        showLoading();
        await createParameter(parameter).then((res) => {
            if (res.code === 200) {
                showNotification({
                    color: 'green',
                    title: 'Success',
                    message: res.message,
                });
            }
        }).finally(() => {
            hideLoading();
        });
    },

    updateParameter: async (parameter: RequestNewParameter) => {
        showLoading();
        await updateParameter(parameter).then((res) => {
            if (res.code === 200) {
                showNotification({
                    color: 'green',
                    title: 'Success',
                    message: res.message,
                });
            }
        }).finally(() => {
            hideLoading();
        });
    },

    resetParameterStore: () => set({ parameterList: [], ...resetPagination() }),
}));