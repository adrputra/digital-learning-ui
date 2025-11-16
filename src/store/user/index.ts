import { create } from 'zustand';
import { showNotification } from '@mantine/notifications';
import { createNewUser, getAllUser, getInstitutionList, updateUser, deleteUser } from '@/api/user';
import { useLayoutStore } from '../layout';

const { showLoading, hideLoading } = useLayoutStore.getState();

interface UserStore {
  userList: User[];
  setUserList: (userList: User[]) => void;
  getUserList: () => void;

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
  getUserList: async () => {
    getAllUser().then((res) => {
      if (res.code === 200) {
        set({ userList: res.data });
      }
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
          useUserStore.getState().getUserList();
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
        useUserStore.getState().getUserList();
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
    set({ userList: [] });
  },
}));
