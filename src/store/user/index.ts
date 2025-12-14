import { create } from 'zustand';
import { showNotification } from '@mantine/notifications';
import { createNewUser, getAllUser, getInstitutionList, updateUser, deleteUser } from '@/api/user';
import { useLayoutStore } from '../layout';
import { PaginationState, DEFAULT_PAGINATION, extractPagination, resetPagination } from '@/types/pagination';

const { showLoading, hideLoading } = useLayoutStore.getState();

interface UserStore extends PaginationState {
  userList: User[];
  setUserList: (userList: User[]) => void;
  getUserList: (page?: number, limit?: number, search?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC') => void;
  setPagination: (page: number, limit: number, total: number) => void;

  createNewUser: (req: RequestNewUser) => void;
  updateUser: (req: RequestEditUser) => void;
  deleteUser: (id: string) => void;

  institutionList: Institution[]
  getInstitutionList: () => void

  resetUserStore: () => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  userList: [],
  setUserList: (userList: User[]) => set({ userList }),
  ...DEFAULT_PAGINATION,
  setPagination: (page: number, limit: number, total: number) => set({ page, limit, total }),
  getUserList: async (page?: number, limit?: number, search?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC') => {
    showLoading();
    const currentPage = page ?? DEFAULT_PAGINATION.page;
    const currentLimit = limit ?? DEFAULT_PAGINATION.limit;
    getAllUser(currentPage, currentLimit, search, sortBy, sortOrder).then((res) => {
      if (res.code === 200) {
        const pagination = extractPagination(res.pagination, currentPage, currentLimit);
        set({ 
          userList: res.data || [],
          ...pagination
        });
      }
    }).finally(() => {
      hideLoading();
    });
  },

  createNewUser: (req: RequestNewUser) => {
    showLoading();
    createNewUser(req)
      .then((res) => {
        if (res.code === 200) {
          showNotification({
            color: 'green',
            title: 'Success',
            message: res.message,
          });
        }
      })
      .finally(() => {
        hideLoading();
      });
  },

  updateUser: async (req: RequestEditUser) => {
    showLoading();
    await updateUser(req)
      .then((res) => {
        if (res.code === 200) {
          showNotification({
            color: 'green',
            title: 'Success',
            message: res.message,
          });
          const { page, limit } = useUserStore.getState();
          useUserStore.getState().getUserList(page, limit, undefined, undefined, undefined);
        }
      })
      .finally(() => {
        hideLoading();
      });
  },

  deleteUser: async (id: string) => {
    showLoading();
    await deleteUser(id).then((res) => {
      if (res.code === 200) {
        showNotification({
          color: 'green',
          title: 'Success',
          message: res.message,
        });
        const { page, limit } = useUserStore.getState();
        useUserStore.getState().getUserList(page, limit);
      }
    }).finally(() => {
      hideLoading();
    });
  },

  institutionList: [],
  getInstitutionList: async () => {
    getInstitutionList().then((res) => {
      if (res.code === 200) {
        set({ institutionList: res.data });
      }
    });
  },

  resetUserStore: () => {
    set({ userList: [], ...resetPagination() });
  },
}));
