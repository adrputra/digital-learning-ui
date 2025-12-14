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
import { useLayoutStore } from '../layout';
import { PaginationState, DEFAULT_PAGINATION, extractPagination, resetPagination } from '@/types/pagination';

const { showLoading, hideLoading } = useLayoutStore.getState();

interface RoleStore extends PaginationState {
  roleMapping: RoleMapping[];
  setRoleMapping: (roleMapping: RoleMapping[]) => void;
  getRoleMapping: (page?: number, limit?: number, search?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC') => void;
  createRoleMapping: (request: RequestNewRoleMapping) => void;
  updateRoleMapping: (request: RequestNewRoleMapping) => void;
  deleteRoleMapping: (id: string) => void;

  menuList: Menu[];
  setMenuList: (menuList: Menu[]) => void;
  getMenuList: (page?: number, limit?: number, search?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC') => void;
  deleteMenu: (id: string) => void;

  roleList: Role[];
  setRoleList: (roleList: Role[]) => void;
  getRoleList: (page?: number, limit?: number, search?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC') => void;
  addNewRole: (request: RequestNewRole) => Promise<void>;

  resetRoleStore: () => void;
}

export const useRoleStore = create<RoleStore>()((set) => ({
  roleMapping: [],
  setRoleMapping: (roleMapping: RoleMapping[]) => set({ roleMapping }),
  ...DEFAULT_PAGINATION,

  getRoleMapping: (page?: number, limit?: number, search?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC') => {
    const currentPage = page ?? DEFAULT_PAGINATION.page;
    const currentLimit = limit ?? DEFAULT_PAGINATION.limit;
    showLoading();
    inquiryRoleMapping(currentPage, currentLimit, search, sortBy, sortOrder).then((res) => {
      if (res.code === 200) {
        const pagination = extractPagination(res.pagination, currentPage, currentLimit);
        set({ 
          roleMapping: res.data || [],
          ...pagination
        });
      }
    }).finally(() => {
      hideLoading();
    });
  },

  createRoleMapping: async (request: RequestNewRoleMapping) => {
    showLoading();
    await createNewRoleMapping(request).then((res) => {
      if (res.code === 200) {
        showNotification({
          color: 'green',
          title: 'Success',
          message: res.message,
        });
        const { page, limit } = useRoleStore.getState();
        useRoleStore.getState().getRoleMapping(page, limit, undefined, undefined, undefined);
      }
    }).finally(() => {
      hideLoading();
    });
  },

  updateRoleMapping: async (request: RequestNewRoleMapping) => {
    showLoading();
    await updateRoleMapping(request).then((res) => {
      if (res.code === 200) {
        showNotification({
          color: 'green',
          title: 'Success',
          message: res.message,
        });
        const { page, limit } = useRoleStore.getState();
        useRoleStore.getState().getRoleMapping(page, limit, undefined, undefined, undefined);
      }
    }).finally(() => {
      hideLoading();
    });
  },

  deleteRoleMapping: async (id: string) => {
    showLoading();
    await deleteRoleMapping(id).then((res) => {
      if (res.code === 200) {
        showNotification({
          color: 'green',
          title: 'Success',
          message: res.message,
        });
        const { page, limit } = useRoleStore.getState();
        useRoleStore.getState().getRoleMapping(page, limit, undefined, undefined, undefined);
      }
    }).finally(() => {
      hideLoading();
    });
  },

  menuList: [],
  setMenuList: (menuList: Menu[]) => set({ menuList }),

  getMenuList: (page?: number, limit?: number, search?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC') => {
    const currentPage = page ?? DEFAULT_PAGINATION.page;
    const currentLimit = limit ?? DEFAULT_PAGINATION.limit;
    showLoading();
    // If search or sort is provided, bypass cache and fetch from API
    if (search || sortBy || sortOrder) {
      inquiryMenu(currentPage, currentLimit, search, sortBy, sortOrder).then((apiRes) => {
        if (apiRes.code === 200) {
          const menuData = apiRes.data || [];
          const pagination = extractPagination(apiRes.pagination, currentPage, currentLimit);
          set({ 
            menuList: menuData,
            ...pagination
          });
        }
      }).finally(() => {
        hideLoading();
      });
    } else {
      getFromIDB<Menu[]>('param', 'param', 'menuList')
        .then((res) => {
          if (!res) {
            inquiryMenu(currentPage, currentLimit, search, sortBy, sortOrder).then((apiRes) => {
              if (apiRes.code === 200) {
                const menuData = apiRes.data || [];
                const pagination = extractPagination(apiRes.pagination, currentPage, currentLimit);
                storeToIDB('param', 'param', 'menuList', menuData).then(() => {
                  set({ 
                    menuList: menuData,
                    ...pagination
                  });
                });
              }
            });
          } else {
            set({ menuList: res });
          }
        })
        .catch((error) => {
          console.error('Error retrieving from IndexedDB:', error);
          inquiryMenu(currentPage, currentLimit, search, sortBy, sortOrder).then((apiRes) => {
            if (apiRes.code === 200) {
              const menuData = apiRes.data || [];
              const pagination = extractPagination(apiRes.pagination, currentPage, currentLimit);
              storeToIDB('param', 'param', 'menuList', menuData).then(() => {
                set({ 
                  menuList: menuData,
                  ...pagination
                });
              });
            }
          });
        }).finally(() => {
          hideLoading();
        });
    }
  },

  deleteMenu: async (id: string) => {
    showLoading();
    await deleteMenu(id).then((res) => {
      if (res.code === 200) {
        showNotification({
          color: 'green',
          title: 'Success',
          message: res.message,
        });
        useRoleStore.getState().getMenuList();
      }
    }).finally(() => {
      hideLoading();
    });
  },

  roleList: [],
  setRoleList: (roleList: Role[]) => set({ roleList }),
  getRoleList: (page?: number, limit?: number, search?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC') => {
    const currentPage = page ?? DEFAULT_PAGINATION.page;
    const currentLimit = limit ?? DEFAULT_PAGINATION.limit;
    showLoading();
    // If search or sort is provided, bypass cache and fetch from API
    if (search || sortBy || sortOrder) {
      inquiryRoleList(currentPage, currentLimit, search, sortBy, sortOrder).then((apiRes) => {
        if (apiRes.code === 200) {
          const roleData = apiRes.data || [];
          const pagination = extractPagination(apiRes.pagination, currentPage, currentLimit);
          set({ 
            roleList: roleData,
            ...pagination
          });
        }
      }).finally(() => {
        hideLoading();
      });
    } else {
      getFromIDB<Role[]>('param', 'param', 'roleList')
        .then((res) => {
          if (!res) {
            inquiryRoleList(currentPage, currentLimit, search, sortBy, sortOrder).then((apiRes) => {
              if (apiRes.code === 200) {
                const roleData = apiRes.data || [];
                const pagination = extractPagination(apiRes.pagination, currentPage, currentLimit);
                storeToIDB('param', 'param', 'roleList', roleData).then(() => {
                  set({ 
                    roleList: roleData,
                    ...pagination
                  });
                });
              }
            });
          } else {
            set({ roleList: res });
          }
        })
        .catch((error) => {
          console.error('Error retrieving from IndexedDB:', error);

          inquiryRoleList(currentPage, currentLimit, search, sortBy, sortOrder).then((apiRes) => {
            if (apiRes.code === 200) {
              const roleData = apiRes.data || [];
              const pagination = extractPagination(apiRes.pagination, currentPage, currentLimit);
              storeToIDB('param', 'param', 'roleList', roleData).then(() => {
                set({ 
                  roleList: roleData,
                  ...pagination
                });
              });
            }
          });
        }).finally(() => {
          hideLoading();
        });
    }
  },

  addNewRole: async (request: RequestNewRole) => {
    showLoading();
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
    }).finally(() => {
      hideLoading();
    });
  },

  resetRoleStore: () => {
    set({ roleMapping: [], menuList: [], roleList: [], ...resetPagination() });
  },
}));
