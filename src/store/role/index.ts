import { create } from 'zustand';
import { deleteMenu, inquiryMenu } from '@/api/menu';
import {
  createNewRole,
  createNewRoleMapping,
  deleteRoleMapping,
  updateRoleMapping,
  inquiryRoleList,
  inquiryRoleMapping,
} from '@/api/role';
import { clearIndexedDB, getFromIDB, storeToIDB } from '@/libs/utils';
import { showNotification } from '@mantine/notifications';

interface RoleStore {
  roleMapping: RoleMapping[];
  setRoleMapping: (roleMapping: RoleMapping[]) => void;
  getRoleMapping: () => void;
  createRoleMapping: (request: RequestNewRoleMapping) => void;
  updateRoleMapping: (request: RequestNewRoleMapping) => void;
  deleteRoleMapping: (id: string) => void;

  menuList: Menu[];
  setMenuList: (menuList: Menu[]) => void;
  getMenuList: () => void;
  deleteMenu: (id: string) => void;

  roleList: Role[];
  setRoleList: (roleList: Role[]) => void;
  getRoleList: () => void;
  addNewRole: (request: RequestNewRole) => Promise<void>;

  resetRoleStore: () => void;
}

export const useRoleStore = create<RoleStore>()((set) => ({
  roleMapping: [],
  setRoleMapping: (roleMapping: RoleMapping[]) => set({ roleMapping }),

  getRoleMapping: () => {
    inquiryRoleMapping().then((res) => {
      if (res.code === 200) {
        set({ roleMapping: res.data });
      }
    });
  },

  createRoleMapping: async (request: RequestNewRoleMapping) => {
    await createNewRoleMapping(request).then((res) => {
      if (res.code === 200) {
        showNotification({
          color: 'green',
          title: 'Success',
          message: res.message,
        });
      }
    });
  },

  updateRoleMapping: async (request: RequestNewRoleMapping) => {
    await updateRoleMapping(request).then((res) => {
      if (res.code === 200) {
        showNotification({
          color: 'green',
          title: 'Success',
          message: res.message,
        });
      }
    });
  },

  deleteRoleMapping: async (id: string) => {
    await deleteRoleMapping(id).then((res) => {
      if (res.code === 200) {
        showNotification({
          color: 'green',
          title: 'Success',
          message: res.message,
        });
      }
    });
  },

  menuList: [],
  setMenuList: (menuList: Menu[]) => set({ menuList }),

  getMenuList: () => {
    getFromIDB<Menu[]>('param', 'param', 'menuList')
      .then((res) => {
        if (!res) {
          inquiryMenu().then((apiRes) => {
            if (apiRes.code === 200) {
              const menuData = apiRes.data;
              storeToIDB('param', 'param', 'menuList', menuData).then(() => {
                set({ menuList: menuData });
              });
            }
          });
        } else {
          set({ menuList: res });
        }
      })
      .catch((error) => {
        console.error('Error retrieving from IndexedDB:', error);
        inquiryMenu().then((apiRes) => {
          if (apiRes.code === 200) {
            const menuData = apiRes.data;
            storeToIDB('param', 'param', 'menuList', menuData).then(() => {
              set({ menuList: menuData });
            });
          }
        });
      });
  },

  deleteMenu: async (id: string) => {
    await deleteMenu(id).then((res) => {
      if (res.code === 200) {
        showNotification({
          color: 'green',
          title: 'Success',
          message: res.message,
        });
        useRoleStore.getState().getMenuList();
      }
    })
  },

  roleList: [],
  setRoleList: (roleList: Role[]) => set({ roleList }),
  getRoleList: () => {
    getFromIDB<Role[]>('param', 'param', 'roleList')
      .then((res) => {
        if (!res) {
          inquiryRoleList().then((apiRes) => {
            if (apiRes.code === 200) {
              const roleData = apiRes.data;
              storeToIDB('param', 'param', 'roleList', roleData).then(() => {
                set({ roleList: roleData });
              });
            }
          });
        } else {
          set({ roleList: res });
        }
      })
      .catch((error) => {
        console.error('Error retrieving from IndexedDB:', error);

        inquiryRoleList().then((apiRes) => {
          if (apiRes.code === 200) {
            const roleData = apiRes.data;
            storeToIDB('param', 'param', 'roleList', roleData).then(() => {
              set({ roleList: roleData });
            });
          }
        });
      });
  },
  
  addNewRole: async (request: RequestNewRole) => {
    await createNewRole(request).then((res) => {
      if (res.code === 200) {
        showNotification({
          color: 'green',
          title: 'Success',
          message: res.message,
        });
        clearIndexedDB('param');
        useRoleStore.getState().getRoleList();
      }
    });
  },

  resetRoleStore: () => {
    set({ roleMapping: [], menuList: [] });
  },
}));
