import { addNewInstitution, getInstitutionList, updateInstitution, deleteInstitution } from "@/api/institution";
import { showNotification } from "@mantine/notifications";
import { create } from "zustand";
import { useLayoutStore } from "../layout";
import { PaginationState, DEFAULT_PAGINATION, extractPagination, resetPagination } from '@/types/pagination';

interface InstitutionStore extends PaginationState {
    institutionList: Institution[]
    getInstitutionList: (page?: number, limit?: number, search?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC') => void;
    addInstitution: (institution: RequestNewInstitution) => Promise<void>;
    updateInstitution: (institution: RequestEditInstitution) => Promise<void>;
    deleteInstitution: (id: string) => Promise<void>;
    resetInstitutionStore: () => void;
}

const { showLoading, hideLoading } = useLayoutStore.getState();

export const useInstitutionStore = create<InstitutionStore>()((set) => ({
    institutionList: [],
    ...DEFAULT_PAGINATION,
    getInstitutionList: async (page?: number, limit?: number, search?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC') => {
        showLoading();
        const currentPage = page ?? DEFAULT_PAGINATION.page;
        const currentLimit = limit ?? DEFAULT_PAGINATION.limit;
        await getInstitutionList(currentPage, currentLimit, search, sortBy, sortOrder).then((res) => {
            if (res.code === 200 && res.data) {
                const pagination = extractPagination(res.pagination, currentPage, currentLimit);
                set({ 
                    institutionList: res.data || [],
                    ...pagination
                });
            } else {
                showNotification({
                    color: 'red',
                    title: 'Error',
                    message: res.message
                })
            }
        }).finally(() => {
            hideLoading();
        })
    },

    addInstitution: async (institution: RequestNewInstitution) => {
        await addNewInstitution(institution).then((res) => {
            if (res.code === 200) {
                showNotification({
                    color: 'green',
                    title: 'Success',
                    message: res.message
                })
            } else {
                showNotification({
                    color: 'red',
                    title: 'Error',
                    message: res.message
                })
            }
        })
        const { page, limit } = useInstitutionStore.getState();
        await useInstitutionStore.getState().getInstitutionList(page, limit, undefined, undefined, undefined);
    },

    updateInstitution: async (institution: RequestEditInstitution) => {
        await updateInstitution(institution).then((res) => {
            if (res.code === 200) {
                showNotification({
                    color: 'green',
                    title: 'Success',
                    message: res.message
                })
            }
        })
        const { page, limit } = useInstitutionStore.getState();
        await useInstitutionStore.getState().getInstitutionList(page, limit, undefined, undefined, undefined);
    },

    deleteInstitution: async (id: string) => {
        await deleteInstitution(id).then((res) => {
            if (res.code === 200) {
                showNotification({
                    color: 'green',
                    title: 'Success',
                    message: res.message
                })
            }
        })
        const { page, limit } = useInstitutionStore.getState();
        await useInstitutionStore.getState().getInstitutionList(page, limit, undefined, undefined, undefined);
    },

    resetInstitutionStore: () => {
        set({ institutionList: [], ...resetPagination() });
    }
}))