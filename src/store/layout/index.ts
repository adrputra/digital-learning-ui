import { create } from 'zustand';

interface LayoutStore {
  sidebarOpen: boolean;
  mobileOpened: boolean;
  isLoading: boolean;
  setSidebarOpen: () => void;
  setMobileOpened: () => void;
  showLoading: () => void;
  hideLoading: () => void;
};

export const useLayoutStore = create<LayoutStore>()((set) => ({
  sidebarOpen: false,
  mobileOpened: false,
  isLoading: false,
  setSidebarOpen: () => set(({ sidebarOpen }) => ({ sidebarOpen: !sidebarOpen })),
  setMobileOpened: () => set(({ mobileOpened }) => ({ mobileOpened: !mobileOpened })),
  showLoading: () => set(() => ({ isLoading: true })),
  hideLoading: () => set(() => ({ isLoading: false })),
}));
